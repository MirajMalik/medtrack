"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [medications, setMedications] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [time, setTime] = useState("");
  const [symptomText, setSymptomText] = useState("");

  useEffect(() => {
    const savedMeds = localStorage.getItem("medtrack-medications");
    const savedSymptoms = localStorage.getItem("medtrack-symptoms");

    if (savedMeds) {
      setMedications(JSON.parse(savedMeds));
    } else {
      setMedications([
        { id: 1, name: "Napa Extra", dose: "500mg", time: "সকাল ৮টা", taken: false },
        { id: 2, name: "Seclo", dose: "20mg", time: "সকাল ৮টা", taken: false },
        { id: 3, name: "Vitamin D3", dose: "1 tablet", time: "রাত ৯টা", taken: false },
      ]);
    }

    if (savedSymptoms) {
      setSymptoms(JSON.parse(savedSymptoms));
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("medtrack-medications", JSON.stringify(medications));
    }
  }, [medications, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("medtrack-symptoms", JSON.stringify(symptoms));
    }
  }, [symptoms, loaded]);

  function toggleTaken(id) {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  }

  function handleAddMedication(e) {
    e.preventDefault();
    if (name.trim() === "") return;

    const newMed = {
      id: Date.now(),
      name: name,
      dose: dose,
      time: time,
      taken: false,
    };

    setMedications([...medications, newMed]);
    setName("");
    setDose("");
    setTime("");
  }

  function handleDeleteMedication(id) {
    setMedications(medications.filter((med) => med.id !== id));
  }

  function handleAddSymptom(e) {
    e.preventDefault();
    if (symptomText.trim() === "") return;

    const newSymptom = {
      id: Date.now(),
      text: symptomText,
      date: new Date().toLocaleDateString("bn-BD"),
    };

    setSymptoms([newSymptom, ...symptoms]);
    setSymptomText("");
  }

  function handleDeleteSymptom(id) {
    setSymptoms(symptoms.filter((s) => s.id !== id));
  }

  const takenCount = medications.filter((m) => m.taken).length;
  const sortedMedications = [...medications].sort((a, b) => a.taken - b.taken);

  return (
    <main className="min-h-screen bg-slate-900 py-10 px-4">
      <div className="max-w-md mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-teal-100 mb-1">MedTrack</h1>
          <p className="text-teal-500 text-sm">
            {medications.length > 0
              ? `${takenCount} / ${medications.length} ওষুধ খাওয়া হয়েছে আজ`
              : "আজকের ওষুধ ও লক্ষণের হিসাব"}
          </p>
        </div>

        <form
          onSubmit={handleAddMedication}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex flex-col gap-2"
        >
          <input
            type="text"
            placeholder="ওষুধের নাম (যেমন: Napa)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="ডোজ (500mg)"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="সময় (রাত ৯টা)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="mt-1 bg-teal-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition"
          >
            + ওষুধ যোগ করো
          </button>
        </form>

        <div className="flex flex-col gap-2 mb-10">
          {sortedMedications.map((med) => (
            <div
              key={med.id}
              className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                med.taken
                  ? "bg-teal-50 border-teal-200"
                  : "bg-white border-slate-200"
              }`}
            >
              <input
                type="checkbox"
                checked={med.taken}
                onChange={() => toggleTaken(med.id)}
                className="w-5 h-5 accent-teal-600"
              />
              <div className="flex-1">
                <h3
                  className={`font-medium text-slate-800 ${
                    med.taken ? "line-through opacity-60" : ""
                  }`}
                >
                  {med.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {med.dose} {med.dose && med.time ? "•" : ""} {med.time}
                </p>
              </div>
              <button
                onClick={() => handleDeleteMedication(med.id)}
                className="text-xs text-red-900 hover:underline"
              >
                মুছুন
              </button>
            </div>
          ))}
          {medications.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-4">
              কোনো ওষুধ যোগ করা হয়নি
            </p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-bold text-teal-100 mb-1">লক্ষণ / নোট</h2>
          <p className="text-xs text-teal-500 mb-3">
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
}