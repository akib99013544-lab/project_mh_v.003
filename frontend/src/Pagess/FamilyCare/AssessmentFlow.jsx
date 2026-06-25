import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import AssessmentResult from './AssessmentResult';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' || /^[0-9.]+$/.test(window.location.hostname) ? `http://${window.location.hostname}:5000` : '');

const AssessmentFlow = ({ scaleType, onBack }) => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [completedBy, setCompletedBy] = useState(null); // 'self' or 'caregiver'
  const [currentStep, setCurrentStep] = useState(0); // 0 = ask completedBy, 1+ = questions
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null); // Final result from server
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/family-assessments/scales/${scaleType}`);
        setConfig(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load assessment configuration.');
        setLoading(false);
      }
    };
    fetchConfig();
  }, [scaleType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center text-center px-6">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-4">{error}</h2>
        <button onClick={onBack} className="px-6 py-3 bg-slate-900 text-white rounded-md font-bold">Go Back</button>
      </div>
    );
  }

  // Handle SIDAS caregiver rejection early
  if (scaleType === 'sidas' && completedBy === 'caregiver') {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center text-center px-6">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Self-Report Only</h2>
        <p className="text-lg text-slate-700 max-w-lg mb-8">
          The SIDAS-M scale is clinically validated for self-report only. It cannot be completed by a caregiver on behalf of a patient.
        </p>
        <button onClick={() => setCompletedBy(null)} className="px-6 py-3 bg-slate-900 text-white rounded-md font-bold">Start Over</button>
      </div>
    );
  }

  if (result) {
    return <AssessmentResult result={result} scaleType={scaleType} onBack={onBack} />;
  }

  const submitAssessment = async (finalAnswers) => {
    setSubmitting(true);
    try {
      // Note: Hardcoding a mock patientId since Auth might not be fully linked here yet.
      const payload = {
        patientId: '64b1f4c5e4b0f9a7d8c9e0a1',
        scaleType,
        completedBy,
        answers: finalAnswers
      };
      const res = await axios.post(`${API_URL}/api/family-assessments`, payload);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to submit assessment.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = (val) => {
    const newAnswers = [...answers];
    newAnswers[currentStep - 1] = val;
    setAnswers(newAnswers);

    // SIDAS gate rule: If Q1 is 0, skip the rest and submit immediately
    if (scaleType === 'sidas' && currentStep === 1 && val === 0) {
      const paddedAnswers = [0, 0, 0, 0, 0];
      submitAssessment(paddedAnswers);
      return;
    }

    if (currentStep < config.questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      submitAssessment(newAnswers);
    }
  };

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] pb-12 pt-32 px-6">
        <div className="max-w-3xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-12 transition-colors">
            <ArrowLeft size={20} /> Back
          </button>

          <div className="bg-white p-10 rounded-xl border border-slate-200 shadow-sm text-center space-y-8">
            <h2 className="text-3xl font-serif font-extrabold text-slate-900">Who is completing this assessment?</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => { setCompletedBy('self'); setCurrentStep(1); }}
                className="px-8 py-5 border-2 border-slate-200 rounded-lg text-xl font-bold text-slate-700 hover:border-primary hover:text-primary transition-all flex-1"
              >
                I am completing it for myself
              </button>
              <button
                onClick={() => { setCompletedBy('caregiver'); setCurrentStep(1); }}
                className="px-8 py-5 border-2 border-slate-200 rounded-lg text-xl font-bold text-slate-700 hover:border-primary hover:text-primary transition-all flex-1"
              >
                I am completing it for someone else
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question Flow
  const questionIndex = currentStep - 1;
  const question = config.questions[questionIndex];
  const progress = (currentStep / config.questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-12 pt-32 px-6">
      <div className="max-w-3xl mx-auto relative">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} /> Exit Assessment
        </button>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between text-sm font-bold text-slate-500 mb-3 uppercase tracking-wide">
            <span>Question {currentStep} of {config.questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div className="bg-primary h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white p-10 md:p-14 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-slate-900 mb-10 leading-snug">
            {question.text}
          </h2>

          {submitting ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-lg font-bold text-slate-600">Calculating your results...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* If it has specific options (UCLA, BCOPE) */}
              {question.options || config.options ? (
                <div className="grid grid-cols-1 gap-4">
                  {(question.options || config.options).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleNext(opt.value)}
                      className="w-full text-left px-8 py-5 rounded-lg border-2 border-slate-200 text-lg font-bold text-slate-700 hover:border-primary hover:bg-slate-50 transition-all flex items-center justify-between"
                    >
                      {opt.label}
                      <ArrowRight size={20} className="text-slate-400" />
                    </button>
                  ))}
                </div>
              ) : (
                // If it has minLabel/maxLabel scale (SIDAS 0-10)
                <div>
                  <div className="flex justify-between text-sm font-bold text-slate-500 uppercase tracking-wide mb-6">
                    <span className="w-1/3 text-left">0 - {question.minLabel}</span>
                    <span className="w-1/3 text-right">10 - {question.maxLabel}</span>
                  </div>
                  <div className="grid grid-cols-11 gap-1 md:gap-2">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                      <button
                        key={val}
                        onClick={() => handleNext(val)}
                        className="aspect-square flex items-center justify-center rounded-md bg-slate-100 hover:bg-primary hover:text-white text-slate-700 font-extrabold text-lg transition-colors border border-slate-200"
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentFlow;
