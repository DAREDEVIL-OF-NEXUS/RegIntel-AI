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
        
        <div className="space-y-10 text-lg text-white/80 leading-relaxed">
          <section className="relative z-10 group">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 group-hover:text-cyan-400 transition-colors">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-cyan-400/50 transition-colors"><GraduationCap className="text-cyan-400" /></div>
              The Architect
            </h2>
            <p className="pl-16 border-l-2 border-white/10 group-hover:border-cyan-400/50 transition-colors py-2">
              I am a <strong className="text-white">First Year B.Tech CSE student at Delhi Technological University (DTU)</strong>. While many first-year students focus strictly on introductory syntax, my passion lies in architecting production-grade, highly scalable systems. This project was born out of a relentless drive to bridge the gap between academic learning and Silicon Valley-tier software engineering.
            </p>
          </section>

          <section className="relative z-10 group">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 group-hover:text-purple-400 transition-colors">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-purple-400/50 transition-colors"><Heart className="text-purple-400" /></div>
              The Moral Imperative
            </h2>
            <p className="pl-16 border-l-2 border-white/10 group-hover:border-purple-400/50 transition-colors py-2">
              Banking compliance isn't just about avoiding fines—it's about protecting everyday people. When institutions fail to comply with cybersecurity frameworks, ordinary citizens lose their life savings to fraud and breaches. <strong className="text-white">RegIntel AI</strong> was built with a deep moral reason: to eliminate human error in compliance reading so banks can secure infrastructure faster, keeping the economy stable and citizens safe.
            </p>
          </section>

          <section className="relative z-10 group">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 group-hover:text-blue-400 transition-colors">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-blue-400/50 transition-colors"><Code2 className="text-blue-400" /></div>
              The Hackathon Initiative
            </h2>
            <p className="pl-16 border-l-2 border-white/10 group-hover:border-blue-400/50 transition-colors py-2">
              Built for solving a real-world problem at scale. The goal was never to build a simple MVP or a brittle script. The goal was to build a system that a Tier-1 bank could theoretically deploy tomorrow. By implementing a custom Graph Orchestrator, JWT Auth, and a highly polished React UI, RegIntel AI proves that age and semester don't define the quality of engineering.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
