import React from "react";
import { Link } from "react-router";
import { FlaskConical, Bot, BarChart3, Hospital, Users, ArrowRight, CheckCircle2 } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      title: "Self-Assessment",
      icon: <FlaskConical size={32} className="text-white" />,
      desc: "Easy-to-use tests to help you understand your mood and mental state.",
      bgColor: "bg-blue-600",
      tag: "GAD-7 & GDS-15",
    },
    {
      title: "Professional Referral",
      icon: <Hospital size={32} className="text-white" />,
      desc: "Direct connection to certified geriatric mental health experts.",
      bgColor: "bg-rose-600",
      tag: "Certified Experts",
    },
    {
      title: "My Symptom Tracker",
      icon: <BarChart3 size={32} className="text-white" />,
      desc: "Monitor your progress over time with simple daily check-ins.",
      bgColor: "bg-orange-600",
      tag: "Longitudinal Data",
    },
    {
      title: "AI Chatbot Support",
      icon: <Bot size={32} className="text-white" />,
      desc: "Talk to KOTHA anytime, day or night, for instant emotional support.",
      bgColor: "bg-emerald-600",
      tag: "24/7 Available",
    },
    {
      title: "Family Referral",
      icon: <Users size={32} className="text-white" />,
      desc: "Connect family members and caregivers for better support and care coordination.",
      bgColor: "bg-cyan-600",
      tag: "Care Network",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-slate-200 dark:border-slate-800 pb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-secondary/50" />
              <span className="inline-block py-2 px-6 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-sm tracking-wide uppercase border border-slate-300 dark:border-slate-700">
                Our Services
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Compassionate care <br />
              <span className="text-secondary">designed for you.</span>
            </h2>
            <p className="mt-6 text-slate-700 dark:text-slate-300 text-xl font-semibold leading-relaxed max-w-2xl">
              Explore our specialized tools and resources built with dignity and respect for your mental well-being.
            </p>
          </div>

          <div>
            <Link
              to="/service"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-md font-bold text-lg transition-colors shadow-sm"
            >
              View All Services
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* ── Services Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-900 p-8 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col h-full"
            >
              {/* Icon + clinical tag row */}
              <div className="flex items-start justify-between mb-8">
                <div className={`w-16 h-16 rounded-md ${service.bgColor} flex items-center justify-center shadow-sm shrink-0`}>
                  {service.icon}
                </div>

                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-500" />
                  {service.tag}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
                {service.title}
              </h3>

              <div className="h-1 w-12 bg-slate-300 dark:bg-slate-700 rounded mb-4" />

              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed flex-grow font-semibold mb-8">
                {service.desc}
              </p>

              {/* Explore link */}
              <div className="mt-auto border-t border-slate-200 dark:border-slate-700 pt-6">
                <Link
                  to="/service"
                  className="inline-flex items-center gap-2 text-primary hover:text-indigo-700 dark:hover:text-indigo-400 font-bold text-lg transition-colors"
                >
                  <span>Explore Service</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
