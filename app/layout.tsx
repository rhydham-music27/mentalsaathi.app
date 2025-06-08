import { Analytics } from '@vercel/analytics/react';
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import useAuthStore from "@/store/auth.store";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MentalSaathi - Your Mental Health Companion",
  icons: {
    icon: "./favicon.ico", // or '/favicon.png'
    shortcut: "./favicon.ico",
    apple: "./apple-touch-icon.png",
  },
  description:
    "A safe, anonymous mental health support platform for university students in India",
  keywords:
    "mental health, university students, India, peer support, anonymous, counseling",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const token = useAuthStore((state)=>state.token)
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        <link rel="icon" href="./favicon.ico" />
        {/* <link rel="icon" type="image/png" href="/favicon.png" /> */}
      </Head>
      <body className={inter.className}>
        <Toaster position="top-right" />
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
