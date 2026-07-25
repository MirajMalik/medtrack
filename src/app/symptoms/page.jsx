"use client";
import React from 'react';
import { useState, useEffect } from "react";

const SymptomsPage = () => {
    
  const [symptoms, setSymptoms] = useState([]);
  const [symptomText, setSymptomText] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("medtrack-symptoms", JSON.stringify(symptoms));
    }
  }, [symptoms, loaded]);

 
  async function handleAddSymptom(e) {
    e.preventDefault();
    if (symptomText.trim() === "") return;

    const newSymptom = { 
      text: symptomText,
    };

    setLoaded(true);

    const response = await fetch("/api/symptoms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSymptom),
      });

    const result = await response.json();

    setSymptoms([result, ...symptoms]);
    setSymptomText("");
  }

  async function handleDeleteSymptom(id) {
    
    const response = await fetch(`/api/symptoms/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    });
    
    const result = await response.json();
    setSymptoms(symptoms.filter((s) => s.id !== id));
    console.log(result.message || "লক্ষণ মুছে ফেলা হয়েছে");
  }


    return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-md mx-auto">
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">লক্ষণ / নোট</h2>
          <p className="text-xs text-slate-500 mb-3">
            ডাক্তারকে দেখানোর জন্য লিখে রাখো
          </p>

          <form onSubmit={handleAddSymptom} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="যেমন: মাথা ব্যথা করছে"
              value={symptomText}
              onChange={(e) => setSymptomText(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-teal-800 text-white text-sm font-medium hover:bg-slate-900 transition"
            >
              যোগ করো
            </button>
          </form>

          <div className="flex flex-col gap-2">
            {symptoms.map((s) => (
              <div
                key={s.id}
                className="flex justify-between items-center bg-white border border-slate-200 rounded-lg px-3 py-2"
              >
                <div>
                  <p className="text-sm text-slate-800">{s.text}</p>
                  <p className="text-xs text-slate-400">{s.date}</p>
                </div>
                <button
                  onClick={() => handleDeleteSymptom(s.id)}
                  className="text-xs text-red-900 hover:underline"
                >
                  মুছুন
                </button>
              </div>
            ))}
            {symptoms.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">
                কোনো লক্ষণ যোগ করা হয়নি
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SymptomsPage;