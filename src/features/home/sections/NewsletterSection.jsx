// src/features/home/sections/NewsletterSection.jsx
"use client";
import React, { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // success or error
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);
    setMessage("");

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
    }, 1000);
  };

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
        <p className="mb-6 text-gray-700">
          Subscribe to stay updated on new products, collections, and promotions.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>
        {status && (
          <p className={`mt-4 font-medium ${status === "success" ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
