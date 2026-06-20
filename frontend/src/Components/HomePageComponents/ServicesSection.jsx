import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FlaskConical, Bot, BarChart3, GraduationCap, HandHeart, Hospital, Users } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      title: "Self-Assessment",
      icon: <FlaskConical size={28} className="text-blue-500" />,
      desc: "Easy-to-use tests to help you understand your mood and mental state.",
      color: "from-blue-500 to-primary",
      accentColor: "blue",
      tag: "GAD-7 & GDS-15",
      delay: 0.1,
    },
    {
      title: "Professional Referral",
      icon: <Hospital size={28} className="text-rose-500" />,
      desc: "Direct connection to certified geriatric mental health experts.",
      color: "from-rose-400 to-red-500",
      accentColor: "rose",
      tag: "Certified Experts",
      delay: 0.6,
    },
    {
      title: "My Symptom Tracker",
      icon: <BarChart3 size={28} className="text-orange-500" />,
      desc: "Monitor your progress over time with simple daily check-ins.",
      color: "from-orange-400 to-accent",
      accentColor: "orange",
      tag: "Longitudinal Data",
      delay: 0.3,
    },
    {
      title: "AI Chatbot Support",
      icon: <Bot size={28} className="text-emerald-500" />,
      desc: "Talk to KOTHA anytime, day or night, for instant emotional support.",
      color: "from-emerald-400 to-secondary",
      accentColor: "emerald",
      tag: "24 / 7 Available",
      delay: 0.2,
    },
    {
      title: "Family Referral",
      icon: <Users size={28} className="text-cyan-500" />,
      desc: "Connect family members and caregivers for better support and care coordination.",
      color: "from-blue-400 to-cyan-500",
      accentColor: "cyan",
      tag: "Care Network",
      delay: 0.4,
    },
  ];

  return (
    <section className="py-32 bg-slate-50/50 dark:bg-slate-950 relative overflow-hidden">

      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/4 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl"
          >
            {/* Eyebrow — consistent with hero & ProblemAwareness */}
            <div className="inline-flex items-center gap-3 mb-7">
              <div className="h-px w-8 bg-secondary/50" />
              <span className="inline-block py-2 px-5 rounded-2xl bg-secondary/8 dark:bg-secondary/10 text-secondary font-black text-[10px] tracking-[0.28em] uppercase border border-secondary/15">
                Our Services
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.08] tracking-tight">
              Compassionate care <br />
              <span className="text-secondary italic font-serif">designed for you.</span>
            </h2>
            <p className="mt-8 text-slate-500 dark:text-slate-400 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl">
              Explore our specialized tools and resources built with dignity and respect for your mental well-being.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Link
              to="/service"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-bold transition-all shadow-xl shadow-slate-900/20"
            >
              View All Services
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── Services Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: service.delay, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-[0_15px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)] hover:border-primary/20 dark:hover:border-primary/20 overflow-hidden"
            >
              {/* Subtle top-edge gradient line on hover */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="flex flex-col h-full relative z-10">

                {/* Icon + clinical tag row */}
                <div className="flex items-start justify-between mb-10">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${service.color} p-[3px] shadow-sm group-hover:scale-105 group-hover:rotate-2 transition-transform duration-500`}>
                    <div className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center">
                      {service.icon}
                    </div>
                  </div>

                  {/* Research scale tag — clinical credibility */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-[9px] font-black uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500 mt-1">
                    <div className="w-1 h-1 rounded-full bg-emerald-400" />
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300 leading-tight">
                  {service.title}
                </h3>

                {/* Animated rule under title */}
                <div className={`h-[2px] w-10 rounded-full bg-gradient-to-r ${service.color} opacity-30 group-hover:opacity-70 group-hover:w-20 transition-all duration-500 mb-6`} />

                <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed flex-grow font-medium">
                  {service.desc}
                </p>

                {/* Explore link */}
                <div className="mt-10 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-400 -translate-x-3 group-hover:translate-x-0">
                    <span>Explore</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  {/* Clinically validated dot */}
                  <span className="hidden group-hover:inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-300 dark:text-slate-600 transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Validated
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
