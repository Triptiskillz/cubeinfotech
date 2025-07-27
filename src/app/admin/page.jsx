"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { 
  FiHome, 
  FiFileText, 
  FiMail, 
  FiLogOut,
  FiMenu,
  FiX,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSearch
} from "react-icons/fi";
import BlogEditor from "./BlogEditor";
import ConfirmModal from "@/components/ConfirmModal";
import toast, { Toaster } from "react-hot-toast";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, blogId: null, blogTitle: "" });
  const router = useRouter();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FiHome },
    { id: "blogs", label: "Blog Posts", icon: FiFileText },
    { id: "newsletter", label: "Newsletter", icon: FiMail },
  ];

  useEffect(() => {
    fetchBlogs();
    fetchNewsletters();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/blogs?limit=100");
      const data = await response.json();
      console.log("Fetched blogs data:", data);
      if (response.ok) {
        setBlogs(data.blogs || []);
        console.log("Set blogs:", data.blogs);
      } else {
        console.error("Failed to fetch blogs:", data);
        toast.error("Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Error loading blogs");
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsletters = async () => {
    try {
      const response = await fetch("/api/newsletter");
      const data = await response.json();
      if (response.ok) {
        setNewsletters(data.subscribers || []);
      }
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    }
  };

  const handleDeleteBlog = async () => {
    const { blogId } = deleteModal;
    
    try {
      const response = await fetch("/api/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: blogId }),
      });
      
      if (response.ok) {
        toast.success("Blog deleted successfully");
        fetchBlogs();
        if (selectedBlog?._id === blogId) {
          setSelectedBlog(null);
          setShowForm(false);
        }
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Error deleting blog");
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title?.toLowerCase().includes(search.toLowerCase()) ||
    blog.content?.toLowerCase().includes(search.toLowerCase())
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        const publishedPosts = blogs.filter(blog => blog.isActive).length;
        const draftPosts = blogs.filter(blog => !blog.isActive).length;
        
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Posts</p>
                  <h3 className="text-2xl font-bold mt-1">{blogs.length}</h3>
                  <div className="flex gap-4 mt-2 text-xs">
                    <span className="text-green-600">Published: {publishedPosts}</span>
                    <span className="text-yellow-600">Draft: {draftPosts}</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <FiFileText className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Subscribers</p>
                  <h3 className="text-2xl font-bold mt-1">{newsletters.length}</h3>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <FiMail className="text-green-600 text-xl" />
                </div>
              </div>
            </div>
          </div>
        );

      case "blogs":
        return (
          <div>
            <div className="flex justify-between items-center mb-4 p-4">
              <h3 className="font-bold">Blog Posts</h3>
              <button
                onClick={() => {
                  setSelectedBlog(null);
                  setShowForm(true);
                }}
                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <FiPlus /> New Post
              </button>
            </div>

            {showForm ? (
              <BlogEditor
                selectedBlog={selectedBlog}
                onSave={() => {
                  fetchBlogs();
                  setShowForm(false);
                  setSelectedBlog(null);
                }}
                onCancel={() => {
                  setShowForm(false);
                  setSelectedBlog(null);
                }}
              />
            ) : (
              <>
                <div className="mb-4 p-4">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search blogs..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden m-4">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                            Loading...
                          </td>
                        </tr>
                      ) : filteredBlogs.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                            No blogs found
                          </td>
                        </tr>
                      ) : (
                        filteredBlogs.map((blog) => (
                          <tr key={blog._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">
                                {blog.title}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                blog.isActive 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-yellow-100 text-yellow-800"
                              }`}>
                                {blog.isActive ? "Published" : "Draft"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => {
                                  setSelectedBlog(blog);
                                  setShowForm(true);
                                }}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                <FiEdit className="inline" />
                              </button>
                              <button
                                onClick={() => setDeleteModal({ 
                                  isOpen: true, 
                                  blogId: blog._id, 
                                  blogTitle: blog.title 
                                })}
                                className="text-red-600 hover:text-red-900"
                              >
                                <FiTrash2 className="inline" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        );

      case "newsletter":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">Newsletter Subscribers</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Subscribed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {newsletters.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                        No subscribers yet
                      </td>
                    </tr>
                  ) : (
                    newsletters.map((subscriber) => (
                      <tr key={subscriber._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {subscriber.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(subscriber.subscribedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">This section is under development</p>
          </div>
        );
    }
  };

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            style: {
              background: '#10b981',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
      
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, blogId: null, blogTitle: "" })}
        onConfirm={handleDeleteBlog}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${deleteModal.blogTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
      
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 overflow-hidden`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
        </div>
        <nav className="px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                activeSection === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="text-xl" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {sidebarOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
            <div className="flex items-center gap-4">

            <button
                onClick={() => {
                  Cookies.remove('token');
                  toast.success('Logged out successfully');
                  router.push('/login');
                }}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded-lg transition-all duration-200"
              >
                <FiLogOut className="text-lg" />
                <span>Logout</span>
              </button>
              <span className="text-gray-600">Welcome, Admin</span>
             
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
    </>
  );
}