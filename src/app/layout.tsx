// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { SpaceProvider } from "@/contexts/SpaceContext";
import { GoogleOAuthProvider } from "@/components/GoogleOAuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jaydai - Intelligent Prompt Management",
  description: "Transform how you work with AI. Organize, reuse, and optimize your prompts with our intelligent platform.",
  keywords: ["AI", "prompts", "management", "templates", "productivity"],
  authors: [{ name: "Jaydai Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#8b5cf6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider>
          <AuthProvider>
            <SpaceProvider>
              {children}
            </SpaceProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}