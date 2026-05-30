import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeIn } from "../lib/animations";
import { services, whatsappLink, orderSteps } from "../lib/data";

function OrderStepPanel({ step, idx, onActive }: { step: typeof orderSteps[0]; idx: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-35% 0px -35% 0px" });
  useEffect(() => { if (inView) onActive(idx); }, [inView, idx, onActive]);
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-[65vh] flex items-center py-20 border-b border-white/5 last:border-0"
    >
      <div className="max-w-xl w-full">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
          style={{ background: `${step.color}1A`, color: step.color }}>
          {step.icon}
        </div>
        <div className="flex items-center gap-4 mb-5">
          <span className="text-5xl font-bold tabular-nums" style={{ color: step.color }}>{step.num}</span>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{step.title}</h3>
        </div>
        <p className="text-white/60 text-lg font-light leading-relaxed mb-6">{step.desc}</p>
        <p className="text-white/35 text-sm leading-relaxed border-l-2 pl-4 py-1" style={{ borderColor: step.color }}>
          {step.detail}
        </p>
      </div>
    </motion.div>
  );
}

function HowToOrderSection() {
  const [activeStep, setActiveStep] = useState(0);
  const handleActive = useCallback((idx: number) => setActiveStep(idx), []);
  return (
    <div className="pt-16 pb-24 lg:grid lg:grid-cols-[280px_1fr] lg:gap-20">
      <div className="hidden lg:block">
        <div className="sticky top-28 self-start">
          <div className="relative pl-1">
            <div className="absolute left-5 top-5 bottom-14 w-px bg-white/10" />
            <motion.div
              className="absolute left-5 top-5 w-px bg-gradient-to-b from-[#E91E8C] via-[#8B2FC9] to-[#2196F3] origin-top"
              animate={{ height: `${(activeStep / (orderSteps.length - 1)) * (100 - 14)}%` }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />
            <div className="space-y-8">
              {orderSteps.map((s, i) => (
                <div key={i} className="flex items-center gap-4 relative">
                  <motion.div
                    animate={{
                      backgroundColor: i <= activeStep ? s.color : "rgba(255,255,255,0.05)",
                      borderColor: i <= activeStep ? s.color : "rgba(255,255,255,0.15)",
                      scale: i === activeStep ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs z-10 flex-shrink-0"
                    style={{ color: i <= activeStep ? "#fff" : "rgba(255,255,255,0.3)" }}
                  >
                    {i < activeStep ? "✓" : s.num}
                  </motion.div>
                  <motion.span
                    animate={{ opacity: i === activeStep ? 1 : 0.35, x: i === activeStep ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-semibold text-white leading-tight"
                  >
                    {s.title}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <Button
              onClick={() => window.open(whatsappLink, "_blank")}
              className="w-full h-12 bg-[#E91E8C] hover:bg-[#c9166e] text-white rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(233,30,140,0.3)]"
            >
              Start Your Order
            </Button>
          </div>
        </div>
      </div>
      <div>
        {orderSteps.map((step, idx) => (
          <OrderStepPanel key={idx} step={step} idx={idx} onActive={handleActive} />
        ))}
        <div className="lg:hidden pt-8">
          <Button
            onClick={() => window.open(whatsappLink, "_blank")}
            className="w-full h-14 bg-[#E91E8C] hover:bg-[#c9166e] text-white rounded-xl font-semibold text-lg transition-all"
          >
            Start Your Order
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <>
      {/* Page Header */}
      <section className="py-24 px-6 md:px-12 relative z-10 bg-[#0B0B0B] border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#8B2FC9] rounded-full blur-[200px] opacity-[0.05]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#8B2FC9]/30 bg-[#8B2FC9]/5 text-xs font-semibold text-[#8B2FC9] uppercase tracking-widest">What We Offer</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Our Services</h1>
            <p className="text-xl text-white/50 font-light max-w-2xl">Meticulous craftsmanship across a spectrum of personalised products and professional branding solutions.</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6 md:px-12 relative z-10 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.18 } }}
                className="glass-card p-8 rounded-3xl group hover:border-[#E91E8C]/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E91E8C]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#E91E8C] mb-6 group-hover:scale-105 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="mt-16 glass-card rounded-3xl p-8 md:p-12 border border-[#E91E8C]/15 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Need Something Custom?</h3>
              <p className="text-white/50 leading-relaxed">Don't see exactly what you need? We love custom projects. Message us on WhatsApp and we'll work with you to bring your idea to life.</p>
            </div>
            <Button
              onClick={() => window.open(whatsappLink, "_blank")}
              className="flex-shrink-0 h-14 px-10 bg-[#E91E8C] hover:bg-[#c9166e] text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_30px_rgba(233,30,140,0.3)] whitespace-nowrap"
            >
              Discuss Your Project <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How to Order */}
      <section className="relative z-10 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="py-24 pb-0">
            <p className="text-[#E91E8C] text-sm font-semibold uppercase tracking-widest mb-4">Simple Process</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-xl">How to Order in 4 Easy Steps</h2>
          </motion.div>
          <HowToOrderSection />
        </div>
      </section>
    </>
  );
}
