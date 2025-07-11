'use client';

import { useState } from 'react';
import RichTextEditor from '@/app/components/blog/RichTextEditor';

export default function BlogForm() {
  const [title, setTitle] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, metaTitle, metaDescription, content });
    alert('Submitted! Check console.');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-10 space-y-5">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Title"
      />

      <input
        type="text"
        value={metaTitle}
        onChange={(e) => setMetaTitle(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Meta Title"
      />

      <textarea
        value={metaDescription}
        onChange={(e) => setMetaDescription(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Meta Description"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          setBannerImage(file);
          const reader = new FileReader();
          reader.onloadend = () => setPreview(reader.result);
          reader.readAsDataURL(file);
        }}
        className="w-full"
      />
      {preview && <img src={preview} alt="Banner" className="w-60 h-32 object-cover rounded mt-2" />}

      {/* <RichTextEditor value={content} onChange={setContent} /> */}

      <button type="submit" className="bg-blue-600 text-white py-2 rounded w-full">Publish</button>
    </form>
  );
}
