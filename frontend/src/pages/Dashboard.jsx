import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ShieldCheck, UploadCloud, Activity, LogIn, LogOut, Code, AlertTriangle, List, CheckCircle, Clock } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Dashboard() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState("");
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [activeTab, setActiveTab] = useState("run");
  const [regulation, setRegulation] = useState("");
  const [workflowResult, setWorkflowResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [dashboardData, setDashboardData] = useState([]);
  
  const [evidenceMapText, setEvidenceMapText] = useState("");
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [evidenceResult, setEvidenceResult] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const endpoint = user.role === "admin" ? "/dashboard/admin" : "/dashboard/officer";
      const res = await axios.get(`${API_URL}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token && activeTab === "queue") {
      fetchDashboardData();
    }
  }, [token, activeTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      setToken(res.data.access_token);
      const role = username === "admin" ? "admin" : "officer";
      setUser({ username, role });
    } catch (err) {
      setLoginError("Invalid credentials. Try admin/admin123");
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setWorkflowResult(null);
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(`${API_URL}/upload-pdf`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
      });
      setRegulation(res.data.text);
    } catch (err) {
      alert("Failed to extract PDF: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleScrape = async () => {
    try {
      const res = await axios.get(`${API_URL}/scrape`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Successfully scraped ${res.data.data.length} recent circulars (Check console).`);
      console.log(res.data.data);
    } catch (err) {
      alert("Failed to scrape: " + (err.response?.data?.detail || err.message));
    }
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

  const submitEvidence = async () => {
    if (!evidenceFile || !evidenceMapText) return alert("Missing file or MAP text");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", evidenceFile);
    try {
      const res = await axios.post(`${API_URL}/upload-evidence?regulation_id_str=${encodeURIComponent(evidenceMapText)}`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
      });
      setEvidenceResult(res.data);
    } catch (err) {
      alert("Vision Auditor Failed: " + (err.response?.data?.detail || err.message));
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
    <div className="w-full relative z-10 pb-20">
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
          <button onClick={() => setActiveTab("queue")} className={`glass-panel p-4 flex items-center gap-3 transition-all duration-300 ${activeTab === 'queue' ? 'border-blue-400/50 bg-blue-900/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'hover:bg-white/5 hover:border-white/20'}`}>
            <List className={activeTab === 'queue' ? 'text-blue-400' : 'text-white/50'} />
            <span className="font-semibold tracking-wide">{user.role === 'admin' ? "Master Dashboard" : "Priority Queue"}</span>
          </button>
          <button onClick={() => setActiveTab("evidence")} className={`glass-panel p-4 flex items-center gap-3 transition-all duration-300 ${activeTab === 'evidence' ? 'border-purple-400/50 bg-purple-900/20 shadow-[0_0_15px_rgba(188,19,254,0.1)]' : 'hover:bg-white/5 hover:border-white/20'}`}>
            <UploadCloud className={activeTab === 'evidence' ? 'text-purple-400' : 'text-white/50'} />
            <span className="font-semibold tracking-wide">Vision Auditor</span>
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
                  <p className="text-white/50 text-sm">Input raw regulatory text or upload a PDF to trigger the multi-agent graph workflow.</p>
                </div>

                <div className="flex gap-4">
                  <label className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-2 px-6 rounded-lg cursor-pointer transition flex items-center gap-2 text-sm shadow-inner">
                    <UploadCloud size={16} /> Upload Offline PDF
                    <input type="file" accept=".pdf" className="hidden" onChange={handlePdfUpload} />
                  </label>
                  <button onClick={handleScrape} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-2 px-6 rounded-lg transition flex items-center gap-2 text-sm shadow-inner">
                    <Activity size={16} /> Scrape RBI (Online)
                  </button>
                </div>
                
                <textarea 
                  className="w-full h-48 bg-black/30 border border-white/10 rounded-xl p-5 text-white outline-none focus:border-cyan-400/80 focus:bg-black/50 transition-all resize-none shadow-inner leading-relaxed"
                  placeholder="Paste RBI, SEBI, or SEC circular text here... or use the buttons above."
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
                  <div className="mt-8 flex flex-col gap-6">
                    <h3 className="text-xl font-bold border-b border-white/10 pb-2">Swiggy-Style Workflow Tracker</h3>
                    <div className="flex items-center justify-between relative px-10">
                      <div className="absolute left-10 right-10 top-1/2 h-1 bg-white/10 -z-10 -translate-y-1/2 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, delay: 0.2 }} className="h-full bg-gradient-to-r from-cyan-500 to-green-500"></motion.div>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(0,243,255,0.5)]"><CheckCircle size={20}/></div>
                        <span className="text-xs font-bold text-cyan-400 uppercase">Ingested</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]"><CheckCircle size={20}/></div>
                        <span className="text-xs font-bold text-blue-400 uppercase">Parsed</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(188,19,254,0.5)]"><CheckCircle size={20}/></div>
                        <span className="text-xs font-bold text-purple-400 uppercase">Assigned</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(74,222,128,0.5)]"><CheckCircle size={20}/></div>
                        <span className="text-xs font-bold text-green-400 uppercase">Validated</span>
                      </div>
                    </div>
                    
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 bg-black/50 rounded-xl p-6 border border-white/10 overflow-auto shadow-inner relative">
                      <div className="absolute top-4 right-4 text-white/30"><Code size={20} /></div>
                      <h3 className="text-sm font-semibold text-cyan-400 mb-4 uppercase tracking-widest">Database Output Log</h3>
                      <pre className="text-sm text-cyan-50/90 font-mono leading-relaxed">{JSON.stringify(workflowResult, null, 2)}</pre>
                    </motion.div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "queue" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{user.role === 'admin' ? "Master Regulatory Dashboard" : "Department Priority Queue"}</h2>
                  <p className="text-white/50 text-sm">Real-time view of processed regulations, sorted dynamically by AI-assigned Priority Score.</p>
                </div>

                {user.role === 'admin' && (
                  <>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-black/30 border border-white/10 p-4 rounded-xl">
                        <div className="text-white/50 text-sm mb-1">Total Regulations</div>
                        <div className="text-3xl font-bold text-cyan-400">{dashboardData.length}</div>
                      </div>
                      <div className="bg-black/30 border border-white/10 p-4 rounded-xl">
                        <div className="text-white/50 text-sm mb-1">High Priority (8-10)</div>
                        <div className="text-3xl font-bold text-red-400">{dashboardData.filter(d => d.priority_score >= 8).length}</div>
                      </div>
                      <div className="bg-black/30 border border-white/10 p-4 rounded-xl">
                        <div className="text-white/50 text-sm mb-1">Implemented</div>
                        <div className="text-3xl font-bold text-green-400">{dashboardData.filter(d => d.status === 'implemented').length}</div>
                      </div>
                    </div>
                    
                    <div className="bg-black/20 border border-white/5 p-5 rounded-xl mb-6">
                      <h3 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-4 flex items-center gap-2"><Activity size={16}/> Department Load Distribution (Infographic)</h3>
                      <div className="flex flex-col gap-4">
                        <div>
                          <div className="flex justify-between text-xs font-mono text-cyan-400 mb-1"><span>IT & Cyber Security</span> <span>65%</span></div>
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><motion.div initial={{width: 0}} animate={{width: "65%"}} transition={{duration: 1}} className="bg-cyan-500 h-full shadow-[0_0_10px_rgba(0,243,255,0.8)]"></motion.div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-mono text-purple-400 mb-1"><span>Risk Management</span> <span>25%</span></div>
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><motion.div initial={{width: 0}} animate={{width: "25%"}} transition={{duration: 1, delay: 0.2}} className="bg-purple-500 h-full shadow-[0_0_10px_rgba(188,19,254,0.8)]"></motion.div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-mono text-blue-400 mb-1"><span>HR & Operations</span> <span>10%</span></div>
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><motion.div initial={{width: 0}} animate={{width: "10%"}} transition={{duration: 1, delay: 0.4}} className="bg-blue-500 h-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></motion.div></div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/50 border-b border-white/10 text-white/60 text-sm uppercase tracking-wider">
                        <th className="p-4 font-semibold">Priority</th>
                        <th className="p-4 font-semibold">Regulation Snippet</th>
                        <th className="p-4 font-semibold">Department</th>
                        <th className="p-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-black/20">
                      {dashboardData.map((row, i) => (
                        <tr key={i} onClick={() => setExpandedRow(row)} className="border-b border-white/5 hover:bg-white/10 transition cursor-pointer relative">
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded font-bold text-xs ${row.priority_score >= 8 ? 'bg-red-500/20 text-red-400' : row.priority_score >= 5 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                              Score: {row.priority_score}/10
                            </span>
                          </td>
                          <td className="p-4 text-sm text-white/80 max-w-xs truncate">{row.regulation_id ? <span className="font-mono text-cyan-400 mr-2">[{row.regulation_id}]</span> : null}{row.regulation}</td>
                          <td className="p-4 text-sm font-medium text-purple-400">{row.department}</td>
                          <td className="p-4 flex items-center gap-2">
                            <span className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${row.status === 'implemented' ? 'text-green-400' : 'text-orange-400'}`}>
                              {row.status === 'implemented' ? <CheckCircle size={14}/> : <Clock size={14}/>} {row.status}
                            </span>
                            {row.is_escalated && (
                              <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold animate-pulse">FRAUD ALERT</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      {dashboardData.length === 0 && (
                        <tr>
                          <td colSpan="4" className="p-8 text-center text-white/40">No records found. Parse a regulation first!</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {expandedRow && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="glass-panel max-w-2xl w-full p-8 relative border-cyan-500/30 shadow-[0_0_50px_rgba(0,243,255,0.15)] max-h-[90vh] overflow-y-auto">
                      <button onClick={() => setExpandedRow(null)} className="absolute top-4 right-4 text-white/50 hover:text-white"><LogOut className="rotate-180" size={24}/></button>
                      
                      <div className="flex items-center gap-3 mb-6">
                        <span className="bg-cyan-500/20 text-cyan-400 font-mono px-3 py-1 rounded font-bold text-sm">{expandedRow.regulation_id}</span>
                        <span className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wider ${expandedRow.status === 'implemented' ? 'text-green-400' : 'text-orange-400'}`}>
                          {expandedRow.status === 'implemented' ? <CheckCircle size={16}/> : <Clock size={16}/>} {expandedRow.status}
                        </span>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-2">Novice AI Summary</h4>
                        <p className="text-white/90 text-sm leading-relaxed bg-black/30 p-4 rounded-lg border border-white/5">{expandedRow.ai_summary || "No summary available."}</p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-4">Measurable Action Point (MAP) Details</h4>
                        {(() => {
                          try {
                            const mapObj = JSON.parse(expandedRow.map);
                            return (
                              <div className="flex flex-col gap-3">
                                <div className="bg-black/40 border border-purple-500/20 p-4 rounded-xl">
                                  <div className="text-xs text-purple-400/70 uppercase tracking-widest mb-1 font-bold">Action Required</div>
                                  <div className="text-white/90 text-sm leading-relaxed">{mapObj.map || mapObj.action}</div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="bg-black/40 border border-cyan-500/20 p-4 rounded-xl">
                                    <div className="text-xs text-cyan-400/70 uppercase tracking-widest mb-1 font-bold">Metric</div>
                                    <div className="text-white/80 text-sm font-mono">{mapObj.metric}</div>
                                  </div>
                                  <div className="bg-black/40 border border-green-500/20 p-4 rounded-xl">
                                    <div className="text-xs text-green-400/70 uppercase tracking-widest mb-1 font-bold">Evidence Required</div>
                                    <div className="text-white/80 text-sm">{mapObj.evidence_required}</div>
                                  </div>
                                </div>
                              </div>
                            );
                          } catch (e) {
                            return <pre className="text-white/80 text-xs leading-relaxed bg-black/30 p-4 rounded-lg border border-white/5 whitespace-pre-wrap overflow-hidden">{expandedRow.map}</pre>;
                          }
                        })()}
                      </div>

                      <div className="mb-8">
                        <h4 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">Step-by-Step AI Recommendation & Additions</h4>
                        <div className="text-white/90 text-sm leading-relaxed bg-black/30 p-5 rounded-xl border border-white/10 prose prose-invert max-w-none">
                          {expandedRow.ai_recommendation ? (
                            expandedRow.ai_recommendation.split('\n').map((line, idx) => {
                              if (line.match(/^\d+\./)) return <li key={idx} className="ml-4 mb-2">{line.replace(/^\d+\.\s*/, '')}</li>;
                              if (line.startsWith('-')) return <li key={idx} className="ml-4 mb-2 text-blue-200 list-disc">{line.replace(/^-\s*/, '')}</li>;
                              if (line.trim() === '') return <br key={idx} />;
                              return <p key={idx} className="mb-2 font-medium">{line}</p>;
                            })
                          ) : "No recommendation available."}
                        </div>
                      </div>

                      {expandedRow.status !== 'implemented' && (
                        <div className="flex gap-4">
                          <button 
                            onClick={() => {
                              setEvidenceMapText(expandedRow.regulation_id);
                              setExpandedRow(null);
                              setActiveTab("evidence");
                            }}
                            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition w-full justify-center"
                          >
                            <UploadCloud size={18}/> Upload Evidence for this Regulation
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {activeTab === "evidence" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Vision Auditor</h2>
                  <p className="text-white/50 text-sm">Upload photographic proof of compliance (LLaVA/Gemini) to algorithmically satisfy Measurable Action Points (MAPs).</p>
                </div>
                <input 
                  type="text" 
                  value={evidenceMapText}
                  onChange={e => setEvidenceMapText(e.target.value)}
                  placeholder="Paste the target Regulation ID (e.g., REG-XXXXX) to validate against..." 
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-purple-400 transition"
                />
                <label className="border-2 border-dashed border-white/20 rounded-2xl p-16 flex flex-col items-center justify-center text-white/40 hover:text-white/80 hover:border-purple-400/50 hover:bg-purple-900/10 transition-all cursor-pointer bg-black/20 group">
                  <motion.div whileHover={{ y: -5 }}>
                    <UploadCloud size={56} className="mb-4 text-white/30 group-hover:text-purple-400 transition-colors" />
                  </motion.div>
                  <p className="font-medium text-lg">{evidenceFile ? evidenceFile.name : "Drag & Drop evidence photos here"}</p>
                  <p className="text-sm mt-2 text-white/30">Supports PNG, JPG (Vision Models)</p>
                  <input type="file" accept="image/*" className="hidden" onChange={e => setEvidenceFile(e.target.files[0])} />
                </label>
                <motion.button 
                  onClick={submitEvidence}
                  disabled={loading || !evidenceFile}
                  whileHover={{ scale: 1.01, boxShadow: "0 0 15px rgba(188, 19, 254, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-purple-600/90 hover:bg-purple-500 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-xl self-start transition-all"
                >
                  {loading ? "AI Vision Processing..." : "Run Vision Validator"}
                </motion.button>

                {evidenceResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-4 rounded-xl p-6 border ${evidenceResult.status === 'APPROVED' ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      {evidenceResult.status === 'APPROVED' ? <CheckCircle className="text-green-400" size={24}/> : <AlertTriangle className="text-red-400" size={24}/>}
                      <h3 className={`text-xl font-bold ${evidenceResult.status === 'APPROVED' ? 'text-green-400' : 'text-red-400'}`}>{evidenceResult.status}</h3>
                    </div>
                    <p className="text-white/80 mb-4">{evidenceResult.reason}</p>
                    <div className="text-xs text-white/30 uppercase tracking-widest font-mono">Model: {evidenceResult.model_used}</div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
