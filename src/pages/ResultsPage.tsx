import { useEffect, useState, useRef } from 'react';
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
  Search,
  Loader2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { AnalysisResult } from '../types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
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

  const downloadReport = async () => {
    if (!reportRef.current || !result) return;
    
    setIsDownloading(true);
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#020617', // Match slate-950
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`glowai-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!result) return null;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-50 mb-2 tracking-tight">Your Skin Analysis</h1>
            <p className="text-slate-500 font-light uppercase tracking-widest text-[10px] font-bold">Generated on {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={downloadReport}
              disabled={isDownloading}
              className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:bg-slate-800 transition-colors shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
            </button>
            <button className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:bg-slate-800 transition-colors shadow-sm active:scale-95">
              <Share2 size={20} />
            </button>
            <Link 
              to="/analysis" 
              className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-2xl font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 active:scale-95"
            >
              <RefreshCcw size={18} />
              New Analysis
            </Link>
          </div>
        </div>

        {/* This div will be captured by PDF generator */}
        <div ref={reportRef} className="space-y-12 bg-slate-950 p-4 rounded-[2rem]">
          {/* Skin Summary Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Photo & Basic Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900 p-4 rounded-[2.5rem] shadow-2xl border border-slate-800 relative overflow-hidden group">
              <div className="aspect-square rounded-[2rem] overflow-hidden mb-6 relative">
                {image ? (
                  <img src={image} alt="Skin Analysis" className="w-full h-full object-cover opacity-80" />
                ) : (
                  <div className="w-full h-full bg-slate-950 flex items-center justify-center text-slate-800">
                    <User size={64} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-4 px-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Skin Type</span>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">{result.skinType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Health Score</span>
                  <span className="text-xl font-bold text-slate-50 tracking-tight">{result.healthScore}/100</span>
                </div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.healthScore}%` }}
                    className={cn(
                      "h-full transition-all duration-1000",
                      result.healthScore > 80 ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : result.healthScore > 60 ? "bg-amber-500" : "bg-emerald-500"
                    )}
                  />
                </div>
                <p className="text-[10px] text-slate-600 text-center font-bold uppercase tracking-tighter">AI Confidence: {result.confidence}%</p>
              </div>
            </div>

            {/* Observations */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-800">
              <h3 className="text-lg font-bold text-slate-50 mb-6 flex items-center gap-2 tracking-tight">
                <Search size={20} className="text-emerald-500" />
                Key Observations
              </h3>
              <ul className="space-y-4">
                {result.observations.map((obs, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed font-light">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                    {obs}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="lg:col-span-2 space-y-8">
            {/* Concerns Detected */}
            <div className="bg-slate-900 p-8 sm:p-10 rounded-[3rem] shadow-sm border border-slate-800">
              <h3 className="text-xl font-bold text-slate-50 mb-8 flex items-center gap-2 tracking-tight">
                <AlertCircle size={24} className="text-emerald-500" />
                Concerns Detected
              </h3>
              <div className="flex flex-wrap gap-3">
                {result.concerns.map((concern, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-6 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-sm font-bold text-slate-200 flex items-center gap-2 shadow-sm hover:border-slate-600 transition-colors"
                  >
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    {concern}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recommended Routine */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Morning */}
              <div className="bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 text-emerald-400">
                  <Sun size={80} />
                </div>
                <h3 className="text-xl font-bold text-slate-50 mb-8 flex items-center gap-2 tracking-tight">
                  <Sun size={24} className="text-emerald-400" />
                  AM Routine
                </h3>
                <div className="space-y-8 relative z-10">
                  {result.routine.morning.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                          {i + 1}
                        </div>
                        {i < result.routine.morning.length - 1 && <div className="w-0.5 flex-1 bg-slate-800" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-100 mb-1 tracking-tight">{step.step}: {step.product}</p>
                        <p className="text-xs text-slate-500 mb-2 font-light">{step.why}</p>
                        <div className="flex flex-wrap gap-1">
                          {step.ingredients.map((ing, j) => (
                            <span key={j} className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-widest">{ing}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Night */}
              <div className="bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 text-indigo-400">
                  <Moon size={80} />
                </div>
                <h3 className="text-xl font-bold text-slate-50 mb-8 flex items-center gap-2 tracking-tight">
                  <Moon size={24} className="text-indigo-400" />
                  PM Routine
                </h3>
                <div className="space-y-8 relative z-10">
                  {result.routine.night.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                          {i + 1}
                        </div>
                        {i < result.routine.night.length - 1 && <div className="w-0.5 flex-1 bg-slate-800" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-100 mb-1 tracking-tight">{step.step}: {step.product}</p>
                        <p className="text-xs text-slate-500 mb-2 font-light">{step.why}</p>
                        <div className="flex flex-wrap gap-1">
                          {step.ingredients.map((ing, j) => (
                            <span key={j} className="text-[10px] font-bold text-indigo-500/60 uppercase tracking-widest">{ing}</span>
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
            <h2 className="text-3xl font-bold text-slate-50 mb-4 tracking-tight">Recommended Analysis</h2>
            <p className="text-slate-500 font-light">Based on your analysis, look for these categories and ingredients.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {result.recommendations.map((rec, i) => (
              <div key={i} className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-sm hover:border-slate-700 transition-all group">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-50 mb-3 tracking-tight">{rec.category}</h4>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed font-light">{rec.why}</p>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Key Ingredients</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.ingredients.map((ing, j) => (
                      <span key={j} className="px-3 py-1 bg-slate-950 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-800">{ing}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expert Tips */}
        <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-slate-50 relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 p-12 opacity-5 text-emerald-500">
            <ShieldCheck size={200} />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 tracking-tight">Personalized Skincare Tips</h2>
              <p className="text-slate-400 mb-10 leading-relaxed font-light">
                Our AI has generated these specific tips to help you maintain your skin's health and achieve your goals faster.
              </p>
              <div className="space-y-4">
                {result.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-sm font-bold text-slate-300 tracking-tight">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-950 rounded-[2rem] p-8 border border-slate-800 shadow-inner">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2 tracking-tight">
                <Info size={24} className="text-emerald-500" />
                Expert Guidance
              </h4>
              <div className="space-y-6 text-sm text-slate-500 leading-relaxed font-light">
                <p>
                  Skincare results take time. Be consistent with your routine for at least 4-6 weeks to see visible changes.
                </p>
                <p>
                  Always perform a patch test when introducing new active ingredients like Retinol or Vitamin C.
                </p>
                <div className="pt-6 border-t border-slate-800">
                  <button className="w-full py-4 bg-emerald-500 text-slate-950 rounded-2xl font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-95">
                    Save Report to Profile
                    <Heart size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>

        {/* Next Steps */}
        <div className="text-center">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 px-10 py-5 bg-emerald-500 text-slate-950 rounded-full font-bold text-lg hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
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
