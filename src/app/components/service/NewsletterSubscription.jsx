"use client";

import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      
      if (res.ok) {
        setToast({
          open: true,
          message: "Successfully subscribed to newsletter!",
          severity: "success",
        });
        setEmail("");
      } else {
        setToast({
          open: true,
          message: result.message || "Failed to subscribe. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      setToast({
        open: true,
        message: "Network error. Please try again later.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };
  return (
    <div className="bg-gradient-to-r h-full from-green-500 to-green-400 py-16 px-6 md:px-12 text-white overflow-hidden">
      <div className="mx-auto text-left">
        <h2 className="font-bold mb-6 leading-tight w-full lg:w-120">
          Subscribe to get information,
          latest news and other 
          interesting offers about
        </h2>

        <p className="mb-10 w-full lg:w-190">
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full lg:w-100">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className={`rounded-full px-6 py-3 text-gray-700 bg-white focus:outline-none w-full ${
                error ? "border-2 border-red-500" : ""
              }`}
            />
            {error && (
              <small className="text-red-200 text-sm absolute -bottom-6 left-6">
                {error}
              </small>
            )}
          </div>
          <button 
            type="submit"
            disabled={loading}
            className={`rounded-full bg-gradient-to-r from-orange-400 to-red-500 px-8 py-3 font-semibold text-white hover:opacity-90 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            } flex items-center gap-2`}
          >
            {loading && (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>

      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewsletterSubscription;