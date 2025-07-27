import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/lib/models/Blog';

/**
 * Get a single blog post by slug
 */
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { slug } = params;
    
    console.log('GET /api/blogs/[slug] - Fetching blog with slug:', slug);

    // Find blog by slug that is not deleted
    const blog = await Blog.findOne({ 
      slug, 
      isDeleted: { $ne: true }
    }).lean();
    
    console.log('GET /api/blogs/[slug] - Blog found:', blog ? 'Yes' : 'No');
    console.log('GET /api/blogs/[slug] - Blog data:', blog);

    if (!blog) {
      console.log('GET /api/blogs/[slug] - Blog not found for slug:', slug);
      return NextResponse.json(
        { message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error('GET /api/blogs/[slug] - Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch blog', error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Update a blog post by slug (admin only)
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { slug } = params;
    const data = await request.json();

    // Validate featuredImage if provided
    if (data.featuredImage && !/^\/uploads\/.+\.(jpg|jpeg|png|gif|svg)$/i.test(data.featuredImage)) {
      return NextResponse.json(
        { message: 'Invalid image path' },
        { status: 400 }
      );
    }

    const allowedFields = {
      title: data.title,
      slug: data.slug,
      content: data.content,
      featuredImage: data.featuredImage,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      isActive: data.isActive,
      updatedAt: new Date()
    };

    const blog = await Blog.findOneAndUpdate(
      { slug },
      allowedFields,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return NextResponse.json(
        { message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Blog updated successfully', 
      blog 
    });
  } catch (error) {
    console.error('PUT /api/blogs/[slug] - Error:', error);
    if (error.code === 11000 && error.keyPattern?.slug) {
      return NextResponse.json(
        { message: 'Blog with this slug already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Failed to update blog', error: error.message },
      { status: 500 }
    );
  }
}