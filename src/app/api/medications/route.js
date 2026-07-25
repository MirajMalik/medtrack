import {NextResponse} from "next/server";
import { medications } from "@/lib/data";


export async function GET() {       
    return NextResponse.json({ medications });
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
        id: Date.now(),
        name: name,
        dose: dose,
        time: time,
        taken: false,
    };
    medications.push(newMedication);
    return NextResponse.json(newMedication);     
};

