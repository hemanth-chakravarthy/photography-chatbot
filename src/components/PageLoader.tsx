"use client";

import { useEffect, useState } from "react";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out after 1.8s, remove completely after 2.4s
    const fade = setTimeout(() => setFadeOut(true), 1800);
    const hide = setTimeout(() => setVisible(false), 2400);
    return () => {
      clearTimeout(fade);
      clearTimeout(hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center transition-opacity duration-600 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transition: "opacity 0.6s ease" }}
    >
      {/* Background subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_#0a0a0a_70%)]" />

      {/* Shutter animation */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        
        {/* Aperture / shutter ring */}
        <div className="relative w-20 h-20">
          {/* Outer spinning ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-white/20"
            style={{ animation: "spin 3s linear infinite" }}
          />
          {/* Middle ring going in reverse */}
          <div
            className="absolute inset-2 rounded-full border border-white/30"
            style={{ animation: "spin 2s linear infinite reverse" }}
          />
          {/* Inner dot */}
          <div className="absolute inset-[30%] rounded-full bg-white/80" />

          {/* Shutter blades SVG */}
          <svg
            viewBox="0 0 80 80"
            className="absolute inset-0 w-full h-full"
            fill="none"
          >
            <circle cx="40" cy="40" r="36" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
            <circle cx="40" cy="40" r="20" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
            <line x1="40" y1="4" x2="40" y2="76" stroke="white" strokeOpacity="0.1" strokeWidth="0.8" />
            <line x1="4" y1="40" x2="76" y2="40" stroke="white" strokeOpacity="0.1" strokeWidth="0.8" />
            <line x1="11" y1="11" x2="69" y2="69" stroke="white" strokeOpacity="0.08" strokeWidth="0.8" />
            <line x1="69" y1="11" x2="11" y2="69" stroke="white" strokeOpacity="0.08" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Text */}
        <div className="text-center" style={{ animation: "fadeInUp 0.6s ease 0.3s both" }}>
          <p className="text-white text-lg font-semibold tracking-widest uppercase">
            Photo<span className="text-white/40">AI</span>
          </p>
          <p className="text-white/30 text-xs mt-1 tracking-wider">Loading your experience</p>
        </div>

        {/* Progress bar */}
        <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/70 rounded-full"
            style={{ animation: "loadBar 1.6s ease forwards" }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes loadBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
