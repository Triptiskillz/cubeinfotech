import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

export const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
