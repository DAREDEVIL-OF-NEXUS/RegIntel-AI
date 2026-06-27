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
          <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">System Latency Distribution (Infographic)</h2>
          <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-32 text-right text-sm font-bold text-cyan-400 uppercase tracking-wider">Frontend UI</div>
              <div className="flex-1 bg-white/5 rounded-full h-6 overflow-hidden flex">
                <motion.div initial={{width: 0}} animate={{width: "5%"}} transition={{duration: 1}} className="bg-cyan-500 h-full shadow-[0_0_10px_rgba(0,243,255,0.8)]"></motion.div>
              </div>
              <div className="w-16 text-sm text-white/50">~15ms</div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-32 text-right text-sm font-bold text-blue-400 uppercase tracking-wider">API Gateway</div>
              <div className="flex-1 bg-white/5 rounded-full h-6 overflow-hidden flex">
                <motion.div initial={{width: 0}} animate={{width: "15%"}} transition={{duration: 1, delay: 0.2}} className="bg-blue-500 h-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></motion.div>
              </div>
              <div className="w-16 text-sm text-white/50">~45ms</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-32 text-right text-sm font-bold text-purple-400 uppercase tracking-wider">Graph Engine</div>
              <div className="flex-1 bg-white/5 rounded-full h-6 overflow-hidden flex">
                <motion.div initial={{width: 0}} animate={{width: "60%"}} transition={{duration: 1, delay: 0.4}} className="bg-purple-500 h-full shadow-[0_0_10px_rgba(188,19,254,0.8)]"></motion.div>
              </div>
              <div className="w-16 text-sm text-white/50">~1.2s</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-32 text-right text-sm font-bold text-green-400 uppercase tracking-wider">DB Write</div>
              <div className="flex-1 bg-white/5 rounded-full h-6 overflow-hidden flex">
                <motion.div initial={{width: 0}} animate={{width: "8%"}} transition={{duration: 1, delay: 0.6}} className="bg-green-500 h-full shadow-[0_0_10px_rgba(74,222,128,0.8)]"></motion.div>
              </div>
              <div className="w-16 text-sm text-white/50">~20ms</div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-10 mb-12 w-full shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>
          <h2 className="text-3xl font-bold text-white mb-10 text-center tracking-tight">Low-Level Orchestrator Graph Workflow</h2>
          
          <div className="flex flex-col items-center gap-4 relative z-10 font-mono text-sm">
            <div className="bg-cyan-900/40 border border-cyan-400 p-4 rounded-lg w-64 text-center text-cyan-400 font-bold shadow-[0_0_15px_rgba(0,243,255,0.2)]">
              [START] Initial State
            </div>
            <div className="h-8 w-0.5 bg-white/20"></div>
            
            <div className="bg-blue-900/40 border border-blue-400 p-4 rounded-lg w-64 text-center text-blue-400 font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              ParserNode (Text/PDF)
            </div>
            
            <div className="flex w-64 justify-between items-center -my-2 relative z-0">
              <div className="w-1/2 h-0.5 bg-white/20"></div>
              <div className="w-1/2 h-0.5 bg-white/20"></div>
            </div>
            <div className="flex w-full max-w-sm justify-between -mt-4">
               <div className="text-red-400 text-xs ml-4">OnError</div>
               <div className="text-green-400 text-xs mr-4">OnSuccess</div>
            </div>

            <div className="flex gap-12 mt-2">
              <div className="bg-red-900/40 border border-red-500 p-3 rounded-lg w-32 text-center text-red-400 font-bold text-xs">
                Halt & Log
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="bg-purple-900/40 border border-purple-400 p-4 rounded-lg w-64 text-center text-purple-400 font-bold shadow-[0_0_15px_rgba(188,19,254,0.2)]">
                  MAPNode (Action Point)
                </div>
                <div className="h-8 w-0.5 bg-white/20"></div>
                
                <div className="bg-indigo-900/40 border border-indigo-400 p-4 rounded-lg w-64 text-center text-indigo-400 font-bold shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  DepartmentNode & Priority
                </div>
                <div className="h-8 w-0.5 bg-white/20"></div>
                
                <div className="bg-green-900/40 border border-green-400 p-4 rounded-lg w-64 text-center text-green-400 font-bold shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                  ValidatorNode (Vision)
                </div>
                <div className="h-8 w-0.5 bg-white/20"></div>
                
                <div className="bg-white/10 border border-white/30 p-3 rounded-lg w-32 text-center text-white/80 font-bold text-xs">
                  [END] Complete
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-10 mb-12 w-full shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">Implemented Architectural Marvels & Fallbacks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-cyan-400/30 transition shadow-lg">
              <h3 className="text-cyan-400 font-bold mb-2">Dual-LLM Transparent Failover</h3>
              <p className="text-sm text-white/60 mb-3">If the offline local Ollama node crashes or lacks resources, the API Gateway instantly reroutes requests to Gemini 1.5 Flash via a secure cloud tunnel, guaranteeing 100% uptime.</p>
              <div className="bg-black/50 p-3 rounded border border-white/5 text-xs text-white/40 font-mono">
                <strong className="text-cyan-500">Example:</strong> Agent tries `ollama.chat('llama3')`. If Timeout ➔ Intercept Exception ➔ `genai.generate_content('gemini-1.5-flash')`.
              </div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-purple-400/30 transition shadow-lg">
              <h3 className="text-purple-400 font-bold mb-2">Vision Auditor Pipeline</h3>
              <p className="text-sm text-white/60 mb-3">Instead of humans verifying compliance proofs, uploaded images are passed through LLaVA (offline) or Gemini Vision to algorithmically determine if the evidence matches the MAP.</p>
              <div className="bg-black/50 p-3 rounded border border-white/5 text-xs text-white/40 font-mono">
                <strong className="text-purple-500">Example:</strong> MAP says "Enable MFA". Officer uploads screenshot of Okta. Vision Model outputs: &#123;"status": "APPROVED"&#125;.
              </div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-blue-400/30 transition shadow-lg">
              <h3 className="text-blue-400 font-bold mb-2">Priority Queue Engine</h3>
              <p className="text-sm text-white/60 mb-3">Agents syntactically score regulatory impact severity out of 10. PostgreSQL indexes serve personalized, sorted queues for officers dynamically.</p>
              <div className="bg-black/50 p-3 rounded border border-white/5 text-xs text-white/40 font-mono">
                <strong className="text-blue-500">Example:</strong> Font-size change in terms scores 2/10. Data breach protocol mandate scores 9/10 and jumps to the top of the queue.
              </div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-green-400/30 transition shadow-lg">
              <h3 className="text-green-400 font-bold mb-2">Database Active-Probing Failover</h3>
              <p className="text-sm text-white/60 mb-3">On startup, FastAPI probes the Primary Cloud Postgres DB. If network fails, SQLAlchemy instantly mounts a local SQLite volume without dropping a request.</p>
              <div className="bg-black/50 p-3 rounded border border-white/5 text-xs text-white/40 font-mono">
                <strong className="text-green-500">Example:</strong> Postgres Connection Timeout ➔ `DATABASE_URL2=sqlite:///./regintel.db` activated.
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
