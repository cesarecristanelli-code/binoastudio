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
    preview: "Benvenuto in Binòazine - Il tuo primo numero ti aspetta!",
    welcome: "Gentile",
    thanks: "Grazie per l'iscrizione.",
    mainBody:
      "Riceverà i nuovi numeri e gli ultimi aggiornamenti direttamente nella sua casella di posta.",
    button: "Scarica l'ultimo numero",
    unsubscription: "Iscrizione non richiesta? Disiscriviti",
  },
  en: {
    preview: "Welcome to Binòazine - Your first issue awaits!",
    welcome: "Dear",
    thanks: "Thank you for subscribing.",
    mainBody: "You'll receive new issues and updates directly in your inbox.",
    button: "Download the latest issue",
    unsubscription: "Not you? Unsubscribe",
  },
};

interface WelcomeNewsletterEmailProps {
  nome: string;
  email: string;
  pdfUrl?: string;
  lang: "it" | "en";
}

export const WelcomeEmail = ({
  nome = "Cesare",
  email = "cesare.cristanelli@gmail.com",
  pdfUrl = "https://hjn88qj8d6.ufs.sh/f/03v8dNmaKnZ62dtOg47Sqv4Cpk5YwjXyHsZKUQ3NWgL9mteI",
  lang = "it",
}: WelcomeNewsletterEmailProps) => {
  const t = translations[lang] || translations.it;

  const appUrl = process.env.PUBLIC_SITE_URL || "https://binoastudio.com";
  const unsubscribeLink = `${appUrl}/${lang}/unsubscribe?email=${encodeURIComponent(email)}`;

  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        {/* Supporto Dark Mode per client di posta compatibili */}
        <style>{`
          @media (prefers-color-scheme: dark) {
            .bg-main { background-color: #11100e !important; }
            .bg-container { background-color: #1f1d1a !important; border: 1px solid #3c3833 !important; }
            .text-primary { color: #f5f4f0 !important; }
            .text-muted { color: #a39e93 !important; }
            .btn-primary { background-color: #f5f4f0 !important; color: #11100e !important; }
            .hr-border { border-color: #3c3833 !important; }
          }
        `}</style>
      </Head>
      <Preview>{t.preview}</Preview>
      <Body style={main} className="bg-main">
        <Container style={container} className="bg-container">
          {/* Titolo Brand al posto del logo */}
          <Heading style={h1} className="text-primary">
            BINÒAZINE
          </Heading>

          <Text style={text} className="text-primary">
            {t.welcome} <strong>{nome}</strong>,
          </Text>

          <Text style={text} className="text-primary">
            {t.thanks}
          </Text>

          <Text style={text} className="text-primary">
            {t.mainBody}
          </Text>

          {pdfUrl && (
            <Section style={btnContainer}>
              <Button style={button} href={pdfUrl} className="btn-primary">
                {t.button}
              </Button>
            </Section>
          )}

          <Hr style={hr} className="hr-border" />

          <Text style={footer} className="text-muted">
            {t.unsubscription}{" "}
            <Link
              href={unsubscribeLink}
              style={unsubscribeLinkStyle}
              className="link-color"
            >
              {lang === "it" ? "qui." : "here."}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

// Stili base per Light Mode (Fallback)
const main = {
  backgroundColor: "#f5f4f0",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: "40px 0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 32px",
  maxWidth: "560px",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
};

const h1 = {
  color: "#3C3833",
  fontSize: "26px",
  fontWeight: "800",
  textAlign: "center" as const,
  letterSpacing: "3px",
  margin: "0 0 28px 0",
};

const text = {
  color: "#3C3833",
  fontSize: "15px",
  lineHeight: "24px",
  textAlign: "left" as const,
  margin: "0 0 16px 0",
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "32px 0 24px 0",
};

const unsubscribeLinkStyle = {
  color: "#3C3833", // Colore scuro del brand per farlo risaltare rispetto al testo del footer
  fontWeight: "600", // In risalto (Semibold)
  textDecoration: "underline", // Sottolineato
  cursor: "pointer",
};

const button = {
  backgroundColor: "#3C3833",
  borderRadius: "50px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 32px",
};

const hr = {
  borderColor: "#e6e4df",
  margin: "32px 0 20px 0",
};

const footer = {
  color: "#8a857c",
  fontSize: "12px",
  lineHeight: "18px",
  textAlign: "center" as const,
  margin: "0",
};
