"use client";

import React from "react";
import { Sparkles, CheckCircle2, ShieldCheck, Lock, Check } from "lucide-react";

interface PrequalLoaderProps {
  isVisible: boolean;
  loanAmount: number | string;
  applicationId: string;
}

export const PrequalLoader: React.FC<PrequalLoaderProps> = ({
  isVisible,
  loanAmount,
  applicationId,
}) => {
  const formattedAmount = Number(loanAmount || 0).toLocaleString();

  return (
    <div className="my-16 text-center space-y-6 py-12 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-md">
      <div className="relative w-20 h-20 mx-auto">
        <div className="w-20 h-20 rounded-full border-4 border-t-emerald-400 border-r-teal-400 border-b-slate-800 border-l-slate-800 animate-spin flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">
          Verifying Identity & Final Underwriting...
        </h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Running Bureau SSN Cross-Check & MLA Covered Borrower Verification...
        </p>
      </div>
      <div className="flex justify-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Lock className="w-3.5 h-3.5 text-emerald-400" /> Encrypted Session
        </span>
        <span className="flex items-center gap-1">
          <Check className="w-3.5 h-3.5 text-emerald-400" /> DL Pattern Verified
        </span>
      </div>
    </div>
  );
};
