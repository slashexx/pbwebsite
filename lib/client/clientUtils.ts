import { NextResponse } from "next/server";

export const getErrorMessage = (error: unknown): string => {
    let message: string;
    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === "object" && "message" in error) {
      message = String(error.message);
    } else if (typeof error === "string") {
      message = error;
    } else {
    }
    message = "Something went wrong! Try refreshing and submitting again.";
    return message;
  };
  
  export async function fetchCsrfToken() {
    try {
        const response = await fetch('/api/csrf-token', {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            return NextResponse.json({message: 'Failed to fetch CSRF token'});
        }

        const data = await response.json();
        return data.csrfToken;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        return null;
    }
}