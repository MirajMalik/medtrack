import {NextResponse} from "next/server";
import { symptoms } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {       
    return NextResponse.json( symptoms );
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

    const newSymptoms = {
        id: Date.now(),
        text: text,
        date: new Date().toLocaleDateString("bn-BD"),

    };
    symptoms.push(newSymptoms);
    return NextResponse.json(newSymptoms);     
};