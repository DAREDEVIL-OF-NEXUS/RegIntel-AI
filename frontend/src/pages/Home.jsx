import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Activity, ShieldCheck, Database, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center pt-10 min-h-[80vh] justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl relative z-10"
      >
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-sm font-semibold tracking-wide uppercase shadow-[0_0_20px_rgba(0,243,255,0.2)]">
          Revolutionizing Regulatory Compliance
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
          Automate Compliance with <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_30px_rgba(0,243,255,0.3)]">
            Agentic Intelligence
          </span>
        </h1>
        <p className="text-xl text-white/60 mb-12 leading-relaxed max-w-2xl mx-auto">
          RegIntel AI ingests massive regulatory circulars, extracts measurable action points (MAPs), assigns departments, and validates evidence—all offline, secure, and fully autonomous.
        </p>
        <div className="flex justify-center gap-6">
          <Link to="/dashboard">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_30px_rgba(0,243,255,0.4)] transition">
              Enter Workspace
            </motion.button>
          </Link>
          <Link to="/architecture">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="glass-panel hover:bg-white/10 font-bold py-4 px-8 rounded-full transition border border-white/20">
              View Architecture
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full relative z-10">
        <FeatureCard 
          icon={<Activity size={40} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]" />}
          title="Graph Orchestrator"
          desc="Not a rigid script. A dynamic, state-driven workflow engine that routes, retries, and reasons through compliance documents."
        />
        <FeatureCard 
          icon={<Database size={40} className="text-purple-400 drop-shadow-[0_0_10px_rgba(188,19,254,0.5)]" />}
          title="Semantic Memory"
          desc="Agents recall historical regulations. If a 2024 circular supersedes a 2023 rule, the AI knows immediately to highlight gaps."
        />
        <FeatureCard 
          icon={<ShieldCheck size={40} className="text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />}
          title="Enterprise Security"
          desc="Role-Based Access Control, JWT Auth, and 100% offline LLM execution ensure zero banking data leakage."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass-panel p-8 text-center flex flex-col items-center transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/20"
    >
      <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner relative overflow-hidden group">
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 tracking-wide">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
