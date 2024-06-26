import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/auth/auth-context-provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FE Developer Test - Product Management Dashboard",
  description: "Frontend Developer Test - Product Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster richColors />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
