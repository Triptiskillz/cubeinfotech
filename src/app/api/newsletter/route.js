import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Newsletter from "@/lib/models/Newsletter";

export async function GET() {
  try {
    await connectDB();
    
    const subscribers = await Newsletter.find({ isActive: true }).sort({ subscribedAt: -1 });
    
    return NextResponse.json({ subscribers });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { message: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    
    const { email } = await request.json();
    
    if (!email || !email.trim()) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }
    
    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { message: "Email already subscribed" },
        { status: 400 }
      );
    }
    
    // Create new subscriber
    const newSubscriber = await Newsletter.create({
      email,
      subscribedAt: new Date(),
    });
    
    return NextResponse.json(
      { message: "Successfully subscribed to newsletter", data: newSubscriber },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { message: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}