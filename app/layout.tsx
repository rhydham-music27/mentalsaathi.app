
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import useAuthStore from "@/store/auth.store";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MentalSaathi - Your Mental Health Companion",
  description:
    "A safe, anonymous mental health support platform for university students in India",
  keywords:
    "mental health, university students, India, peer support, anonymous, counseling",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const token = useAuthStore((state)=>state.token)
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
