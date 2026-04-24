import { useState } from "react";

export default function LeadForm({ onSubmit, score }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Replace YOUR_FORM_ID with your actual Formspree ID
    const response = await fetch("https://formspree.io/f/mnjllore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        score: score,
        _subject: `New Lead: ${name} wants a ${score} point site`, // Customize the subject line
      }),
    });

    if (response.ok) {
      onSubmit();
    } else {
      alert("Submission failed. Please check your connection and try again.");
    }
    setLoading(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold mb-4 text-center">One last thing...</h2>
      <p className="text-slate-400 mb-8 text-center">
        Enter your details to reveal your custom package recommendation and
        pricing estimate.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5">
            Full Name
          </label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5">
            Email Address
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-blue-900/20"
        >
          {loading ? "Calculating..." : "See My Recommendation"}
        </button>
      </form>
    </div>
  );
}
