import {NextResponse} from 'next/server';
import { symptoms } from '@/lib/data';
import connectDB from "@/lib/db";
import Symptom from "@/lib/models/Symptom";

export async function DELETE(request, { params }) { 
  await connectDB();
  const { id }  =  await params;

  const deletedSymptom = await Symptom.findByIdAndDelete(id);

  if (!deletedSymptom) {
    return NextResponse.json({ message: "লক্ষণ পাওয়া যায়নি" },{ status: 404 });
  }
  return NextResponse.json({ message: "লক্ষণ মুছে ফেলা হয়েছে" });
}