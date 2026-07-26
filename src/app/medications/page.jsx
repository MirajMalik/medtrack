"use client";
import { useState, useEffect } from "react";

export default function MedicationsPage() {
    const [medications, setMedications] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [name, setName] = useState("");
    const [dose, setDose] = useState("");
    const [time, setTime] = useState("");


  useEffect(() => {
    fetch("/api/medications")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched medications:", data);
        setMedications(data);
        setLoaded(true);
      });
  }, []);



  async function handleAddMedication(e) {
        e.preventDefault();

        if (name.trim() === "") return;

        const newMed = {
             name,
             dose,
             time,
        };
        
        setLoaded(true);

        const response = await fetch("/api/medications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMed),
      });

      const result = await response.json();

      if (!response.ok) {
          throw new Error(result.message || "Failed to add medication");
      }

      setMedications([...medications, result]);
      alert(result.message || "ওষুধ যোগ করা হয়েছে");
      
      setName("");
      setDose("");
      setTime("");

      setLoaded(false);
  };
  

  function toggleTaken(id) {
    setMedications(
      medications.map((med) =>
        med._id === id ? { ...med, taken: !med.taken } : med
      )
    );
  }

  async function handleDeleteMedication(id) {
    
    const response = await fetch(`/api/medications/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    });
    
    const result = await response.json();
    setMedications(medications.filter((med) => med._id !== id));
    console.log(result.message || "ওষুধ মুছে ফেলা হয়েছে");
  }



  const takenCount = medications.filter((m) => m.taken).length;
  const sortedMedications = [...medications].sort((a, b) => a.taken - b.taken);

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-md mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-1">MedTrack</h1>
          <p className="text-slate-500 text-sm">
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
            name="name"
            type="text"
            placeholder="ওষুধের নাম (যেমন: Napa)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex gap-2">
            <input
              name="dose"
              type="text"
              placeholder="ডোজ (500mg)"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              name="time"
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
              key={med.name}
              className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                med.taken
                  ? "bg-slate-50 border-teal-200"
                  : "bg-white border-slate-200"
              }`}
            >
              <input
                type="checkbox"
                checked={med.taken}
                onChange={() => toggleTaken(med._id)}
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
                onClick={() => handleDeleteMedication(med._id)}
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
      </div>
    </main>
  );
}