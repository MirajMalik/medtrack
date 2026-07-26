import {NextResponse} from 'next/server';
import { medications } from '@/lib/data';
import connectDB from "@/lib/db";
import Medication from "@/lib/models/Medication";

export async function DELETE(request, { params }) { 
  await connectDB();
  const { id }  =  await params;

  const deletedMedication = await Medication.findByIdAndDelete(id);

  if (!deletedMedication) {
    return NextResponse.json(
      { message: "ওষুধ পাওয়া যায়নি" },
      { status: 404 }
    );
  }
  return NextResponse.json({ message: "ওষুধ মুছে ফেলা হয়েছে" });
}