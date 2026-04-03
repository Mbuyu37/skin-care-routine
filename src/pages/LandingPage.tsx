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
  Zap
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
      icon: <Camera className="w-6 h-6 text-rose-500" />,
    },
    {
      title: 'Personalized Recommendations',
      description: 'Get product suggestions tailored to your specific skin needs and goals.',
      icon: <Sparkles className="w-6 h-6 text-rose-500" />,
    },
    {
      title: 'Custom Routine',
      description: 'A step-by-step morning and night routine designed just for you.',
      icon: <LayoutDashboard className="w-6 h-6 text-rose-500" />,
    },
    {
      title: 'Instant Results',
      description: 'No waiting. Get your full analysis and routine in seconds.',
      icon: <Zap className="w-6 h-6 text-rose-500" />,
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
    <div className="pt-16 bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={stagger}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-sm font-medium mb-6">
                <Sparkles size={16} />
                <span>AI-Powered Skincare</span>
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-bold text-rose-950 leading-tight mb-6">
                Understand Your Skin <br />
                <span className="text-rose-500">with AI Precision</span>
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg text-rose-900/60 mb-10 max-w-xl mx-auto lg:mx-0">
                Upload a photo, get instant skin analysis, recommended products, and a skincare routine tailored to your unique skin profile.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/analysis" 
                  className="px-8 py-4 bg-rose-500 text-white rounded-full font-semibold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 flex items-center justify-center gap-2 group"
                >
                  Analyze My Skin
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link 
                  to="/auth" 
                  className="px-8 py-4 bg-white text-rose-900 border border-rose-100 rounded-full font-semibold hover:bg-rose-50 transition-all flex items-center justify-center"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div variants={fadeIn} className="mt-12 flex items-center justify-center lg:justify-start gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-rose-100 flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex text-amber-400 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-rose-900/60 font-medium">Trusted by 10,000+ users</p>
                </div>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800" 
                  alt="Skincare" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent" />
              </div>
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-rose-50 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-rose-900/40 font-medium">Skin Type</p>
                    <p className="text-sm text-rose-900 font-bold">Combination</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-rose-50 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <Zap className="text-rose-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-rose-900/40 font-medium">Health Score</p>
                    <p className="text-sm text-rose-900 font-bold">84/100</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-rose-950 mb-6">Skincare Science Meets AI</h2>
            <p className="text-lg text-rose-900/60 leading-relaxed">
              We believe everyone deserves a skincare routine that actually works. Most people struggle with identifying their true skin concerns. GlowAI uses advanced machine learning to bridge that gap, providing professional-level skin analysis from the comfort of your home.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Saves Time', desc: 'No more guessing or endless research. Get answers in seconds.', icon: <Clock /> },
              { title: 'Personalized Care', desc: 'Every skin is unique. Your routine should be too.', icon: <ShieldCheck /> },
              { title: 'Better Choices', desc: 'Stop wasting money on products that don\'t suit you.', icon: <Search /> }
            ].map((benefit, i) => (
              <div key={i} className="p-8 rounded-2xl bg-rose-50 border border-rose-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-rose-500 mb-6 shadow-sm">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-rose-950 mb-3">{benefit.title}</h3>
                <p className="text-rose-900/60">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-rose-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-rose-950 mb-4">Powerful Features</h2>
            <p className="text-rose-900/60">Everything you need for a glowing skin journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-rose-100 hover:border-rose-300 transition-colors group">
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-rose-950 mb-3">{feature.title}</h3>
                <p className="text-sm text-rose-900/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-rose-950 mb-4">How It Works</h2>
            <p className="text-rose-900/60">Four simple steps to your best skin ever.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-rose-100 -translate-y-1/2 z-0" />
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-16 h-16 bg-rose-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-8 shadow-lg shadow-rose-200">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-rose-950 mb-4">{step.title}</h3>
                <p className="text-rose-900/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-rose-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-rose-950 mb-4">What Our Users Say</h2>
            <p className="text-rose-900/60">Real results from real people.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-rose-100">
                <div className="flex text-amber-400 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-rose-900/80 italic mb-6">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-100" />
                  <div>
                    <p className="text-sm font-bold text-rose-950">{t.name}</p>
                    <p className="text-xs text-rose-900/40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-rose-950 mb-4">Frequently Asked Questions</h2>
            <p className="text-rose-900/60">Everything you need to know about GlowAI.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-rose-100 rounded-2xl overflow-hidden">
                <button 
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-rose-50 transition-colors"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span className="font-semibold text-rose-950">{faq.question}</span>
                  <ChevronDown className={cn("text-rose-400 transition-transform", activeFaq === i && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-4 text-rose-900/60 text-sm"
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
          <div className="bg-rose-500 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-rose-200">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-300 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Glow?</h2>
              <p className="text-rose-50 text-lg mb-10">
                Join thousands of users who have transformed their skin with our AI analysis. Your personalized routine is just a photo away.
              </p>
              <Link 
                to="/analysis" 
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-rose-600 rounded-full font-bold text-lg hover:bg-rose-50 transition-all shadow-xl"
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
