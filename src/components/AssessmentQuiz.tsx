import React, { useState } from 'react';
import { Brain, X, ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, Save, Sparkles, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ASSESSMENT_QUESTIONS, QuizQuestion } from '../data/assessmentData';
import { TurnstileWidget } from './TurnstileWidget';

interface AssessmentQuizProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  userEmail?: string;
  onBookConsultation: () => void;
}

export const AssessmentQuiz: React.FC<AssessmentQuizProps> = ({
  isOpen,
  onClose,
  userId,
  userEmail,
  onBookConsultation
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [companyName, setCompanyName] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [aiReport, setAiReport] = useState<{ analysis: string; actionPlan: string[] } | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  if (!isOpen) return null;

  const currentQ: QuizQuestion = ASSESSMENT_QUESTIONS[currentStep];

  const handleOptionSelect = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const calculateScore = () => {
    const totalQuestions = ASSESSMENT_QUESTIONS.length;
    let totalScore = 0;
    const catTotals: Record<string, { sum: number; count: number }> = {};

    ASSESSMENT_QUESTIONS.forEach(q => {
      const val = answers[q.id] || 0;
      totalScore += val;

      if (!catTotals[q.categoryTitle]) {
        catTotals[q.categoryTitle] = { sum: 0, count: 0 };
      }
      catTotals[q.categoryTitle].sum += val;
      catTotals[q.categoryTitle].count += 1;
    });

    const overall = Math.round(totalScore / totalQuestions);
    const categoryScores: Record<string, number> = {};
    Object.keys(catTotals).forEach(cat => {
      categoryScores[cat] = Math.round(catTotals[cat].sum / catTotals[cat].count);
    });

    return { overall, categoryScores };
  };

  const handleFinish = async () => {
    setIsFinished(true);
    setLoadingAi(true);

    const scoreData = calculateScore();

    try {
      const session = (await supabase.auth.getSession()).data.session;
      const token = session?.access_token || null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('/api/ai/assessment', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          answers,
          scoreData,
          company_name: companyName,
          turnstileToken
        })
      });
      const data = await res.json();
      setAiReport(data);
    } catch (err) {
      console.error("AI assessment generation error:", err);
      setAiReport({
        analysis: "Your enterprise demonstrates core operational baseline tracking, but suffers from fragmented cross-departmental manual handoffs.",
        actionPlan: [
          "Deploy Finance360 to automate GST filings and cash flow forecasting.",
          "Integrate Sales360 for instant quotation generation.",
          "Adopt Executive360 for real-time board metrics."
        ]
      });
    } finally {
      setLoadingAi(false);
    }
  };

  const handleSaveReport = async () => {
    setSaving(true);
    try {
      // The assessment report was already created and saved securely server-side during generation via /api/ai/assessment
      setSavedSuccess(true);
    } catch (err) {
      console.error("Failed to mark report as saved:", err);
    } finally {
      setSaving(false);
    }
  };

  const scoreData = calculateScore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0e1a3a] border border-[#d4af37]/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#f6f3ea] max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#a9b0c6] hover:text-[#f0d878] rounded-full hover:bg-white/5 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!isFinished ? (
          <div>
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-[#d4af37]/20">
              <div className="p-2.5 rounded-full bg-[#d4af37]/20 text-[#f0d878] border border-[#d4af37]/40">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#f0d878]">
                  Business Intelligence Readiness Assessment
                </h3>
                <p className="text-xs text-[#a9b0c6]">
                  Question {currentStep + 1} of {ASSESSMENT_QUESTIONS.length} — {currentQ.categoryTitle}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#0a1128] h-1.5 rounded-full mb-6 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#d4af37] to-[#f0d878] h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Card */}
            <div className="space-y-4 mb-8">
              <h4 className="text-base font-semibold text-[#f6f3ea] leading-snug">
                {currentQ.question}
              </h4>

              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentQ.id] === opt.score;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(currentQ.id, opt.score)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-start space-x-3 ${
                        isSelected
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f0d878] shadow-md'
                          : 'bg-[#0a1128] border-[#d4af37]/20 hover:border-[#d4af37]/50 text-[#a9b0c6] hover:text-[#f6f3ea]'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center ${
                        isSelected ? 'border-[#d4af37] bg-[#d4af37]' : 'border-gray-500'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#0a1128]"></div>}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{opt.label}</div>
                        <div className="text-[11px] opacity-80 mt-0.5">{opt.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[#d4af37]/20">
              <button
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 text-xs font-semibold text-[#a9b0c6] hover:text-[#f0d878] disabled:opacity-30"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentStep < ASSESSMENT_QUESTIONS.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={answers[currentQ.id] === undefined}
                  className="flex items-center space-x-2 bg-[#d4af37] text-[#0a1128] font-bold text-xs uppercase px-5 py-2.5 rounded-lg shadow hover:scale-[1.02] disabled:opacity-40 transition-all"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex flex-col items-end space-y-2">
                  <TurnstileWidget onVerify={setTurnstileToken} />
                  <button
                    onClick={handleFinish}
                    disabled={answers[currentQ.id] === undefined}
                    className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-[#0a1128] font-bold text-xs uppercase px-6 py-2.5 rounded-lg shadow hover:scale-[1.02] disabled:opacity-40 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Report</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Report Screen */
          <div className="space-y-6 text-xs">
            
            <div className="text-center pb-4 border-b border-[#d4af37]/20">
              <div className="inline-flex p-3 rounded-full bg-[#d4af37]/20 text-[#f0d878] mb-2">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#f0d878]">
                UNIKORN360 Business Intelligence Report
              </h3>
              <p className="text-xs text-[#a9b0c6] mt-1">
                Digital Maturity Score for {companyName || 'Your Organization'}
              </p>
            </div>

            {/* Score Banner */}
            <div className="p-6 rounded-2xl bg-[#0a1128] border border-[#d4af37]/40 text-center flex flex-col sm:flex-row items-center justify-around gap-4">
              <div>
                <div className="text-4xl font-serif font-extrabold text-[#f0d878]">
                  {scoreData.overall}<span className="text-lg text-[#a9b0c6]">/100</span>
                </div>
                <div className="text-[10px] uppercase font-bold text-[#a9b0c6] tracking-widest mt-1">
                  Overall Intelligence Score
                </div>
              </div>

              <div className="text-left max-w-xs text-[11px] text-[#a9b0c6] border-l border-[#d4af37]/20 pl-4">
                <b className="text-[#f6f3ea] block text-xs mb-0.5">Rating: {
                  scoreData.overall >= 80 ? 'Advanced Intelligence' :
                  scoreData.overall >= 50 ? 'Moderate Digitization' : 'Legacy Fragmented Operations'
                }</b>
                {scoreData.overall >= 80 
                  ? 'Your business has strong data collection but can unlock predictive AI automation.'
                  : 'High potential ROI from unifying accounting, sales quotes, and compliance.'}
              </div>
            </div>

            {/* Category Breakdown */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-3">
                Category Score Breakdown
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(scoreData.categoryScores).map(([cat, score]) => (
                  <div key={cat} className="p-3 rounded-xl bg-[#0a1128] border border-[#d4af37]/20 flex items-center justify-between">
                    <span className="text-[#f6f3ea] font-medium">{cat}</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      score >= 75 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#d4af37]/20 text-[#f0d878]'
                    }`}>
                      {score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Action Plan */}
            {aiReport && (
              <div className="p-4 rounded-xl bg-[#0a1128] border border-emerald-500/30 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">
                  AI Strategic Transformation Roadmap
                </span>
                <p className="text-[#a9b0c6] text-[11px] leading-relaxed mb-2">{aiReport.analysis}</p>
                <div className="space-y-1.5">
                  {aiReport.actionPlan.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-[11px] text-[#f6f3ea]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#d4af37]/20">
              <button
                onClick={() => {
                  setIsFinished(false);
                  setCurrentStep(0);
                  setAnswers({});
                }}
                className="flex items-center space-x-2 text-xs font-semibold text-[#a9b0c6] hover:text-[#f0d878]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSaveReport}
                  disabled={saving || savedSuccess}
                  className="flex items-center space-x-2 bg-[#0a1128] border border-[#d4af37] text-[#f0d878] font-bold text-xs uppercase px-4 py-2.5 rounded-lg shadow disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{savedSuccess ? 'Saved to Portal!' : saving ? 'Saving...' : 'Save Report'}</span>
                </button>

                <button
                  onClick={() => {
                    onBookConsultation();
                    onClose();
                  }}
                  className="flex items-center space-x-2 bg-[#d4af37] text-[#0a1128] font-bold text-xs uppercase px-5 py-2.5 rounded-lg shadow hover:scale-[1.02]"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
