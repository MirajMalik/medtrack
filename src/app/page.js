"use client";

import { useState } from "react";

export default function Home() {
  const [medications, setMedications] = useState([
    { id: 1, name: "Napa Extra", dose: "500mg", time: "সকাল ৮টা", taken: false },
    { id: 2, name: "Seclo", dose: "20mg", time: "সকাল ৮টা", taken: false },
    { id: 3, name: "Vitamin D3", dose: "1 tablet", time: "রাত ৯টা", taken: false },
  ]);

  const [symptoms, setSymptoms] = useState([]);

  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [time, setTime] = useState("");
  const [symptomText, setSymptomText] = useState("");

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

  return (
    <main style={{ maxWidth: "500px", margin: "40px auto", padding: "0 20px" }}>
      <h1>MedTrack</h1>
      <p>আজকের ওষুধের তালিকা</p>

      <form
        onSubmit={handleAddMedication}
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <input
          type="text"
          placeholder="ওষুধের নাম (যেমন: Napa)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          placeholder="ডোজ (যেমন: 500mg)"
          value={dose}
          onChange={(e) => setDose(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          placeholder="সময় (যেমন: রাত ৯টা)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          ওষুধ যোগ করো
        </button>
      </form>

      <div style={{ marginBottom: "30px" }}>
        {medications.map((med) => (
          <div
            key={med.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: med.taken ? "#070e4d" : "black",
            }}
          >
            <input
              type="checkbox"
              checked={med.taken}
              onChange={() => toggleTaken(med.id)}
              style={{ width: "20px", height: "20px" }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, textDecoration: med.taken ? "line-through" : "none" }}>
                {med.name}
              </h3>
              <p style={{ margin: 0 }}>ডোজ: {med.dose}</p>
              <p style={{ margin: 0 }}>সময়: {med.time}</p>
            </div>
            <button
              onClick={() => handleDeleteMedication(med.id)}
              style={{
                border: "none",
                background: "none",
                color: "#dc2626",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              মুছে ফেলো
            </button>
          </div>
        ))}
      </div>

      <h2>লক্ষণ / নোট</h2>
      <p>শরীরে কী সমস্যা হচ্ছে সেটা লিখে রাখো, ডাক্তারকে দেখানোর জন্য</p>

      <form
        onSubmit={handleAddSymptom}
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="যেমন: মাথা ব্যথা করছে"
          value={symptomText}
          onChange={(e) => setSymptomText(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#16a34a",
            color: "white",
            cursor: "pointer",
          }}
        >
          যোগ করো
        </button>
      </form>

      <div>
        {symptoms.map((s) => (
          <div
            key={s.id}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ margin: 0 }}>{s.text}</p>
              <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>{s.date}</p>
            </div>
            <button
              onClick={() => handleDeleteSymptom(s.id)}
              style={{
                border: "none",
                background: "none",
                color: "#dc2626",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              মুছে ফেলো
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}