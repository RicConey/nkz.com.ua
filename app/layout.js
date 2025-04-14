"use client";
import { SessionProvider } from "next-auth/react";

export default function AdminLayout({ children }) {
  return (
      <html>
      <body>
      <SessionProvider>{children}</SessionProvider>
      </body>
      </html>
  );
}
