import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Blog from '@/lib/models/Blog';
import { connectDB } from '@/lib/db';

/**
 * Create a new blog post.
 * @param {Request} request - HTTP request object
 * @returns {NextResponse} JSON response with blog data or error
 */
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    // Validate featuredImage path
    const { featuredImage } = data;
    if (!featuredImage || !/^\/uploads\/.+\.(jpg|jpeg|png|gif|svg)$/i.test(featuredImage)) {
      console.error('POST /api/blogs - Invalid featuredImage path:', featuredImage);
      return NextResponse.json(
        { message: 'Invalid image path. Must be in /Uploads/ and have a valid extension (jpg, jpeg, png, gif)' },
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
      isActive: data.isActive ?? false,
      isDeleted: false,
    };

    console.log('POST /api/blogs - Allowed fields:', allowedFields);
    const blog = new Blog(allowedFields);
    await blog.save();
    console.log('POST /api/blogs - Blog saved:', blog._id);
    return NextResponse.json({ message: 'Blog created successfully', blog }, { status: 201 });
  } catch (error) {
    console.error('POST /api/blogs - Error:', error.message, error.stack);
    if (error instanceof mongoose.Error.ValidationError) {
      console.error('POST /api/blogs - Validation errors:', error.errors);
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
    }
    if (error.code === 11000 && error.keyPattern?.slug) {
      console.error('POST /api/blogs - Duplicate slug:', data.slug);
      return NextResponse.json({ message: 'Blog with this title already exists' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to create blog', error: error.message }, { status: 500 });
  }
}

/**
 * Fetch a list of published blogs with pagination and search.
 * @param {Request} request - HTTP request object
 * @returns {NextResponse} JSON response with blogs and pagination data
 */
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    console.log('GET /api/blogs - Params:', { search, page, limit });

    // Build query - get all non-deleted blogs
    let query = { isDeleted: { $ne: true } };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    console.log('GET /api/blogs - Query:', JSON.stringify(query));
    
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
      
    const total = await Blog.countDocuments(query);
    
    console.log('GET /api/blogs - Found blogs:', blogs.length, 'Total:', total);

    return NextResponse.json({
      blogs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('GET /api/blogs - Error:', error.message, error.stack);
    return NextResponse.json({ message: 'Failed to fetch blogs', error: error.message }, { status: 500 });
  }
}

/**
 * Soft delete a blog post.
 * @param {Request} request - HTTP request object
 * @returns {NextResponse} JSON response with success or error
 */
export async function DELETE(request) {
  try {
    await connectDB();
    const { _id } = await request.json();

    if (!mongoose.isValidObjectId(_id)) {
      console.error('DELETE /api/blogs - Invalid blog ID:', _id);
      return NextResponse.json({ message: 'Invalid blog ID' }, { status: 400 });
    }

    const blog = await Blog.findByIdAndUpdate(_id, { isDeleted: true }, { new: true }).lean();

    if (!blog) {
      console.error('DELETE /api/blogs - Blog not found:', _id);
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    console.log('DELETE /api/blogs - Blog deleted:', _id);
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/blogs - Error:', error.message, error.stack);
    return NextResponse.json({ message: 'Failed to delete blog', error: error.message }, { status: 500 });
  }
}