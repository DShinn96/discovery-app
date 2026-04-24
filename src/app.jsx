import { useState } from "react";
import { questions } from "./data";
import LeadForm from "./lead-form"; // Ensure this matches your default export in lead-form.jsx
import { Analytics } from "@vercel/analytics/react";
import "./app.css";

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
  const [answers, setAnswers] = useState([]); 
  const [showForm, setShowForm] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const recommendedTier = UPDATED_TIERS.find(
    (tier) => totalScore >= tier.min && totalScore <= tier.max
  ) || UPDATED_TIERS[0];

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (option) => {
    setTotalScore((prev) => prev + option.points);
    // Correctly tracking the text of the answer for your email
    setAnswers((prev) => [...prev, option.text]);
    
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

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col font-sans selection:bg-blue-500/30">
      <Analytics />
      
      {/* --- HEADER --- */}
      <header className="w-full py-6 px-8 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button onClick={() => setView("quiz")} className="flex items-center gap-2 cursor-pointer group bg-transparent border-none p-0 text-left">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20 group-hover:bg-blue-500 transition-all">
              SD
            </div>
            <span className="font-bold tracking-tight text-xl uppercase italic text-white">
              Shinn <span className="text-blue-500">Digital</span>
            </span>
          </button>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <button onClick={() => setView("portfolio")} className={`hover:text-white transition-colors cursor-pointer bg-transparent border-none ${view === "portfolio" ? "text-white underline underline-offset-8 decoration-blue-500" : ""}`}>Portfolio</button>
            <button onClick={() => setView("services")} className={`hover:text-white transition-colors cursor-pointer bg-transparent border-none ${view === "services" ? "text-white underline underline-offset-8 decoration-blue-500" : ""}`}>Services</button>
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

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        {view === "quiz" && (
          <div className="w-full max-w-xl bg-slate-900/80 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!showForm && !showResult && (
              <div className="flex flex-col">
                <div className="w-full bg-slate-800 h-2.5 rounded-full mb-8 overflow-hidden border border-slate-700">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(37,99,235,0.4)]" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="mb-8">
                  <span className="text-blue-500 font-bold uppercase tracking-widest text-[10px] bg-blue-500/10 px-2 py-1 rounded">Question {currentStep + 1} of {questions.length}</span>
                  <h1 className="text-2xl font-bold mt-4 leading-tight">{questions[currentStep].text}</h1>
                </div>
                <div className="flex flex-col gap-3">
                  {questions[currentStep].options.map((option, index) => (
                    <button key={index} onClick={() => handleAnswer(option)} className="w-full text-left p-5 rounded-2xl border border-slate-800 bg-slate-800/40 hover:border-blue-500 hover:bg-slate-800 hover:translate-x-1 transition-all">
                      <span className="hover:text-blue-400 transition-colors font-medium">{option.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {showForm && !showResult && (
              <LeadForm score={totalScore} tier={recommendedTier.name} price={recommendedTier.price} allAnswers={answers} onSubmit={() => { setShowForm(false); setShowResult(true); }} />
            )}
            {showResult && (
              <div className="text-center py-6 animate-in zoom-in fade-in duration-700">
                <h1 className="text-5xl font-black mb-6 tracking-tight italic">{recommendedTier.name}</h1>
                <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800 mb-8">
                  <p className="text-4xl font-mono text-white font-bold">{recommendedTier.price}</p>
                </div>
                <button onClick={resetQuiz} className="text-slate-600 hover:text-white font-bold uppercase tracking-widest text-[10px] bg-transparent border-none cursor-pointer">Restart Discovery</button>
              </div>
            )}
          </div>
        )}

        {/* ... Rest of views (Services/Portfolio) stay the same ... */}
        {view === "services" && (
          <div className="w-full max-w-5xl text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-4xl font-black mb-12 uppercase italic">My <span className="text-blue-500">Expertise</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">Web Development</div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">Software Engineering</div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">Data Architecture</div>
            </div>
          </div>
        )}

        {view === "portfolio" && (
          <div className="w-full max-w-5xl text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-4xl font-black mb-12 uppercase italic">Project <span className="text-blue-500">Gallery</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a href="https://game-day-tracker.vercel.app/" target="_blank" rel="noreferrer" className="bg-slate-900 border border-slate-800 rounded-3xl p-12 hover:border-blue-500 transition-all block">Game Day Tracker</a>
            </div>
          </div>
        )}
      </main>

{/* --- FOOTER --- */}
      <footer className="w-full py-16 px-8 border-t border-slate-900 bg-slate-950">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm text-left">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center text-xs font-bold text-white">SD</div>
              <span className="font-bold tracking-tight text-sm uppercase italic text-white">Shinn <span className="text-blue-500">Digital</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">Engineering high-performance digital systems for local pros and national businesses. Based in Nashville, TN.</p>
            
            {/* RESTORED: The "Fun Little Tag Line" */}
            <p className="text-slate-400 text-xs italic">
              Not a fan of quizzes? Just shoot me an{" "}
              <a
                href="mailto:david@shinndigital.com"
                className="text-blue-500 hover:underline"
              >
                email
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-6 text-sm">
            <div className="flex gap-8">
              <a href="https://www.facebook.com/shinndigital" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors uppercase font-bold text-xs">Facebook</a>
              <a href="https://www.linkedin.com/in/david-shinn1/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors uppercase font-bold text-xs">LinkedIn</a>
              <a href="mailto:shinn.digital@yahoo.com" className="text-slate-400 hover:text-blue-400 transition-colors uppercase font-bold text-xs">Email</a>
            </div>
            <div className="md:text-right">
              <p className="text-slate-600">&copy; 2026 Shinn Digital. All rights reserved.</p>
              <p className="text-slate-800 text-[10px] mt-1 uppercase font-black">
                Powered Modern React & Tailwind Architecture
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;