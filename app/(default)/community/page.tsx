// page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    window.location.href = "https://chat.whatsapp.com/IvpDqELtAfW5S2WElLgnlJ";
  }, []);

  return null; // No need to render anything as it will redirect immediately
}
