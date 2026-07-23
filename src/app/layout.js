import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "medtrack",
  description: "A tracker for life",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <nav>
             <Link href="/" className="text-teal-400 text-sm hover:underline">
              হোম
            </Link>
            <Link href="/medications" className="ml-4 text-teal-400 text-sm hover:underline">
              ওষুধ
            </Link>
            <Link href="/symptoms" className="ml-4 text-teal-400 text-sm hover:underline">
              লক্ষণ / নোট
            </Link>
          </nav>
        {children}
        </body>
    </html>
  );
}
