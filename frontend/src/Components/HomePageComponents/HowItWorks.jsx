import React from "react";
import { MessageCircle, ClipboardEdit, Shield, Stethoscope, CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Share how you feel",
      desc: "Start a simple conversation with KOTHA or browse our resources.",
      icon: <MessageCircle size={32} className="text-white" />,
      bgColor: "bg-blue-600",
    },
    {
      number: "2",
      title: "Take a quick test",
      desc: "Complete a clinically validated self-check designed for seniors.",
      icon: <ClipboardEdit size={32} className="text-white" />,
      bgColor: "bg-emerald-600",
    },
    {
      number: "3",
      title: "Get support",
      desc: "Receive instant AI guidance and personalized self-care tips.",
      icon: <Shield size={32} className="text-white" />,
      bgColor: "bg-orange-600",
    },
    {
      number: "4",
      title: "Talk to a professional",
      desc: "If needed, we connect you with experts who truly understand.",
      icon: <Stethoscope size={32} className="text-white" />,
      bgColor: "bg-indigo-600",
    },
  ];

  return (
    <section className="py-24 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-12 bg-primary/40" />
              <span className="inline-block py-2 px-6 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm tracking-wide uppercase border border-slate-200 dark:border-slate-700">
                Simple Steps
              </span>
              <div className="h-px w-12 bg-primary/40" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              How it works.
            </h2>

            <p className="text-slate-700 dark:text-slate-300 text-xl font-semibold leading-relaxed">
              Four simple steps to a better peace of mind. We've made it as easy as possible to get the support you need.
            </p>
          </div>
        </div>

        {/* ── Steps ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm p-8 flex flex-col items-center text-center relative"
            >
              {/* Step number pill */}
              <div className="absolute -top-4 bg-primary text-white font-bold text-sm px-4 py-1 rounded-full shadow-sm border-2 border-white dark:border-slate-800">
                Step {step.number}
              </div>

              {/* Icon */}
              <div className={`w-20 h-20 rounded-md ${step.bgColor} flex items-center justify-center shadow-sm mb-6 mt-4`}>
                {step.icon}
              </div>

              <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">
                {step.title}
              </h4>

              <div className="h-1 w-12 bg-slate-200 dark:bg-slate-700 rounded mb-4" />

              <p className="text-slate-700 dark:text-slate-300 font-semibold leading-relaxed text-lg mb-6">
                {step.desc}
              </p>

              <div className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-500" />
                Evidence-Based
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
