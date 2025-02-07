import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const fireCode = Fira_Code({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fireCode.variable} ${fireCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
