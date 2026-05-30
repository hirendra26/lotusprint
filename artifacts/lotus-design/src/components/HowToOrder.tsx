import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { orderSteps, whatsappLink } from "../lib/data";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface OrderStepPanelProps {
  step: typeof orderSteps[0];
  index: number;
}

function OrderStepPanel({ step, index }: OrderStepPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen flex items-center py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        <div>
          <span className="text-[8rem] md:text-[10rem] font-black leading-none select-none pointer-events-none"
            style={{ color: `${step.color}15` }}>
            {step.num}
          </span>
          <div className="-mt-10 md:-mt-16">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: `${step.color}18`, color: step.color }}>
              {step.icon}
            </div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">{step.title}</h3>
            <p className="text-xl text-white/50 font-light leading-relaxed mb-6">{step.desc}</p>
            <p className="text-white/30 text-sm leading-relaxed">{step.detail}</p>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-10 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none"
            style={{ backgroundColor: step.color }} />
          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white"
              style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}88)` }}>
              {step.icon}
            </div>
            <div className="flex items-center gap-4">
              {orderSteps.map((_, i) => (
                <div key={i}
                  className={`rounded-full transition-all duration-300 ${i === index
                    ? "w-8 h-2"
                    : "w-2 h-2 bg-white/20"}`}
                  style={i === index ? { backgroundColor: step.color } : {}} />
              ))}
            </div>
            <p className="text-white/40 text-sm">Step {index + 1} of {orderSteps.length}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HowToOrderSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative">
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-white/5">
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{ height: progressHeight, background: "linear-gradient(to bottom, #E91E8C, #8B2FC9, #2196F3)" }}
        />
        <div className="hidden md:flex absolute top-0 left-0 right-0 flex-col justify-between h-full py-20 -translate-x-1/2">
          {orderSteps.map((step, i) => (
            <div key={i}
              className="w-4 h-4 rounded-full border-2 border-white/20 bg-[#080808] flex items-center justify-center translate-x-px">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: step.color }} />
            </div>
          ))}
        </div>
      </div>
      <div className="md:pl-12">
        {orderSteps.map((step, i) => (
          <OrderStepPanel key={i} step={step} index={i} />
        ))}
      </div>
      <div className="py-20 text-center">
        <Button
          onClick={() => window.open(whatsappLink, "_blank")}
          className="h-16 px-12 bg-[#E91E8C] hover:bg-[#c9166e] text-white text-lg rounded-full font-bold transition-all shadow-[0_0_40px_rgba(233,30,140,0.3)]"
        >
          Start Your Order <ArrowRight className="ml-3 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
