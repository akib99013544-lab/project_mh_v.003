import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, Phone, CheckCircle, TrendingUp, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router';

const AssessmentResult = ({ result, scaleType, onBack }) => {
  const navigate = useNavigate();
  const reportRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const isCope = scaleType === 'bcope';

  // Config based on scaleType
  const config = {
    ucla: {
      title: "UCLA Loneliness Scale",
      subtitle: "Loneliness Assessment",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-700",
      bgClass: "bg-blue-50",
      accentClass: "text-blue-600",
      borderClass: "border-blue-200",
      maxScore: 9,
      bands: ["Not lonely", "Lonely"]
    },
    sidas: {
      title: "SIDAS-M Scale",
      subtitle: "Suicidal Ideation Assessment",
      gradientFrom: "from-rose-500",
      gradientTo: "to-rose-700",
      bgClass: "bg-rose-50",
      accentClass: "text-rose-600",
      borderClass: "border-rose-200",
      maxScore: 50,
      bands: ["None", "Some", "Elevated", "High"]
    },
    bcope: {
      title: "Brief COPE Inventory",
      subtitle: "Coping Strategies Assessment",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-emerald-700",
      bgClass: "bg-emerald-50",
      accentClass: "text-emerald-600",
      borderClass: "border-emerald-200",
      maxScore: 112, // not used directly
      bands: [] // not used
    }
  }[scaleType];

  const handleDownloadPDF = async () => {
    const element = reportRef.current;
    if (!element || isGenerating) return;
    setIsGenerating(true);
    try {
      const opt = {
        margin: 0,
        filename: `GeronEssence_FamilyCare_${scaleType}_Report.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true, logging: false, width: 794 },
        jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait" },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF error:", err);
      alert("There was an issue generating your report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // UI mapping for single-score scales (UCLA & SIDAS)
  const getSeverityLevel = () => {
    if (scaleType === 'ucla') {
      const s = result.score;
      if (s <= 5) return { severity: 0, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", bar: "bg-emerald-500" };
      return { severity: 1, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", bar: "bg-orange-500" };
    }
    if (scaleType === 'sidas') {
      const s = result.score;
      if (s === 0) return { severity: 0, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", bar: "bg-emerald-500" };
      if (s <= 8) return { severity: 1, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", bar: "bg-blue-500" };
      if (s <= 20) return { severity: 2, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", bar: "bg-orange-500" };
      return { severity: 3, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", bar: "bg-red-500" };
    }
    return {};
  };

  const styleObj = isCope ? {} : getSeverityLevel();

  const renderLinearResult = () => {
    const pct = Math.round((result.score / config.maxScore) * 100);

    return (
      <>
        {/* Score display */}
        <div className={`${styleObj.bg} ${styleObj.border} border rounded-2xl p-6 mb-6 text-center`}>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Your Result</p>
          <p className={`text-3xl font-black ${styleObj.color} mb-3`}>{result.interpretation}</p>

          {/* Score bar */}
          <div className="flex items-center gap-3 max-w-xs mx-auto">
            <span className="text-xs font-bold text-slate-400 w-6 text-right">0</span>
            <div className="flex-1 h-3 bg-white rounded-full overflow-hidden border border-slate-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full ${styleObj.bar}`}
              />
            </div>
            <span className="text-xs font-bold text-slate-400 w-6">{config.maxScore}</span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">
            Score: <span className="font-black text-slate-700">{result.score}</span> / {config.maxScore}
          </p>
        </div>

        {/* Severity steps */}
        <div className={`grid ${scaleType === 'ucla' ? 'grid-cols-2' : 'grid-cols-4'} gap-2 mb-6`}>
          {config.bands.map((label, i) => (
            <div
              key={label}
              className={`rounded-xl py-2 text-center text-[10px] font-black uppercase tracking-wide
                           transition-all ${i === styleObj.severity
                  ? `${styleObj.bg} ${styleObj.color} border ${styleObj.border}`
                  : "bg-slate-50 text-slate-300 border border-slate-100"}`}
            >
              {label}
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderCopeResult = () => {
    const { subscales, categoryTotals } = result.score;
    const sortedSubscales = Object.entries(subscales)
      .map(([name, score]) => ({ name, score }))
      .sort((a, b) => b.score - a.score);

    return (
      <>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-6 text-center my-6">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Your Result</p>
          <p className="text-2xl font-black text-emerald-700 mb-3">Profile Calculated</p>
        </div>

        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Top Strategies</p>
          <div className="space-y-4">
            {sortedSubscales.slice(0, 5).map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                  <span>{item.name}</span>
                  <span>{item.score} / 8</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(item.score / 8) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
            <p className="text-2xl font-extrabold text-slate-700 mb-1">{categoryTotals.problemFocused}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Problem</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
            <p className="text-2xl font-extrabold text-slate-700 mb-1">{categoryTotals.emotionFocused}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Emotion</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
            <p className="text-2xl font-extrabold text-slate-700 mb-1">{categoryTotals.avoidant}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Avoidant</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto w-full py-12 px-6"
    >
      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_48px_rgba(0,0,0,0.08)] overflow-hidden">

        {/* Gradient header */}
        <div className={`bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} p-10 text-center relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 80%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30
                       flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle size={36} className="text-white" />
          </motion.div>

          <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-2">
            Assessment Complete
          </p>
          <h2 className="text-3xl font-black text-white mb-1">{config.title}</h2>
          <p className="text-white/60 text-sm">{config.subtitle}</p>
        </div>

        <div className="p-8">

          {isCope ? renderCopeResult() : renderLinearResult()}

          {/* Emergency Support CTA (Only if needsSupport) */}
          {result.needsSupport && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 mb-6 text-center">
              <div className="flex justify-center mb-3">
                <AlertTriangle size={32} className="text-rose-600" />
              </div>
              <p className="text-sm font-black text-rose-800 mb-1">
                Would you like professional support?
              </p>
              <p className="text-xs text-rose-700 mb-4 leading-relaxed">
                Your responses indicate a level of distress where speaking with a professional is recommended.
              </p>
              <button
                onClick={() => navigate("/referral")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white
                           font-black text-sm rounded-xl shadow-lg hover:bg-rose-700
                           transition-all duration-300"
              >
                Get Professional Support <ArrowRight size={15} />
              </button>
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/analytics")}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl
                         bg-slate-900 text-white font-black text-sm
                         hover:bg-slate-700 transition-all"
            >
              <TrendingUp size={16} /> Analytics
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl
                          font-black text-sm border-2 transition-all
                          ${config.bgClass} ${config.accentClass} ${config.borderClass}
                          hover:opacity-80 disabled:opacity-50`}
            >
              <Download size={16} />
              {isGenerating ? "Generating…" : "Download PDF"}
            </button>
            <button
              onClick={onBack}
              className="col-span-2 py-3.5 rounded-2xl border-2 border-slate-200
                         text-slate-600 font-black text-sm hover:bg-slate-50 transition-all"
            >
              Take Another Assessment
            </button>
          </div>

        </div>
      </div>

      {/* Hidden PDF Report (simplified for MVP) */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <div ref={reportRef} style={{
          width: "794px",
          minHeight: "1123px",
          backgroundColor: "#ffffff",
          fontFamily: "'Segoe UI', Arial, sans-serif",
          color: "#1e293b",
          fontSize: "13px",
          lineHeight: "1.6",
          position: "relative",
        }}>
          {/* HEADER BAND */}
          <div style={{
            background: `linear-gradient(135deg, #1e293b 0%, #334155 100%)`,
            padding: "36px 48px 28px",
            color: "#fff",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.7, marginBottom: "6px" }}>
                  GeronEssence · Family Care
                </div>
                <div style={{ fontSize: "26px", fontWeight: "900", letterSpacing: "-0.5px", marginBottom: "4px" }}>
                  Clinical Wellness Report
                </div>
                <div style={{ fontSize: "13px", opacity: 0.75 }}>
                  {config.title}
                </div>
              </div>
              <div style={{ textAlign: "right", fontSize: "11px", opacity: 0.8, lineHeight: "1.8" }}>
                <div style={{ fontWeight: "700" }}>Generated</div>
                <div>{new Date().toLocaleDateString()}</div>
                <div>{new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div style={{ padding: "36px 48px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Result Summary</h3>
            <div style={{ fontSize: "36px", fontWeight: "900", color: "#1e293b", marginBottom: "8px" }}>
              {result.interpretation}
            </div>
            {!isCope && (
              <div style={{ fontSize: "16px", color: "#475569" }}>
                Score: {result.score} / {config.maxScore}
              </div>
            )}

            <div style={{ marginTop: "40px", padding: "20px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", fontWeight: "800" }}>Important Disclaimer</h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
                This report is generated by GeronEssence. It is not a formal medical diagnosis and should not replace professional clinical assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AssessmentResult;
