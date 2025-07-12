import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Blog from '@/lib/models/Blog';
import { connectDB } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

/**
 * Create a new blog post.
 * @param {Request} request - HTTP request object
 * @returns {NextResponse} JSON response with blog data or error
 */
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    console.log('POST /api/blogs - Request body:', {
      ...data,
      featuredImage: data.featuredImage ? `${data.featuredImage.slice(0, 30)}...` : null,
    }); // Debug log

    // Handle featuredImage Data URL
    let featuredImagePath = data.featuredImage;
    if (featuredImagePath && featuredImagePath.startsWith('data:image/')) {
      const matches = featuredImagePath.match(/^data:image\/([a-z]+);base64,/);
      if (!matches) {
        console.error('POST /api/blogs - Invalid image format:', featuredImagePath.slice(0, 50));
        return NextResponse.json({ message: 'Invalid image format' }, { status: 400 });
      }
      const ext = matches[1].toLowerCase();
      if (!['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
        console.error('POST /api/blogs - Unsupported image format:', ext);
        return NextResponse.json({ message: 'Unsupported image format. Use jpg, jpeg, png, or gif.' }, { status: 400 });
      }

      const base64Data = featuredImagePath.replace(/^data:image\/\w+;base64,/, '');
      if (!base64Data) {
        console.error('POST /api/blogs - Empty base64 data');
        return NextResponse.json({ message: 'Invalid base64 image data' }, { status: 400 });
      }

      let buffer;
      try {
        buffer = Buffer.from(base64Data, 'base64');
      } catch (err) {
        console.error('POST /api/blogs - Base64 decode error:', err.message);
        return NextResponse.json({ message: 'Failed to decode base64 image' }, { status: 400 });
      }

      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
      const uploadDir = path.join(process.cwd(), 'public', 'Uploads');
      const filePath = path.join(uploadDir, fileName);

      try {
        await fs.mkdir(uploadDir, { recursive: true });
        await fs.writeFile(filePath, buffer);
        console.log('POST /api/blogs - Image saved:', filePath); // Debug log
      } catch (err) {
        console.error('POST /api/blogs - File write error:', err.message);
        return NextResponse.json({ message: 'Failed to save image to server' }, { status: 500 });
      }

      featuredImagePath = `/Uploads/${fileName}`;
      console.log('POST /api/blogs - Set featuredImagePath:', featuredImagePath); // Debug log
    } else if (!featuredImagePath) {
      console.error('POST /api/blogs - Missing featuredImage');
      return NextResponse.json({ message: 'Featured image is required' }, { status: 400 });
    } else if (!/^\/Uploads\/.+\.(jpg|jpeg|png|gif)$/.test(featuredImagePath)) {
      console.error('POST /api/blogs - Invalid featuredImage path:', featuredImagePath);
      return NextResponse.json({ message: 'Invalid image path. Must be in /Uploads/ and have a valid extension (jpg, jpeg, png, gif)' }, { status: 400 });
    }

    const allowedFields = {
      title: data.title,
      slug: data.slug,
      content: data.content,
      featuredImage: featuredImagePath,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      isActive: data.isActive ?? false,
      isDeleted: false,
    };

    console.log('POST /api/blogs - Allowed fields:', allowedFields); // Debug log

    const blog = new Blog(allowedFields);

    await blog.save();
    console.log('POST /api/blogs - Blog saved:', blog._id); // Debug log
    return NextResponse.json({ message: 'Blog created successfully', blog }, { status: 201 });
  } catch (error) {
    console.error('POST /api/blogs - Error:', error.message, error.stack); // Enhanced debug log
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

    const query = {
      isDeleted: false,
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    };

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Blog.countDocuments(query);

    return NextResponse.json({
      blogs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('GET /api/blogs - Error:', error.message, error.stack); // Debug log
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

    console.log('DELETE /api/blogs - Blog deleted:', _id); // Debug log
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/blogs - Error:', error.message, error.stack); // Debug log
    return NextResponse.json({ message: 'Failed to delete blog', error: error.message }, { status: 500 });
  }
}