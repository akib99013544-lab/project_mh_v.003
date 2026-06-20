import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, ClipboardEdit, Shield, Stethoscope } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Share how you feel",
      desc: "Start a simple conversation with KOTHA or browse our resources.",
      icon: <MessageCircle size={36} className="text-white" />,
      color: "from-blue-400 to-primary",
      shadow: "shadow-blue-500/30",
    },
    {
      number: "02",
      title: "Take a quick test",
      desc: "Complete a clinically validated self-check designed for seniors.",
      icon: <ClipboardEdit size={36} className="text-white" />,
      color: "from-emerald-400 to-secondary",
      shadow: "shadow-emerald-500/30",
    },
    {
      number: "03",
      title: "Get support",
      desc: "Receive instant AI guidance and personalized self-care tips.",
      icon: <Shield size={36} className="text-white" />,
      color: "from-orange-400 to-accent",
      shadow: "shadow-orange-500/30",
    },
    {
      number: "04",
      title: "Talk to a professional",
      desc: "If needed, we connect you with experts who truly understand.",
      icon: <Stethoscope size={36} className="text-white" />,
      color: "from-purple-400 to-indigo-600",
      shadow: "shadow-purple-500/30",
    },
  ];

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      {/* Research grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.6) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-28 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            {/* Eyebrow — consistent with all other sections */}
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-8 bg-primary/40" />
              <span className="inline-block py-2 px-5 rounded-2xl bg-white dark:bg-slate-800 text-primary dark:text-blue-400 font-black text-[10px] tracking-[0.28em] uppercase shadow-sm border border-slate-100 dark:border-slate-700">
                Simple Steps
              </span>
              <div className="h-px w-8 bg-primary/40" />
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08]">
              How it{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary italic font-serif">
                works.
              </span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-xl font-medium leading-relaxed">
              Four simple steps to a better peace of mind. We've made it as easy as possible to get the support you need.
            </p>
          </motion.div>
        </div>

        {/* ── Steps ── */}
        <div className="relative">

          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-20 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step number pill — floats above icon */}
                <div className="absolute -top-5 z-20 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                  <div className="w-1 h-1 rounded-full bg-primary/60" />
                  <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.18em]">
                    Step {step.number}
                  </span>
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} ${step.shadow} flex items-center justify-center shadow-xl mb-8 relative z-10 border-4 border-white dark:border-slate-800`}
                >
                  <div className="absolute inset-0 rounded-xl bg-white/10 blur-sm" />
                  <span className="relative z-10">{step.icon}</span>
                </motion.div>

                {/* Card */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:border-primary/20 dark:hover:border-primary/25 transition-all duration-500 w-full group-hover:-translate-y-1">

                  {/* Gradient top-edge line on hover */}
                  <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <h4 className="text-xl font-black text-slate-800 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h4>

                  {/* Animated underline rule */}
                  <div className={`h-[2px] w-8 rounded-full bg-gradient-to-r ${step.color} opacity-25 group-hover:opacity-60 group-hover:w-16 transition-all duration-500 mx-auto mb-4`} />

                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-sm">
                    {step.desc}
                  </p>

                  {/* Clinically validated badge — research tone */}
                  <div className="mt-5 inline-flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-300 dark:text-slate-600">
                      Evidence-Based
                    </span>
                  </div>
                </div>

                {/* Mobile down-arrow */}
                {index !== steps.length - 1 && (
                  <div className="absolute -bottom-12 lg:hidden text-slate-300 dark:text-slate-700 left-1/2 -translate-x-1/2">
                    <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
