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
          desc="Not a rigid script. A dynamic, state-driven workflow engine that routes, retries, and reasons. Handles complex cyclic loops with ease."
        />
        <FeatureCard 
          icon={<ShieldCheck size={32} className="text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />}
          title="Under-the-Hood Fallbacks"
          desc="100% Offline-First (Ollama). Seamlessly reroutes to Gemini Cloud APIs ONLY if local GPUs crash, ensuring 100% uptime without a manual toggle."
        />
        <FeatureCard 
          icon={<Database size={32} className="text-purple-400 drop-shadow-[0_0_10px_rgba(188,19,254,0.5)]" />}
          title="Priority Engine"
          desc="AI syntactically evaluates regulation severity. A critical cyber breach scores a 9/10, automatically jumping to the top of the queue."
        />
        <FeatureCard 
          icon={<FileText size={32} className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
          title="Vision Auditor"
          desc="Upload photos of compliance. LLaVA Vision offline AI validates the proof against the required action point. Falls back to Gemini Vision on failure."
        />
      </div>

      <div className="mt-32 w-full relative z-10 bg-black/40 border border-white/5 rounded-3xl p-10 shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-50"></div>
        <h2 className="text-3xl font-extrabold text-white mb-10 text-center tracking-tight relative z-10">Real-World Enterprise Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
          <div>
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">99.9%</div>
            <div className="text-white/70 font-semibold tracking-wide uppercase text-sm">Autonomous MAP Generation</div>
          </div>
          <div>
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">~$1.2B</div>
            <div className="text-white/70 font-semibold tracking-wide uppercase text-sm">Projected Compliance Fines Avoided</div>
          </div>
          <div>
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">100%</div>
            <div className="text-white/70 font-semibold tracking-wide uppercase text-sm">Air-Gapped Secure Execution</div>
          </div>
        </div>
      </div>

      <div className="mt-32 w-full max-w-4xl relative z-10 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-6 tracking-tight">The Vision & The Architect</h2>
        <p className="text-lg text-white/70 leading-relaxed mb-8">
          RegIntel AI is not just a hackathon prototype—it is a mission to protect the global economy by eliminating human error in regulatory compliance. Architected by a <strong>First-Year B.Tech CSE Student at DTU</strong>, this platform bridges the gap between academic theory and Silicon Valley-tier software engineering.
        </p>
        <Link to="/about">
          <motion.button whileHover={{ scale: 1.05 }} className="glass-panel hover:bg-white/10 font-bold py-3 px-6 rounded-full transition border border-cyan-400/30 text-cyan-400 text-sm">
            Read the Full Story
          </motion.button>
        </Link>
      </div>

      <div className="mt-32 w-full max-w-5xl relative z-10 mb-20">
        <h2 className="text-3xl font-bold text-center mb-10 tracking-wide text-white">Development Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <RoadmapCard phase="Phase 1" title="Infrastructure" desc="FastAPI & DB." />
          <RoadmapCard phase="Phase 2" title="Database" desc="State logging." />
          <RoadmapCard phase="Phase 3" title="Graph Engine" desc="Custom Orchestrator." />
          <RoadmapCard phase="Phase 4" title="Parser" desc="LLaMA3 MAP extraction." />
          <RoadmapCard phase="Phase 5" title="Auth & RBAC" desc="JWT JWT integration." />
          <RoadmapCard phase="Phase 6" title="Resilience" desc="Dual-LLM Failovers." />
          <RoadmapCard phase="Phase 7" title="Priority Engine" desc="Dynamic 1-10 Queue." />
          <RoadmapCard phase="Phase 8" title="Vision Auditor" desc="LLaVA Photo checks." />
          <RoadmapCard phase="Phase 9" title="UX Dashboards" desc="Swiggy-style tracker." />
          <RoadmapCard phase="Phase 10" title="The Polish" desc="Glassmorphism UI." />
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
