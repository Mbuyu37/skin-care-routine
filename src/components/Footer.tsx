import { Link } from 'react-router-dom';
import { User, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <User className="w-6 h-6 text-slate-950" />
              </div>
              <span className="text-2xl font-bold text-slate-50 tracking-tight">GlowAI</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Advanced AI-powered skincare analysis and personalized routine building. Empowering your skin health journey with science and technology.
            </p>
            <div className="flex gap-4 mt-8">
              <a href="#" className="p-2 bg-slate-900 rounded-xl text-slate-500 hover:text-emerald-500 hover:bg-slate-800 transition-all active:scale-95"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-slate-900 rounded-xl text-slate-500 hover:text-emerald-500 hover:bg-slate-800 transition-all active:scale-95"><Twitter size={20} /></a>
              <a href="#" className="p-2 bg-slate-900 rounded-xl text-slate-500 hover:text-emerald-500 hover:bg-slate-800 transition-all active:scale-95"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-50 font-bold mb-8 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-light">
              <li><Link to="/" className="hover:text-emerald-500 transition-colors">Home</Link></li>
              <li><Link to="/#about" className="hover:text-emerald-500 transition-colors">Process</Link></li>
              <li><Link to="/#features" className="hover:text-emerald-500 transition-colors">Features</Link></li>
              <li><Link to="/analysis" className="hover:text-emerald-500 transition-colors">Skin Analysis</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-50 font-bold mb-8 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-light">
              <li><Link to="/#faq" className="hover:text-emerald-500 transition-colors">Help Center</Link></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Terms of Use</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-50 font-bold mb-8 uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-slate-500 text-sm mb-6 font-light">Join our community for the latest in skincare tech.</p>
            <form className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-slate-200 transition-all"
                />
              </div>
              <button className="w-full bg-emerald-500 text-slate-950 px-6 py-4 rounded-2xl text-sm font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10 active:scale-95 text-center">
                Get Updates
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-slate-900 pt-10 text-center">
          <p className="text-slate-600 text-[10px] uppercase font-bold tracking-[0.2em]">
            &copy; {new Date().getFullYear()} GlowAI. All Rights Reserved. Professional Skin Analysis.
          </p>
        </div>
      </div>
    </footer>
  );
}
