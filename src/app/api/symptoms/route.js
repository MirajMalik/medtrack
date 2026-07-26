import {NextResponse} from "next/server";
import { symptoms } from "@/lib/data";
import connectDB from "@/lib/db";
import Symptom from "@/lib/models/Symptom";

export const dynamic = "force-dynamic";

export async function GET() {       
    await connectDB();
    const symptoms = await Symptom.find({});
    return NextResponse.json(symptoms);
};

export async function POST(request) {
    const body = await request.json();

    const { text } = body;
    
    if (!text) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const newSymptom = {
        text: text,
        date: new Date().toLocaleDateString("bn-BD"),

    };
    await connectDB();
    const createdSymptom = await Symptom.create(newSymptom);
    return NextResponse.json(createdSymptom);     
       
};