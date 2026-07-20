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
  
  try {
    console.log("Event:", JSON.stringify({ httpMethod: event.httpMethod }));
    
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    // Simple test response
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, message: "Function is working" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal server error", details: error instanceof Error ? error.message : "Unknown" }),
    };
  }
}
