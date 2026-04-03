import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-rose-50 border-t border-rose-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-rose-200 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-rose-600" />
              </div>
              <span className="text-xl font-semibold text-rose-900 tracking-tight">GlowAI</span>
            </Link>
            <p className="text-rose-800/60 text-sm leading-relaxed">
              Empowering you to understand your skin better with AI-driven analysis and personalized care routines.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-rose-400 hover:text-rose-600 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-rose-400 hover:text-rose-600 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-rose-400 hover:text-rose-600 transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-rose-900 font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-rose-800/60">
              <li><Link to="/" className="hover:text-rose-900 transition-colors">Home</Link></li>
              <li><Link to="/#about" className="hover:text-rose-900 transition-colors">About Us</Link></li>
              <li><Link to="/#features" className="hover:text-rose-900 transition-colors">Features</Link></li>
              <li><Link to="/analysis" className="hover:text-rose-900 transition-colors">Skin Analysis</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-rose-900 font-semibold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-rose-800/60">
              <li><Link to="/#faq" className="hover:text-rose-900 transition-colors">FAQ</Link></li>
              <li><a href="#" className="hover:text-rose-900 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-rose-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-rose-900 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-rose-900 font-semibold mb-6">Newsletter</h4>
            <p className="text-rose-800/60 text-sm mb-4">Get skincare tips and product updates.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white border border-rose-100 rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-rose-200"
              />
              <button className="bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-rose-600 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-rose-100 pt-8 text-center">
          <p className="text-rose-800/40 text-xs">
            © {new Date().getFullYear()} GlowAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
