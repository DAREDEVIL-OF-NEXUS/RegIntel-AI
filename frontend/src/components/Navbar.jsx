import { Link, useLocation } from "react-router-dom";
import { ShieldCheck, UserPlus, LogIn } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/5 rounded-none px-6 py-4 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <ShieldCheck size={36} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(0,243,255,0.5)] group-hover:scale-110 transition-transform duration-300" />
          <span className="text-2xl font-extrabold tracking-tight text-white">RegIntel <span className="text-cyan-400">AI</span></span>
        </Link>
        <div className="flex gap-8 items-center text-sm font-medium text-white/70">
          <Link to="/" className={`hover:text-cyan-400 transition ${isActive('/') ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]' : ''}`}>Home</Link>
          <Link to="/about" className={`hover:text-cyan-400 transition ${isActive('/about') ? 'text-cyan-400' : ''}`}>About</Link>
          <Link to="/architecture" className={`hover:text-cyan-400 transition ${isActive('/architecture') ? 'text-cyan-400' : ''}`}>Architecture</Link>
          
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
            <Link to="/dashboard" className="flex items-center gap-2 hover:text-white transition group">
              <LogIn size={16} className="group-hover:text-cyan-400 transition" /> Login
            </Link>
            <Link to="/register" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2 rounded-full transition text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              <UserPlus size={16} /> Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
