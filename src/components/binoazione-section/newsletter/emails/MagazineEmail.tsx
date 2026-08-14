import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface MagazineEmailProps {
  numero?: number;
  titolo?: string;
  pdfUrl?: string;
}

export const MagazineEmail = ({
  numero = 1,
  titolo = "Il nuovo numero dell'immobiliare",
  pdfUrl = "https://example.com/magazine.pdf",
}: MagazineEmailProps) => {
  const formattedIssue = numero < 10 ? `0${numero}` : `${numero}`;

  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        {/* Supporto Dark Mode */}
        <style>{`
          @media (prefers-color-scheme: dark) {
            .bg-main { background-color: #11100e !important; }
            .bg-container { background-color: #1f1d1a !important; border: 1px solid #3c3833 !important; }
            .text-primary { color: #f5f4f0 !important; }
            .text-secondary { color: #d1cdcd !important; }
            .text-muted { color: #a39e93 !important; }
            .btn-primary { background-color: #f5f4f0 !important; color: #11100e !important; }
            .hr-border { border-color: #3c3833 !important; }
            .link-color { color: #f5f4f0 !important; }
          }
        `}</style>
      </Head>
      <Preview>
        Binòazine Issue {formattedIssue}: {titolo}
      </Preview>
      <Body style={mainContainerStyle} className="bg-main">
        <Container style={contentCardStyle} className="bg-container">
          {/* Header / Brand */}
          <Text style={brandTagStyle} className="text-muted">
            Binòazine — Newsletter
          </Text>

          {/* Titolo e Numero */}
          <Heading style={headingStyle} className="text-primary">
            Binòazine {formattedIssue}
          </Heading>
          <Heading as="h2" style={subHeadingStyle} className="text-secondary">
            {titolo}
          </Heading>

          <Hr style={dividerStyle} className="hr-border" />

          {/* Messaggio principale */}
          <Text style={paragraphStyle} className="text-primary">
            È disponibile il nuovo numero della nostra rivista!
          </Text>
          <Text style={paragraphStyle} className="text-primary">
            Puoi scaricare il file PDF completo direttamente sul tuo dispositivo
            cliccando sul pulsante qui sotto:
          </Text>

          {/* Pulsante Download Diretto */}
          <Section style={buttonWrapperStyle}>
            <Button style={buttonStyle} href={pdfUrl} className="btn-primary">
              Scarica il PDF (Binòazine {formattedIssue})
            </Button>
          </Section>

          {/* Fallback Link per sicurezza */}
          <Text style={footerTextStyle} className="text-muted">
            Se il pulsante non funziona, copia e incolla questo link nel tuo
            browser:
            <br />
            <Link href={pdfUrl} style={linkStyle} className="link-color">
              {pdfUrl}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default MagazineEmail;

// --- Stili inline per i client di posta ---

const mainContainerStyle: React.CSSProperties = {
  backgroundColor: "#F5F4F0",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: "40px 20px",
};

const contentCardStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  padding: "36px 32px",
  maxWidth: "560px",
  margin: "0 auto",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
};

const brandTagStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: "#8C857B",
  margin: "0 0 16px 0",
};

const headingStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "1px",
  margin: "0 0 8px 0",
  color: "#3C3833",
};

const subHeadingStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 400,
  margin: "0 0 24px 0",
  color: "#5A554E",
};

const dividerStyle: React.CSSProperties = {
  borderColor: "#EAE8E3",
  margin: "24px 0",
};

const paragraphStyle: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#3C3833",
  margin: "0 0 16px 0",
};

const buttonWrapperStyle: React.CSSProperties = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#3C3833",
  color: "#FFFFFF",
  padding: "14px 28px",
  borderRadius: "8px",
  fontWeight: 600,
  fontSize: "14px",
  textDecoration: "none",
  display: "inline-block",
  letterSpacing: "0.5px",
};

const footerTextStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#8C857B",
  lineHeight: "1.5",
  margin: "32px 0 0 0",
  borderTop: "1px solid #EAE8E3",
  paddingTop: "20px",
};

const linkStyle: React.CSSProperties = {
  color: "#3C3833",
  wordBreak: "break-all",
};
