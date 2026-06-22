import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import heroImage from "../../assets/hero_image.png";
import calmHero from "../../assets/calm_hero.png";
import { HeartHandshake, Sparkles } from "lucide-react";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden bg-calm-gradient">

      {/* ── Ambient background glows ── */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-12%] right-[-8%] w-[560px] h-[560px] bg-primary/6 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], rotate: [0, -60, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-12%] left-[-8%] w-[640px] h-[640px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none"
      />

      {/* ── Fine grid overlay for research texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.5) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 xl:gap-24 relative z-10">

        {/* ── Left content ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 text-center lg:text-left space-y-10"
        >

          {/* Eyebrow */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl glass-effect dark:glass-dark border border-white/50 dark:border-slate-700/50 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-[0.2em] font-sans">
                Prof. Dr. Khoka Hamiduzzaman Medical Research Team
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="space-y-4">
            {/* Research‑grade label line */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.28em] text-primary/70 dark:text-primary/60 font-sans">
                GAD‑7 &amp; GDS‑15 Validated Scales
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight font-sans">
              Evidence-based <br />
              <span className="text-primary italic font-serif">Affective Frailty Management.</span>
            </h1>
          </motion.div>

          {/* Body copy */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium font-sans"
          >
            An online assessment and referral platform to identify, track and support your emotional wellbeing.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link to="/selfassessment">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-black text-base rounded-[2rem] shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 transition-all"
              >
                Start Self-Check
              </motion.button>
            </Link>
            <Link to="/kotha">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black text-base rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700 flex items-center justify-center gap-3 transition-all"
              >
                Talk to KOTHA
              </motion.button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={itemVariants}
            className="pt-4 flex items-center justify-center lg:justify-start gap-5"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-11 h-11 rounded-full border-[3px] border-white dark:border-slate-900 overflow-hidden shadow-sm"
                >
                  <img
                    src={`https://i.pravatar.cc/150?img=${i + 20}`}
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-slate-900 dark:text-white font-black text-lg leading-tight">1,200+ Screenings</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider mt-0.5">
                Evidence-Based Assessments
              </p>
            </div>
          </motion.div>

          {/* Trust badges — the signature element: three pill stats that ground the hero in research */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2"
          >
            {[
              { value: "98%", label: "Clinical Accuracy" },
              { value: "GDS-15", label: "Validated Scale" },
              { value: "GAD-7", label: "Anxiety Screen" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl glass-effect dark:glass-dark border border-white/60 dark:border-slate-700/60 shadow-sm"
              >
                <span className="text-primary font-black text-base font-sans leading-none">{stat.value}</span>
                <span className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Animated Closing Line */}
          <motion.div
            variants={itemVariants}
            className="pt-6 text-center lg:text-left"
          >
            <motion.p 
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="inline-block text-xl md:text-2xl font-black bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] text-transparent bg-clip-text"
            >
              We understand your emotional pathway
            </motion.p>
          </motion.div>
        </motion.div>

        {/* ── Right image ── */}
        <motion.div
          initial={{ opacity: 0, x: 36, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 w-full max-w-2xl relative"
        >
          {/* Soft halo behind image */}
          <div className="absolute -inset-6 bg-gradient-to-tr from-primary/8 to-secondary/8 rounded-[4.5rem] blur-3xl -z-10" />

          {/* Thin rule frame — the editorial touch */}
          <div
            className="absolute -inset-[3px] rounded-[3.7rem] pointer-events-none -z-[1]"
            style={{
              background:
                "linear-gradient(135deg, rgba(var(--color-primary-rgb,99,102,241),0.25) 0%, transparent 60%, rgba(var(--color-secondary-rgb,139,92,246),0.15) 100%)",
            }}
          />

          <div className="relative rounded-[3.5rem] overflow-hidden shadow-[0_48px_96px_rgba(0,0,0,0.12)] dark:shadow-[0_48px_96px_rgba(0,0,0,0.5)] border-[10px] border-white dark:border-slate-800 bg-white dark:bg-slate-800">
            <img
              src={calmHero}
              alt="Serene elderly couple"
              className="w-full h-[580px] object-cover"
            />
            {/* Gentle vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

            {/* Inline citation chip — reinforces research tone */}
            <div className="absolute top-6 left-6 flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg border border-white/80 dark:border-slate-700/60">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-[0.18em]">
                Peer-Reviewed Protocol
              </span>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-8 glass-effect dark:glass-dark p-5 rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-slate-700/50 flex items-center gap-4 z-20"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 shrink-0">
              <Sparkles size={28} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest mb-0.5">Daily Support</p>
              <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">Always here.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
