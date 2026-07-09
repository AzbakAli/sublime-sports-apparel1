import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface CustomerEmailProps {
  fullName: string;
}

export default function CustomerEmail({ fullName }: CustomerEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>We've Received Your Quote Request</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>We've Received Your Quote Request</Heading>
          
          <Text style={greeting}>Dear {fullName},</Text>
          
          <Text style={text}>
            Thank you for contacting <strong>Custom Sublimated Sports Apparel (CSSA)</strong>.
          </Text>
          
          <Text style={text}>
            Your quote request has been received successfully. Our team is currently reviewing your request and will contact you shortly with a detailed quotation.
          </Text>
          
          <Section style={infoSection}>
            <Text style={infoText}>
              If you have any questions in the meantime, please don't hesitate to reach out to us at:
            </Text>
            <Text style={emailText}>sales@sublimesportsapparel.net</Text>
          </Section>
          
          <Hr style={hr} />
          
          <Text style={text}>
            Thank you for choosing Custom Sublimated Sports Apparel. We look forward to working with you!
          </Text>
          
          <Section style={footer}>
            <Text style={footerText}>
              Custom Sublimated Sports Apparel (CSSA)
            </Text>
            <Text style={footerText}>
              Premium Quality Custom Sportswear
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
  marginBottom: "24px",
  textAlign: "left" as const,
};

const greeting = {
  color: "#1a1a1a",
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "16px",
};

const text = {
  color: "#4a4a4a",
  fontSize: "16px",
  lineHeight: "1.6",
  marginBottom: "16px",
};

const infoSection = {
  backgroundColor: "#f9f9f9",
  padding: "20px",
  borderRadius: "8px",
  marginTop: "24px",
  marginBottom: "24px",
};

const infoText = {
  color: "#4a4a4a",
  fontSize: "16px",
  lineHeight: "1.6",
  marginBottom: "8px",
};

const emailText = {
  color: "#D4AF37",
  fontSize: "16px",
  fontWeight: "bold",
};

const hr = {
  border: "none",
  borderTop: "1px solid #e0e0e0",
  margin: "24px 0",
};

const footer = {
  marginTop: "32px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#999999",
  fontSize: "14px",
  lineHeight: "1.5",
  marginBottom: "8px",
};
