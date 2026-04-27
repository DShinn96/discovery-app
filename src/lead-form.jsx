import React, { useState } from "react";
import { motion } from "framer-motion";

const LeadForm = ({ score, tier, price, allAnswers, onSubmit }) => {
  const formspreeId = "mnjllore";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        onSubmit();
      } else {
        alert("Transmission Error: Uplink failed. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      alert("System Error: Check network connection and retry.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-left relative w-full">
      {/* --- Terminal Header --- */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-[2px] w-8 bg-blue-500" />
          <span className="text-blue-500 font-mono font-bold uppercase tracking-[0.4em] text-[10px]">
            Final Transmission
          </span>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight italic uppercase">
          Intel <span className="text-blue-500">Capture</span>
        </h2>
        <p className="text-slate-500 text-xs font-mono mt-2 leading-relaxed uppercase tracking-widest">
          Secure your project roadmap and investment brief.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-5">
          <input
            type="hidden"
            name="_next"
            value="https://discoveryoursite.com"
          />

          {/* Name Field */}
          <div className="group relative">
            <input
              type="text"
              name="Client Name"
              placeholder="FULL NAME"
              required
              className="w-full bg-slate-950/50 border border-white/20 p-5 rounded-2xl text-white font-mono text-sm focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-400 uppercase tracking-widest"
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-20 group-focus-within:opacity-100 transition-opacity">
              <span className="text-blue-500 text-[10px] font-mono">
                [READY]
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Strict Email Field */}
            <input
              type="email"
              name="_replyto"
              placeholder="EMAIL ADDRESS"
              required
              className="w-full bg-slate-950/50 border border-white/20 p-5 rounded-2xl text-white font-mono text-sm focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-400 uppercase tracking-widest"
            />

            {/* Strict Number Field */}
            <input
              type="tel"
              name="Phone Number"
              placeholder="PHONE NUMBER"
              pattern="[0-9]{10,15}"
              title="Please enter a valid phone number (digits only)"
              required
              className="w-full bg-slate-950/50 border border-white/20 p-5 rounded-2xl text-white font-mono text-sm focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-400 uppercase tracking-widest"
            />
          </div>

          {/* Optional Intel Field */}
          <div className="group relative">
            <textarea
              name="Additional Intel"
              placeholder="ADDITIONAL INTEL (OPTIONAL) // SPECIFIC REQUIREMENTS, TIMELINES, OR INTEGRATIONS..."
              className="w-full min-h-[120px] bg-slate-950/50 border border-white/20 p-5 rounded-2xl text-white font-mono text-sm focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-400 uppercase tracking-widest resize-y"
            ></textarea>
            <div className="absolute top-5 right-4 flex items-start pointer-events-none opacity-20 group-focus-within:opacity-100 transition-opacity">
              <span className="text-blue-500 text-[10px] font-mono">
                [OPTIONAL]
              </span>
            </div>
          </div>
        </div>

        {/* --- HIDDEN LOGIC DATA --- */}
        <input type="hidden" name="Calculated Tier" value={tier} />
        <input type="hidden" name="Estimated Quote" value={price} />
        <input type="hidden" name="Algorithm Score" value={score} />

        {/* --- HIDDEN QUESTION RESPONSES --- */}
        {allAnswers &&
          allAnswers.map((answer, index) => (
            <input
              key={index}
              type="hidden"
              name={`Project_Intel_0${index + 1}`}
              value={answer || "No answer provided"}
            />
          ))}

        {/* --- Submit Action --- */}
        <div className="relative mt-4">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-2xl transition-all shadow-[0_0_25px_rgba(37,99,235,0.3)] uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Transmitting...
              </span>
            ) : (
              "Secure Strategy Brief"
            )}
          </motion.button>

          <p className="text-[9px] text-center text-slate-600 font-mono mt-6 uppercase tracking-[0.2em]">
            AES-256 Encrypted Connection // Shinn Digital Discovery Protocol
          </p>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
