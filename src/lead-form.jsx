import React from 'react';

const LeadForm = ({ score, tier, price, allAnswers, onSubmit }) => {
  // REPLACE THIS with your actual Formspree ID from your dashboard
  const formspreeId = "your_id_here"; 

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <h2 className="text-2xl font-bold mb-2 text-white">Final Step</h2>
      <p className="text-slate-400 text-sm mb-6">Enter your details to receive your official brief.</p>
      
      <form 
        action={`https://formspree.io/f/mnjllore`} 
        method="POST" 
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" 
            name="Client Name" 
            placeholder="Your Name" 
            required 
            className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition-all"
          />
          <input 
            type="email" 
            name="_replyto" 
            placeholder="Email Address" 
            required 
            className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* HIDDEN LOGIC DATA */}
        <input type="hidden" name="Calculated Tier" value={tier} />
        <input type="hidden" name="Estimated Quote" value={price} />
        <input type="hidden" name="Algorithm Score" value={score} />

        {/* HIDDEN QUESTION RESPONSES - This fixes the "No answer provided" issue */}
        {allAnswers && allAnswers.map((answer, index) => (
          <input 
            key={index} 
            type="hidden" 
            name={`Question_${index + 1}`} 
            value={answer || "No answer provided"} 
          />
        ))}

        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-blue-900/30 active:scale-[0.98]"
        >
          Secure My Estimate
        </button>
      </form>
    </div>
  );
};

// This line fixes the Vite [MISSING_EXPORT] error
export default LeadForm;