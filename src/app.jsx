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
const BrandLogo = ({
  className,
  title = "Shinn Digital | Veteran-Owned Web Creation",
}) => (
  <svg
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-hidden="true"
  >
    <title>{title}</title>
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
    // AGGRESSIVE SEO: Direct intent in document title
    document.title = "Get a Custom Website Quote | Shinn Digital";
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
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-hidden transform-gpu">
      <Analytics />

      {/* --- TACTICAL HEADER --- */}
      <header className="w-full py-6 px-8 border-b border-slate-900 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <a
            href="https://shinndigital.com"
            className="flex items-center gap-3 cursor-pointer group"
            aria-label="Return to Shinn Digital Home"
          >
            <BrandLogo className="w-10 h-10 drop-shadow-[0_0_8px_rgba(37,99,235,0.3)] transition-transform duration-500 group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="font-black tracking-tighter text-xl uppercase italic leading-none">
                Shinn <span className="text-blue-500">Digital</span>
              </span>
              <span className="text-[9px] font-mono tracking-[0.3em] text-slate-500 uppercase">
                Veteran-Owned Web Solutions
              </span>
            </div>
          </a>

          <button
            onClick={resetQuiz}
            aria-label="Restart Quote Process"
            className="flex items-center gap-2 bg-blue-600/10 text-blue-400 px-4 py-2 rounded-full border border-blue-600/20 text-[10px] font-black hover:bg-blue-600/20 cursor-pointer transition-all uppercase tracking-widest active:scale-95"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Restart Quote
          </button>
        </div>
      </header>

      {/* --- MAIN DISCOVERY ENGINE --- */}
      {/* BUILD FIX: Updated radial-gradient syntax to modern center-top standards */}
      <main className="grow flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_center_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="w-full max-w-2xl relative z-10">
          <AnimatePresence mode="wait">
            {!showForm && !showResult ? (
              <motion.div
                key="quiz"
                // PERFORMANCE FIX: Skip entry animation for Step 0 to dramatically improve LCP
                initial={
                  currentStep === 0 ? { opacity: 1 } : { opacity: 0, y: 20 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="glass-panel p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 w-full h-px bg-blue-500/30 shadow-[0_0_15px_#3b82f6] animate-scan will-change-transform"
                  aria-hidden="true"
                />

                <div className="flex justify-between items-end mb-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-blue-500 font-mono font-bold uppercase tracking-[0.4em] text-[10px]">
                      Estimate Analysis {currentStep + 1}
                    </span>
                    <h2 className="text-slate-400 font-mono text-xs uppercase tracking-widest">
                      Small Business Strategy Build
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-blue-400/60 font-bold">
                    {Math.round(progress)}%
                  </span>
                </div>

                <div
                  className="w-full bg-slate-800/50 h-1.5 rounded-full mb-12 overflow-hidden border border-white/5"
                  role="progressbar"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <motion.div
                    className="bg-blue-600 h-full rounded-full progress-glow"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h1 className="text-2xl md:text-3xl font-bold mb-10 leading-tight tracking-tight text-white">
                      {questions[currentStep].text}
                    </h1>

                    <div className="flex flex-col gap-4">
                      {questions[currentStep].options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{
                            x: 4,
                            backgroundColor: "rgba(59, 130, 246, 0.08)",
                          }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleAnswer(option)}
                          className="w-full text-left p-6 rounded-2xl border border-white/5 bg-white/3 hover:border-blue-500/40 transition-all group cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <span className="group-hover:text-blue-400 transition-colors font-medium text-lg">
                              {option.text}
                            </span>
                            <div
                              className="w-5 h-5 rounded-full border border-slate-700 group-hover:border-blue-500 transition-colors flex items-center justify-center"
                              aria-hidden="true"
                            >
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
                initial={{ opacity: 0, scale: 0.98 }}
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
                initial={{ opacity: 0, zoom: 0.95 }}
                animate={{ opacity: 1, zoom: 1 }}
                className="text-center py-10 glass-panel border border-blue-500/30 rounded-[3rem] p-12"
              >
                <span className="text-blue-500 font-mono font-bold uppercase tracking-[0.5em] text-xs mb-6 block">
                  Analysis Complete // Investment Roadmap
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
                  Your business data has been transmitted. Our systems are
                  generating your custom development roadmap.
                </p>

                <button
                  onClick={resetQuiz}
                  className="text-slate-500 hover:text-white font-black uppercase tracking-[0.2em] text-[10px] bg-transparent border-none cursor-pointer transition-all flex items-center gap-2 mx-auto group"
                >
                  <span
                    className="text-lg group-hover:rotate-180 transition-transform duration-500"
                    aria-hidden="true"
                  >
                    ↺
                  </span>
                  Restart Quote
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
            <a
              href="https://shinndigital.com"
              className="flex items-center gap-3 mb-6 opacity-80 group hover:opacity-100 transition-opacity cursor-pointer"
              aria-label="Shinn Digital Home"
            >
              <BrandLogo className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />
              <span className="font-bold tracking-tight text-sm uppercase italic text-white">
                Shinn <span className="text-blue-500">Digital</span>
              </span>
            </a>

            <p className="text-slate-600 text-[11px] leading-relaxed font-mono uppercase tracking-tighter">
              Secure Terminal Node 01 // Nationwide USA <br />
              Veteran-Owned Web Creation & Development
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <nav
              className="flex items-center gap-5 mb-6"
              aria-label="Social Uplinks"
            >
              <a
                href="https://github.com/DShinn96"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-500 transition-colors"
                aria-label="View David Shinn on GitHub"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/shinndigital/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-500 transition-colors"
                aria-label="Connect with Shinn Digital on LinkedIn"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://x.com/DavidShinn7062"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-500 transition-colors"
                aria-label="Follow David Shinn on X"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/shinndigital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-500 transition-colors"
                aria-label="Follow Shinn Digital on Facebook"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="mailto:shinn.digital@yahoo.com"
                className="text-slate-500 hover:text-blue-500 transition-colors"
                aria-label="Email David Shinn Directly"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                </svg>
              </a>
            </nav>

            <p className="text-slate-500 font-medium text-sm">
              © 2026 Shinn Digital | Nationwide USA
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
