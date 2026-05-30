import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function useCounter(target: number, duration = 2000, startOnView = true, inView = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView && startOnView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, inView, startOnView]);
  return count;
}

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  color: string;
  delay?: number;
}

export function StatItem({ value, suffix, label, color, delay = 0 }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(value, 2000, true, inView);
  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center px-6"
      style={{ transitionDelay: `${delay}s` }}
    >
      <span className="text-5xl md:text-6xl font-bold tracking-tight mb-2" style={{ color }}>
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-white/40 text-sm uppercase tracking-widest font-medium">{label}</span>
    </div>
  );
}
