// src/app/api/upload/route.js
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import sanitize from 'sanitize-filename';

/**
 * Upload an image to the server.
 * @param {Request} request - HTTP request object
 * @returns {NextResponse} JSON response with image URL or error
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json({ message: 'File size exceeds 5MB limit' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const fileExtension = path.extname(file.name).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension)) {
      return NextResponse.json({ message: 'Invalid file type. Only JPG, JPEG, PNG, GIF allowed.' }, { status: 400 });
    }

    const sanitizedName = sanitize(file.name.replace(fileExtension, ''));
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${sanitizedName}-${uniqueSuffix}${fileExtension}`;
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    const imageUrl = `/uploads/${filename}`;
    return NextResponse.json({ imageUrl }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to upload image', error: error.message }, { status: 500 });
  }
}