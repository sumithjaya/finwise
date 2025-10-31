import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderFooterWrapper from "@/components/HeaderFooterWrapper"; 
import LoadingWrapper from "@/components/ui/LoadingWrapper";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WEALFY | Financial Experts",
  description: "WEALFY is a platform for financial experts to share their knowledge and expertise with the community.",
   icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingWrapper>
          <HeaderFooterWrapper>{children}</HeaderFooterWrapper>
        </LoadingWrapper>
      </body>
    </html>
  );
}
   