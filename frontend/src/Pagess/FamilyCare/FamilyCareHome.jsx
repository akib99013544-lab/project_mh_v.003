import React, { useState } from 'react';
import { ShieldCheck, Activity, Users, ArrowRight } from 'lucide-react';
import AssessmentFlow from './AssessmentFlow';

const scales = [
  {
    id: 'ucla',
    title: 'UCLA Loneliness Scale',
    desc: 'A brief 3-item assessment to help understand feelings of social isolation and companionship.',
    icon: <Users size={32} className="text-emerald-600" />,
    time: '1 Min',
  },
  {
    id: 'bcope',
    title: 'Brief COPE Inventory',
    desc: 'Understand your primary coping strategies and how you respond to emotional distress.',
    icon: <Activity size={32} className="text-blue-600" />,
    time: '5-7 Mins',
  },
  {
    id: 'sidas',
    title: 'SIDAS-M (Ideation Scale)',
    desc: 'A clinical screening for emotional distress and ideation. For self-reporting only.',
    icon: <ShieldCheck size={32} className="text-rose-600" />,
    time: '2-3 Mins',
  }
];

const FamilyCareHome = () => {
  const [activeScale, setActiveScale] = useState(null);

  if (activeScale) {
    return <AssessmentFlow scaleType={activeScale} onBack={() => setActiveScale(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-6 my-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 font-extrabold tracking-tight">
            Family Care Assessments
          </h1>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto font-medium">
            Standardized, evidence-based tools designed to help you and your family understand emotional health and coping strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {scales.map((scale) => (
            <div key={scale.id} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                {scale.icon}
              </div>

              <h3 className="text-2xl font-serif font-extrabold text-slate-900 mb-3">
                {scale.title}
              </h3>

              <p className="text-slate-600 text-lg font-medium leading-relaxed flex-grow mb-8">
                {scale.desc}
              </p>

              <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-auto">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">{scale.time}</span>
                <button
                  onClick={() => setActiveScale(scale.id)}
                  className="inline-flex items-center gap-2 text-primary hover:text-indigo-700 font-bold text-lg transition-colors"
                >
                  Start <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FamilyCareHome;
