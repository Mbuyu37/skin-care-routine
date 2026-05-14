import { Link, useLocation } from 'react-router-dom';
import { Sparkles, User, Menu, X, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const isDashboard = location.pathname.startsWith('/dashboard');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Features', href: '/#features' },
    { name: 'FAQ', href: '/#faq' },
  ];

  if (isDashboard) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xl font-bold text-slate-50 tracking-tight">GlowAI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
                onClick={(e) => {
                  if (link.href.startsWith('/#')) {
                    const el = document.getElementById(link.href.substring(2));
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                {link.name}
              </a>
            ))}
            {user ? (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-50 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors border border-slate-700"
              >
                <LayoutDashboard size={16} className="text-emerald-400" />
                Dashboard
              </Link>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 text-sm font-medium text-slate-50 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors border border-slate-700"
              >
                Login
              </Link>
            )}
            <Link
              to="/analysis"
              className="px-4 py-2 text-sm font-medium text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-full shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
            >
              Analyze My Skin
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-slate-400 hover:bg-slate-800 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="w-full px-4 py-2 text-center text-sm font-medium text-slate-50 bg-slate-800 rounded-full flex items-center justify-center gap-2 border border-slate-700"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard size={16} className="text-emerald-400" />
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    className="w-full px-4 py-2 text-center text-sm font-medium text-slate-50 bg-slate-800 rounded-full border border-slate-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                )}
                <Link
                  to="/analysis"
                  className="w-full px-4 py-2 text-center text-sm font-medium text-slate-950 bg-emerald-500 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  Analyze My Skin
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
