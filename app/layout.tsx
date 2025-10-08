import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeScript from "../components/ThemeScript";
import ThemeToggle from "../components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = "Sameer Ahmed - Senior Full-Stack Engineer & AWS Architect";
const description =
  "Senior full-stack engineering leader delivering venture-backed platforms end-to-end with AWS architecture, product velocity, and durable team practices.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Sameer Ahmed",
  },
  description,
  openGraph: {
    title,
    description,
    url: "https://sameer.build",
    siteName: "Sameer Ahmed Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
