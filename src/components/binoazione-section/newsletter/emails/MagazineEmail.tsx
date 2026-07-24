// src/emails/MagazineEmail.tsx
import * as React from "react";

interface MagazineEmailProps {
  numero: number;
  titolo: string;
  pdfUrl: string;
}

export const MagazineEmail = ({
  numero,
  titolo,
  pdfUrl,
}: MagazineEmailProps) => {
  const formattedIssue = numero < 10 ? `0${numero}` : `${numero}`;

  return (
    <div style={mainContainerStyle}>
      <div style={contentCardStyle}>
        {/* Header / Brand */}
        <p style={brandTagStyle}>Binòazine — Newsletter</p>

        {/* Titolo e Numero */}
        <h1 style={headingStyle}>Issue {formattedIssue}</h1>
        <h2 style={subHeadingStyle}>{titolo}</h2>

        <hr style={dividerStyle} />

        {/* Messaggio principale */}
        <p style={paragraphStyle}>
          È disponibile il nuovo numero della nostra rivista!
        </p>
        <p style={paragraphStyle}>
          Puoi scaricare il file PDF completo direttamente sul tuo dispositivo
          cliccando sul pulsante qui sotto:
        </p>

        {/* Pulsante Download Diretto */}
        <div style={buttonWrapperStyle}>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyle}
          >
            Scarica il PDF (Issue {formattedIssue})
          </a>
        </div>

        {/* Fallback Link per sicurezza */}
        <p style={footerTextStyle}>
          Se il pulsante non funziona, copia e incolla questo link nel tuo
          browser:
          <br />
          <a href={pdfUrl} style={linkStyle}>
            {pdfUrl}
          </a>
        </p>
      </div>
    </div>
  );
};

// --- Stili inline ottimizzati per i client di posta ---

const mainContainerStyle: React.CSSProperties = {
  backgroundColor: "#F5F4F0",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: "40px 20px",
  color: "#3C3833",
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
  marginBottom: "16px",
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
  border: "none",
  borderTop: "1px solid #EAE8E3",
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
  marginTop: "32px",
  borderTop: "1px solid #EAE8E3",
  paddingTop: "20px",
};

const linkStyle: React.CSSProperties = {
  color: "#3C3833",
  wordBreak: "break-all",
};
