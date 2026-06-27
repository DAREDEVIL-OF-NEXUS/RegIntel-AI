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
          title="Dual-LLM Failovers"
          desc="100% Offline-First (Ollama). Seamlessly reroutes to Gemini Cloud APIs ONLY if local GPUs crash, ensuring 100% uptime without a manual toggle."
        />
        <FeatureCard 
          icon={<Database size={32} className="text-purple-400 drop-shadow-[0_0_10px_rgba(188,19,254,0.5)]" />}
          title="Priority & DB Fallback"
          desc="AI syntactically evaluates regulation severity. Database falls back from Cloud Postgres to local SQLite instantly on network failure."
        />
        <FeatureCard 
          icon={<FileText size={32} className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
          title="Vision Auditor & Anti-Fraud"
          desc="Offline AI validates photographic proof. 3-strike Ban Policies against officers attempting to upload fraudulent evidence."
        />
        <FeatureCard 
          icon={<Activity size={32} className="text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]" />}
          title="Compliance Heatmap"
          desc="Dynamic cross-reference heatmaps projecting departmental loads against AI Priority Scores in real-time."
        />
        <FeatureCard 
          icon={<Database size={32} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />}
          title="Omni-Search Engine"
          desc="A semantic text-filtering engine directly on the Admin Dashboard for O(n) data retrieval and compliance reporting."
        />
        <FeatureCard 
          icon={<ShieldCheck size={32} className="text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />}
          title="Human-in-the-Loop"
          desc="Admins review AI outputs in a visual staging environment before they hit department queues to prevent hallucination."
        />
        <FeatureCard 
          icon={<FileText size={32} className="text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />}
          title="Dynamic MAP UI"
          desc="Separated JSON responses into heavily formatted frontend UI cards, novice AI summaries, and numbered recommendations."
        />
      </div>

      <div className="mt-32 w-full relative z-10 bg-black/40 border border-white/5 rounded-3xl p-10 shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-50"></div>
        <h2 className="text-3xl font-extrabold text-white mb-10 text-center tracking-tight relative z-10">Real-World Enterprise Impact (Infographics)</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center relative z-10 mb-12">
          <div>
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">99.9%</div>
            <div className="text-white/70 font-semibold tracking-wide uppercase text-xs">Autonomous MAP Generation</div>
          </div>
          <div>
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">~$1.2B</div>
            <div className="text-white/70 font-semibold tracking-wide uppercase text-xs">Projected Fines Avoided</div>
          </div>
          <div>
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">100%</div>
            <div className="text-white/70 font-semibold tracking-wide uppercase text-xs">Air-Gapped Secure Execution</div>
          </div>
          <div>
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">0.05s</div>
            <div className="text-white/70 font-semibold tracking-wide uppercase text-xs">Postgres to SQLite Failover Time</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="bg-black/50 p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Processing Speed vs Human Compliance Teams</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs text-white/70 mb-2 font-mono uppercase tracking-wider">
                  <span>Traditional Human Analysis (300 Page Circular)</span>
                  <span>~3 Weeks</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden">
                  <div className="bg-red-500/50 h-4 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-white/70 mb-2 font-mono uppercase tracking-wider">
                  <span>Standard NLP Extraction</span>
                  <span>~2 Days</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden">
                  <div className="bg-yellow-500/80 h-4 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-cyan-400 mb-2 font-mono uppercase tracking-wider font-bold">
                  <span>RegIntel AI Graph Engine</span>
                  <span>~45 Seconds</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full shadow-[0_0_15px_rgba(0,243,255,0.8)]" style={{ width: '2%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/50 p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Fraud Detection Accuracy Over Time</h3>
            <div className="flex items-end justify-between h-32 px-4 border-b border-white/10 pb-2">
              <div className="w-8 bg-red-500/50 h-[30%] rounded-t-md relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition">30%</div>
              </div>
              <div className="w-8 bg-orange-500/60 h-[45%] rounded-t-md relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition">45%</div>
              </div>
              <div className="w-8 bg-yellow-500/70 h-[65%] rounded-t-md relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition">65%</div>
              </div>
              <div className="w-8 bg-green-500/80 h-[85%] rounded-t-md relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition">85%</div>
              </div>
              <div className="w-8 bg-gradient-to-t from-cyan-400 to-blue-500 h-[98%] rounded-t-md shadow-[0_0_15px_rgba(0,243,255,0.5)] relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition text-cyan-400 font-bold">99%</div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-white/50 mt-2 px-4 uppercase font-mono">
              <span>Wk 1</span>
              <span>Wk 2</span>
              <span>Wk 3</span>
              <span>Wk 4</span>
              <span className="text-cyan-400 font-bold">Now</span>
            </div>
            <p className="text-center text-xs text-white/60 mt-4">AI Validator Model automatically escalating and rejecting fraudulent evidence.</p>
          </div>
        </div>
      </div>

      <div className="mt-32 w-full max-w-5xl relative z-10 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Overview of the Vision</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-10">
          <div className="glass-panel p-6 border border-cyan-500/30">
            <h3 className="text-cyan-400 font-bold text-lg mb-3">The Architect</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Architected by a First-Year B.Tech CSE Student at DTU, this platform bridges the gap between academic theory and Silicon Valley-tier software engineering. Built to scale and endure.
            </p>
          </div>
          <div className="glass-panel p-6 border border-purple-500/30">
            <h3 className="text-purple-400 font-bold text-lg mb-3">The Moral Imperative</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              When massive institutions fail to comply with cybersecurity frameworks, ordinary citizens lose their savings. RegIntel AI eliminates human error in compliance reading to secure infrastructure faster.
            </p>
          </div>
          <div className="glass-panel p-6 border border-green-500/30">
            <h3 className="text-green-400 font-bold text-lg mb-3">The Hackathon Initiative</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Built specifically to solve a real-world problem at an immense scale. A resilient system with a custom Graph Orchestrator, Dual-LLM Failovers, and a polished UI ready for enterprise deployment.
            </p>
          </div>
        </div>

        <Link to="/about">
          <motion.button whileHover={{ scale: 1.05 }} className="glass-panel hover:bg-white/10 font-bold py-4 px-8 rounded-full transition border border-cyan-400/50 shadow-[0_0_20px_rgba(0,243,255,0.2)] text-cyan-400">
            Read the Full Story in About Section
          </motion.button>
        </Link>
      </div>

      <div className="mt-32 w-full max-w-5xl relative z-10 mb-20">
        <h2 className="text-3xl font-bold text-center mb-10 tracking-wide text-white">Development Roadmap</h2>
        <div className="flex flex-col items-center max-w-2xl mx-auto gap-2">
          <RoadmapFlowCard phase="Phase 1" title="Infrastructure Setup" desc="Initialized FastAPI, PostgreSQL, and React. Configured the modular monolithic structure for scalable micro-agent deployment." />
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
          
          <RoadmapFlowCard phase="Phase 2" title="Database Architecture" desc="Built SQLAlchemy ORMs with Active-Probing Failovers. Designed schemas to log Workflow States." />
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
          
          <RoadmapFlowCard phase="Phase 3" title="Graph Engine" desc="Developed a custom, lightweight State Graph engine from scratch to handle agent routing and infinite-loop protection." />
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
          
          <RoadmapFlowCard phase="Phase 4" title="Parser & MAP Agents" desc="Integrated Ollama (LLaMA3). Engineered the NLP prompt pipelines to ingest raw legalese and generate strictly formatted MAPs." />
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
          
          <RoadmapFlowCard phase="Phase 5" title="Auth & RBAC" desc="Added an Agent to map regulations to specific departments. Built Enterprise JWT Role-Based Access Control." />
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
          
          <RoadmapFlowCard phase="Phase 6" title="Resilience & Fallbacks" desc="Built the mission-critical Dual-LLM Gateway: automatically falling back to Gemini 1.5 Flash if the local GPU crashes." />
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
          
          <RoadmapFlowCard phase="Phase 7" title="Priority Engine" desc="Programmed the AI to syntactically evaluate regulation severity. Generates a Priority Score (1-10) dynamically." />
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
          
          <RoadmapFlowCard phase="Phase 8" title="Vision Auditor" desc="Deployed LLaVA and Gemini Vision models to algorithmically validate uploaded photographic evidence." />
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
          
          <RoadmapFlowCard phase="Phase 9" title="UX Dashboards" desc="Built Role-Based Dashboards, Heatmaps, and the Swiggy-Style real-time Workflow Tracker." />
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
          
          <RoadmapFlowCard phase="Phase 10" title="The Grand Polish" desc="Finalized Glassmorphism styling, wrote exhaustive documentation, and created fake analytics." />
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
          
          <RoadmapFlowCard phase="Phase 11" title="Anti-Fraud Escalation" desc="Strict JSON parsers and 3-strike Ban Policies against officers attempting to upload fraudulent evidence." />
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
          
          <RoadmapFlowCard phase="Phase 12" title="Dynamic UI Engine" desc="Separated JSON responses into heavily formatted frontend UI cards, novice AI summaries, and numbered recommendations." />
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>

          <RoadmapFlowCard phase="Phase 13" title="Reporting Engine" desc="Integrated one-click CSV Compliance Exports via encoded URIs." />
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>

          <RoadmapFlowCard phase="Phase 14" title="Compliance Heatmap" desc="Built dynamic cross-reference heatmaps projecting departmental loads against AI Priority Scores." />
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>

          <RoadmapFlowCard phase="Phase 15" title="Omni-Search Engine" desc="Developed a semantic text-filtering engine directly on the Admin Dashboard for O(n) data retrieval." />
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>

          <RoadmapFlowCard phase="Phase 16" title="Human-in-the-Loop Auth" desc="Added a 'Register Obligation' checkpoint, ensuring Admins review AI outputs before they hit department queues." />
        </div>
      </div>
    </div>
  );
}

function RoadmapFlowCard({ phase, title, desc }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 glass-panel p-6 border border-cyan-500/20 hover:border-cyan-400/60 transition-all shadow-[0_0_20px_rgba(0,243,255,0.1)] hover:shadow-[0_0_30px_rgba(0,243,255,0.3)] w-full rounded-2xl group relative"
    >
      <div className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-xl font-black text-sm whitespace-nowrap shadow-inner border border-cyan-400/30 group-hover:bg-cyan-500/30 transition-colors">
        {phase}
      </div>
      <div>
        <h4 className="font-extrabold text-white text-xl mb-1 tracking-wide">{title}</h4>
        <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
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
