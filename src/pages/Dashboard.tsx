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
    { title: 'Last Analysis', value: 'Oct 24, 2023', icon: <Calendar className="text-rose-500" />, color: 'bg-rose-50' },
    { title: 'Skin Type', value: 'Combination', icon: <User className="text-blue-500" />, color: 'bg-blue-50' },
    { title: 'Main Concern', value: 'Acne & Redness', icon: <ShieldCheck className="text-green-500" />, color: 'bg-green-50' },
    { title: 'Routine Progress', value: '85%', icon: <TrendingUp className="text-amber-500" />, color: 'bg-amber-50' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-rose-50/30 flex">
      {/* Sidebar */}
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
              onClick={handleLogout}
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
            <h1 className="text-xl font-bold text-rose-950">Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center bg-rose-50 rounded-full px-4 py-2 border border-rose-100 w-64">
              <Search size={18} className="text-rose-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none focus:outline-none text-sm text-rose-900 placeholder:text-rose-300 w-full"
              />
            </div>
            <button className="relative p-2 text-rose-400 hover:text-rose-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-rose-100">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-rose-950">Jane Doe</p>
                <p className="text-xs text-rose-900/40">Premium Member</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-rose-100 border-2 border-white overflow-hidden">
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
                <h2 className="text-3xl font-bold text-rose-950 mb-2">Welcome back, Jane! 👋</h2>
                <p className="text-rose-900/60">Here's what's happening with your skin today.</p>
              </div>
              <Link 
                to="/analysis" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-100"
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
                  className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", card.color)}>
                    {card.icon}
                  </div>
                  <p className="text-sm text-rose-900/40 font-medium mb-1">{card.title}</p>
                  <p className="text-lg font-bold text-rose-950">{card.value}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Routine & Progress */}
            <div className="lg:col-span-2 space-y-8">
              {/* Current Routine */}
              <div className="bg-white rounded-[2rem] border border-rose-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-rose-100 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-rose-950">Current Routine</h3>
                  <Link to="/dashboard/routine" className="text-sm font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1">
                    View All <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 shrink-0 mt-1">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-rose-950 mb-1">Morning Routine</p>
                      <p className="text-sm text-rose-900/60 mb-3">4 steps • 15 mins</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-rose-50 text-rose-600 text-xs font-medium rounded-full">Cleanser</span>
                        <span className="px-3 py-1 bg-rose-50 text-rose-600 text-xs font-medium rounded-full">Vitamin C</span>
                        <span className="px-3 py-1 bg-rose-50 text-rose-600 text-xs font-medium rounded-full">Moisturizer</span>
                        <span className="px-3 py-1 bg-rose-50 text-rose-600 text-xs font-medium rounded-full">SPF 50</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 shrink-0 mt-1">
                      <Droplets size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-rose-950 mb-1">Night Routine</p>
                      <p className="text-sm text-rose-900/60 mb-3">5 steps • 20 mins</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">Double Cleanse</span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">Retinol</span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">Night Cream</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Chart Placeholder */}
              <div className="bg-white rounded-[2rem] border border-rose-100 shadow-sm p-8">
                <h3 className="text-xl font-bold text-rose-950 mb-8">Skin Progress</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[40, 55, 45, 70, 65, 85, 80].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className={cn(
                          "w-full rounded-t-xl transition-colors",
                          i === 6 ? "bg-rose-500" : "bg-rose-100 hover:bg-rose-200"
                        )}
                      />
                      <span className="text-[10px] font-bold text-rose-900/40 uppercase">Day {i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Recommendations & Tips */}
            <div className="space-y-8">
              {/* Top Recommendations */}
              <div className="bg-white rounded-[2rem] border border-rose-100 shadow-sm p-8">
                <h3 className="text-xl font-bold text-rose-950 mb-6">Top Recommendations</h3>
                <div className="space-y-6">
                  {[
                    { name: 'Gentle Foaming Cleanser', brand: 'La Roche-Posay', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=100' },
                    { name: 'Vitamin C Serum', brand: 'SkinCeuticals', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=100' },
                    { name: 'Hyaluronic Acid', brand: 'The Ordinary', img: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=100' },
                  ].map((product, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-rose-50 border border-rose-100 shrink-0">
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-rose-950 truncate">{product.name}</p>
                        <p className="text-xs text-rose-900/40">{product.brand}</p>
                      </div>
                      <ChevronRight size={16} className="text-rose-300 group-hover:text-rose-500 transition-colors" />
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-3 bg-rose-50 text-rose-600 rounded-2xl text-sm font-bold hover:bg-rose-100 transition-colors">
                  View All Recommendations
                </button>
              </div>

              {/* Daily Tip */}
              <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-[2rem] p-8 text-white relative overflow-hidden">
                <Sparkles className="absolute -top-4 -right-4 w-24 h-24 text-white/10 rotate-12" />
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Sparkles size={20} />
                  Daily Skin Tip
                </h4>
                <p className="text-rose-50 text-sm leading-relaxed mb-6">
                  "Always apply your sunscreen as the last step of your morning routine, even on cloudy days. UV rays can penetrate clouds and windows!"
                </p>
                <button className="text-xs font-bold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors">
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
