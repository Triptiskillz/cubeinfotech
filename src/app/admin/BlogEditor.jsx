"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { 
  FiEye, 
  FiSave,
  FiX,
  FiUpload,
  FiFileText,
  FiSettings,
  FiLink,
  FiAlertCircle,
  FiEdit2
} from "react-icons/fi";
import toast from "react-hot-toast";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import "./BlogEditor.css";

export default function BlogEditor({ selectedBlog, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: selectedBlog?.title || "",
    content: selectedBlog?.content || "",
    featuredImage: selectedBlog?.featuredImage || "",
    isActive: selectedBlog?.isActive || false,
    slug: selectedBlog?.slug || "",
    metaTitle: selectedBlog?.metaTitle || "",
    metaDescription: selectedBlog?.metaDescription || "",
  });

  // Reset form data when selectedBlog changes
  useEffect(() => {
    setFormData({
      title: selectedBlog?.title || "",
      content: selectedBlog?.content || "",
      featuredImage: selectedBlog?.featuredImage || "",
      isActive: selectedBlog?.isActive || false,
      slug: selectedBlog?.slug || "",
      metaTitle: selectedBlog?.metaTitle || "",
      metaDescription: selectedBlog?.metaDescription || "",
    });
  }, [selectedBlog]);

  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [touched, setTouched] = useState({
    title: false,
    content: false,
    featuredImage: false
  });
  
  const fileInputRef = useRef(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Mark field as touched
    if (field === 'title' || field === 'content' || field === 'featuredImage') {
      setTouched(prev => ({ ...prev, [field]: true }));
    }
    
    // Auto-generate slug from title
    if (field === "title" && !selectedBlog) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPG, PNG, and GIF are allowed.");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit.");
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        handleChange("featuredImage", data.imageUrl);
        toast.success("Image uploaded successfully");
      } else {
        toast.error(data.error || "Upload failed");
        console.error("Server error:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched for validation
    setTouched({ title: true, content: true, featuredImage: true });
    
    // Validate required fields
    if (!formData.title.trim()) {
      toast.error("Title is required");
      setActiveTab("content");
      return;
    }
    
    if (!formData.content.trim() || formData.content === "<p><br></p>") {
      toast.error("Content is required");
      setActiveTab("content");
      return;
    }
    
    if (!formData.featuredImage) {
      toast.error("Featured image is required");
      setActiveTab("content");
      return;
    }
    
    setLoading(true);

    try {
      const url = selectedBlog 
        ? `/api/blogs/${selectedBlog._id}`
        : "/api/blogs";
      
      const response = await fetch(url, {
        method: selectedBlog ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success(data.message || "Blog saved successfully!");
        setTimeout(() => onSave(), 1500);
      } else {
        toast.error(data.message || "Failed to save blog");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  if (showPreview) {
    return (
      <>
        {/* Modal Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setShowPreview(false)}
        />
        
        {/* Modal Content */}
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              {/* Preview Header */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FiEye /> Preview
                  </h2>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="text-xl text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                <article className="p-8">
            
              
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                {formData.title || "Untitled Post"}
              </h1>
              
              <div className="flex items-center gap-4 text-gray-600 mb-8 pb-8 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">A</span>
                  </div>
                  <span>Admin</span>
                </div>
                <span>•</span>
                <span>{new Date().toLocaleDateString()}</span>
                <span>•</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  formData.isActive 
                    ? "bg-green-100 text-green-700" 
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {formData.isActive ? "Published" : "Draft"}
                </span>
              </div>
              {formData.featuredImage && (
                <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={formData.featuredImage} 
                    alt={formData.title}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              )}
                  <div 
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                    className="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-img:rounded-lg prose-img:shadow-md"
                  />
                </article>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm m-4">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h4 className=" font-bold text-gray-900">
              {selectedBlog ? "Edit Blog Post" : "Create New Blog Post"}
            </h4>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 transition-colors"
              >
                <FiEye /> Preview
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave /> Save
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit}>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                <button
                  type="button"
                  onClick={() => setActiveTab("content")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "content"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FiFileText className="text-lg" />
                    Content
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("settings")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "settings"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FiSettings className="text-lg" />
                    Settings
                  </div>
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Content Tab - Combined Title, Featured Image, and Content */}
              {activeTab === "content" && (
                <div className="space-y-8">
                  {/* Title Section */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Blog Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="Enter a title"
                      className={`w-full px-4 py-2 text-md font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        formData.title.trim() ? 'border-gray-300' : 'border-red-300'
                      }`}
                      required
                    />
                    {touched.title && !formData.title.trim() && (
                      <p className="mt-1 text-sm text-red-500">Title is required</p>
                    )}
                  </div>

                  {/* Featured Image Section */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Featured Image <span className="text-red-500">*</span>
                    </label>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    
                    {formData.featuredImage ? (
                      <div className="relative group max-w-2xl">
                        <img
                          src={formData.featuredImage}
                          alt="Featured"
                          className="w-full h-64 object-cover rounded-lg shadow-md"
                          onError={(e) => {
                            console.error("Failed to load image:", formData.featuredImage);
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' fill='%236b7280' text-anchor='middle' dy='.3em'%3EImage Error%3C/text%3E%3C/svg%3E";
                          }}
                        />
                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center gap-4 pointer-events-none group-hover:pointer-events-auto">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                          >
                            <FiEdit2 /> Change
                          </button>
                          <button
                            type="button"
                            onClick={() => handleChange("featuredImage", "")}
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
                          >
                            <FiX /> Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="max-w-2xl w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all group"
                        disabled={uploadingImage}
                      >
                        <div className="text-center">
                          {uploadingImage ? (
                            <>
                              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto" />
                              <p className="mt-4 text-lg font-medium text-gray-900">
                                Uploading...
                              </p>
                            </>
                          ) : (
                            <>
                              <div className="mx-auto h-16 w-16 text-gray-400 group-hover:text-blue-500 transition-colors">
                                <FiUpload className="w-full h-full" />
                              </div>
                              <p className="mt-4 text-lg font-medium text-gray-900">
                                Click to upload featured image
                              </p>
                              <p className="mt-2 text-sm text-gray-500">
                                PNG, JPG, GIF up to 5MB
                              </p>
                            </>
                          )}
                        </div>
                      </button>
                    )}
                    
                    <p className="mt-3 text-sm text-gray-600">
                      <FiAlertCircle className="inline mr-1" />
                      Images should be under 5MB. Supported formats: JPG, PNG, GIF
                    </p>
                    {touched.featuredImage && !formData.featuredImage && (
                      <p className="mt-1 text-sm text-red-500">Featured image is required</p>
                    )}
                  </div>

                  {/* Content Section */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Content <span className="text-red-500">*</span>
                    </label>
                    <div className={`prose-editor border rounded-lg overflow-hidden ${
                      formData.content && formData.content !== '<p><br></p>' ? 'border-gray-300' : 'border-red-300'
                    }`}>
                      <ReactQuill
                        theme="snow"
                        value={formData.content}
                        onChange={(value) => handleChange("content", value)}
                        modules={modules}
                        className="h-96"
                        placeholder="Start writing your amazing content..."
                      />
                    </div>
                    {touched.content && (!formData.content || formData.content === '<p><br></p>') && (
                      <p className="mt-1 text-sm text-red-500">Content is required</p>
                    )}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Publish Settings */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Publish Settings</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={(e) => handleChange("isActive", e.target.checked)}
                            className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-0.5"
                          />
                          <label htmlFor="isActive" className="ml-3">
                            <span className="block text-sm font-medium text-gray-900">
                              Publish this blog post
                            </span>
                            <span className="block text-sm text-gray-500">
                              {formData.isActive 
                                ? "This post will be visible to all visitors" 
                                : "This post will be saved as a draft"}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SEO Settings */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            URL Slug
                          </label>
                          <div className="relative">
                            <FiLink className="absolute left-3 top-3 text-gray-400" />
                            <input
                              type="text"
                              value={formData.slug}
                              onChange={(e) => handleChange("slug", e.target.value)}
                              placeholder="my-awesome-blog-post"
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meta Title
                          </label>
                          <input
                            type="text"
                            value={formData.metaTitle}
                            onChange={(e) => handleChange("metaTitle", e.target.value)}
                            placeholder="Custom title for search engines"
                            maxLength={70}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            {formData.metaTitle.length}/70 characters
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meta Description
                          </label>
                          <textarea
                            value={formData.metaDescription}
                            onChange={(e) => handleChange("metaDescription", e.target.value)}
                            placeholder="Brief description for search results"
                            rows={3}
                            maxLength={160}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            {formData.metaDescription.length}/160 characters
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}