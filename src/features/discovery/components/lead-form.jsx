import React, { useState } from "react";
import { motion } from "framer-motion";

const LeadForm = ({ score, tier, price, allAnswers, questions, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input States for Masking
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Logic: Strip any digits (0-9) from the Name field
  const handleNameChange = (e) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[0-9]/g, "");
    setClientName(sanitizedValue);
  };

  // Logic: Strip everything EXCEPT digits from the Phone field
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/\D/g, "");
    setPhone(sanitizedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const data = new FormData(form);

    // INJECT WEB3FORMS ACCESS KEY
    data.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(data)), // TACTICAL UPGRADE: Clean JSON payload
      });

      const result = await response.json();
      console.log("Web3Forms Raw Result:", result);

      if (result.success) {
        onSubmit();
      } else {
        // This will now show the SPECIFIC error message from Web3Forms
        alert(`Transmission Error: ${result.message}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Fetch System Error:", error);
      alert("System Error: Check network connection and retry.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-left relative w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-[2px] w-8 bg-blue-500" aria-hidden="true" />
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
        {/* Anti-Spam Honeypot */}
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          style={{ display: "none" }}
        />

        <div className="grid grid-cols-1 gap-5">
          <input
            type="hidden"
            name="subject"
            value={`New Discovery: ${tier} Project`}
          />
          <input
            type="hidden"
            name="from_name"
            value="Shinn Digital Terminal"
          />

          <div className="group relative">
            <input
              type="text"
              name="Client_Name"
              placeholder="FULL NAME"
              value={clientName}
              onChange={handleNameChange}
              required
              className="w-full bg-slate-950/50 border border-white/20 p-5 rounded-2xl text-white font-mono text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 uppercase tracking-widest"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="email"
              name="Email"
              placeholder="EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-950/50 border border-white/20 p-5 rounded-2xl text-white font-mono text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 uppercase tracking-widest"
            />
            <input
              type="tel"
              name="Phone"
              placeholder="PHONE NUMBER"
              value={phone}
              onChange={handlePhoneChange}
              required
              className="w-full bg-slate-950/50 border border-white/20 p-5 rounded-2xl text-white font-mono text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 uppercase tracking-widest"
            />
          </div>

          <div className="group relative">
            <textarea
              name="Additional_Intel"
              placeholder="ADDITIONAL INTEL (OPTIONAL)..."
              className="w-full min-h-[120px] bg-slate-950/50 border border-white/20 p-5 rounded-2xl text-white font-mono text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 uppercase tracking-widest resize-y"
            ></textarea>
          </div>
        </div>

        {questions &&
          questions.map((q, index) => (
            <input
              key={q.id}
              type="hidden"
              name={`Q${q.id}: ${q.text}`}
              value={allAnswers[index] || "Not Provided"}
            />
          ))}

        <input type="hidden" name="System_Tier" value={tier} />
        <input type="hidden" name="System_Quote" value={price} />
        <input type="hidden" name="System_Score" value={score} />

        <div className="relative mt-4">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-2xl transition-all shadow-[0_0_25px_rgba(37,99,235,0.3)] uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 cursor-pointer ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Transmitting..." : "Secure Strategy Brief"}
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
