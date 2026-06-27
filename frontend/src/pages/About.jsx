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
        </div>
      </motion.div>
    </div>
  );
}
