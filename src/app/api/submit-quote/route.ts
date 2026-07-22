import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import AdminEmail from '@/emails/AdminEmail';
import CustomerEmail from '@/emails/CustomerEmail';

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

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let formData: FormData;
    let filesData: FileData[] = [];

    if (contentType.includes('multipart/form-data')) {
      const body = await req.formData();
      formData = {
        fullName: body.get('fullName') as string || '',
        company: body.get('company') as string || undefined,
        email: body.get('email') as string || '',
        phone: body.get('phone') as string || undefined,
        country: body.get('country') as string || undefined,
        service: body.get('service') as string || '',
        message: body.get('message') as string || '',
      };

      // Handle file uploads
      for (const [key, value] of body.entries()) {
        if (key === 'files' && value instanceof File) {
          const arrayBuffer = await value.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          filesData.push({
            name: value.name,
            type: value.type,
            content: buffer,
          });
        }
      }
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

    const requiredFields = ['fullName', 'email', 'service', 'message'];
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
    formData.phone = formData.phone ? sanitizeInput(formData.phone) : undefined;
    formData.country = formData.country ? sanitizeInput(formData.country) : undefined;
    formData.service = sanitizeInput(formData.service);
    formData.message = sanitizeInput(formData.message);

    // Validate files if present
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
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
