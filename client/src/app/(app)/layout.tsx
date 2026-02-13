import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
// TRPC provider removed — project no longer uses tRPC
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";


export const metadata: Metadata = {
  title: "Rental app",
  description: "Created by Niraj",
};

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={`${dmSans.className} antialiased`}>
        <NuqsAdapter>
          {children}
          <Toaster />
        </NuqsAdapter>
      </body>
    </html>
  );
}
