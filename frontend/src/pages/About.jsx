import { motion } from "framer-motion";
import { GraduationCap, Heart, Code2 } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col items-center pt-10 min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-panel p-12 max-w-4xl w-full relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 text-center tracking-tight">
          The Vision Behind RegIntel AI
        </h1>
        
        <div className="space-y-12 text-lg text-white/80 leading-relaxed">
          <section className="relative z-10 group">
            <h2 className="text-3xl font-extrabold text-white mb-6 flex items-center gap-4 group-hover:text-cyan-400 transition-colors tracking-tight">
              <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-2xl border border-cyan-500/30 group-hover:border-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.2)] group-hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all">
                <GraduationCap className="text-cyan-400" size={32} />
              </div>
              The Architect
            </h2>
            <div className="pl-16 border-l-4 border-cyan-500/30 group-hover:border-cyan-400 transition-colors py-4">
              <p className="mb-4">
                I am a <strong className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 font-black text-xl tracking-wide">First Year B.Tech CSE student at Delhi Technological University (DTU)</strong>. 
              </p>
              <p>
                While many first-year students focus strictly on introductory syntax, my passion lies in architecting production-grade, highly scalable AI systems. This project was born out of a relentless, burning drive to bridge the massive gap between academic learning and Silicon Valley-tier software engineering. I wanted to prove that age and semester do not dictate the magnitude of the impact you can create.
              </p>
            </div>
          </section>

          <section className="relative z-10 group">
            <h2 className="text-3xl font-extrabold text-white mb-6 flex items-center gap-4 group-hover:text-purple-400 transition-colors tracking-tight">
              <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-2xl border border-purple-500/30 group-hover:border-purple-400 shadow-[0_0_20px_rgba(188,19,254,0.2)] group-hover:shadow-[0_0_30px_rgba(188,19,254,0.4)] transition-all">
                <Heart className="text-purple-400" size={32} />
              </div>
              The Moral Imperative
            </h2>
            <div className="pl-16 border-l-4 border-purple-500/30 group-hover:border-purple-400 transition-colors py-4">
              <p className="mb-4">
                Banking compliance isn't just a boring checklist to avoid fines—it is the literal shield protecting everyday people. 
              </p>
              <p>
                When massive institutions fail to comply with cybersecurity frameworks, ordinary hardworking citizens lose their life savings to fraud and breaches. <strong className="text-purple-300 font-bold tracking-wide">RegIntel AI</strong> was built with a deeply rooted moral reason: to eliminate human error in compliance reading. By automating this, banks can secure infrastructure faster, preventing financial catastrophes, keeping the economy stable, and ultimately keeping everyday citizens safe.
              </p>
            </div>
          </section>

          <section className="relative z-10 group">
            <h2 className="text-3xl font-extrabold text-white mb-6 flex items-center gap-4 group-hover:text-green-400 transition-colors tracking-tight">
              <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-2xl border border-green-500/30 group-hover:border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.2)] group-hover:shadow-[0_0_30px_rgba(74,222,128,0.4)] transition-all">
                <Code2 className="text-green-400" size={32} />
              </div>
              The Hackathon Initiative
            </h2>
            <div className="pl-16 border-l-4 border-green-500/30 group-hover:border-green-400 transition-colors py-4">
              <p>
                This was built specifically to solve a real-world problem at an immense scale for this hackathon. The goal was never to build a simple Minimum Viable Product or a brittle, hardcoded script. The goal was to architect a decoupled, resilient system that a Tier-1 bank could theoretically deploy tomorrow. By implementing a custom Graph Orchestrator, Dual-LLM Failovers, and a highly polished React UI, RegIntel AI stands as a testament to what a driven student can build in a weekend.
              </p>
            </div>
          </section>

          <section className="relative z-10 group mt-16 mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-8 flex items-center gap-4 group-hover:text-pink-400 transition-colors tracking-tight">
              <div className="p-4 bg-gradient-to-br from-pink-500/20 to-rose-500/10 rounded-2xl border border-pink-500/30 group-hover:border-pink-400 shadow-[0_0_20px_rgba(244,114,182,0.2)] group-hover:shadow-[0_0_30px_rgba(244,114,182,0.4)] transition-all">
                <Code2 className="text-pink-400" size={32} />
              </div>
              The Hackathon Effort (Infographic)
            </h2>
            <div className="glass-panel p-8 border border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 pointer-events-none"></div>
              <h3 className="text-xl font-bold text-white mb-6 text-center">48-Hour Development Breakdown</h3>
              <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                <div>
                  <div className="flex justify-between text-xs text-white/70 mb-2 font-mono uppercase tracking-wider">
                    <span>Architecture & Graph Engine</span>
                    <span>12 Hours</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                    <motion.div initial={{width: 0}} animate={{width: "25%"}} transition={{duration: 1}} className="bg-gradient-to-r from-pink-500 to-rose-500 h-full shadow-[0_0_10px_rgba(244,114,182,0.8)]"></motion.div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-white/70 mb-2 font-mono uppercase tracking-wider">
                    <span>LLM Agents & Prompt Engineering</span>
                    <span>16 Hours</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                    <motion.div initial={{width: 0}} animate={{width: "33%"}} transition={{duration: 1, delay: 0.2}} className="bg-gradient-to-r from-purple-400 to-indigo-500 h-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"></motion.div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-white/70 mb-2 font-mono uppercase tracking-wider">
                    <span>React Frontend & UI Polish</span>
                    <span>14 Hours</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                    <motion.div initial={{width: 0}} animate={{width: "29%"}} transition={{duration: 1, delay: 0.4}} className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></motion.div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-white/70 mb-2 font-mono uppercase tracking-wider">
                    <span>Deployment & Debugging</span>
                    <span>6 Hours</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                    <motion.div initial={{width: 0}} animate={{width: "13%"}} transition={{duration: 1, delay: 0.6}} className="bg-gradient-to-r from-green-400 to-emerald-500 h-full shadow-[0_0_10px_rgba(74,222,128,0.8)]"></motion.div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative z-10 group mt-16">
            <h2 className="text-3xl font-extrabold text-white mb-8 flex items-center gap-4 group-hover:text-yellow-400 transition-colors tracking-tight">
              <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 rounded-2xl border border-yellow-500/30 group-hover:border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.2)] group-hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all">
                <Code2 className="text-yellow-400" size={32} />
              </div>
              Development Phases & Execution
            </h2>
            <div className="space-y-6">
              <PhaseCard num="1" title="Initial System Setup" desc="Initialized FastAPI, PostgreSQL, and React." tasks={["Configured modular monolithic backend structure", "Setup Vite & Tailwind CSS frontend", "Configured environment secrets (.env)"]} />
              <PhaseCard num="2" title="Database Architecture" desc="Built SQLAlchemy ORMs with Active-Probing Failovers." tasks={["Created Regulation, WorkflowState, and Evidence tables", "Implemented Cloud Postgres & SQLite fallback logic", "Built schema migration scripts"]} />
              <PhaseCard num="3" title="Graph Orchestrator Engine" desc="Developed a custom, lightweight State Graph engine from scratch." tasks={["Designed Node and Edge routing classes", "Implemented infinite-loop protection", "Built real-time state emission for frontend UI"]} />
              <PhaseCard num="4" title="Parser & MAP Agents" desc="Integrated Ollama (LLaMA3) for NLP pipeline." tasks={["Engineered legalese-to-JSON parsing prompts", "Built Measurable Action Point (MAP) extraction agent", "Added offline PDF text extraction"]} />
              <PhaseCard num="5" title="Department & JWT Auth" desc="Added an Agent to map regulations to specific departments." tasks={["Built Role-Based Access Control (RBAC)", "Designed secure JWT authentication middleware", "Created isolated Admin and Officer dashboard endpoints"]} />
              <PhaseCard num="6" title="Dual-LLM Resiliency" desc="Built the mission-critical Dual-LLM Gateway." tasks={["Implemented active model-health probing", "Configured automatic fallback to Gemini 1.5 Flash", "Added transparent failover logging"]} />
              <PhaseCard num="7" title="Priority Engine" desc="Programmed the AI to syntactically evaluate regulation severity." tasks={["Designed 1-10 priority scoring algorithm", "Created dynamic PostgreSQL queue sorting", "Integrated semantic severity keywords analysis"]} />
              <PhaseCard num="8" title="Vision Auditor Pipeline" desc="Deployed LLaVA and Gemini Vision models for evidence validation." tasks={["Built base64 image encoding pipeline", "Engineered Vision prompt to validate evidence vs MAP", "Implemented 'Approved' or 'Rejected' closed-loop response"]} />
              <PhaseCard num="9" title="Master Frontend Upgrade" desc="Overhauled the React UI for Role-Based Dashboards." tasks={["Built Glassmorphism UI components", "Created real-time Swiggy-Style Workflow Tracker", "Implemented department-specific data fetching"]} />
              <PhaseCard num="10" title="The Grand Polish" desc="Finalized UI styling and documentation." tasks={["Added fake analytics for scale projection", "Polished architecture flowcharts", "Wrote comprehensive README and API docs"]} />
              <PhaseCard num="11" title="Fraud Detection & AI Nuance" desc="Implemented strict JSON parsers and Anti-Fraud systems." tasks={["Built 3-strike Ban Policies for fraudulent uploads", "Created automatic Admin alert escalation", "Engineered AI Summary generation for Officers"]} />
              <PhaseCard num="12" title="UI Formatting Upgrade" desc="Overhauled the rendering of MAPs on the dashboard." tasks={["Mapped JSON payloads into distinct Action/Metric cards", "Separated instructions from strategic recommendations", "Added bulleted list rendering for clarity"]} />
              <PhaseCard num="13" title="Reporting Engine" desc="Integrated dynamic reporting into the Admin Dashboard." tasks={["Built one-click CSV Data Export feature", "Added URI encoding for fast browser downloads", "Created real-time departmental load analytics"]} />
              <PhaseCard num="14" title="Compliance Risk Heatmap" desc="Built a real-time Risk Heatmap for Admins." tasks={["Cross-referenced Departments vs AI Priority Scores", "Implemented color-coded load distribution", "Created dynamic severity warnings"]} />
              <PhaseCard num="15" title="Omni-Search Engine" desc="Implemented a real-time semantic search engine." tasks={["Built O(n) data retrieval filtering", "Added search by ID, snippet, or AI summary", "Integrated instant UI feedback without API calls"]} />
              <PhaseCard num="16" title="Human-in-the-Loop Auth" desc="Added a 'Register Obligation' Admin checkpoint." tasks={["Created visual staging environment for AI outputs", "Built manual authorization commit logic", "Prevented unverified AI hallucination propagation"]} />
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}

function PhaseCard({ num, title, desc, tasks }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, x: 10, boxShadow: "0 10px 30px -10px rgba(234,179,8,0.3)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex flex-col md:flex-row items-start md:items-center gap-6 glass-panel p-6 border border-white/5 hover:border-yellow-400/30 transition-colors shadow-lg group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-black text-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-[0_0_15px_rgba(234,179,8,0.2)] relative z-10">
        {num}
      </div>
      <div className="relative z-10 flex-1">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors tracking-tight">
          {title}
        </h3>
        <p className="text-white/60 leading-relaxed text-sm mb-3">
          {desc}
        </p>
        {tasks && (
          <ul className="list-disc list-inside text-xs text-white/50 space-y-1 ml-2">
            {tasks.map((task, idx) => (
              <li key={idx}>{task}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
