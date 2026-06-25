import React from "react";
import { ShieldCheck, ArrowRight, Lock } from "lucide-react";

const TrustSection = () => {
  const trustItems = [
    {
      id: "1",
      title: "Confidential",
      desc: "Your data is encrypted and private. We never share your personal conversations without your permission.",
      icon: <Lock size={28} className="text-white" />,
      bgColor: "bg-blue-600",
    },
    {
      id: "2",
      title: "Respectful",
      desc: "Our AI and professionals are trained to provide dignified, age-appropriate, and culturally sensitive care.",
      icon: <ShieldCheck size={28} className="text-white" />,
      bgColor: "bg-emerald-600",
    },
    {
      id: "3",
      title: "Evidence-based",
      desc: "Every tool and assessment we use is backed by clinical research and geriatric mental health standards.",
      icon: <ShieldCheck size={28} className="text-white" />,
      bgColor: "bg-indigo-600",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 mb-16 border-b border-slate-200 dark:border-slate-800 pb-12">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-12 bg-primary/40" />
              <span className="inline-block py-2 px-6 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-sm tracking-wide uppercase border border-slate-200 dark:border-slate-700">
                Integrity & Trust
              </span>
            </div>
            
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              A sanctuary built on <br />
              <span className="text-primary">absolute security.</span>
            </h3>
          </div>
          
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-semibold max-w-sm">
            Your privacy is not just a feature—it's our foundation. We protect your dignity with every line of code.
          </p>
        </div>

        {/* Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-900 p-10 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col relative"
            >
              {/* Large Typographic ID */}
              <div className="absolute top-6 right-8 text-5xl font-extrabold text-slate-200 dark:text-slate-800 pointer-events-none">
                0{item.id}
              </div>

              <div className="relative z-10 flex-grow space-y-6">
                <div className={`w-14 h-14 rounded-md ${item.bgColor} flex items-center justify-center shadow-sm mb-6`}>
                  {item.icon}
                </div>
                
                <h4 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {item.title}
                </h4>
                
                <div className="h-1 w-12 bg-slate-300 dark:bg-slate-700 rounded" />
                
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Badge Section */}
              <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                    <ShieldCheck size={16} className="text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Protocol Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
