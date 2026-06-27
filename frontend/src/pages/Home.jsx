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
        <h1 className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_30px_rgba(0,243,255,0.3)]">
            RegIntel-AI
          </span>
        </h1>
        <p className="text-xl text-white/80 font-semibold mb-4 leading-relaxed max-w-2xl mx-auto text-cyan-50">
          Automate Compliance with Agentic Intelligence.
        </p>
        <p className="text-lg text-white/60 mb-12 leading-relaxed max-w-2xl mx-auto">
          Ingests massive regulatory circulars, extracts measurable action points (MAPs), assigns departments, and validates evidence—all offline, secure, and fully autonomous.
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-32 w-full relative z-10">
        <FeatureCard 
          icon={<Activity size={32} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]" />}
          title="Graph Orchestrator"
          desc="Not a rigid script. A dynamic, state-driven workflow engine that routes, retries, and reasons."
        />
        <FeatureCard 
          icon={<ShieldCheck size={32} className="text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />}
          title="Under-the-Hood Fallbacks"
          desc="100% Offline-First for security. Seamlessly falls back to Gemini Cloud APIs ONLY if local GPUs fail during intense workloads."
        />
        <FeatureCard 
          icon={<Database size={32} className="text-purple-400 drop-shadow-[0_0_10px_rgba(188,19,254,0.5)]" />}
          title="Priority Engine"
          desc="AI syntactically evaluates regulation severity. A critical cyber breach scores a 9/10, automatically jumping to the top of the queue."
        />
        <FeatureCard 
          icon={<FileText size={32} className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
          title="Vision Auditor"
          desc="Upload photos of compliance. LLaVA Vision offline AI validates the proof against the required action point."
        />
      </div>

      <div className="mt-32 w-full max-w-5xl relative z-10 mb-20">
        <h2 className="text-3xl font-bold text-center mb-10 tracking-wide text-white">Development Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RoadmapCard phase="Phase 6" title="Ingestion & Resilience" desc="PDF Uploads, Web Scraping, & Gemini LLM Fallback." />
          <RoadmapCard phase="Phase 7" title="Priority Engine" desc="Dynamic Priority Scoring (1-10) for regulations." />
          <RoadmapCard phase="Phase 8" title="Vision Auditor" desc="Automated Evidence validation using LLaVA/Gemini Vision." />
          <RoadmapCard phase="Phase 9" title="Role-Based UX" desc="Admin Heatmaps & Swiggy-style visual workflow tracking." />
        </div>
      </div>
    </div>
  );
}

function RoadmapCard({ phase, title, desc }) {
  return (
    <div className="flex items-center gap-4 glass-panel p-4 border border-white/5 hover:border-cyan-400/30 transition-colors">
      <div className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded font-bold text-sm whitespace-nowrap">{phase}</div>
      <div>
        <h4 className="font-bold text-white">{title}</h4>
        <p className="text-white/50 text-xs">{desc}</p>
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
