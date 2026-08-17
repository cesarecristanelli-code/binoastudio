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

const translations = {
  it: {
    mainBody: "Il nuovo numero è online!",
    button: "Scarica la rivista",
    link: "Link alternativo:",
    unsubscribeText: "Non vuoi più ricevere le nostre email?",
    unsubscribeLink: "Disiscriviti dalla newsletter",
  },
  en: {
    mainBody: "The new issue is now online!",
    button: "Collect the issue",
    link: "Direct link:",
    unsubscribeText: "No longer wish to receive these emails?",
    unsubscribeLink: "Unsubscribe from newsletter",
  },
};

interface MagazineEmailProps {
  email: string;
  numero?: number;
  titolo?: string;
  pdfUrl?: string;
  lang: "it" | "en";
}

export const MagazineEmail = ({
  email = "cesare.cristanelli@gmail.com",
  numero = 1,
  titolo = "Manifesto",
  pdfUrl = "https://example.com/magazine.pdf",
  lang = "it",
}: MagazineEmailProps) => {
  const formattedIssue = numero < 10 ? `0${numero}` : `${numero}`;

  const t = translations[lang] || "it";

  const appUrl = process.env.PUBLIC_SITE_URL || "https://binoastudio.com";
  const unsubscribeLink = `${appUrl}/${lang}/unsubscribe?email=${encodeURIComponent(email)}`;

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
            Binòazine#{formattedIssue}
          </Heading>
          <Heading as="h2" style={subHeadingStyle} className="text-secondary">
            {titolo}
          </Heading>

          <Hr style={dividerStyle} className="hr-border" />

          {/* Testo centrale */}
          <Heading as="h3" style={bannerTextStyle} className="text-primary">
            {t.mainBody}
          </Heading>

          {/* Pulsante Call to Action */}
          <Section style={buttonWrapperStyle}>
            <Button style={buttonStyle} href={pdfUrl} className="btn-primary">
              {t.button}
            </Button>
          </Section>

          {/* Fallback Link per sicurezza */}
          <Text style={footerTextStyle} className="text-muted">
            {t.link}
            <br />
            <Link href={pdfUrl} style={linkStyle} className="link-color">
              {pdfUrl}
            </Link>
          </Text>

          <Hr style={dividerStyle} className="hr-border" />

          {/* Spazio Disiscrizione */}
          <Text style={unsubscribeTextStyle} className="text-muted">
            {t.unsubscribeText}{" "}
            <Link
              href={unsubscribeLink}
              style={unsubscribeLinkStyle}
              className="link-color"
            >
              {t.unsubscribeLink}
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

const bannerTextStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 600,
  textAlign: "center" as const,
  color: "#3C3833",
  margin: "28px 0 8px 0",
};

const buttonWrapperStyle: React.CSSProperties = {
  textAlign: "center" as const,
  margin: "24px 0 32px 0",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#3C3833",
  color: "#FFFFFF",
  padding: "14px 28px",
  borderRadius: "8px",
  fontWeight: 700,
  fontSize: "14px",
  textDecoration: "none",
  display: "inline-block",
  letterSpacing: "1px",
  textTransform: "uppercase",
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

const unsubscribeTextStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#8C857B",
  lineHeight: "1.5",
  textAlign: "center" as const,
  margin: "12px 0 0 0",
};

const unsubscribeLinkStyle = {
  color: "#3C3833", // Colore scuro del brand per farlo risaltare rispetto al testo del footer
  fontWeight: "600", // In risalto (Semibold)
  textDecoration: "underline", // Sottolineato
  cursor: "pointer",
};
