import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { PageLoader } from "@/components/PageLoader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "Photography Assistant",
  description: "Your AI photography advisor — camera settings, composition tips, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} ${sora.variable} h-full antialiased`}
        style={{ fontFamily: "var(--font-sora, var(--font-inter, sans-serif))" }}
      >
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
