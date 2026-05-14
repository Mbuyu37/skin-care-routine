import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  History, 
  Heart, 
  Settings, 
  ChevronRight,
  Camera,
  Sparkles,
  LogOut,
  X,
  Menu,
  LayoutDashboard,
  TrendingUp,
  Droplets
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'New Analysis', icon: <Camera size={20} />, path: '/analysis' },
    { name: 'Results', icon: <TrendingUp size={20} />, path: '/dashboard/results' },
    { name: 'Recommendations', icon: <Sparkles size={20} />, path: '/dashboard/recommendations' },
    { name: 'My Routine', icon: <Droplets size={20} />, path: '/dashboard/routine' },
    { name: 'Profile', icon: <User size={20} />, path: '/dashboard/profile' },
  ];

  const pastAnalyses = [
    { date: 'Oct 24, 2023', score: 78, type: 'Combination', concern: 'Acne' },
    { date: 'Sep 12, 2023', score: 72, type: 'Combination', concern: 'Redness' },
    { date: 'Aug 05, 2023', score: 65, type: 'Oily', concern: 'Oiliness' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans">
      {/* Reusing Sidebar Logic from Dashboard */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-900 transition-transform duration-300 lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-10">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                <User className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-xl font-bold text-slate-50 tracking-tight">GlowAI</span>
            </Link>
            <button className="lg:hidden text-slate-400" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group active:scale-95",
                  location.pathname === item.path 
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20" 
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                )}
              >
                <span className={cn("transition-transform group-hover:scale-110", location.pathname === item.path ? "text-slate-950" : "text-emerald-500")}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-slate-900">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-sm font-bold text-slate-400 hover:bg-slate-900 hover:text-rose-400 transition-all group active:scale-95"
            >
              <LogOut size={20} className="text-slate-500 group-hover:text-rose-400" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-slate-950/50 backdrop-blur-md border-b border-slate-900 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-400" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">My Profile</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-slate-100 transition-colors active:scale-90">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <div className="p-6 sm:p-10 space-y-10 max-w-5xl mx-auto w-full">
          {/* Profile Header Card */}
          <div className="bg-slate-900 rounded-[3rem] p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-slate-950 border-4 border-slate-800 shadow-lg overflow-hidden">
                <img src="https://i.pravatar.cc/200?img=32" alt="Avatar" referrerPolicy="no-referrer" className="opacity-80" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-emerald-500 text-slate-950 rounded-full border-4 border-slate-900 hover:scale-110 transition-transform active:scale-95 shadow-lg">
                <Camera size={16} />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-50 mb-2 tracking-tight">Jane Doe</h2>
              <p className="text-slate-500 text-sm font-light mb-6">Premium Member since August 2023</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 rounded-full text-xs font-bold text-slate-300">
                  <Mail size={16} className="text-emerald-500" />
                  jane@example.com
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 rounded-full text-xs font-bold text-slate-300">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  Verified Profile
                </div>
              </div>
            </div>
            <button className="px-8 py-3 bg-slate-950 text-slate-100 border border-slate-800 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Analysis History */}
            <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-50 flex items-center gap-2 tracking-tight">
                  <History size={24} className="text-emerald-500" />
                  Analysis History
                </h3>
                <button className="text-xs font-bold text-slate-500 hover:text-emerald-500 uppercase tracking-widest transition-colors">View All</button>
              </div>
              <div className="space-y-4">
                {pastAnalyses.map((analysis, i) => (
                  <div key={i} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between group cursor-pointer hover:border-slate-600 transition-all active:scale-[0.98]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-emerald-500 font-bold shadow-sm">
                        {analysis.score}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-200 tracking-tight">{analysis.date}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{analysis.type} • {analysis.concern}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-700 group-hover:text-emerald-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Content */}
            <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-sm p-8">
              <h3 className="text-xl font-bold text-slate-50 mb-8 flex items-center gap-2 tracking-tight">
                <Heart size={24} className="text-emerald-500" />
                Saved Routines
              </h3>
              <div className="space-y-6">
                <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors group">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-bold text-slate-100 tracking-tight">Winter Hydration Routine</p>
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/20 uppercase">Active</span>
                  </div>
                  <p className="text-xs text-slate-500 font-light mb-4 leading-relaxed">A gentle routine focused on barrier repair and deep hydration during cold months.</p>
                  <button className="text-xs font-bold text-emerald-500 flex items-center gap-1 hover:text-emerald-400 transition-colors uppercase tracking-widest">
                    View Routine <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Vitamin C Serum', brand: 'SkinCeuticals' },
                    { name: 'Gentle Cleanser', brand: 'La Roche-Posay' }
                  ].map((product, i) => (
                    <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors">
                      <p className="text-xs font-bold text-slate-200 truncate tracking-tight">{product.name}</p>
                      <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">{product.brand}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper icons for sidebar (reusing from Dashboard)
