import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Sparkles, Chrome, Github, GithubIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, signInWithGoogle, signInWithGithub, signInWithEmail, signUpWithEmail, loading } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await signInWithEmail(formData.email, formData.password);
      } else {
        if (!formData.name) throw new Error("Full name is required");
        await signUpWithEmail(formData.email, formData.password, formData.name);
      }
      navigate('/dashboard');
    } catch (error: any) {
      console.error(error);
      setAuthError(error.message || "Authentication failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setAuthError(null);
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error: any) {
      setAuthError("Failed to sign in with Google. Please ensure it's enabled in Firebase console.");
    }
  };

  const handleGithubLogin = async () => {
    try {
      setAuthError(null);
      await signInWithGithub();
      navigate('/dashboard');
    } catch (error: any) {
      setAuthError("Failed to sign in with GitHub. Please ensure it's enabled in Firebase console.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Sparkles className="animate-spin text-emerald-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl w-full bg-slate-900 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row border border-slate-800">
        {/* Form Side */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16">
          <div className="mb-10 text-center lg:text-left">
            <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xl font-bold text-slate-50 tracking-tight">GlowAI</span>
            </Link>
            <h2 className="text-3xl font-bold text-slate-50 mb-2 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-400 font-light">
              {isLogin 
                ? 'Enter your details to access your skincare dashboard.' 
                : 'Join GlowAI and start your personalized skincare journey.'}
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm font-medium">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-semibold text-slate-300 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-200"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  placeholder="jane@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-slate-300">Password</label>
                {isLogin && (
                  <button type="button" className="text-xs font-medium text-emerald-500 hover:text-emerald-400 transition-colors">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-200"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center gap-2 ml-1">
                <input type="checkbox" id="remember" className="rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-emerald-500/20" />
                <label htmlFor="remember" className="text-xs text-slate-500 font-medium tracking-tight">Remember me</label>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-emerald-500 text-slate-950 rounded-2xl font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
              {!isSubmitting && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <span className="relative px-4 bg-slate-900 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleGoogleLogin}
                className="py-3 bg-slate-950 border border-slate-800 text-slate-200 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95"
              >
                <Chrome size={18} className="text-emerald-500" />
                Google
              </button>
              <button 
                onClick={handleGithubLogin}
                className="py-3 bg-slate-950 border border-slate-800 text-slate-200 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95"
              >
                <Github size={18} className="text-emerald-500" />
                GitHub
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-slate-400 font-light">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-emerald-500 hover:text-emerald-400 underline underline-offset-4 decoration-emerald-500/30 transition-all"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        {/* Image Side */}
        <div className="hidden lg:block w-1/2 relative bg-slate-950">
          <img
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800"
            alt="Skincare"
            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[50%] brightness-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 text-slate-50">
            <div className="flex text-emerald-400 mb-4">
              {[1, 2, 3, 4, 5].map((i) => <Sparkles key={i} size={16} fill="currentColor" className="mr-1" />)}
            </div>
            <h3 className="text-2xl font-bold mb-2 tracking-tight">"The best skincare routine I've ever had."</h3>
            <p className="text-slate-400 text-sm font-light">— Sarah Jenkins, GlowAI User</p>
          </div>
        </div>
      </div>
    </div>
  );
}
