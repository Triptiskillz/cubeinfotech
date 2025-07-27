import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Newsletter from "@/lib/models/Newsletter";

export async function GET() {
  try {
    await connectDB();
    
    const total = await Newsletter.countDocuments({ isActive: true });
    
    return NextResponse.json({ total });
  } catch (error) {
    console.error("Error fetching newsletter stats:", error);
    return NextResponse.json(
      { message: "Failed to fetch newsletter statistics" },
      { status: 500 }
    );
  }
}