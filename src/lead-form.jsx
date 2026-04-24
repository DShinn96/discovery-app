import React from 'react';

export const LeadForm = ({ tier, priceRange, score, allAnswers }) => {
  // Replace this ID with your actual Formspree ID
  const formspreeId = "your_id_here"; 

  return (
    <form 
      action={`https://formspree.io/f/mnjllore`} 
      method="POST" 
      className="space-y-4"
    >
      <div className="grid grid-cols-1 gap-4">
        <input 
          type="text" 
          name="Client Name" 
          placeholder="Full Name" 
          required 
          className="bg-slate-800 border-slate-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="email" 
          name="_replyto" 
          placeholder="Email Address" 
          required 
          className="bg-slate-800 border-slate-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* HIDDEN FIELDS: This is what Formspree reads but the user doesn't see */}
      <input type="hidden" name="_subject" value={`New Lead: ${tier} Inquiry`} />
      <input type="hidden" name="Calculated Tier" value={tier} />
      <input type="hidden" name="Estimated Quote" value={priceRange} />
      <input type="hidden" name="Total Algorithm Score" value={score} />

      {/* Mapping all 20 questions into the email data */}
      {allAnswers.map((answer, index) => (
        <input 
          key={index}
          type="hidden" 
          name={`Question_${index + 1}`} 
          value={answer?.label || "No answer provided"} 
        />
      ))}

      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20"
      >
        Send My Project Brief
      </button>
      
      <p className="text-center text-xs text-slate-500 mt-4">
        By submitting, you agree to receive a follow-up consultation regarding this estimate.
      </p>
    </form>
  );
};