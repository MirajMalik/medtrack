"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "হোম" },
    { href: "/medications", label: "ওষুধ" },
    { href: "/symptoms", label: "লক্ষণ" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white text-sm font-bold">
            +
          </span>
          <span className="font-bold text-slate-800">MedTrack</span>
        </Link>

        <div className="flex gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-teal-600 text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}