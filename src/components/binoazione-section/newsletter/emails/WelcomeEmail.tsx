import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Button,
} from "@react-email/components";
import * as React from "react";

interface WelcomeNewsletterEmailProps {
  nome: string;
  pdfUrl?: string;
}

export const WelcomeEmail = ({ nome, pdfUrl }: WelcomeNewsletterEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Benvenuto in Binòazine - Il tuo primo numero ti aspetta!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>BINOAZINE</Heading>
          <Text style={text}>Ciao {nome},</Text>
          <Text style={text}>
            Grazie per esserti iscritto alla newsletter di **Binòazine**, la
            rivista di riferimento per l&apos;immobiliare.
          </Text>
          <Text style={text}>
            Da oggi riceverai i nuovi numeri direttamente nella tua casella di
            posta.
          </Text>
          {pdfUrl && (
            <Section style={btnContainer}>
              <Button style={button} href={pdfUrl}>
                Scarica l&apos;ultimo numero (PDF)
              </Button>
            </Section>
          )}
          <Text style={footer}>
            Se non hai richiesto tu questa iscrizione, puoi ignorare questa
            email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

// Stili inline per il client di posta
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  marginBottom: "64px",
  maxWidth: "600px",
  borderRadius: "8px",
};

const h1 = {
  color: "#3C3833",
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center" as const,
  letterSpacing: "2px",
};

const text = {
  color: "rgb(250,248,245)",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#3C3833",
  borderRadius: "50px",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 30px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginTop: "40px",
};
