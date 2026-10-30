'use client';

import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  dotColor?: 'emerald' | 'amber' | 'rose' | 'blue' | 'purple' | 'gray';
  badge?: string;
  trend?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  dotColor = 'emerald',
  badge,
  trend,
}) => {
  const dotColorClasses = {
    emerald: 'bg-emerald-500 shadow-emerald-500/40',
    amber: 'bg-amber-500 shadow-amber-500/40',
    rose: 'bg-rose-500 shadow-rose-500/40',
    blue: 'bg-blue-500 shadow-blue-500/40',
    purple: 'bg-purple-500 shadow-purple-500/40',
    gray: 'bg-gray-400 shadow-gray-400/40',
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-[#E1E8E1] shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full shadow-sm flex-shrink-0 ${
              dotColorClasses[dotColor] || 'bg-emerald-500'
            }`}
          />
          <span className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">
            {label}
          </span>
        </div>

        {badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <span className="text-2xl font-black text-gray-950 tracking-tight">{value}</span>
        {trend && (
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
            {trend}
          </span>
        )}
      </div>

      {subtext && <p className="text-[11px] text-gray-500 mt-1 leading-snug">{subtext}</p>}
    </div>
  );
};
