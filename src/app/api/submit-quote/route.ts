import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import Busboy from 'busboy';
import AdminEmail from '@/emails/AdminEmail';
import CustomerEmail from '@/emails/CustomerEmail';

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

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 1000);
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateFile(file: FileData): { valid: boolean; error?: string } {
  const allowedMimeTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/pjpeg',
    'application/pdf',
    'application/postscript',
    'application/illustrator',
  ];
  
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf', '.ai', '.eps'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (file.content.length > maxSize) {
    return { valid: false, error: 'File size exceeds 10MB limit' };
  }

  const filename = typeof file.name === 'string' 
    ? file.name 
    : typeof (file as any).filename === 'string'
      ? (file as any).filename
      : '';
  
  if (!filename) {
    return { valid: false, error: 'Invalid file: missing filename' };
  }

  const fileExtension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  
  if (file.type && !allowedMimeTypes.includes(file.type)) {
    if (!allowedExtensions.includes(fileExtension)) {
      return { valid: false, error: 'Invalid file type. Allowed: PNG, JPG, JPEG, PDF, AI' };
    }
  }

  if (!allowedExtensions.includes(fileExtension)) {
    return { valid: false, error: 'Invalid file type. Allowed: PNG, JPG, JPEG, PDF, AI' };
  }

  return { valid: true };
}

function parseMultipartFormData(req: NextRequest): Promise<{ formData: FormData; filesData: FileData[] }> {
  return new Promise((resolve, reject) => {
    const contentType = req.headers.get('content-type') || '';
    
    const busboy = Busboy({
      headers: {
        'content-type': contentType,
      },
    });

    const formData: FormData = {
      fullName: '',
      email: '',
      phone: '',
      country: '',
      service: '',
      message: '',
    };
    
    const filesData: FileData[] = [];

    busboy.on('field', (fieldname: string, value: string) => {
      if (fieldname === 'fullName') formData.fullName = value;
      else if (fieldname === 'company') formData.company = value;
      else if (fieldname === 'email') formData.email = value;
      else if (fieldname === 'phone') formData.phone = value;
      else if (fieldname === 'country') formData.country = value;
      else if (fieldname === 'service') formData.service = value;
      else if (fieldname === 'message') formData.message = value;
    });

    busboy.on('file', (...args: any[]) => {
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
      
      if (fieldname === 'files') {
        const chunks: Buffer[] = [];
        file.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });
        file.on('end', () => {
          const content = Buffer.concat(chunks);
          filesData.push({
            name: filename,
            type: mimetype,
            content: content,
          });
        });
      }
    });

    busboy.on('finish', () => {
      resolve({ formData, filesData });
    });

    busboy.on('error', (error: Error) => {
      reject(error);
    });

    // Convert NextRequest to a readable stream for Busboy
    const body = req.body;
    if (body) {
      const reader = body.getReader();
      const pump = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              busboy.end();
              break;
            }
            busboy.write(value);
          }
        } catch (error) {
          reject(error);
        }
      };
      pump();
    } else {
      busboy.end();
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let formData: FormData;
    let filesData: FileData[] = [];

    if (contentType.includes('multipart/form-data')) {
      const parsed = await parseMultipartFormData(req);
      formData = parsed.formData;
      filesData = parsed.filesData;
    } else {
      const body = await req.json();
      formData = {
        fullName: body.fullName || '',
        company: body.company || '',
        email: body.email || '',
        phone: body.phone || '',
        country: body.country || '',
        service: body.service || '',
        message: body.message || '',
      };
    }

    const requiredFields = ['fullName', 'email', 'phone', 'country', 'service', 'message'];
    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    if (!validateEmail(formData.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    formData.fullName = sanitizeInput(formData.fullName);
    formData.company = formData.company ? sanitizeInput(formData.company) : undefined;
    formData.email = sanitizeInput(formData.email);
    formData.phone = sanitizeInput(formData.phone);
    formData.country = sanitizeInput(formData.country);
    formData.service = sanitizeInput(formData.service);
    formData.message = sanitizeInput(formData.message);

    if (filesData.length > 0) {
      for (const file of filesData) {
        const validation = validateFile(file);
        if (!validation.valid) {
          return NextResponse.json(
            { error: validation.error },
            { status: 400 }
          );
        }
      }
    }

    const now = new Date();
    const submissionDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const submissionTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

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

    const adminEmailData = {
      from: 'Sublime Sports Apparel <noreply@sublimesportsapparel.net>',
      to: 'sales@sublimesportsapparel.net',
      replyTo: formData.email,
      subject: `New Quote Request – ${formData.fullName}`,
      html: adminEmailHtml,
      attachments: filesData.map(file => ({
        filename: file.name,
        content: file.content,
      })),
    };

    await resend.emails.send(adminEmailData);

    const customerEmailHtml = await render(
      CustomerEmail({
        fullName: formData.fullName,
      })
    );

    const customerEmailData = {
      from: 'Sublime Sports Apparel <noreply@sublimesportsapparel.net>',
      to: formData.email,
      subject: "We've Received Your Quote Request",
      html: customerEmailHtml,
    };

    await resend.emails.send(customerEmailData);

    return NextResponse.json(
      { success: true, message: 'Quote request submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
