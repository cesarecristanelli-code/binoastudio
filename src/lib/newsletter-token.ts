import crypto from "crypto";

const SECRET = process.env.NEWSLETTER_SECRET || "chiave-segreta-fallback-dev";

/**
 * Genera un token univoco e sicuro a partire dall'email
 */
export function generateSubscriberToken(email: string): string {
    return crypto
        .createHmac("sha256", SECRET)
        .update(email.toLowerCase().trim())
        .digest("hex");
}

/**
 * Verifica se un token fornito corrisponde a un'email
 */
export function verifySubscriberToken(email: string, token: string): boolean {
    const expectedToken = generateSubscriberToken(email);
    return crypto.timingSafeEqual(
        Buffer.from(token),
        Buffer.from(expectedToken)
    );
}