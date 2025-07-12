import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Blog from '@/lib/models/Blog';
import { connectDB } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

/**
 * Update a blog post.
 * @param {Request} request - HTTP request object
 * @param {Object} context - Route context containing params
 * @returns {NextResponse} JSON response with updated blog data or error
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params; // Await params

    // Validate ID
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: 'Invalid blog ID' }, { status: 400 });
    }

    const data = await request.json();

    // Handle featuredImage Data URL
    let featuredImagePath = data.featuredImage;
    if (featuredImagePath && featuredImagePath.startsWith('data:image/')) {
      const matches = featuredImagePath.match(/^data:image\/([a-z]+);base64,/);
      if (!matches) {
        return NextResponse.json({ message: 'Invalid image format' }, { status: 400 });
      }
      const ext = matches[1];
      if (!['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
        return NextResponse.json({ message: 'Unsupported image format. Use jpg, jpeg, png, or gif.' }, { status: 400 });
      }

      const base64Data = featuredImagePath.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const fileName = `${Date.now()}.${ext}`;
      const uploadDir = path.join(process.cwd(), 'public', 'Uploads');
      const filePath = path.join(uploadDir, fileName);

      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(filePath, buffer);

      featuredImagePath = `/Uploads/${fileName}`;
    }

    const allowedFields = {
      title: data.title,
      slug: data.slug,
      content: data.content,
      featuredImage: featuredImagePath,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      isActive: data.isActive,
    };

    const blog = await Blog.findByIdAndUpdate(id, allowedFields, { new: true, runValidators: true }).lean();

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog updated successfully', blog });
  } catch (error) {
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
    const { id } = await params; // Await params

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: 'Invalid blog ID' }, { status: 400 });
    }

    const blog = await Blog.findById(id).lean();

    if (!blog || blog.isDeleted) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch blog', error: error.message }, { status: 500 });
  }
}