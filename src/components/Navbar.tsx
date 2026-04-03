import { Link, useLocation } from 'react-router-dom';
import { Sparkles, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Features', href: '/#features' },
    { name: 'FAQ', href: '/#faq' },
  ];

  if (isDashboard) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-200 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-rose-600" />
            </div>
            <span className="text-xl font-semibold text-rose-900 tracking-tight">GlowAI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-rose-800/70 hover:text-rose-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/auth"
              className="px-4 py-2 text-sm font-medium text-rose-900 bg-rose-50 hover:bg-rose-100 rounded-full transition-colors"
            >
              Login
            </Link>
            <Link
              to="/analysis"
              className="px-4 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-full shadow-sm transition-colors"
            >
              Analyze My Skin
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-rose-900"
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
            className="md:hidden bg-white border-b border-rose-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block px-3 py-2 text-base font-medium text-rose-800 hover:bg-rose-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                <Link
                  to="/auth"
                  className="w-full px-4 py-2 text-center text-sm font-medium text-rose-900 bg-rose-50 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/analysis"
                  className="w-full px-4 py-2 text-center text-sm font-medium text-white bg-rose-500 rounded-full"
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
