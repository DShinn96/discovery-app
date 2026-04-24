import React, { useState } from "react";

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
        alert("Oops! There was a problem submitting your form.");
        setIsSubmitting(false);
      }
    } catch (error) {
      alert("Submission failed. Check your connection.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 text-left">
      <h2 className="text-2xl font-bold mb-2 text-white">Final Step</h2>
      <p className="text-slate-400 text-sm mb-6">
        Enter your details to receive your official brief.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="hidden"
            name="_next"
            value="https://discoveryoursite.com"
          />
          {/* Name Field */}
          <input
            type="text"
            name="Client Name"
            placeholder="Full Name"
            required
            className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition-all"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strict Email Field */}
            <input
              type="email"
              name="_replyto"
              placeholder="Email Address"
              required
              className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition-all"
            />

            {/* Strict Number Field */}
            <input
              type="tel"
              name="Phone Number"
              placeholder="Phone Number"
              pattern="[0-9]{10,15}"
              title="Please enter a valid phone number (digits only)"
              required
              className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* HIDDEN LOGIC DATA */}
        <input type="hidden" name="Calculated Tier" value={tier} />
        <input type="hidden" name="Estimated Quote" value={price} />
        <input type="hidden" name="Algorithm Score" value={score} />

        {/* HIDDEN QUESTION RESPONSES */}
        {allAnswers &&
          allAnswers.map((answer, index) => (
            <input
              key={index}
              type="hidden"
              name={`Question_${index + 1}`}
              value={answer || "No answer provided"}
            />
          ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-blue-900/30 active:scale-[0.98] ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? "Sending..." : "Secure My Estimate"}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
