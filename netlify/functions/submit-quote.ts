import { Resend } from "resend";
import { render } from "@react-email/render";
import Busboy from "busboy";
import AdminEmail from "../../src/emails/AdminEmail";
import CustomerEmail from "../../src/emails/CustomerEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

interface FormData {
  fullName: string;
  company?: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  message: string;
}

interface FileData {
  name: string;
  type: string;
  content: Buffer;
}

// Rate limiting storage (in-memory for Netlify functions)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "")
    .substring(0, 1000);
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateFile(file: FileData): { valid: boolean; error?: string } {
  console.log("[DEBUG] validateFile called with file object:", JSON.stringify({ 
    name: file.name, 
    nameType: typeof file.name,
    type: file.type, 
    size: file.content?.length 
  }));

  const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/pjpeg",
    "application/pdf",
    "application/postscript",
    "application/illustrator",
  ];
  
  const allowedExtensions = [".png", ".jpg", ".jpeg", ".pdf", ".ai", ".eps"];
  const maxSize = 10 * 1024 * 1024; // 10MB

  // Check file size first
  if (file.content.length > maxSize) {
    return { valid: false, error: "File size exceeds 10MB limit" };
  }

  // Safely get filename - handle different property names
  const filename = typeof file.name === "string" 
    ? file.name 
    : typeof (file as any).filename === "string"
      ? (file as any).filename
      : "";
  
  console.log("[DEBUG] Extracted filename:", filename, "type:", typeof filename);

  if (!filename) {
    return { valid: false, error: "Invalid file: missing filename" };
  }

  // Normalize file extension to lowercase
  const fileExtension = filename.toLowerCase().substring(filename.lastIndexOf("."));
  console.log("[DEBUG] File extension:", fileExtension);
  
  // Validate by MIME type (if available)
  if (file.type && !allowedMimeTypes.includes(file.type)) {
    console.log("[DEBUG] MIME type not in allowed list:", file.type);
    // If MIME type is not recognized, fall back to extension validation
    if (!allowedExtensions.includes(fileExtension)) {
      return { valid: false, error: "Invalid file type. Allowed: PNG, JPG, JPEG, PDF, AI" };
    }
  }

  // Validate by file extension
  if (!allowedExtensions.includes(fileExtension)) {
    console.log("[DEBUG] Extension not in allowed list:", fileExtension);
    return { valid: false, error: "Invalid file type. Allowed: PNG, JPG, JPEG, PDF, AI" };
  }

  console.log("[DEBUG] File validation passed");
  return { valid: true };
}

function parseMultipartFormData(event: any): Promise<{ formData: FormData; fileData: FileData | null }> {
  return new Promise((resolve, reject) => {
    const contentType = event.headers["content-type"] || event.headers["Content-Type"] || "";
    
    const busboy = Busboy({
      headers: {
        "content-type": contentType,
      },
    });

    const formData: FormData = {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      service: "",
      message: "",
    };
    
    let fileData: FileData | null = null;

    busboy.on("field", (fieldname: string, value: string) => {
      if (fieldname === "fullName") formData.fullName = value;
      else if (fieldname === "company") formData.company = value;
      else if (fieldname === "email") formData.email = value;
      else if (fieldname === "phone") formData.phone = value;
      else if (fieldname === "country") formData.country = value;
      else if (fieldname === "service") formData.service = value;
      else if (fieldname === "message") formData.message = value;
    });

    busboy.on("file", (fieldname: string, file: any, filename: string, encoding: string, mimetype: string) => {
      console.log("[DEBUG] Busboy file event - fieldname:", fieldname, "filename:", filename, "mimetype:", mimetype);
      if (fieldname === "file") {
        const chunks: Buffer[] = [];
        file.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
        });
        file.on("end", () => {
          const content = Buffer.concat(chunks);
          console.log("[DEBUG] File complete - filename:", filename, "size:", content.length, "type:", mimetype);
          fileData = {
            name: filename,
            type: mimetype,
            content: content,
          };
          console.log("[DEBUG] FileData object:", JSON.stringify({ name: fileData?.name, type: fileData?.type, size: fileData?.content?.length }));
        });
      }
    });

    busboy.on("finish", () => {
      resolve({ formData, fileData });
    });

    busboy.on("error", (error: Error) => {
      reject(error);
    });

    // Handle both string and Buffer body
    const body = event.body;
    if (typeof body === "string") {
      busboy.end(Buffer.from(body, "base64"));
    } else {
      busboy.end(body);
    }
  });
}

export async function handler(event: any) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    console.log("[DEBUG] Request received. Content-Type:", event.headers["content-type"] || event.headers["Content-Type"]);
    
    // Rate limiting
    const ip = event.headers["client-ip"] || event.headers["x-forwarded-for"] || "unknown";
    if (!checkRateLimit(ip)) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: "Too many requests. Please try again later." }),
      };
    }

    // Parse form data
    const contentType = event.headers["content-type"] || event.headers["Content-Type"] || "";
    let formData: FormData;
    let fileData: FileData | null = null;

    console.log("[DEBUG] Content-Type includes multipart:", contentType.includes("multipart/form-data"));

    if (contentType.includes("multipart/form-data")) {
      // Handle multipart form data with file using Busboy
      console.log("[DEBUG] Parsing multipart form data...");
      const parsed = await parseMultipartFormData(event);
      formData = parsed.formData;
      fileData = parsed.fileData;
      console.log("[DEBUG] Parsed. File data present:", !!fileData);
      if (fileData) {
        console.log("[DEBUG] File info:", { name: fileData.name, type: fileData.type, size: fileData.content.length });
      }
    } else {
      // Handle JSON form data without file
      console.log("[DEBUG] Parsing JSON form data...");
      const body = JSON.parse(event.body);
      formData = {
        fullName: body.fullName || "",
        company: body.company || "",
        email: body.email || "",
        phone: body.phone || "",
        country: body.country || "",
        service: body.service || "",
        message: body.message || "",
      };
    }

    // Validate required fields
    const requiredFields = ["fullName", "email", "phone", "country", "service", "message"];
    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: `${field} is required` }),
        };
      }
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid email address" }),
      };
    }

    // Sanitize inputs
    formData.fullName = sanitizeInput(formData.fullName);
    formData.company = formData.company ? sanitizeInput(formData.company) : undefined;
    formData.email = sanitizeInput(formData.email);
    formData.phone = sanitizeInput(formData.phone);
    formData.country = sanitizeInput(formData.country);
    formData.service = sanitizeInput(formData.service);
    formData.message = sanitizeInput(formData.message);

    // Validate file if present
    if (fileData) {
      console.log("[DEBUG] Validating file...");
      const validation = validateFile(fileData);
      if (!validation.valid) {
        console.log("[DEBUG] File validation failed:", validation.error);
        return {
          statusCode: 400,
          body: JSON.stringify({ error: validation.error }),
        };
      }
      console.log("[DEBUG] File validation passed");
    }

    // Get current date and time
    const now = new Date();
    const submissionDate = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const submissionTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    console.log("[DEBUG] Rendering admin email...");
    // Render admin email
    const adminEmailHtml = await render(
      AdminEmail({
        fullName: formData.fullName,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        service: formData.service,
        message: formData.message,
        hasAttachment: !!fileData,
        submissionDate,
        submissionTime,
      })
    );
    console.log("[DEBUG] Admin email rendered");

    // Send admin email
    const adminEmailData = {
      from: "Sublime Sports Apparel <noreply@sublimesportsapparel.net>",
      to: "sales@sublimesportsapparel.net",
      replyTo: formData.email,
      subject: `New Quote Request – ${formData.fullName}`,
      html: adminEmailHtml,
      attachments: fileData
        ? [
            {
              filename: fileData.name,
              content: fileData.content,
            },
          ]
        : [],
    };

    console.log("[DEBUG] Sending admin email with", fileData ? "attachment" : "no attachment");
    await resend.emails.send(adminEmailData);
    console.log("[DEBUG] Admin email sent");

    console.log("[DEBUG] Rendering customer email...");
    // Render customer email
    const customerEmailHtml = await render(
      CustomerEmail({
        fullName: formData.fullName,
      })
    );
    console.log("[DEBUG] Customer email rendered");

    // Send customer confirmation email
    const customerEmailData = {
      from: "Sublime Sports Apparel <noreply@sublimesportsapparel.net>",
      to: formData.email,
      subject: "We've Received Your Quote Request",
      html: customerEmailHtml,
    };

    console.log("[DEBUG] Sending customer email...");
    await resend.emails.send(customerEmailData);
    console.log("[DEBUG] Customer email sent");

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Quote request submitted successfully" }),
    };
  } catch (error) {
    console.error("[ERROR] Error processing quote request:", error);
    console.error("[ERROR] Error stack:", error instanceof Error ? error.stack : "No stack trace");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}
