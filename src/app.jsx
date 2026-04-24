import { useState } from "react";
import { questions, tiers } from "./data";
import LeadForm from "./lead-form";
import "./app.css";

function App() {
  const [view, setView] = useState("quiz"); // 'quiz', 'services', or 'portfolio'
  const [currentStep, setCurrentStep] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (points) => {
    setTotalScore((prev) => prev + points);
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowForm(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setTotalScore(0);
    setShowForm(false);
    setShowResult(false);
    setView("quiz");
  };

  const recommendedTier = tiers.find(
    (tier) => totalScore >= tier.min && totalScore <= tier.max,
  );

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
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold group-hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">
              D
            </div>
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
        {/* QUIZ VIEW */}
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
                      onClick={() => handleAnswer(option.points)}
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
                onSubmit={() => {
                  setShowForm(false);
                  setShowResult(true);
                }}
              />
            )}
            {showResult && (
              <div className="text-center py-6 animate-in zoom-in fade-in duration-700">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M5 13l4 4L19 7"
                    ></path>
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

        {/* SERVICES VIEW */}
        {view === "services" && (
          <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 uppercase italic">
                My <span className="text-blue-500">Expertise</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                From high-conversion websites to custom enterprise software, we
                build digital tools that work as hard as you do.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Web Development",
                  desc: "Performance-first websites built with React and Tailwind. Designed to turn visitors into leads.",
                  tech: "Vite • React • Tailwind",
                  icon: "🌐",
                },
                {
                  title: "Software Engineering",
                  desc: "Custom C# and .NET solutions for desktop or web. Specialized in automating business logic.",
                  tech: "C# • .NET Core • ASP.NET",
                  icon: "🚀",
                },
                {
                  title: "Data Architecture",
                  desc: "Clean SQL database design to ensure your business data is secure, scalable, and organized.",
                  tech: "SQL Server • PostgreSQL • T-SQL",
                  icon: "💾",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 transition-all group"
                >
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {s.desc}
                  </p>
                  <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/5 py-1 px-2 rounded inline-block">
                    {s.tech}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PORTFOLIO VIEW */}
        {view === "portfolio" && (
          <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 uppercase italic">
                Project <span className="text-blue-500">Gallery</span>
              </h2>
              <p className="text-slate-400">
                A look at the functional systems we've shipped recently.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a
                href="https://game-day-tracker.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group hover:border-blue-500 transition-all flex flex-col decoration-none"
              >
                <div className="h-64 bg-slate-800 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-all"></div>
                  <span className="text-2xl font-black text-slate-700 uppercase italic group-hover:text-blue-500 transition-all">
                    Game Day Tracker
                  </span>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-bold text-white mb-2">
                    Game Day Tracker
                  </h4>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    A specialized web application for tracking live sports data
                    and game metrics in real-time. Built for mobile-first
                    performance.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded uppercase font-bold">
                      Vite
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded uppercase font-bold">
                      React
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded uppercase font-bold">
                      Vercel
                    </span>
                  </div>
                </div>
              </a>
              <div className="bg-slate-900/50 border border-slate-800 border-dashed rounded-3xl flex flex-col items-center justify-center text-slate-600 p-12 text-center">
                <div className="w-12 h-12 border-2 border-slate-800 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p className="font-bold uppercase tracking-tighter italic">
                  Engineering the next project...
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full py-16 px-8 border-t border-slate-900 bg-slate-950">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold">
                SD
              </div>
              <span className="font-bold tracking-tight text-sm uppercase italic">
                Shinn Digital
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Engineering high-performance digital systems for local pros and
              national businesses. Based in Nashville, TN.
            </p>
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
              <a
                href="https://www.facebook.com/shinndigital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors font-bold uppercase tracking-widest text-xs"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/in/david-shinn1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors font-bold uppercase tracking-widest text-xs"
              >
                LinkedIn
              </a>
              <a
                href="mailto:shinn.digital@yahoo.com"
                className="text-slate-400 hover:text-blue-400 transition-colors font-bold uppercase tracking-widest text-xs"
              >
                Email
              </a>
            </div>
            <div className="md:text-right">
              <p className="text-slate-600 font-medium">
                &copy; 2026 Shinn Digital. All rights reserved.
              </p>
              <p className="text-slate-800 text-[10px] mt-1 uppercase font-black">
                Powered by .NET & React Architecture
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
