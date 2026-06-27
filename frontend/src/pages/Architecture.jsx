import { motion } from "framer-motion";

export default function Architecture() {
  return (
    <div className="flex flex-col items-center pt-4 w-full min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Technical Marvels & Architecture</h1>
        <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto text-lg">
          Deep dive into the structural decoupled layers that make RegIntel AI a production-ready, fault-tolerant platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-8 border border-white/10 hover:border-cyan-400/50 transition-colors shadow-xl">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4 tracking-wide">1. Custom Graph Orchestrator</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Instead of relying on heavy, black-box frameworks like LangChain, I built a proprietary lightweight graph engine from scratch. Agents are encapsulated as <code>Nodes</code>, and state transitions are managed by explicit <code>Edges</code>. This allows infinite loops, conditional routing, and instant error halting.
            </p>
            <div className="bg-black/60 p-5 rounded-xl font-mono text-sm text-green-400 border border-white/5 shadow-inner">
              graph.add_node("parser", parser_node)<br/>
              graph.add_edge("parser", "map_generator")<br/>
              <span className="text-white/30"># Execute state machine</span><br/>
              graph.execute(initial_state)
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-8 border border-white/10 hover:border-purple-400/50 transition-colors shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-purple-400 mb-4 tracking-wide">2. Semantic Memory Layer</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                LLMs inherently have no memory. To solve this, the <code>KnowledgeService</code> acts as a Vector Database substitute. Before parsing a regulation, the engine retrieves historical context. This prevents the AI from hallucinating and allows it to detect when a new regulation supersedes an old one.
              </p>
            </div>
            <div className="bg-purple-900/20 p-5 rounded-xl border border-purple-500/20 text-sm text-purple-200">
              <strong>Context Injected:</strong> "Previous Circular 2023 stated MFA must be enabled for all employees."
            </div>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-8 border border-white/10 hover:border-green-400/50 transition-colors shadow-xl md:col-span-2">
            <h2 className="text-2xl font-bold text-green-400 mb-4 tracking-wide">3. Fault-Tolerant Database Architecture</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Enterprise software cannot go down. The backend employs an active-probing fallback mechanism. Upon startup, it tests the primary Cloud PostgreSQL connection. If it detects a network outage or invalid credentials, it gracefully and instantly falls back to a local SQLite database without dropping a single API request, ensuring 100% uptime.
            </p>
          </motion.div>
        </div>

        <div className="glass-panel p-10 mb-12 w-full shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          <h2 className="text-3xl font-bold text-white mb-10 text-center tracking-tight">High-Level Data Flow</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center text-sm font-bold relative z-10">
            <div className="bg-black/40 p-6 rounded-2xl border border-cyan-500/30 w-full hover:border-cyan-400 transition-colors">
              <span className="text-cyan-400 text-xl block mb-2 font-black">Frontend</span>
              React / Vite<br/>JWT Auth UI
            </div>
            <div className="text-cyan-400/50 hidden md:block text-2xl animate-pulse">➔</div>
            <div className="bg-black/40 p-6 rounded-2xl border border-blue-500/30 w-full hover:border-blue-400 transition-colors">
              <span className="text-blue-400 text-xl block mb-2 font-black">API Gateway</span>
              FastAPI<br/>RBAC Security
            </div>
            <div className="text-blue-400/50 hidden md:block text-2xl animate-pulse">➔</div>
            <div className="bg-black/40 p-6 rounded-2xl border border-purple-500/50 w-full shadow-[0_0_30px_rgba(188,19,254,0.2)]">
              <span className="text-purple-400 text-xl block mb-2 font-black">Graph Engine</span>
              Agent Nodes<br/>Workflow State
            </div>
            <div className="text-purple-400/50 hidden md:block text-2xl animate-pulse">➔</div>
            <div className="bg-black/40 p-6 rounded-2xl border border-green-500/30 w-full hover:border-green-400 transition-colors">
              <span className="text-green-400 text-xl block mb-2 font-black">Database</span>
              PostgreSQL<br/>Audit Logs
            </div>
          </div>
        </div>

        <div className="glass-panel p-10 mb-12 w-full shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">Upcoming Architectural Marvels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-cyan-400/30 transition">
              <h3 className="text-cyan-400 font-bold mb-2">Dual-LLM Failover</h3>
              <p className="text-sm text-white/60">If the offline local Ollama node crashes or lacks resources, the API Gateway will instantly reroute requests to Gemini 1.5 Flash via a secure cloud tunnel.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-purple-400/30 transition">
              <h3 className="text-purple-400 font-bold mb-2">Vision Auditor Pipeline</h3>
              <p className="text-sm text-white/60">Instead of humans verifying compliance proofs, uploaded images will be passed through LLaVA (offline) or Gemini Vision to algorithmically determine if the evidence matches the MAP.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-blue-400/30 transition">
              <h3 className="text-blue-400 font-bold mb-2">Priority Queue Engine</h3>
              <p className="text-sm text-white/60">Agents will be upgraded to syntactically score regulatory impact severity out of 10. PostgreSQL indexes will serve personalized, sorted queues for officers dynamically.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-green-400/30 transition">
              <h3 className="text-green-400 font-bold mb-2">State-Driven UX</h3>
              <p className="text-sm text-white/60">Frontend dashboards will directly subscribe to the Graph Engine's state, tracking the exact progression of a document from Ingestion -> MAP Generation -> Audit like a Swiggy delivery tracker.</p>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
