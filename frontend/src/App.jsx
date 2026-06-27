import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Architecture from "./pages/Architecture";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CometCursor from "./CometCursor";

export default function App() {
  return (
    <div className="min-h-screen relative overflow-x-hidden text-white bg-slate-950 font-sans selection:bg-cyan-500/30">
      <CometCursor />
      {/* Universal Background Gradients */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none"></div>
      
      <Navbar />
      
      <main className="relative z-10 pt-28 pb-12 px-6 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}
