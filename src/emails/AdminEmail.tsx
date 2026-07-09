import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from "@react-email/components";

interface AdminEmailProps {
  fullName: string;
  company?: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  message: string;
  hasAttachment: boolean;
  submissionDate: string;
  submissionTime: string;
}

export default function AdminEmail({
  fullName,
  company,
  email,
  phone,
  country,
  service,
  message,
  hasAttachment,
  submissionDate,
  submissionTime,
}: AdminEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Quote Request – {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Quote Request</Heading>
          <Text style={text}>You have received a new quote request from your website.</Text>
          
          <Section style={section}>
            <Heading style={h2}>Customer Information</Heading>
            
            <Text style={label}>Full Name</Text>
            <Text style={value}>{fullName}</Text>
            
            {company && (
              <>
                <Text style={label}>Company / Team Name</Text>
                <Text style={value}>{company}</Text>
              </>
            )}
            
            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>
            
            <Text style={label}>Phone</Text>
            <Text style={value}>{phone}</Text>
            
            <Text style={label}>Country</Text>
            <Text style={value}>{country}</Text>
            
            <Text style={label}>Service Required</Text>
            <Text style={value}>{service}</Text>
            
            <Text style={label}>Message</Text>
            <Text style={messageText}>{message}</Text>
            
            {hasAttachment && (
              <Text style={attachmentText}>📎 A design file has been attached to this email.</Text>
            )}
            
            <Hr style={hr} />
            
            <Text style={metaLabel}>Submission Date</Text>
            <Text style={metaValue}>{submissionDate}</Text>
            
            <Text style={metaLabel}>Submission Time</Text>
            <Text style={metaValue}>{submissionTime}</Text>
          </Section>
          
          <Section style={footer}>
            <Text style={footerText}>
              This email was sent from the Sublime Sports Apparel quote form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
  color: "#1a1a1a",
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "0",
  marginBottom: "20px",
  textAlign: "left" as const,
};

const h2 = {
  color: "#D4AF37",
  fontSize: "20px",
  fontWeight: "bold",
  marginTop: "0",
  marginBottom: "16px",
  textAlign: "left" as const,
};

const text = {
  color: "#4a4a4a",
  fontSize: "16px",
  lineHeight: "1.6",
  marginBottom: "24px",
};

const section = {
  backgroundColor: "#f9f9f9",
  padding: "24px",
  borderRadius: "8px",
  marginTop: "24px",
};

const label = {
  color: "#666666",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  marginTop: "16px",
  marginBottom: "4px",
};

const value = {
  color: "#1a1a1a",
  fontSize: "16px",
  lineHeight: "1.5",
  marginBottom: "8px",
};

const messageText = {
  color: "#1a1a1a",
  fontSize: "16px",
  lineHeight: "1.6",
  whiteSpace: "pre-wrap" as const,
};

const attachmentText = {
  color: "#D4AF37",
  fontSize: "14px",
  fontWeight: "bold",
  marginTop: "16px",
};

const hr = {
  border: "none",
  borderTop: "1px solid #e0e0e0",
  margin: "24px 0",
};

const metaLabel = {
  color: "#666666",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  marginTop: "12px",
  marginBottom: "4px",
};

const metaValue = {
  color: "#4a4a4a",
  fontSize: "14px",
  marginBottom: "4px",
};

const footer = {
  marginTop: "32px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#999999",
  fontSize: "12px",
  lineHeight: "1.5",
};
