import crypto from 'crypto';
import cookie from 'cookie';

const tokens = new Map<string, string>();

// Function to create a CSRF token

export function createCSRFToken(sessionId: string) {
    const token = crypto.randomBytes(32).toString('hex');
    tokens.set(sessionId, token);
    return token;
}

// Function to verify a CSRF token
export function verifyCSRFToken(sessionId: string, token: string): boolean {
    const validToken = tokens.get(sessionId);
    return validToken === token;
}

export function getSessionIdFromRequest(req: Request): string {
  const cookies = cookie.parse(req.headers.get('Cookie') || '');
  return cookies['session-id'] || 'anonymous'; 
}