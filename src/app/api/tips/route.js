import { NextResponse } from "next/server";

const tips = [
  "প্রতিদিন কমপক্ষে ৮ গ্লাস পানি পান করুন।",
  "রাতে ৭-৮ ঘণ্টা ঘুমানোর চেষ্টা করুন।",
  "ওষুধ খাওয়ার সময় নিয়মিত রাখুন, একই সময়ে খান।",
  "সপ্তাহে অন্তত ৩ দিন হালকা ব্যায়াম করুন।",
];

export async function GET() {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  return NextResponse.json({ tip: randomTip });
}