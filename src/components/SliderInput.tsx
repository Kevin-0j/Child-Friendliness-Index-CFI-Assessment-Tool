"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SliderInputProps {
  id: string;
  value: number;
  onChange: (val: number) => void;
}

const labels: Record<number, string> = {
  1: "Fail",
  2: "Below Expectation",
  3: "Average Expectation",
  4: "Meet Expectation",
  5: "Exceed Expectation",
};

export function SliderInput({ id, value, onChange }: SliderInputProps) {
  // Use local state to make the slider feel perfectly smooth,
  // sync with parent via useEffect/onChange
  const [localValue, setLocalValue] = useState(value || 3);

  useEffect(() => {
    if (value) {
      setLocalValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setLocalValue(val);
    onChange(val);
  };

  return (
    <div className="w-full py-4">
      <div className="relative w-full">
        {/* Track background */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-3 bg-slate-200 rounded-full overflow-hidden">
          {/* Active track */}
          <div 
            className="h-full bg-emerald-500 transition-all duration-150 ease-out"
            style={{ width: `${((localValue - 1) / 4) * 100}%` }}
          />
        </div>

        <input
          type="range"
          id={id}
          name={id}
          min="1"
          max="5"
          step="1"
          value={localValue}
          onChange={handleChange}
          className="absolute top-1/2 -translate-y-1/2 w-full appearance-none bg-transparent cursor-pointer touch-none opacity-0 z-10"
        />

        {/* Custom Thumb - purely visual, syncs with value */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-emerald-600 rounded-full shadow-md pointer-events-none flex items-center justify-center transition-all duration-150 ease-out"
          style={{ left: `calc(${((localValue - 1) / 4) * 100}% - 16px)` }}
        >
          <span className="text-xs font-bold text-emerald-700">{localValue}</span>
        </div>
      </div>
      
      {/* Dynamic Label */}
      <div className="mt-8 text-center min-h-[2rem]">
        <span className={cn(
          "inline-block px-4 py-1 rounded-full text-sm font-semibold transition-colors",
          localValue === 1 ? "bg-red-100 text-red-700" :
          localValue === 2 ? "bg-orange-100 text-orange-700" :
          localValue === 3 ? "bg-yellow-100 text-yellow-700" :
          localValue === 4 ? "bg-emerald-100 text-emerald-700" :
          "bg-green-100 text-green-700"
        )}>
          {localValue} - {labels[localValue]}
        </span>
      </div>
      
      {/* Markers */}
      <div className="flex justify-between mt-2 px-1 text-xs font-medium text-slate-400">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>
    </div>
  );
}
