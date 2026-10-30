'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface MotionBannerProps {
  text: string;
}

export const MotionBanner: React.FC<MotionBannerProps> = ({ text }) => {
  return (
    <div className="mt-6 rounded-xl bg-[#053221] text-[#A6CDB6] px-4 py-2.5 text-xs flex items-center justify-between border border-[#0E4931] shadow-xs">
      <div className="flex items-center gap-2">
        <span className="font-bold uppercase tracking-wider text-[#C6F04A] text-[10px] flex items-center gap-1.5 bg-[#0C412B] px-2 py-0.5 rounded border border-[#C6F04A]/30">
          <Sparkles className="w-3 h-3 text-[#C6F04A]" />
          MOTION / UX
        </span>
        <span className="text-[#D8EADB] text-xs font-medium">{text}</span>
      </div>
      <span className="text-[10px] text-[#719E86] font-mono hidden md:inline">
        60FPS • SUBTLE ACCENTS
      </span>
    </div>
  );
};
