import {NextResponse} from "next/server";
import connectDB from "@/lib/db";
import Medication from "@/lib/models/Medication";


export const dynamic = "force-dynamic";   // dont cache the data, always fetch the latest data from the server

export async function GET() {       
    await connectDB();
    const medications = await Medication.find({});
    return NextResponse.json(medications);
};

export async function POST(request) {
    const body = await request.json();

    const { name, dose, time } = body;
    
    if (!name || !dose || !time) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const newMedication = {
        name: name,
        dose: dose,
        time: time,
        taken: false,
    };

    await connectDB();
    const createdMedication = await Medication.create(newMedication);
    return NextResponse.json(createdMedication);     
};

