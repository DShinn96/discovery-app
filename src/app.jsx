import { useState } from "react";
import { questions, tiers } from "./data";
import { LeadForm } from "./lead-form";
import "./app.css";
import { Analytics } from "@vercel/analytics/next"

// Updated internal tier mapping for the lowered pricing
const UPDATED_TIERS = [
  { min: 0, max: 25, name: "Tier 1", price: "$80 - $150", desc: "Landing Pages & Basic Fixes" },
  { min: 26, max: 45, name: "Tier 2", price: "$200 - $450", desc: "Small Business Sites & Portfolios" },
  { min: 46, max: 65, name: "Tier 3", price: "$500 - $900", desc: "CMS, E-commerce & Complex SEO" },
  { min: 66, max: 90, name: "Tier 4", price: "$1,000 - $2,500", desc: "Custom Web Apps & API Integration" },
  { min: 91, max: 200, name: "Tier 5", price: "$3,000+", desc: "Full Enterprise Systems & Architecture" },
];

function App() {
  const [view, setView] = useState("quiz"); 
  const [currentStep, setCurrentStep] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [answers, setAnswers] = useState([]); // Track actual text responses
  const [showForm, setShowForm] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    // 1. Update score
    setTotalScore((prev) => prev + option.points);
    
    // 2. Save the full answer text for the email
    setAnswers((prev) => [...prev, option.text]);

    // 3. Navigate
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowForm(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setTotalScore(0);
    setAnswers([]);
    setShowForm(false);
    setShowResult(false);
    setView("quiz");
  };

  // Using the updated local tiers for the new pricing
const recommendedTier = UPDATED_TIERS.find(
  (tier) => totalScore >= tier.min && totalScore <= tier.max
) || UPDATED_TIERS[0]; // Fallback to Tier 1

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col font-sans selection:bg-blue-500/30">
      {/* --- HEADER --- */}
      <header className="w-full py-6 px-8 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button
            onClick={() => setView("quiz")}
            className="flex items-center gap-2 cursor-pointer group bg-transparent border-none p-0"
          >
            {/* UPDATED: Using SVG Icon */}
            <img src="/shinn-digital-icon.svg" alt="DS" className="w-8 h-8 shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform" />
            <span className="font-bold tracking-tight text-xl uppercase italic">
              Shinn <span className="text-blue-500">Digital</span>
            </span>
          </button>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <button
              onClick={() => setView("portfolio")}
              className={`hover:text-white transition-colors cursor-pointer bg-transparent border-none ${view === "portfolio" ? "text-white underline underline-offset-8 decoration-blue-500" : ""}`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setView("services")}
              className={`hover:text-white transition-colors cursor-pointer bg-transparent border-none ${view === "services" ? "text-white underline underline-offset-8 decoration-blue-500" : ""}`}
            >
              Services
            </button>
            <div className="flex items-center gap-2 bg-blue-600/10 text-blue-400 px-4 py-2 rounded-full border border-blue-600/20 text-xs font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              DISCOVERY MODE
            </div>
          </nav>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-grow flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        {view === "quiz" && (
          <div className="w-full max-w-xl bg-slate-900/80 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!showForm && !showResult && (
              <div className="flex flex-col">
                <div className="w-full bg-slate-800 h-2.5 rounded-full mb-8 overflow-hidden border border-slate-700">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="mb-8">
                  <span className="text-blue-500 font-bold uppercase tracking-widest text-[10px] bg-blue-500/10 px-2 py-1 rounded">
                    Question {currentStep + 1} of {questions.length}
                  </span>
                  <h1 className="text-2xl font-bold mt-4 leading-tight">
                    {questions[currentStep].text}
                  </h1>
                </div>
                <div className="flex flex-col gap-3">
                  {questions[currentStep].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left p-5 rounded-2xl border border-slate-800 bg-slate-800/40 hover:border-blue-500 hover:bg-slate-800 hover:translate-x-1 transition-all duration-200 cursor-pointer group"
                    >
                      <span className="group-hover:text-blue-400 transition-colors font-medium">
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {showForm && !showResult && (
              <LeadForm
                score={totalScore}
                tier={recommendedTier?.name}
                price={recommendedTier?.price}
                allAnswers={answers} // Passing all 20 responses
                onSubmit={() => {
                  setShowForm(false);
                  setShowResult(true);
                }}
              />
            )}
            {showResult && (
              <div className="text-center py-6 animate-in zoom-in fade-in duration-700">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">
                  Recommended Solution
                </h2>
                <h1 className="text-5xl font-black mb-6 tracking-tight italic">
                  {recommendedTier?.name}
                </h1>
                <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800 mb-8">
                  <p className="text-slate-500 text-xs mb-1 uppercase font-bold tracking-tighter">
                    Estimated Investment
                  </p>
                  <p className="text-4xl font-mono text-white font-bold">
                    {recommendedTier?.price}
                  </p>
                </div>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
                  I've received your requirements. I'll analyze the scope and
                  reach out via email within 24 hours to talk shop.
                </p>
                <button
                  onClick={resetQuiz}
                  className="text-slate-600 hover:text-white font-bold uppercase tracking-widest text-[10px] cursor-pointer bg-transparent border-none"
                >
                  Restart Discovery
                </button>
              </div>
            )}
          </div>
        )}

        {/* SERVICES VIEW (Same as your current code) */}
        {view === "services" && (
           <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* ... same expertise grid as before ... */}
           </div>
        )}

        {/* PORTFOLIO VIEW (Same as your current code) */}
        {view === "portfolio" && (
          <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* ... same gallery grid as before ... */}
          </div>
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full py-16 px-8 border-t border-slate-900 bg-slate-950">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-6">
              {/* UPDATED: Using SVG Icon */}
              <img src="/shinn-digital-icon.svg" alt="SD" className="w-8 h-8" />
              <span className="font-bold tracking-tight text-sm uppercase italic">
                Shinn <span className="text-blue-500">Digital</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Engineering high-performance digital systems for local pros and
              national businesses. Based in Nashville, TN.
            </p>
          </div>
          {/* ... socials and copyright as before ... */}
        </div>
      </footer>
    </div>
  );
}

export default App;