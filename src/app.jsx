import { useState, useEffect } from "react";
import { questions } from "./data";
import LeadForm from "./lead-form";
import { Analytics } from "@vercel/analytics/react";

// Optimized Performance Injection
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
      stroke="#CBD5E1"
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
    document.title = "Discovery App | Shinn Digital";
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
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col font-sans selection:bg-blue-500/30">
      <Analytics />

      {/* --- HEADER --- */}
      <header className="w-full py-6 px-8 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <a
            href="https://shinndigital.com"
            className="flex items-center gap-3 cursor-pointer group no-underline"
          >
            <BrandLogo className="w-10 h-10 drop-shadow-[0_0_10px_rgba(37,99,235,0.2)] group-hover:scale-110 transition-transform duration-300" />
            <span className="font-bold tracking-tight text-xl uppercase italic text-white">
              Shinn <span className="text-blue-500">Digital</span>
            </span>
          </a>

          <nav className="flex items-center gap-4">
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 bg-blue-600/10 text-blue-400 px-4 py-2 rounded-full border border-blue-600/20 text-xs font-bold hover:bg-blue-600/20 transition-all cursor-pointer group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              DISCOVERY MODE
            </button>
          </nav>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="grow flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <div className="w-full max-w-xl bg-slate-900/80 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          {!showForm && !showResult && (
            <div className="flex flex-col">
              <div className="w-full bg-slate-800 h-2 rounded-full mb-8 overflow-hidden border border-slate-700">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="mb-8">
                <span className="text-blue-500 font-bold uppercase tracking-widest text-[10px] bg-blue-500/10 px-2 py-1 rounded">
                  Step {currentStep + 1} of {questions.length}
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
                    className="w-full text-left p-5 rounded-2xl border border-slate-800 bg-slate-800/40 hover:border-blue-500 hover:bg-slate-800 hover:translate-x-1 transition-all group"
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
              tier={recommendedTier.name}
              price={recommendedTier.price}
              allAnswers={answers}
              onSubmit={() => {
                setShowForm(false);
                setShowResult(true);
              }}
            />
          )}

          {showResult && (
            <div className="text-center py-6 animate-in zoom-in fade-in duration-700">
              <h1 className="text-5xl font-black mb-6 tracking-tight italic text-white underline decoration-blue-500 decoration-8 underline-offset-8">
                {recommendedTier.name}
              </h1>
              <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800 mb-8">
                <p className="text-4xl font-mono text-white font-bold">
                  {recommendedTier.price}
                </p>
                <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest font-bold">
                  Estimated Investment
                </p>
              </div>
              <button
                onClick={resetQuiz}
                className="text-slate-600 hover:text-white font-bold uppercase tracking-widest text-[10px] bg-transparent border-none cursor-pointer transition-colors"
              >
                Restart Discovery
              </button>
            </div>
          )}
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full py-16 px-8 border-t border-slate-900 bg-slate-950">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm text-left">
            <a
              href="https://shinndigital.com"
              className="flex items-center gap-3 mb-6 group no-underline"
            >
              <BrandLogo className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="font-bold tracking-tight text-sm uppercase italic text-white">
                Shinn <span className="text-blue-500">Digital</span>
              </span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Engineering high-performance digital systems for local pros and
              national businesses. Based in Nashville, TN.
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-slate-500 font-medium">
              © 2026 Shinn Digital | Handcrafted in Nashville, TN
            </p>
            <p className="text-slate-700 text-[10px] font-mono mt-2 tracking-[0.2em] uppercase font-bold">
              Build: v2.4.2026-STABLE
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
