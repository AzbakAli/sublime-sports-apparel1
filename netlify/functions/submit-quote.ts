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
  phone?: string;
  country?: string;
  service: string;
  message: string;
}

interface FileData {
  name: string;
  type: string;
  content: Buffer;
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

  if (file.content.length > maxSize) {
    return { valid: false, error: "File size exceeds 10MB limit" };
  }

  const filename = typeof file.name === "string" 
    ? file.name 
    : typeof (file as any).filename === "string"
      ? (file as any).filename
      : "";
  
  if (!filename) {
    return { valid: false, error: "Invalid file: missing filename" };
  }

  const fileExtension = filename.toLowerCase().substring(filename.lastIndexOf("."));
  
  if (file.type && !allowedMimeTypes.includes(file.type)) {
    if (!allowedExtensions.includes(fileExtension)) {
      return { valid: false, error: "Invalid file type. Allowed: PNG, JPG, JPEG, PDF, AI" };
    }
  }

  if (!allowedExtensions.includes(fileExtension)) {
    return { valid: false, error: "Invalid file type. Allowed: PNG, JPG, JPEG, PDF, AI" };
  }

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

    busboy.on("file", (...args: any[]) => {
      let fieldname: string;
      let file: any;
      let filename: string;
      let encoding: string;
      let mimetype: string;

      if (args.length === 3) {
        const info = args[2];
        fieldname = args[0];
        file = args[1];
        filename = info.filename;
        encoding = info.encoding;
        mimetype = info.mimeType;
      } else if (args.length >= 4) {
        [fieldname, file, filename, encoding, mimetype] = args;
      } else {
        return;
      }
      
      if (fieldname === "file") {
        const chunks: Buffer[] = [];
        file.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
        });
        file.on("end", () => {
          const content = Buffer.concat(chunks);
          fileData = {
            name: filename,
            type: mimetype,
            content: content,
          };
        });
      }
    });

    busboy.on("finish", () => {
      resolve({ formData, fileData });
    });

    busboy.on("error", (error: Error) => {
      reject(error);
    });

    const body = event.body;
    if (typeof body === "string") {
      busboy.end(Buffer.from(body, "base64"));
    } else {
      busboy.end(body);
    }
  });
}

export async function handler(event: any) {
  console.log("=== Netlify Function Invoked ===");
  console.log("HTTP Method:", event.httpMethod);
  console.log("Content-Type:", event.headers["content-type"] || event.headers["Content-Type"]);
  
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
    const contentType = event.headers["content-type"] || event.headers["Content-Type"] || "";
    let formData: FormData;
    let fileData: FileData | null = null;

    if (contentType.includes("multipart/form-data")) {
      console.log("Parsing multipart form data...");
      const parsed = await parseMultipartFormData(event);
      formData = parsed.formData;
      fileData = parsed.fileData;
      console.log("Form data parsed:", { fullName: formData.fullName, email: formData.email, hasFile: !!fileData });
    } else {
      console.log("Parsing JSON form data...");
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

    const requiredFields = ["fullName", "email", "service", "message"];
    console.log("Validating required fields:", requiredFields);
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
    console.log("Required fields validation passed");

    if (!validateEmail(formData.email)) {
      console.log("Invalid email:", formData.email);
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid email address" }),
      };
    }
    console.log("Email validation passed");

    formData.fullName = sanitizeInput(formData.fullName);
    formData.company = formData.company ? sanitizeInput(formData.company) : undefined;
    formData.email = sanitizeInput(formData.email);
    formData.phone = formData.phone ? sanitizeInput(formData.phone) : undefined;
    formData.country = formData.country ? sanitizeInput(formData.country) : undefined;
    formData.service = sanitizeInput(formData.service);
    formData.message = sanitizeInput(formData.message);
    console.log("Input sanitization complete");

    // Validate file if present
    if (fileData) {
      console.log("Validating file:", fileData.name);
      const validation = validateFile(fileData);
      if (!validation.valid) {
        console.log("File validation failed:", validation.error);
        return {
          statusCode: 400,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ error: validation.error }),
        };
      }
      console.log("File validation passed");
    }

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
    console.log("Admin email rendered successfully");

    const adminEmailData: any = {
      from: "Sublime Sports Apparel <noreply@sublimesportsapparel.net>",
      to: "sales@sublimesportsapparel.net",
      replyTo: formData.email,
      subject: `New Quote Request – ${formData.fullName}`,
      html: adminEmailHtml,
    };

    if (fileData) {
      console.log("Adding attachment to email:", fileData.name);
      adminEmailData.attachments = [{
        filename: fileData.name,
        content: fileData.content,
      }];
    }

    console.log("Sending admin email...");
    await resend.emails.send(adminEmailData);
    console.log("Admin email sent successfully");

    console.log("Rendering customer email...");
    const customerEmailHtml = await render(
      CustomerEmail({
        fullName: formData.fullName,
      })
    );
    console.log("Customer email rendered successfully");

    const customerEmailData = {
      from: "Sublime Sports Apparel <noreply@sublimesportsapparel.net>",
      to: formData.email,
      subject: "We've Received Your Quote Request",
      html: customerEmailHtml,
    };

    console.log("Sending customer email...");
    await resend.emails.send(customerEmailData);
    console.log("Customer email sent successfully");

    console.log("Returning success response");
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, message: "Quote request submitted successfully" }),
    };
  } catch (error) {
    console.error("=== ERROR IN NETLIFY FUNCTION ===");
    console.error("Error:", error);
    console.error("Error message:", error instanceof Error ? error.message : "Unknown error");
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal server error", details: error instanceof Error ? error.message : "Unknown" }),
    };
  }
}
