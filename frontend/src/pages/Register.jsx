import { motion } from "framer-motion";
import { UserPlus, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-10 max-w-md w-full relative z-10 shadow-2xl"
      >
        <div className="flex justify-center mb-6 text-cyan-400">
          <ShieldCheck size={56} className="drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-white mb-2 tracking-tight">Join RegIntel</h2>
        <p className="text-center text-white/50 text-sm mb-8">Create your enterprise compliance account</p>
        
        <form className="flex flex-col gap-5">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:bg-black/50 transition shadow-inner"
          />
          <input 
            type="email" 
            placeholder="Work Email" 
            className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:bg-black/50 transition shadow-inner"
          />
          <input 
            type="password" 
            placeholder="Secure Password" 
            className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:bg-black/50 transition shadow-inner"
          />
          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 243, 255, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            type="button" 
            onClick={(e) => { e.preventDefault(); alert("Registration is disabled in this demo environment. Use admin/admin123 to login."); }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg transition flex justify-center items-center gap-2 mt-2"
          >
            <UserPlus size={20} /> Register Enterprise
          </motion.button>
        </form>
        <div className="mt-6 text-center text-sm text-white/50">
          Already have an account? <Link to="/dashboard" className="text-cyan-400 hover:underline">Login here</Link>
        </div>
      </motion.div>
    </div>
  );
}
