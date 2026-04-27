import { useState, useEffect } from "react";
import { questions } from "./data";
import LeadForm from "./lead-form";
import { Analytics } from "@vercel/analytics/react";
import { motion, AnimatePresence } from "framer-motion";

// Performance Injection: Optimized for React 19
const initPerformance = async () => {
  const { injectSpeedInsights } = await import("@vercel/speed-insights");
  injectSpeedInsights();
};

const UPDATED_TIERS = [
  {
    min: 0,
    max: 25,
    name: "Tier 1",
    price: "$100 - $175",
    desc: "Landing Pages & Basic Fixes",
  },
  {
    min: 26,
    max: 45,
    name: "Tier 2",
    price: "$200 - $450",
    desc: "Small Business Sites & Portfolios",
  },
  {
    min: 46,
    max: 65,
    name: "Tier 3",
    price: "$500 - $950",
    desc: "CMS, E-commerce & Complex SEO",
  },
  {
    min: 66,
    max: 90,
    name: "Tier 4",
    price: "$1,000 - $2,500",
    desc: "Custom Web Apps & API Integration",
  },
  {
    min: 91,
    max: 200,
    name: "Tier 5",
    price: "$3,000+",
    desc: "Full Enterprise Systems & Architecture",
  },
];

// PROTECTED ASSET: Chevrons (Grey & Blue)
const BrandLogo = ({ className }) => (
  <svg
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M100 150L250 300L100 450"
      stroke="#2563EB"
      strokeWidth="80"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M280 150L430 300L280 450"
      stroke="#94a3b8"
      strokeWidth="80"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    document.title = "Discovery Terminal | Shinn Digital";
    initPerformance();
  }, []);

  const recommendedTier =
    UPDATED_TIERS.find((t) => totalScore >= t.min && totalScore <= t.max) ||
    UPDATED_TIERS[0];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (option) => {
    setTotalScore((prev) => prev + option.points);
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
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-hidden">
      <Analytics />

      {/* --- TACTICAL HEADER --- */}
      <header className="w-full py-6 px-8 border-b border-slate-900 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-default group">
            <BrandLogo className="w-10 h-10 drop-shadow-[0_0_8px_rgba(37,99,235,0.3)] transition-transform duration-500 group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="font-black tracking-tighter text-xl uppercase italic leading-none">
                Shinn <span className="text-blue-500">Digital</span>
              </span>
              <span className="text-[9px] font-mono tracking-[0.3em] text-slate-500 uppercase">
                Discovery Terminal
              </span>
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 bg-blue-600/10 text-blue-400 px-4 py-2 rounded-full border border-blue-600/20 text-[10px] font-black hover:bg-blue-600/20 transition-all uppercase tracking-widest active:scale-95"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Restart Intel
          </button>
        </div>
      </header>

      {/* --- MAIN DISCOVERY ENGINE --- */}
      <main className="grow flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 relative">
        {/* Background Grid Decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="w-full max-w-2xl relative z-10">
          <AnimatePresence mode="wait">
            {!showForm && !showResult ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-panel p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
              >
                {/* Visual Scanner Bar */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-500/30 shadow-[0_0_15px_#3b82f6] animate-scan" />

                <div className="flex justify-between items-end mb-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-blue-500 font-mono font-bold uppercase tracking-[0.4em] text-[10px]">
                      Mission Objective {currentStep + 1}
                    </span>
                    <h2 className="text-slate-400 font-mono text-xs uppercase tracking-widest">
                      Capture In Progress
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-blue-400/60 font-bold">
                    {Math.round(progress)}%
                  </span>
                </div>

                <div className="w-full bg-slate-800/50 h-1.5 rounded-full mb-12 overflow-hidden border border-white/5">
                  <motion.div
                    className="bg-blue-600 h-full rounded-full progress-glow"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h1 className="text-2xl md:text-3xl font-bold mb-10 leading-tight tracking-tight text-white">
                      {questions[currentStep].text}
                    </h1>

                    <div className="flex flex-col gap-4">
                      {questions[currentStep].options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{
                            x: 6,
                            backgroundColor: "rgba(59, 130, 246, 0.08)",
                          }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleAnswer(option)}
                          className="w-full text-left p-6 rounded-2xl border border-white/5 bg-white/[0.03] hover:border-blue-500/40 transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="group-hover:text-blue-400 transition-colors font-medium text-lg">
                              {option.text}
                            </span>
                            <div className="w-5 h-5 rounded-full border border-slate-700 group-hover:border-blue-500 transition-colors flex items-center justify-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ) : showForm && !showResult ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-blue-500/20"
              >
                <LeadForm
                  score={totalScore}
                  tier={recommendedTier.name}
                  price={recommendedTier.price}
                  allAnswers={answers}
                  onSubmit={() => {
                    setShowForm(false);
                    setShowResult(true);
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, zoom: 0.9 }}
                animate={{ opacity: 1, zoom: 1 }}
                className="text-center py-10 glass-panel border border-blue-500/30 rounded-[3rem] p-12"
              >
                <span className="text-blue-500 font-mono font-bold uppercase tracking-[0.5em] text-xs mb-6 block">
                  Analysis Complete // Strategic Match
                </span>
                <h1 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter italic text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.4)] underline decoration-blue-500/50 decoration-8 underline-offset-8">
                  {recommendedTier.name}
                </h1>

                <div className="bg-slate-950/80 rounded-3xl p-8 border border-white/5 mb-10 max-w-sm mx-auto shadow-inner">
                  <p className="text-5xl font-mono text-white font-bold tracking-tighter">
                    {recommendedTier.price}
                  </p>
                  <p className="text-slate-500 text-[10px] mt-4 uppercase tracking-[0.3em] font-black">
                    Investment Bracket
                  </p>
                </div>

                <p className="text-slate-400 text-sm mb-10 max-w-xs mx-auto leading-relaxed">
                  Your project data has been transmitted. Our systems are
                  generating your Tactical Strategy Brief.
                </p>

                <button
                  onClick={resetQuiz}
                  className="text-slate-500 hover:text-white font-black uppercase tracking-[0.2em] text-[10px] bg-transparent border-none cursor-pointer transition-all flex items-center gap-2 mx-auto group"
                >
                  <span className="text-lg group-hover:rotate-180 transition-transform duration-500">
                    ↺
                  </span>
                  Restart Terminal
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* --- MASTER FOOTER --- */}
      <footer className="w-full py-16 px-8 border-t border-slate-900 bg-slate-950">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
          <div className="max-w-sm text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-6 opacity-80 group">
              <BrandLogo className="w-8 h-8" />
              <span className="font-bold tracking-tight text-sm uppercase italic text-white">
                Shinn <span className="text-blue-500">Digital</span>
              </span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed font-mono uppercase tracking-tighter">
              Secure Terminal Node 01 // Nashville, TN <br />
              High-Performance MERN Engineering
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-slate-500 font-medium text-sm">
              © 2026 Shinn Digital | Nashville, TN
            </p>
            <p className="text-blue-500/60 text-[10px] font-mono mt-3 tracking-widest uppercase font-bold">
              System Version: 3.0 | Build: Tactical_Alpha.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
