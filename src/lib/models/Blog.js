// src/lib/models/Blog.js
import mongoose from 'mongoose';
import slugify from 'slugify';

/**
 * Mongoose schema for Blog documents.
 * @typedef {Object} BlogSchema
 */
const blogSchema = new mongoose.Schema({
  /** Blog title, required, 3-200 characters */
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  /** Auto-generated slug from title, unique and lowercase */
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  /** Featured image path, required, must be in /uploads/ with valid extension */
  featuredImage: {
    type: String,
    required: [true, 'Featured image is required'],
    validate: {
      validator: (v) => /^\/uploads\/.+\.(jpg|jpeg|png|gif)$/.test(v),
      message: 'Invalid image path. Must be in /uploads/ and have a valid extension (jpg, jpeg, png, gif).',
    },
  },
  /** Blog content, required, minimum 10 characters */
  content: {
    type: String,
    required: [true, 'Blog content is required'],
    minlength: [10, 'Content must be at least 10 characters'],
  },
  /** Optional SEO meta title, max 70 characters */
  metaTitle: {
    type: String,
    trim: true,
    maxlength: [70, 'Meta title cannot exceed 70 characters'],
  },
  /** Optional SEO meta description, max 160 characters */
  metaDescription: {
    type: String,
    trim: true,
    maxlength: [160, 'Meta description cannot exceed 160 characters'],
  },
  /** Publication status, false = draft, true = published */
  isActive: {
    type: Boolean,
    default: false,
  },
  /** Soft delete flag */
  isDeleted: {
    type: Boolean,
    default: false,
  },
  /** Creation timestamp */
  createdAt: {
    type: Date,
    default: Date.now,
  },
  /** Last update timestamp */
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Pre-save hook to generate slug and update timestamps.
 * @param {Function} next - Mongoose middleware next function
 */
blogSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  this.updatedAt = Date.now();
  next();
});

/**
 * Pre-update hook to update timestamps.
 * @param {Function} next - Mongoose middleware next function
 */
blogSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);