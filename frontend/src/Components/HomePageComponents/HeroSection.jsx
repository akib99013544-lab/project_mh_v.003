import React from "react";
import { Link } from "react-router";
import heroImage from "../../assets/hero_image.png";
import calmHero from "../../assets/calm_hero.png";
import { HeartHandshake, Sparkles, CheckCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 px-6 md:px-12 lg:px-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 xl:gap-24 relative z-10">

        {/* ── Left content ── */}
        <div className="flex-1 text-center lg:text-left space-y-10">

          {/* Eyebrow */}
          <div>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                Khoka Hamiduzzaman Medical Research Team
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            {/* Research‑grade label line */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-sm font-bold uppercase tracking-wider text-primary dark:text-primary">
                GAD‑7 &amp; GDS‑15 Validated Scales
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Evidence-based <br />
              <span className="text-primary">Affective Frailty Management.</span>
            </h1>
          </div>

          {/* Body copy */}
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed mx-auto lg:mx-0 font-semibold">
            An online assessment and referral platform to identify, track and support your emotional wellbeing.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <Link to="/selfassessment">
              <button className="w-full sm:w-auto px-10 py-5 bg-primary hover:bg-indigo-700 text-white font-bold text-lg rounded-md shadow-md flex items-center justify-center gap-3 transition-colors border-2 border-primary hover:border-indigo-700">
                Start Self-Check
              </button>
            </Link>
            <Link to="/kotha">
              <button className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-lg rounded-md shadow-sm border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center gap-3 transition-colors">
                Talk to KOTHA
              </button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="pt-6 flex items-center justify-center lg:justify-start gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-full border-4 border-white dark:border-slate-950 overflow-hidden shadow-sm bg-slate-200"
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
              <p className="text-slate-900 dark:text-white font-extrabold text-xl leading-tight">1,200+ Screenings</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-bold uppercase tracking-wide mt-1">
                Evidence-Based Assessments
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
            {[
              { value: "98%", label: "Clinical Accuracy" },
              { value: "GDS-15", label: "Validated Scale" },
              { value: "GAD-7", label: "Anxiety Screen" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 px-6 py-4 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <span className="text-primary font-extrabold text-xl leading-none">{stat.value}</span>
                <span className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Closing Line */}
          <div className="pt-8 text-center lg:text-left">
            <p className="inline-block text-xl md:text-2xl font-extrabold text-slate-800 dark:text-slate-200">
              We understand your emotional pathway
            </p>
          </div>
        </div>

        {/* ── Right image ── */}
        <div className="flex-1 w-full max-w-2xl relative">
          <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
            <img
              src={calmHero}
              alt="Serene elderly couple"
              className="w-full h-[580px] object-cover"
            />
            
            {/* Inline citation chip */}
            <div className="absolute top-6 left-6 flex items-center gap-3 px-5 py-3 rounded-md bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-700">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                Peer-Reviewed Protocol
              </span>
            </div>
            
            {/* Daily Support Badge */}
            <div className="absolute bottom-6 right-6 flex items-center gap-4 px-6 py-4 rounded-md bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 rounded-md bg-primary flex items-center justify-center text-white shrink-0">
                <HeartHandshake size={24} />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Daily Support</p>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">Always here.</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
