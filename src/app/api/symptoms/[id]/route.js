import {NextResponse} from "next/server";
import { symptoms } from "@/lib/data";

export async function DELETE(request, { params }) {
    const { id } = params;

    const index = symptoms.findIndex(
        (symptom) => symptom.id === Number(id)
    );
    
      if (index !== -1) {
        symptoms.splice(index, 1);   
    }
    return NextResponse.json({ message: "লক্ষণ মুছে ফেলা হয়েছে" });
}