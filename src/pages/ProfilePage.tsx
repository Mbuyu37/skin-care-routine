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
    <div className="min-h-screen bg-rose-50/30 flex">
      {/* Reusing Sidebar Logic from Dashboard */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-rose-100 transition-transform duration-300 lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-10">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-rose-200 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-rose-600" />
              </div>
              <span className="text-xl font-semibold text-rose-900 tracking-tight">GlowAI</span>
            </Link>
            <button className="lg:hidden text-rose-900" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all group",
                  location.pathname === item.path 
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-100" 
                    : "text-rose-900/60 hover:bg-rose-50 hover:text-rose-900"
                )}
              >
                <span className={cn("transition-transform group-hover:scale-110", location.pathname === item.path ? "text-white" : "text-rose-400")}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-rose-100">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-sm font-medium text-rose-900/60 hover:bg-rose-50 hover:text-rose-900 transition-all group"
            >
              <LogOut size={20} className="text-rose-400 group-hover:text-rose-600" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-rose-100 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-rose-900" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-rose-950">My Profile</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-rose-400 hover:text-rose-600 transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <div className="p-6 sm:p-10 space-y-10 max-w-5xl mx-auto w-full">
          {/* Profile Header Card */}
          <div className="bg-white rounded-[3rem] p-8 sm:p-12 border border-rose-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-rose-100 border-4 border-white shadow-lg overflow-hidden">
                <img src="https://i.pravatar.cc/200?img=32" alt="Avatar" referrerPolicy="no-referrer" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-rose-500 text-white rounded-full border-4 border-white hover:scale-110 transition-transform">
                <Camera size={16} />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-rose-950 mb-2">Jane Doe</h2>
              <p className="text-rose-900/60 mb-6">Premium Member since August 2023</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 rounded-full text-sm font-medium text-rose-600">
                  <Mail size={16} />
                  jane@example.com
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 rounded-full text-sm font-medium text-rose-600">
                  <ShieldCheck size={16} />
                  Verified Profile
                </div>
              </div>
            </div>
            <button className="px-8 py-3 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-100">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Analysis History */}
            <div className="bg-white rounded-[2.5rem] border border-rose-100 shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-rose-950 flex items-center gap-2">
                  <History size={24} className="text-rose-500" />
                  Analysis History
                </h3>
                <button className="text-sm font-bold text-rose-500 hover:text-rose-600">View All</button>
              </div>
              <div className="space-y-4">
                {pastAnalyses.map((analysis, i) => (
                  <div key={i} className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 flex items-center justify-between group cursor-pointer hover:bg-rose-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-rose-500 font-bold shadow-sm">
                        {analysis.score}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-rose-950">{analysis.date}</p>
                        <p className="text-xs text-rose-900/40">{analysis.type} • {analysis.concern}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-rose-300 group-hover:text-rose-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Content */}
            <div className="bg-white rounded-[2.5rem] border border-rose-100 shadow-sm p-8">
              <h3 className="text-xl font-bold text-rose-950 mb-8 flex items-center gap-2">
                <Heart size={24} className="text-rose-500" />
                Saved Routines & Products
              </h3>
              <div className="space-y-6">
                <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-bold text-rose-950">Winter Hydration Routine</p>
                    <span className="px-2 py-1 bg-white text-rose-500 text-[10px] font-bold rounded uppercase">Active</span>
                  </div>
                  <p className="text-xs text-rose-900/60 mb-4">A gentle routine focused on barrier repair and deep hydration during cold months.</p>
                  <button className="text-xs font-bold text-rose-500 flex items-center gap-1 hover:underline">
                    View Routine <ChevronRight size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Vitamin C Serum', brand: 'SkinCeuticals' },
                    { name: 'Gentle Cleanser', brand: 'La Roche-Posay' }
                  ].map((product, i) => (
                    <div key={i} className="p-4 bg-white border border-rose-100 rounded-2xl">
                      <p className="text-xs font-bold text-rose-950 truncate">{product.name}</p>
                      <p className="text-[10px] text-rose-900/40">{product.brand}</p>
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
