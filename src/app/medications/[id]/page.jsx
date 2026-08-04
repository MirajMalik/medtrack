import connectDB from "@/lib/db";
import Medication from "@/lib/models/Medication";
import Link from "next/link";

export default async function MedicationDetailPage({ params }) {
  const { id } = await params;

  await connectDB();
  const medication = await Medication.findById(id);

  if (!medication) {
    return <p className="text-center py-10">ওষুধটি পাওয়া যায়নি</p>;
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-md mx-auto">
        <Link href="/medications" className="text-teal-600 text-sm">
          ← ওষুধের তালিকায় ফিরে যাও
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-4">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            {medication.name}
          </h1>
          <div className="flex flex-col gap-2 text-slate-600">
            <p> ডোজ: {medication.dose}</p>
            <p> সময়: {medication.time}</p>
            <p>
               অবস্থা:{" "}
              {medication.taken ? "খাওয়া হয়েছে" : "এখনো খাওয়া হয়নি"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}