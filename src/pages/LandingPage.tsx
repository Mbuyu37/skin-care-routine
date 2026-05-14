import { 
  Sparkles, 
  Camera, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  ChevronDown,
  ShieldCheck,
  Clock,
  LayoutDashboard,
  Zap,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    {
      title: 'AI Skin Analysis',
      description: 'Advanced computer vision to detect skin type and concerns from a single photo.',
      icon: <Camera className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: 'Personalized Recommendations',
      description: 'Get product suggestions tailored to your specific skin needs and goals.',
      icon: <Sparkles className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: 'Custom Routine',
      description: 'A step-by-step morning and night routine designed just for you.',
      icon: <LayoutDashboard className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: 'Instant Results',
      description: 'No waiting. Get your full analysis and routine in seconds.',
      icon: <Zap className="w-6 h-6 text-emerald-500" />,
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload Photo',
      description: 'Take or upload a clear photo of your face in natural lighting.',
    },
    {
      number: '02',
      title: 'AI Analysis',
      description: 'Our AI scans for texture, pores, hydration, and concerns.',
    },
    {
      number: '03',
      title: 'Get Results',
      description: 'Receive a detailed report and product recommendations.',
    },
    {
      number: '04',
      title: 'Follow Routine',
      description: 'Start your personalized skincare journey with confidence.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah J.',
      role: 'Verified User',
      content: 'I never knew my skin was actually dehydrated, not just dry. GlowAI changed my whole routine!',
      rating: 5,
    },
    {
      name: 'Michael R.',
      role: 'Verified User',
      content: 'The product recommendations are spot on. My acne has cleared up significantly in just 3 weeks.',
      rating: 5,
    },
    {
      name: 'Elena L.',
      role: 'Verified User',
      content: 'Finally, a routine that actually makes sense for my sensitive skin. Highly recommend!',
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: 'Is my photo safe?',
      answer: 'Yes, your privacy is our priority. Photos are processed securely and are not stored permanently unless you choose to save them to your profile.',
    },
    {
      question: 'How accurate is the AI analysis?',
      answer: 'Our AI is trained on thousands of clinical images. While it provides high accuracy for common concerns, we always recommend consulting a dermatologist for medical conditions.',
    },
    {
      question: 'Can I use it for oily/dry/acne-prone skin?',
      answer: 'Absolutely! GlowAI is designed to analyze all skin types and can identify specific concerns like acne, dryness, oiliness, and aging.',
    },
  ];

  return (
    <div className="pt-16 bg-slate-950 overflow-hidden text-slate-50">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-40 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={stagger}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
                <Sparkles size={16} />
                <span>AI-Powered Skincare</span>
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-bold text-slate-50 leading-tight mb-6 tracking-tight">
                Understand Your Skin <br />
                <span className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">with AI Precision</span>
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0">
                Upload a photo, get instant skin analysis, recommended products, and a skincare routine tailored to your unique skin profile.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/analysis" 
                  className="px-8 py-4 bg-emerald-500 text-slate-950 rounded-full font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group active:scale-95"
                >
                  Analyze My Skin
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link 
                  to="/auth" 
                  className="px-8 py-4 bg-slate-900 text-slate-50 border border-slate-800 rounded-full font-bold hover:bg-slate-800 transition-all flex items-center justify-center active:scale-95"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div variants={fadeIn} className="mt-12 flex items-center justify-center lg:justify-start gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden shadow-lg">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex text-emerald-400 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-400 font-medium">Trusted by 10,000+ users</p>
                </div>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800/50">
                <img 
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800" 
                  alt="Skincare" 
                  className="w-full h-auto brightness-90 saturate-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              </div>
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -left-6 bg-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-800 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Skin Type</p>
                    <p className="text-sm text-slate-200 font-bold">Combination</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-800 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center">
                    <Zap className="text-indigo-400" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Health Score</p>
                    <p className="text-sm text-slate-200 font-bold">84/100</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-50 mb-6 tracking-tight">Skincare Science Meets AI</h2>
            <p className="text-lg text-slate-400 leading-relaxed font-light">
              We believe everyone deserves a skincare routine that actually works. Most people struggle with identifying their true skin concerns. GlowAI uses advanced machine learning to bridge that gap, providing professional-level skin analysis from the comfort of your home.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Saves Time', desc: 'No more guessing or endless research. Get answers in seconds.', icon: <Clock /> },
              { title: 'Personalized Care', desc: 'Every skin is unique. Your routine should be too.', icon: <ShieldCheck /> },
              { title: 'Better Choices', desc: 'Stop wasting money on products that don\'t suit you.', icon: <Search /> }
            ].map((benefit, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-500 group">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform shadow-inner">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-50 mb-3">{benefit.title}</h3>
                <p className="text-slate-400 leading-relaxed font-light text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-50 mb-4 tracking-tight">Powerful Features</h2>
            <p className="text-slate-400 font-light">Everything you need for a glowing skin journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-800 hover:border-emerald-500/30 transition-all group">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-50 mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-50 mb-4 tracking-tight">How It Works</h2>
            <p className="text-slate-400 font-light">Four simple steps to your best skin ever.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-[2.5rem] left-0 w-full h-[1px] bg-slate-800 z-0" />
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-16 h-16 bg-slate-900 text-emerald-400 border border-slate-800 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-8 shadow-xl shadow-slate-950">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-slate-50 mb-4 tracking-tight">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-50 mb-4 tracking-tight">What Our Users Say</h2>
            <p className="text-slate-400 font-light">Real results from real people.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-800/50">
                <div className="flex text-emerald-400 mb-4">
                  {Array.from({ length: t.rating }).map((_, r) => <Star key={r} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-300 italic mb-6 font-light leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                    <User className="text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-50">{t.name}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-50 mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-400 font-light">Everything you need to know about GlowAI.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-800 rounded-3xl overflow-hidden bg-slate-900/50 backdrop-blur-sm">
                <button 
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span className="font-bold text-slate-100 tracking-tight">{faq.question}</span>
                  <ChevronDown className={cn("text-slate-500 transition-transform duration-300", activeFaq === i && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 text-slate-400 text-sm font-light leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-500 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.2)]">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-950 mb-6 tracking-tight">Ready to Glow?</h2>
              <p className="text-slate-900/70 text-lg mb-10 font-medium">
                Join thousands of users who have transformed their skin with our AI analysis. Your personalized routine is just a photo away.
              </p>
              <Link 
                to="/analysis" 
                className="inline-flex items-center gap-2 px-10 py-5 bg-slate-950 text-emerald-500 rounded-full font-bold text-lg hover:bg-slate-900 transition-all shadow-2xl active:scale-95"
              >
                Start My Analysis
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
