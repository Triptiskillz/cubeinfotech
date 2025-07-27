import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";

export async function GET() {
  try {
    await connectDB();
    
    const total = await Blog.countDocuments();
    const views = await Blog.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } }
    ]);
    
    return NextResponse.json({
      total,
      views: views[0]?.totalViews || 0,
      comments: 0, // Placeholder - implement when comments feature is added
    });
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    return NextResponse.json(
      { message: "Failed to fetch blog statistics" },
      { status: 500 }
    );
  }
}