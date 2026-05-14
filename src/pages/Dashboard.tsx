import { useState } from 'react';
import { 
  LayoutDashboard, 
  Camera, 
  Sparkles, 
  Calendar, 
  User, 
  LogOut, 
  ChevronRight,
  TrendingUp,
  Droplets,
  ShieldCheck,
  Search,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Dashboard() {
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

  const summaryCards = [
    { title: 'Last Analysis', value: 'Oct 24, 2023', icon: <Calendar className="text-emerald-500" />, color: 'bg-emerald-500/10' },
    { title: 'Skin Type', value: 'Combination', icon: <User className="text-indigo-500" />, color: 'bg-indigo-500/10' },
    { title: 'Main Concern', value: 'Acne & Redness', icon: <ShieldCheck className="text-emerald-500" />, color: 'bg-emerald-500/10' },
    { title: 'Routine Progress', value: '85%', icon: <TrendingUp className="text-amber-500" />, color: 'bg-amber-500/10' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-50">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 lg:relative lg:translate-x-0 shadow-2xl",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-10">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-400" />
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
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group",
                  location.pathname === item.path 
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                )}
              >
                <span className={cn("transition-transform group-hover:scale-110", location.pathname === item.path ? "text-slate-950" : "text-slate-500 group-hover:text-emerald-400")}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-slate-800">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-sm font-bold text-slate-400 hover:bg-slate-800 hover:text-emerald-400 transition-all group"
            >
              <LogOut size={20} className="text-slate-500 group-hover:text-emerald-400" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-slate-950 border-b border-slate-800 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-400" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-50 tracking-tight">Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center bg-slate-900 rounded-full px-4 py-2 border border-slate-800 w-64">
              <Search size={18} className="text-slate-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none focus:outline-none text-sm text-slate-200 placeholder:text-slate-600 w-full"
              />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-emerald-400 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-slate-50">Jane Doe</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Premium</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden">
                <img src="https://i.pravatar.cc/100?img=32" alt="Avatar" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 sm:p-10 space-y-10 max-w-7xl mx-auto w-full">
          {/* Welcome Section */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-50 mb-2 tracking-tight">Welcome back, Jane! 👋</h2>
                <p className="text-slate-400 font-light">Here's what's happening with your skin today.</p>
              </div>
              <Link 
                to="/analysis" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-slate-950 rounded-2xl font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <Camera size={18} />
                New Analysis
              </Link>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {summaryCards.map((card, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm hover:border-slate-700 transition-all"
                >
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", card.color)}>
                    {card.icon}
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{card.title}</p>
                  <p className="text-lg font-bold text-slate-50 tracking-tight">{card.value}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Routine & Progress */}
            <div className="lg:col-span-2 space-y-8">
              {/* Current Routine */}
              <div className="bg-slate-900 rounded-[2rem] border border-slate-800 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-50 tracking-tight">Current Routine</h3>
                  <Link to="/dashboard/routine" className="text-sm font-bold text-emerald-500 hover:text-emerald-400 flex items-center gap-1 transition-colors">
                    View All <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 shrink-0 mt-1">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-100 mb-1">Morning Routine</p>
                      <p className="text-sm text-slate-400 mb-3 font-light">4 steps • 15 mins</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-slate-800 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-700">Cleanser</span>
                        <span className="px-3 py-1 bg-slate-800 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-700">Vitamin C</span>
                        <span className="px-3 py-1 bg-slate-800 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-700">Moisturizer</span>
                        <span className="px-3 py-1 bg-slate-800 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-700">SPF 50</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 shrink-0 mt-1">
                      <Droplets size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-100 mb-1">Night Routine</p>
                      <p className="text-sm text-slate-400 mb-3 font-light">5 steps • 20 mins</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-slate-800 text-indigo-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-700">Double Cleanse</span>
                        <span className="px-3 py-1 bg-slate-800 text-indigo-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-700">Retinol</span>
                        <span className="px-3 py-1 bg-slate-800 text-indigo-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-700">Night Cream</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Chart Placeholder */}
              <div className="bg-slate-900 rounded-[2rem] border border-slate-800 shadow-sm p-8">
                <h3 className="text-xl font-bold text-slate-50 mb-8 tracking-tight">Skin Progress</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[40, 55, 45, 70, 65, 85, 80].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className={cn(
                          "w-full rounded-t-xl transition-all",
                          i === 6 ? "bg-emerald-500" : "bg-slate-800 hover:bg-slate-700"
                        )}
                      />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Day {i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Recommendations & Tips */}
            <div className="space-y-8">
              {/* Top Recommendations */}
              <div className="bg-slate-900 rounded-[2rem] border border-slate-800 shadow-sm p-8">
                <h3 className="text-xl font-bold text-slate-50 mb-6 tracking-tight">Top Picks</h3>
                <div className="space-y-6">
                  {[
                    { name: 'Gentle Foaming Cleanser', brand: 'La Roche-Posay', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=100' },
                    { name: 'Vitamin C Serum', brand: 'SkinCeuticals', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=100' },
                    { name: 'Hyaluronic Acid', brand: 'The Ordinary', img: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=100' },
                  ].map((product, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform opacity-75" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-100 truncate tracking-tight">{product.name}</p>
                        <p className="text-xs text-slate-500 font-light">{product.brand}</p>
                      </div>
                      <ChevronRight size={16} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-3 bg-slate-950 text-emerald-500 rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all border border-slate-800 active:scale-95">
                  View All Picks
                </button>
              </div>

              {/* Daily Tip */}
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-[2rem] p-8 text-slate-950 relative overflow-hidden shadow-2xl shadow-emerald-500/10">
                <Sparkles className="absolute -top-4 -right-4 w-24 h-24 text-slate-950/10 rotate-12" />
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2 tracking-tight">
                  <Sparkles size={20} />
                  Daily Skin Tip
                </h4>
                <p className="text-slate-900 text-sm leading-relaxed mb-6 font-medium">
                  "Always apply your sunscreen as the last step of your morning routine, even on cloudy days. UV rays can penetrate clouds and windows!"
                </p>
                <button className="text-[10px] font-bold bg-slate-950/10 hover:bg-slate-950/20 px-4 py-2 rounded-full transition-colors uppercase tracking-widest border border-slate-950/10">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
