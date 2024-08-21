import { createCSRFToken, getSessionIdFromRequest } from "@/lib/server/csrf";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, res: NextResponse) {
  if (req.method !== "GET") {
    return NextResponse.json("Method not allowed", { status: 405 });
  }
  const sessionId = getSessionIdFromRequest(req);
  const csrfToken = createCSRFToken(sessionId);
  if (!csrfToken) {
    return NextResponse.json(
      { message: "CSRF token is missing" },
      { status: 403 }
    );
  }
  return NextResponse.json({ csrfToken }, { status: 200 });
}
