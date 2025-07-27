import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Blog from '@/lib/models/Blog';
import { connectDB } from '@/lib/db';

/**
 * Update a blog post.
 * @param {Request} request - HTTP request object
 * @param {Object} context - Route context containing params
 * @returns {NextResponse} JSON response with updated blog data or error
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    console.log('PUT /api/blogs/[id] - Updating blog with ID:', id);

    // Validate ID
    if (!mongoose.isValidObjectId(id)) {
      console.error('PUT /api/blogs/[id] - Invalid blog ID:', id);
      return NextResponse.json({ message: 'Invalid blog ID' }, { status: 400 });
    }

    const data = await request.json();
    const { featuredImage } = data;

    if (featuredImage && !/^\/uploads\/.+\.(jpg|jpeg|png|gif|svg)$/i.test(featuredImage)) {
      console.error('PUT /api/blogs/[id] - Invalid image path:', featuredImage);
      return NextResponse.json(
        { message: 'Invalid image path. Must be in /uploads/ and have a valid extension (jpg, jpeg, png, gif, svg)' },
        { status: 400 }
      );
    }

    const allowedFields = {
      title: data.title,
      slug: data.slug,
      content: data.content,
      featuredImage,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      isActive: data.isActive,
    };

    console.log('PUT /api/blogs/[id] - Updating with fields:', allowedFields);
    
    const blog = await Blog.findByIdAndUpdate(id, allowedFields, { new: true, runValidators: true }).lean();

    if (!blog) {
      console.error('PUT /api/blogs/[id] - Blog not found for ID:', id);
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    console.log('PUT /api/blogs/[id] - Blog updated successfully:', blog._id);
    return NextResponse.json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    console.error('PUT /api/blogs/[id] - Error:', error.message, error.stack);
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
    }
    if (error.code === 11000 && error.keyPattern?.slug) {
      return NextResponse.json({ message: 'Blog with this title already exists' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to update blog', error: error.message }, { status: 500 });
  }
}

/**
 * Fetch a single blog post.
 * @param {Request} request - HTTP request object
 * @param {Object} context - Route context containing params
 * @returns {NextResponse} JSON response with blog data or error
 */
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: 'Invalid blog ID' }, { status: 400 });
    }

    const blog = await Blog.findById(id).lean();

    if (!blog || blog.isDeleted) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error('GET /api/blogs/[id] - Error:', error.message, error.stack);
    return NextResponse.json({ message: 'Failed to fetch blog', error: error.message }, { status: 500 });
  }
}