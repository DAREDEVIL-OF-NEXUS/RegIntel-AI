import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CometCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setTrail((prev) => [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }].slice(-12));
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-50 overflow-hidden">
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bg-cyan-400 rounded-full"
          style={{
            left: point.x,
            top: point.y,
            width: `${(index + 1) * 1.5}px`,
            height: `${(index + 1) * 1.5}px`,
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 12px 2px rgba(0, 243, 255, 0.6)"
          }}
        />
      ))}
      <div 
        className="absolute bg-white rounded-full w-3 h-3 mix-blend-difference"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.8)"
        }}
      />
    </div>
  );
}
