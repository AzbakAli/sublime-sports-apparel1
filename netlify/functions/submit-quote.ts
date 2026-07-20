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
  
  if (!filename) {
    return { valid: false, error: "Invalid file: missing filename" };
  }

  // Normalize file extension to lowercase
  const fileExtension = filename.toLowerCase().substring(filename.lastIndexOf("."));
  
  // Validate by MIME type (if available)
  if (file.type && !allowedMimeTypes.includes(file.type)) {
    // If MIME type is not recognized, fall back to extension validation
    if (!allowedExtensions.includes(fileExtension)) {
      return { valid: false, error: "Invalid file type. Allowed: PNG, JPG, JPEG, PDF, AI" };
    }
  }

  // Validate by file extension
  if (!allowedExtensions.includes(fileExtension)) {
    return { valid: false, error: "Invalid file type. Allowed: PNG, JPG, JPEG, PDF, AI" };
  }

  return { valid: true };
}

function parseMultipartFormData(event: any): Promise<{ formData: FormData; filesData: FileData[] }> {
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
    
    const filesData: FileData[] = [];

    busboy.on("field", (fieldname: string, value: string) => {
      if (fieldname === "fullName") formData.fullName = value;
      else if (fieldname === "company") formData.company = value;
      else if (fieldname === "email") formData.email = value;
      else if (fieldname === "phone") formData.phone = value;
      else if (fieldname === "country") formData.country = value;
      else if (fieldname === "service") formData.service = value;
      else if (fieldname === "message") formData.message = value;
    });

    busboy.on("file", (...args: any[]) => {
      // Handle both Busboy API versions
      let fieldname: string;
      let file: any;
      let filename: string;
      let encoding: string;
      let mimetype: string;

      if (args.length === 3) {
        // Newer API: (fieldname, file, info)
        const info = args[2];
        fieldname = args[0];
        file = args[1];
        filename = info.filename;
        encoding = info.encoding;
        mimetype = info.mimeType;
      } else if (args.length >= 4) {
        // Older API: (fieldname, file, filename, encoding, mimetype)
        [fieldname, file, filename, encoding, mimetype] = args;
      } else {
        console.error("Unexpected Busboy file event signature");
        return;
      }
      
      if (fieldname === "files") {
        const chunks: Buffer[] = [];
        file.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
        });
        file.on("end", () => {
          const content = Buffer.concat(chunks);
          filesData.push({
            name: filename,
            type: mimetype,
            content: content,
          });
        });
      }
    });

    busboy.on("finish", () => {
      resolve({ formData, filesData });
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
  console.log("=== FUNCTION INVOKED ===");
  console.log("Event:", JSON.stringify({ httpMethod: event.httpMethod, headers: event.headers }));
  
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    console.log("Method not allowed:", event.httpMethod);
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    console.log("Request received:", { httpMethod: event.httpMethod, contentType: event.headers["content-type"] || event.headers["Content-Type"] });
    
    // Rate limiting
    const ip = event.headers["client-ip"] || event.headers["x-forwarded-for"] || "unknown";
    if (!checkRateLimit(ip)) {
      console.log("Rate limit exceeded for IP:", ip);
      return {
        statusCode: 429,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Too many requests. Please try again later." }),
      };
    }

    // Parse form data
    const contentType = event.headers["content-type"] || event.headers["Content-Type"] || "";
    let formData: FormData;
    let filesData: FileData[] = [];

    if (contentType.includes("multipart/form-data")) {
      console.log("Parsing multipart form data...");
      // Handle multipart form data with file using Busboy
      const parsed = await parseMultipartFormData(event);
      formData = parsed.formData;
      filesData = parsed.filesData;
      console.log("Parsed form data:", { fullName: formData.fullName, email: formData.email, filesCount: filesData.length });
    } else {
      console.log("Parsing JSON form data...");
      // Handle JSON form data without file
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
        console.log("Missing required field:", field);
        return {
          statusCode: 400,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ error: `${field} is required` }),
        };
      }
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      console.log("Invalid email:", formData.email);
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
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

    // Validate files if present
    if (filesData.length > 0) {
      console.log("Validating", filesData.length, "files");
      for (const file of filesData) {
        const validation = validateFile(file);
        if (!validation.valid) {
          console.log("File validation failed:", validation.error);
          return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: validation.error }),
          };
        }
      }
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

    console.log("Rendering admin email...");
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
        hasAttachment: filesData.length > 0,
        attachmentCount: filesData.length,
        submissionDate,
        submissionTime,
      })
    );
    console.log("Admin email rendered");

    // Send admin email
    const adminEmailData = {
      from: "Sublime Sports Apparel <noreply@sublimesportsapparel.net>",
      to: "sales@sublimesportsapparel.net",
      replyTo: formData.email,
      subject: `New Quote Request – ${formData.fullName}`,
      html: adminEmailHtml,
      attachments: filesData.map(file => ({
        filename: file.name,
        content: file.content,
      })),
    };

    console.log("Sending admin email with", filesData.length, "attachments");
    await resend.emails.send(adminEmailData);
    console.log("Admin email sent");

    console.log("Rendering customer email...");
    // Render customer email
    const customerEmailHtml = await render(
      CustomerEmail({
        fullName: formData.fullName,
      })
    );
    console.log("Customer email rendered");

    // Send customer confirmation email
    const customerEmailData = {
      from: "Sublime Sports Apparel <noreply@sublimesportsapparel.net>",
      to: formData.email,
      subject: "We've Received Your Quote Request",
      html: customerEmailHtml,
    };

    console.log("Sending customer email...");
    await resend.emails.send(customerEmailData);
    console.log("Customer email sent");

    const response = {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, message: "Quote request submitted successfully" }),
    };
    console.log("Returning success response");
    return response;
  } catch (error) {
    console.error("Error processing quote request:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" }),
    };
  }
}
