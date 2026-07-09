import { Resend } from "resend";
import { render } from "@react-email/render";
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
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
    "application/postscript",
  ];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Invalid file type. Allowed: PNG, JPG, JPEG, PDF, AI" };
  }

  if (file.content.length > maxSize) {
    return { valid: false, error: "File size exceeds 10MB limit" };
  }

  return { valid: true };
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
    // Rate limiting
    const ip = event.headers["client-ip"] || event.headers["x-forwarded-for"] || "unknown";
    if (!checkRateLimit(ip)) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: "Too many requests. Please try again later." }),
      };
    }

    // Parse form data
    const contentType = event.headers["content-type"] || "";
    let formData: FormData;
    let fileData: FileData | null = null;

    if (contentType.includes("multipart/form-data")) {
      // Handle multipart form data with file
      const boundary = contentType.match(/boundary=([^;]+)/)?.[1];
      if (!boundary) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Invalid multipart boundary" }),
        };
      }

      const parts = event.body.split(`--${boundary}`);
      formData = {
        fullName: "",
        email: "",
        phone: "",
        country: "",
        service: "",
        message: "",
      };

      for (const part of parts) {
        if (part.includes("Content-Disposition")) {
          const nameMatch = part.match(/name="([^"]+)"/);
          const filenameMatch = part.match(/filename="([^"]+)"/);
          const contentTypeMatch = part.match(/Content-Type: ([^\r\n]+)/);

          if (nameMatch) {
            const fieldName = nameMatch[1];
            const value = part.split("\r\n\r\n")[1]?.split("\r\n")[0] || "";

            if (filenameMatch && contentTypeMatch) {
              // This is a file
              fileData = {
                name: filenameMatch[1],
                type: contentTypeMatch[1],
                content: Buffer.from(value, "base64"),
              };
            } else {
              // This is a regular field
              if (fieldName in formData) {
                formData[fieldName as keyof FormData] = value;
              }
            }
          }
        }
      }
    } else {
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
      const validation = validateFile(fileData);
      if (!validation.valid) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: validation.error }),
        };
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

    await resend.emails.send(adminEmailData);

    // Render customer email
    const customerEmailHtml = await render(
      CustomerEmail({
        fullName: formData.fullName,
      })
    );

    // Send customer confirmation email
    const customerEmailData = {
      from: "Sublime Sports Apparel <noreply@sublimesportsapparel.net>",
      to: formData.email,
      subject: "We've Received Your Quote Request",
      html: customerEmailHtml,
    };

    await resend.emails.send(customerEmailData);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Quote request submitted successfully" }),
    };
  } catch (error) {
    console.error("Error processing quote request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}
