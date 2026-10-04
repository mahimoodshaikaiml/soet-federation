import crypto from "crypto";

export const COOKIE_NAME = "soet_analytics_auth";
export const COOKIE_MAX_AGE = 8 * 60 * 60; // 8 hours in seconds

function getSecret(): string {
  return process.env.ANALYTICS_DASHBOARD_SECRET || "";
}

function getExpectedPassword(): string {
  return process.env.ANALYTICS_DASHBOARD_PASSWORD || "";
}

/**
 * Timing-safe comparison of the provided password against ANALYTICS_DASHBOARD_PASSWORD.
 */
export function verifyDashboardPassword(inputPassword: unknown): boolean {
  if (typeof inputPassword !== "string" || !inputPassword) {
    return false;
  }

  const expected = getExpectedPassword();
  if (!expected) {
    return false;
  }

  // SHA-256 hash both strings to ensure identical buffer lengths for timingSafeEqual
  const inputHash = crypto.createHash("sha256").update(inputPassword).digest();
  const expectedHash = crypto.createHash("sha256").update(expected).digest();

  return crypto.timingSafeEqual(inputHash, expectedHash);
}

/**
 * Creates an HMAC-SHA256 signed auth token.
 * Does NOT contain the password.
 */
export function createDashboardAuthToken(): string {
  const secret = getSecret();
  if (!secret) {
    throw new Error("Missing ANALYTICS_DASHBOARD_SECRET environment variable.");
  }

  const issuedAt = Date.now();
  const expiresAt = issuedAt + COOKIE_MAX_AGE * 1000;
  const payload = `${issuedAt}.${expiresAt}`;
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");

  return `${payload}.${signature}`;
}

/**
 * Verifies the HMAC-SHA256 signature and expiration of an auth token.
 */
export function verifyDashboardAuthToken(token: unknown): boolean {
  if (typeof token !== "string" || !token) {
    return false;
  }

  const secret = getSecret();
  if (!secret) {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  const [issuedAtStr, expiresAtStr, signature] = parts;
  const expiresAt = Number(expiresAtStr);

  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    return false;
  }

  const payload = `${issuedAtStr}.${expiresAtStr}`;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  const sigBuf = Buffer.from(signature, "hex");
  const expectedBuf = Buffer.from(expectedSignature, "hex");

  if (sigBuf.length !== expectedBuf.length || sigBuf.length === 0) {
    return false;
  }

  return crypto.timingSafeEqual(sigBuf, expectedBuf);
}
