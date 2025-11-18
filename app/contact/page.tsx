"use client";

import { useState, FormEvent } from "react";
import { Slide } from "../animation/Slide";
import { FadeIn } from "../animation/FadeIn";
import PageHeading from "@/app/components/shared/PageHeading";
import { BiEnvelope, BiUser, BiBriefcase } from "react-icons/bi";
import { HiCheckCircle, HiExclamationCircle, HiMail, HiClock, HiLightningBolt } from "react-icons/hi";

const inquiryTypes = [
  { value: "freelance", label: "Freelance Project", icon: "💼" },
  { value: "fulltime", label: "Full-Time Position", icon: "🚀" },
  { value: "consultation", label: "Consultation", icon: "💡" },
  { value: "collaboration", label: "Collaboration", icon: "🤝" },
  { value: "speaking", label: "Speaking/Workshop", icon: "🎤" },
  { value: "other", label: "Other Inquiry", icon: "💬" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    return false;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.inquiryType) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        inquiryType: "",
        budget: "",
        timeline: "",
        message: "",
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative w-full min-h-screen">
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-zinc-950"></div>
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 -mt-16 pt-36 lg:pt-48 pb-12 lg:pb-20">
        <PageHeading
          title="Let's Work Together"
          description="Have a project in mind? Let's discuss how we can work together to bring your ideas to life."
        />

        <div className="mt-12 lg:mt-16 grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Sidebar - Contact Info */}
          <Slide delay={0.1}>
            <div className="space-y-6">
              {/* Contact Methods */}
              <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <HiMail className="w-5 h-5 text-blue-500" />
                  <span>Get in Touch</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                    <HiClock className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">Response Time</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">Within 24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                    <HiLightningBolt className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">Availability</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                        <span className="flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Currently available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-zinc-300 dark:border-zinc-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Services</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span>Backend Development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                    <span>API Design & Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    <span>Database Architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    <span>WordPress & WooCommerce</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                    <span>Technical Consulting</span>
                  </li>
                </ul>
              </div>

              {/* Quick Note */}
              <div className="bg-zinc-50 dark:bg-zinc-900/50 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <strong className="text-zinc-900 dark:text-white">Note:</strong> All form submissions are secure and encrypted. 
                  For your security, pasting is disabled and limited to one submission per 24 hours per IP address.
                </p>
              </div>
            </div>
          </Slide>

          {/* Right Side - Contact Form */}
          <Slide delay={0.15}>
            <div>
              <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 rounded-xl shadow-2xl p-8 lg:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Success Message */}
                  {success && (
                    <FadeIn>
                      <div className="p-5 rounded-xl bg-green-50 dark:bg-green-950/30 border-2 border-green-500/50 flex items-start gap-3">
                        <HiCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-green-700 dark:text-green-400 text-base">Success!</h4>
                          <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                            Your message has been sent successfully. I&apos;ll get back to you soon!
                          </p>
                        </div>
                      </div>
                    </FadeIn>
                  )}

                  {/* Error Message */}
                  {error && (
                    <FadeIn>
                      <div className="p-5 rounded-xl bg-red-50 dark:bg-red-950/30 border-2 border-red-500/50 flex items-start gap-3">
                        <HiExclamationCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-red-700 dark:text-red-400 text-base">Error</h4>
                          <p className="text-sm text-red-600 dark:text-red-500 mt-1">{error}</p>
                        </div>
                      </div>
                    </FadeIn>
                  )}

                  {/* Inquiry Type Selection */}
                  <div>
                    <label className="block text-sm font-bold mb-4">
                      What brings you here? <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {inquiryTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: type.value })}
                          className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                            formData.inquiryType === type.value
                              ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30 shadow-md"
                              : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600"
                          }`}
                        >
                          <div className="text-2xl mb-2">{type.icon}</div>
                          <div className={`text-xs font-semibold ${
                            formData.inquiryType === type.value
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-zinc-700 dark:text-zinc-300"
                          }`}>
                            {type.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Personal Information Grid */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <BiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onPaste={handlePaste}
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <BiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onPaste={handlePaste}
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company (Optional) */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-bold mb-2">
                      Company / Organization <span className="text-xs text-zinc-500">(Optional)</span>
                    </label>
                    <div className="relative">
                      <BiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        onPaste={handlePaste}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  {/* Budget and Timeline - Conditional */}
                  {(formData.inquiryType === "freelance" || 
                    formData.inquiryType === "fulltime" || 
                    formData.inquiryType === "consultation") && (
                    <div className="grid md:grid-cols-2 gap-5 p-5 bg-zinc-50 dark:bg-zinc-800/30 rounded-lg border border-zinc-200 dark:border-zinc-700">
                      <div>
                        <label htmlFor="budget" className="block text-sm font-bold mb-2">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer"
                        >
                          <option value="">Select budget</option>
                          <option value="< $5,000">Less than $5,000</option>
                          <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                          <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                          <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                          <option value="$50,000+">$50,000+</option>
                          <option value="To be discussed">To be discussed</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="timeline" className="block text-sm font-bold mb-2">
                          Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer"
                        >
                          <option value="">Select timeline</option>
                          <option value="ASAP (< 2 weeks)">ASAP (less than 2 weeks)</option>
                          <option value="1-3 months">1-3 months</option>
                          <option value="3-6 months">3-6 months</option>
                          <option value="6+ months">6+ months</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onPaste={handlePaste}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                      placeholder="Tell me about your project, goals, and how I can help..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || !formData.name || !formData.email || !formData.inquiryType}
                    className="w-full py-4 px-6 rounded-lg font-bold text-base text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-zinc-400 disabled:to-zinc-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending Message...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <BiEnvelope className="w-5 h-5" />
                        Send Message
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </main>
  );
}
