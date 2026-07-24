import {NextResponse} from "next/server";

let medications = [
            { id: 1, name: "Napa Extra", dose: "500mg", time: "সকাল ৮টা", taken: false },
            { id: 2, name: "Seclo", dose: "20mg", time: "সকাল ৮টা", taken: false },
            { id: 3, name: "Vitamin D3", dose: "1 tablet", time: "রাত ৯টা", taken: false },
    ];

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