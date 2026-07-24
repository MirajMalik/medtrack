"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [tip, setTip] = useState("");

  useEffect(() => {
    async function fetchTip() {
      try {
        const response = await fetch("/api/tips");
        const data = await response.json();
        setTip(data.tip);
      } catch (error) {
        console.error("Error fetching tip:", error);
      }
    }

    fetchTip();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">MedTrack</h1>
        <p className="text-slate-500 text-sm mb-8">
          তোমার ওষুধ ও লক্ষণ ট্র্যাক করার সহজ উপায়
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/medications"
            className="bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition"
          >
            ওষুধের তালিকা দেখো
          </Link>
          <Link
            href="/symptoms"
            className="bg-slate-800 text-white py-3 rounded-xl font-medium hover:bg-slate-900 transition"
          >
            লক্ষণ যোগ করো
          </Link>
        </div>
        {tip && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-6 text-sm text-amber-800">
              💡 {tip}
            </div>
      )}
      </div>
    </main>
  );
}