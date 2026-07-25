import {NextResponse} from 'next/server';
import { medications } from '@/lib/data';

export async function DELETE(request, { params }) { 
  const { id }  = await params;

  const index = medications.findIndex(
    (med) => med.id === Number(id)
);

  if (index !== -1) {
    medications.splice(index, 1);   
}
    return NextResponse.json({ message: "ওষুধ মুছে ফেলা হয়েছে" });
}