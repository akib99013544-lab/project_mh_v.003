import React from "react";
import { Link } from "react-router";
import { ArrowRight, ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-md p-12 md:p-24 bg-slate-900 dark:bg-slate-950 shadow-md text-center border border-slate-800">

          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 py-2 px-6 rounded-md bg-slate-800 border border-slate-700">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-slate-300 font-bold text-sm tracking-wide uppercase">
                  Your path to clarity begins here
                </span>
              </div>

              <h3 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
                You deserve <br />
                <span className="text-primary">peace of mind.</span>
              </h3>

              <p className="text-slate-300 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-semibold">
                Take a small, gentle step today for a brighter tomorrow. Join our community and rediscover your emotional balance with GeronEssence.
              </p>
            </div>

            {/* Premium Action Button */}
            <div>
              <Link to="/selfassessment" className="inline-block w-full sm:w-auto">
                <button className="w-full px-12 py-6 bg-white hover:bg-slate-200 text-slate-900 font-extrabold text-xl md:text-2xl rounded-md shadow-sm transition-colors flex items-center justify-center gap-4 mx-auto border-4 border-slate-300 hover:border-slate-400">
                  <span>Start Your Journey</span>
                  <ArrowRight size={28} />
                </button>
              </Link>
            </div>

            {/* Solid Feature Badges */}
            <div className="pt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-6">
              {[
                { text: "Private & Secure", icon: <ShieldCheck size={20} /> },
                { text: "Dignified Care", icon: <HeartHandshake size={20} /> },
                { text: "Free Support", icon: <Sparkles size={20} /> }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center justify-center gap-3 px-6 py-4 rounded-md bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm uppercase tracking-wide">
                  <div className="text-emerald-500">{feature.icon}</div>
                  {feature.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
