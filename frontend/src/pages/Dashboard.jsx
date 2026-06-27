import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ShieldCheck, UploadCloud, Activity, LogIn, LogOut, Code, AlertTriangle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Dashboard() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState("");
  
  // Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // App State
  const [activeTab, setActiveTab] = useState("run");
  const [regulation, setRegulation] = useState("");
  const [workflowResult, setWorkflowResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      setToken(res.data.access_token);
      setUser({ username, role: username });
    } catch (err) {
      setLoginError("Invalid credentials. Try admin/admin123");
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setWorkflowResult(null);
  };

  const runWorkflow = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/run-workflow`, 
        { text: regulation }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWorkflowResult(res.data);
    } catch (err) {
      alert("Error connecting to AI Backend. Ensure FastAPI is running.");
    }
    setLoading(false);
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-10 max-w-md w-full relative z-10 shadow-2xl"
        >
          <div className="flex justify-center mb-6 text-cyan-400">
            <ShieldCheck size={56} className="drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]" />
          </div>
          <h2 className="text-3xl font-extrabold text-center text-white mb-2 tracking-tight">Secure Login</h2>
          <p className="text-center text-white/50 text-sm mb-8">Access the RegIntel AI Dashboard</p>
          
          {loginError && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2">
              <AlertTriangle size={16} /> {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input 
              type="text" 
              placeholder="Username" 
              className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:bg-black/50 transition shadow-inner"
              value={username} onChange={e => setUsername(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400 focus:bg-black/50 transition shadow-inner"
              value={password} onChange={e => setPassword(e.target.value)}
            />
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 243, 255, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg transition flex justify-center items-center gap-2 mt-2"
            >
              <LogIn size={20} /> Access Workspace
            </motion.button>
          </form>
          <p className="text-xs text-white/30 text-center mt-6 uppercase tracking-widest">Demo: admin/admin123</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full relative z-10">
      <header className="flex justify-between items-center mb-10 bg-black/20 p-6 rounded-2xl border border-white/5 shadow-lg">
        <div className="flex items-center gap-4">
          <ShieldCheck size={36} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 tracking-tight">
            RegIntel Workspace
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <div className="px-5 py-1.5 rounded-full bg-black/40 text-sm font-medium border border-white/10 shadow-inner flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            {user.username} <span className="text-white/40 uppercase text-xs ml-1">({user.role})</span>
          </div>
          <button onClick={handleLogout} className="text-white/50 hover:text-red-400 transition flex items-center gap-2 font-semibold">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      <main className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
          <button onClick={() => setActiveTab("run")} className={`glass-panel p-4 flex items-center gap-3 transition-all duration-300 ${activeTab === 'run' ? 'border-cyan-400/50 bg-cyan-900/20 shadow-[0_0_15px_rgba(0,243,255,0.1)]' : 'hover:bg-white/5 hover:border-white/20'}`}>
            <Activity className={activeTab === 'run' ? 'text-cyan-400' : 'text-white/50'} />
            <span className="font-semibold tracking-wide">Graph Orchestrator</span>
          </button>
          <button onClick={() => setActiveTab("evidence")} className={`glass-panel p-4 flex items-center gap-3 transition-all duration-300 ${activeTab === 'evidence' ? 'border-purple-400/50 bg-purple-900/20 shadow-[0_0_15px_rgba(188,19,254,0.1)]' : 'hover:bg-white/5 hover:border-white/20'}`}>
            <UploadCloud className={activeTab === 'evidence' ? 'text-purple-400' : 'text-white/50'} />
            <span className="font-semibold tracking-wide">Evidence Validator</span>
          </button>
        </div>

        <div className="col-span-12 md:col-span-9">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-panel p-8 min-h-[600px] shadow-2xl"
          >
            {activeTab === "run" && (
              <div className="flex flex-col h-full gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Analyze Regulation</h2>
                  <p className="text-white/50 text-sm">Input raw regulatory text to trigger the multi-agent graph workflow.</p>
                </div>
                
                <textarea 
                  className="w-full h-48 bg-black/30 border border-white/10 rounded-xl p-5 text-white outline-none focus:border-cyan-400/80 focus:bg-black/50 transition-all resize-none shadow-inner leading-relaxed"
                  placeholder="Paste RBI, SEBI, or SEC circular text here..."
                  value={regulation}
                  onChange={(e) => setRegulation(e.target.value)}
                />
                
                <motion.button 
                  whileHover={{ scale: 1.01, boxShadow: "0 0 15px rgba(0, 243, 255, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={runWorkflow}
                  disabled={loading || !regulation}
                  className="bg-cyan-500/90 hover:bg-cyan-400 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none text-white font-bold py-3 px-8 rounded-xl self-start transition-all"
                >
                  {loading ? (
                    <span className="flex items-center gap-2"><Activity className="animate-spin" size={18} /> Processing Graph...</span>
                  ) : "Execute Agentic Workflow"}
                </motion.button>
                
                {workflowResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 bg-black/50 rounded-xl p-6 border border-white/10 overflow-auto shadow-inner relative">
                    <div className="absolute top-4 right-4 text-white/30"><Code size={20} /></div>
                    <h3 className="text-sm font-semibold text-cyan-400 mb-4 uppercase tracking-widest">Workflow State Output</h3>
                    <pre className="text-sm text-cyan-50/90 font-mono leading-relaxed">{JSON.stringify(workflowResult, null, 2)}</pre>
                  </motion.div>
                )}
              </div>
            )}
            
            {activeTab === "evidence" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Submit Evidence</h2>
                  <p className="text-white/50 text-sm">Upload proof of compliance to satisfy generated Measurable Action Points (MAPs).</p>
                </div>
                <input 
                  type="text" 
                  placeholder="Target MAP ID or Description..." 
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-purple-400 transition"
                />
                <div className="border-2 border-dashed border-white/20 rounded-2xl p-16 flex flex-col items-center justify-center text-white/40 hover:text-white/80 hover:border-purple-400/50 hover:bg-purple-900/10 transition-all cursor-pointer bg-black/20 group">
                  <motion.div whileHover={{ y: -5 }}>
                    <UploadCloud size={56} className="mb-4 text-white/30 group-hover:text-purple-400 transition-colors" />
                  </motion.div>
                  <p className="font-medium text-lg">Drag & Drop evidence files here</p>
                  <p className="text-sm mt-2 text-white/30">Supports PDF, DOCX, PNG, JPG</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.01, boxShadow: "0 0 15px rgba(188, 19, 254, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-purple-600/90 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-xl self-start transition-all"
                >
                  Run Evidence Validation Agent
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
