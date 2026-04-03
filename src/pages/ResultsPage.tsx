import { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Droplets, 
  Sun, 
  Moon, 
  Info, 
  ArrowRight, 
  Download, 
  Share2,
  Heart,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  User,
  Search
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { AnalysisResult } from '../types';

export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResult = sessionStorage.getItem('analysisResult');
    const storedImage = sessionStorage.getItem('analysisImage');
    
    if (!storedResult) {
      navigate('/analysis');
      return;
    }
    
    setResult(JSON.parse(storedResult));
    setImage(storedImage);
  }, [navigate]);

  if (!result) return null;

  return (
    <div className="min-h-screen bg-rose-50/30 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-rose-950 mb-2">Your Skin Analysis</h1>
            <p className="text-rose-900/60">Generated on {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white border border-rose-100 rounded-2xl text-rose-900 hover:bg-rose-50 transition-colors shadow-sm">
              <Download size={20} />
            </button>
            <button className="p-3 bg-white border border-rose-100 rounded-2xl text-rose-900 hover:bg-rose-50 transition-colors shadow-sm">
              <Share2 size={20} />
            </button>
            <Link 
              to="/analysis" 
              className="px-6 py-3 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-100 flex items-center gap-2"
            >
              <RefreshCcw size={18} />
              New Analysis
            </Link>
          </div>
        </div>

        {/* Skin Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Photo & Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-rose-100 relative overflow-hidden group">
              <div className="aspect-square rounded-[2rem] overflow-hidden mb-6 relative">
                {image ? (
                  <img src={image} alt="Skin Analysis" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-rose-50 flex items-center justify-center text-rose-200">
                    <User size={64} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-4 px-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-rose-900/40 uppercase tracking-wider">Skin Type</span>
                  <span className="px-3 py-1 bg-rose-100 text-rose-600 text-xs font-bold rounded-full">{result.skinType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-rose-900/40 uppercase tracking-wider">Health Score</span>
                  <span className="text-lg font-bold text-rose-950">{result.healthScore}/100</span>
                </div>
                <div className="h-2 bg-rose-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.healthScore}%` }}
                    className={cn(
                      "h-full",
                      result.healthScore > 80 ? "bg-green-500" : result.healthScore > 60 ? "bg-amber-500" : "bg-rose-500"
                    )}
                  />
                </div>
                <p className="text-xs text-rose-900/40 text-center italic">AI Confidence: {result.confidence}%</p>
              </div>
            </div>

            {/* Observations */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-rose-100">
              <h3 className="text-lg font-bold text-rose-950 mb-6 flex items-center gap-2">
                <Search size={20} className="text-rose-500" />
                Key Observations
              </h3>
              <ul className="space-y-4">
                {result.observations.map((obs, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-rose-900/60 leading-relaxed">
                    <div className="w-1.5 h-1.5 bg-rose-300 rounded-full mt-1.5 shrink-0" />
                    {obs}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="lg:col-span-2 space-y-8">
            {/* Concerns Detected */}
            <div className="bg-white p-8 sm:p-10 rounded-[3rem] shadow-sm border border-rose-100">
              <h3 className="text-xl font-bold text-rose-950 mb-8 flex items-center gap-2">
                <AlertCircle size={24} className="text-rose-500" />
                Concerns Detected
              </h3>
              <div className="flex flex-wrap gap-3">
                {result.concerns.map((concern, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-6 py-3 bg-rose-50 border border-rose-100 rounded-2xl text-sm font-bold text-rose-900 flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-rose-400 rounded-full" />
                    {concern}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recommended Routine */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Morning */}
              <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-rose-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                  <Sun size={80} />
                </div>
                <h3 className="text-xl font-bold text-rose-950 mb-8 flex items-center gap-2">
                  <Sun size={24} className="text-amber-500" />
                  Morning Routine
                </h3>
                <div className="space-y-8 relative z-10">
                  {result.routine.morning.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                          {i + 1}
                        </div>
                        {i < result.routine.morning.length - 1 && <div className="w-0.5 flex-1 bg-rose-50" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-rose-950 mb-1">{step.step}: {step.product}</p>
                        <p className="text-xs text-rose-900/60 mb-2">{step.why}</p>
                        <div className="flex flex-wrap gap-1">
                          {step.ingredients.map((ing, j) => (
                            <span key={j} className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">{ing}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Night */}
              <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-rose-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                  <Moon size={80} />
                </div>
                <h3 className="text-xl font-bold text-rose-950 mb-8 flex items-center gap-2">
                  <Moon size={24} className="text-blue-500" />
                  Night Routine
                </h3>
                <div className="space-y-8 relative z-10">
                  {result.routine.night.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                          {i + 1}
                        </div>
                        {i < result.routine.night.length - 1 && <div className="w-0.5 flex-1 bg-rose-50" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-rose-950 mb-1">{step.step}: {step.product}</p>
                        <p className="text-xs text-rose-900/60 mb-2">{step.why}</p>
                        <div className="flex flex-wrap gap-1">
                          {step.ingredients.map((ing, j) => (
                            <span key={j} className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{ing}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-rose-950 mb-4">Recommended Product Types</h2>
            <p className="text-rose-900/60">Based on your analysis, look for these categories and ingredients.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {result.recommendations.map((rec, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-rose-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles size={24} />
                </div>
                <h4 className="text-lg font-bold text-rose-950 mb-3">{rec.category}</h4>
                <p className="text-sm text-rose-900/60 mb-6 leading-relaxed">{rec.why}</p>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-rose-900/40 uppercase tracking-widest">Key Ingredients</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.ingredients.map((ing, j) => (
                      <span key={j} className="px-3 py-1 bg-rose-50 text-rose-600 text-xs font-medium rounded-full">{ing}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expert Tips */}
        <div className="bg-rose-950 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <ShieldCheck size={200} />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Personalized Skincare Tips</h2>
              <p className="text-rose-100/60 mb-10 leading-relaxed">
                Our AI has generated these specific tips to help you maintain your skin's health and achieve your goals faster.
              </p>
              <div className="space-y-4">
                {result.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <CheckCircle2 className="text-rose-400 shrink-0 mt-0.5" size={20} />
                    <p className="text-sm font-medium">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 rounded-[2rem] p-8 border border-white/10">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Info size={24} className="text-rose-400" />
                Important Reminder
              </h4>
              <div className="space-y-6 text-sm text-rose-100/80 leading-relaxed">
                <p>
                  Skincare results take time. Be consistent with your routine for at least 4-6 weeks to see visible changes.
                </p>
                <p>
                  Always perform a patch test when introducing new active ingredients like Retinol or Vitamin C.
                </p>
                <div className="pt-6 border-t border-white/10">
                  <button className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all flex items-center justify-center gap-2">
                    Save Report to Profile
                    <Heart size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-center">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 px-10 py-5 bg-rose-500 text-white rounded-full font-bold text-lg hover:bg-rose-600 transition-all shadow-xl shadow-rose-200"
          >
            Go to My Dashboard
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function RefreshCcw(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}
