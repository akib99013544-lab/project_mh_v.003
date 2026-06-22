import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
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
        "Constant worrying or fear that interferes with daily activities and peace of mind.",
      color: "blue",
      tag: "Support Available",
    },
    {
      title: "Depression",
      img: depressionImg,
      description:
        "Persistent sadness or loss of interest in things you once loved to do.",
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
    <section className="py-40 relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Soft Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/4 -translate-x-1/4" />

      {/* Fine research-grid texture — same as hero */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018] dark:opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.6) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Floating Questions ── */}
        <div className="mb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {questions.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="px-6 py-5 md:px-8 md:py-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 font-black text-center text-lg md:text-xl tracking-tight hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] transition-all flex items-center justify-center cursor-pointer"
            >
              {q}
            </motion.div>
          ))}
        </div>

        {/* ── Section Header ── */}
        <div className="text-center mb-28 max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {/* Eyebrow — matches hero eyebrow rhythm */}
            <div className="inline-flex items-center gap-3 mb-7">
              <div className="h-px w-8 bg-primary/40" />
              <span className="inline-block py-2 px-5 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 font-black text-[10px] tracking-[0.28em] uppercase border border-slate-100 dark:border-slate-800">
                Personalized Care
              </span>
              <div className="h-px w-8 bg-primary/40" />
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08]">
              Understanding your <br />
              <span className="text-primary italic font-serif">emotional path.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-2xl mx-auto"
          >
            Navigating mental health is a journey of courage. We provide the tools and support to help you reclaim your inner peace.
          </motion.p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 gap-10 max-w-5xl mx-auto">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -28 : 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-10 bg-white dark:bg-slate-900 rounded-[4rem] p-6 shadow-[0_15px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_15px_60px_rgba(0,0,0,0.25)] border border-slate-50 dark:border-slate-800 hover:border-primary/20 dark:hover:border-primary/25 transition-all duration-700 group"
            >
              {/* Image Container */}
              <div className="w-full md:w-[400px] h-[300px] rounded-[3rem] overflow-hidden shrink-0 relative">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

                {/* Peer-reviewed chip — research tone */}
                <div className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{item.tag}</span>
                </div>

                {/* Scale badge bottom-right — reinforces clinical credibility */}
                <div className="absolute bottom-5 right-5 px-3 py-1.5 bg-black/30 backdrop-blur-md rounded-xl border border-white/10">
                  <span className="text-[9px] font-black text-white/70 uppercase tracking-[0.18em]">
                    {item.color === "blue" ? "GAD-7 Scale" : "GDS-15 Scale"}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="flex-grow space-y-6 px-4 py-4">
                <div className="space-y-3">
                  {/* Small label above title */}
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary/60 dark:text-primary/50">
                    {item.color === "blue" ? "Anxiety Disorder" : "Depressive Disorder"}
                  </span>
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300 leading-none">
                    {item.title}
                  </h3>
                  {/* Animated underline rule */}
                  <div
                    className={`h-[3px] w-12 rounded-full transition-all duration-500 group-hover:w-28 ${item.color === "blue"
                        ? "bg-blue-400/30 group-hover:bg-blue-400/60"
                        : "bg-emerald-400/30 group-hover:bg-emerald-400/60"
                      }`}
                  />
                </div>

                <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {item.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

                <div className="flex items-center justify-between">
                  <Link
                    to="/selfassessment"
                    className="inline-flex items-center gap-3 text-slate-900 dark:text-white font-black text-base group/btn"
                  >
                    Take assessment
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-300">
                      <ArrowRight size={18} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>

                  {/* Subtle validated tag */}
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-slate-300 dark:text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Clinically Validated
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mt-28 text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-6 px-10 py-6 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center border border-slate-100 dark:border-slate-700">
              <Sparkles size={22} className="text-primary animate-pulse" />
            </div>
            <p className="text-slate-600 dark:text-slate-300 font-black text-lg md:text-xl tracking-tight">
              "Your mental health is the foundation of a vibrant life."
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProblemAwareness;
