import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pattern Playground",
  description: "Visual tool for creating beautiful, customizable patterns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
