import React from "react";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

// Reuse the high-quality assets
import anxietyImg from "../../assets/marek-studzinski-7QusMpfuKIc-unsplash.jpg";
import depressionImg from "../../assets/markus-spiske-wSJ2mM25F8Y-unsplash.jpg";

const ProblemAwareness = () => {
  const problems = [
    {
      title: "Anxiety",
      img: anxietyImg,
      description:
        "Constant worrying or fear that interferes with daily activities and peace of mind. We utilize GAD-7 to assess your anxiety levels.",
      color: "blue",
      tag: "Support Available",
    },
    {
      title: "Depression",
      img: depressionImg,
      description:
        "Persistent sadness or loss of interest in things you once loved to do. Our assessments use the GDS-15 scale for elderly depression.",
      color: "emerald",
      tag: "You're Not Alone",
    },
  ];

  const questions = [
    "Are you worried?",
    "Are you sad?",
    "Are you feeling lonely?",
    "Are you having difficulties in coping?",
    "Are you thinking of something unusual?",
    "What are my lifestyle risks?",
  ];

  return (
    <section className="py-24 relative bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-16 max-w-4xl mx-auto space-y-6">
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-primary/40" />
              <span className="inline-block py-2 px-6 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm tracking-wide uppercase border border-slate-200 dark:border-slate-700">
                Personalized Care
              </span>
              <div className="h-px w-12 bg-primary/40" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Understanding your <br />
              <span className="text-primary">emotional path.</span>
            </h2>
          </div>

          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-semibold max-w-3xl mx-auto">
            Navigating mental health is a journey of courage. We provide the tools and support to help you reclaim your inner peace.
          </p>
        </div>

        {/* ── Floating Questions -> Solid Grid ── */}
        <div className="mb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {questions.map((q, i) => (
            <div
              key={i}
              className="px-6 py-6 bg-white dark:bg-slate-800 rounded-md border-l-4 border-l-primary border-t border-r border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold text-left text-lg shadow-sm flex items-start gap-4"
            >
              <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <span>{q}</span>
            </div>
          ))}
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
          {problems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-stretch bg-white dark:bg-slate-800 rounded-md shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              {/* Image Container */}
              <div className="w-full md:w-[450px] relative shrink-0">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover min-h-[300px]"
                />
                
                {/* Peer-reviewed chip */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">{item.tag}</span>
                </div>
              </div>

              {/* Content Container */}
              <div className="flex-grow flex flex-col justify-between p-8 md:p-10 space-y-6">
                <div className="space-y-4">
                  <span className="text-sm font-bold uppercase tracking-wider text-primary">
                    {item.color === "blue" ? "Anxiety Disorder" : "Depressive Disorder"}
                  </span>
                  <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {item.title}
                  </h3>
                  <div className="h-1 w-16 bg-primary rounded" />
                  
                  <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Link
                    to="/selfassessment"
                    className="inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 px-6 py-4 rounded-md font-bold text-lg transition-colors"
                  >
                    Take assessment
                    <ArrowRight size={20} />
                  </Link>

                  <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                    <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-500" />
                    Clinically Validated
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom Quote ── */}
        <div className="mt-24 text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-6 px-10 py-8 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm max-w-4xl mx-auto">
            <div className="w-16 h-16 rounded-md bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
              <Sparkles size={28} className="text-primary" />
            </div>
            <p className="text-slate-800 dark:text-slate-200 font-extrabold text-2xl tracking-tight leading-snug text-left">
              "Your mental health is the foundation of a vibrant life."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProblemAwareness;
