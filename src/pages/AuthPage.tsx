import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Sparkles, Chrome } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Form Side */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16">
          <div className="mb-10">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-rose-200 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-rose-600" />
              </div>
              <span className="text-xl font-semibold text-rose-900 tracking-tight">GlowAI</span>
            </Link>
            <h2 className="text-3xl font-bold text-rose-950 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-rose-900/60">
              {isLogin 
                ? 'Enter your details to access your skincare dashboard.' 
                : 'Join GlowAI and start your personalized skincare journey.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-semibold text-rose-900 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" size={18} />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-rose-50/50 border border-rose-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-rose-900 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" size={18} />
                <input
                  type="email"
                  placeholder="jane@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-rose-50/50 border border-rose-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-rose-900">Password</label>
                {isLogin && (
                  <button type="button" className="text-xs font-medium text-rose-500 hover:text-rose-600">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-rose-50/50 border border-rose-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center gap-2 ml-1">
                <input type="checkbox" id="remember" className="rounded border-rose-200 text-rose-500 focus:ring-rose-200" />
                <label htmlFor="remember" className="text-xs text-rose-900/60 font-medium">Remember me</label>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-100 flex items-center justify-center gap-2 group"
            >
              {isLogin ? 'Login' : 'Sign Up'}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-rose-100"></div>
              </div>
              <span className="relative px-4 bg-white text-xs font-medium text-rose-900/40 uppercase tracking-widest">Or continue with</span>
            </div>

            <button className="w-full py-3 bg-white border border-rose-100 text-rose-900 rounded-2xl font-semibold hover:bg-rose-50 transition-all flex items-center justify-center gap-3">
              <Chrome size={18} className="text-rose-500" />
              Google
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-rose-900/60">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-rose-500 hover:text-rose-600 underline underline-offset-4"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        {/* Image Side */}
        <div className="hidden lg:block w-1/2 relative bg-rose-100">
          <img
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800"
            alt="Skincare"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-950/60 via-transparent to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <div className="flex text-amber-400 mb-4">
              {[1, 2, 3, 4, 5].map((i) => <Sparkles key={i} size={16} fill="currentColor" className="mr-1" />)}
            </div>
            <h3 className="text-2xl font-bold mb-2">"The best skincare routine I've ever had."</h3>
            <p className="text-rose-100/80 text-sm">— Sarah Jenkins, GlowAI User</p>
          </div>
        </div>
      </div>
    </div>
  );
}
