import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Find My Hotel Admin",
  description: "Created By Nishant Chaudhary",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="mean">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
