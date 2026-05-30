import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatItem } from "../components/StatItem";
import { fadeIn } from "../lib/animations";
import { statsData, whatsappLink } from "../lib/data";

export default function About() {
  return (
    <>
      {/* Page Header */}
      <section className="py-24 px-6 md:px-12 relative z-10 bg-[#0B0B0B] border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E91E8C] rounded-full blur-[200px] opacity-[0.05]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#E91E8C]/30 bg-[#E91E8C]/5 text-xs font-semibold text-[#E91E8C] uppercase tracking-widest">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">About Lotus</h1>
            <p className="text-xl text-white/50 font-light max-w-2xl">Nepalgunj's most trusted personalised gift studio — where creativity meets craftsmanship.</p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 md:px-12 relative z-10 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          >
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#E91E8C]/30 bg-[#E91E8C]/5 text-xs font-semibold text-[#E91E8C] uppercase tracking-widest">
              Crafted in Nepalgunj
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
              Where Every Gift<br />Becomes a Memory.
            </h2>
            <p className="text-xl text-white/50 font-light leading-relaxed mb-6">
              Lotus Print &amp; Custom Gift is Nepalgunj's premier personalised gift studio, serving thousands of happy customers across Nepal since our founding. We combine cutting-edge printing technology with genuine care to create gifts that last a lifetime.
            </p>
            <p className="text-white/40 leading-relaxed mb-10">
              From intimate birthday gifts to large corporate branding campaigns, every order receives the same level of meticulous attention. Our studio is equipped with the latest sublimation and DTF printing technology, ensuring vivid colours and lasting quality.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "100% satisfaction guaranteed on every order",
                "Premium materials — no compromises on quality",
                "Same-day mockup preview before printing",
                "Fast local delivery in Nepalgunj & nationwide shipping",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#E91E8C] flex-shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => window.open(whatsappLink, "_blank")}
              className="h-14 px-10 bg-[#E91E8C] hover:bg-[#c9166e] text-white rounded-full font-bold text-lg transition-all shadow-[0_0_30px_rgba(233,30,140,0.3)]"
            >
              Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative border border-white/10">
              <img
                src="/images/about-workshop.png"
                alt="Lotus Print & Custom Gift Workshop"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-80" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#E91E8C] rounded-full filter blur-[100px] opacity-20 pointer-events-none" />

            {/* Floating cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-4 glass-card rounded-2xl p-5 border border-white/10 w-44"
            >
              <p className="text-3xl font-black text-[#E91E8C] mb-1">4+</p>
              <p className="text-white/50 text-xs">Years of excellence in personalised printing</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-20 relative z-10 bg-[#050505] border-t border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#E91E8C] rounded-full blur-[120px] opacity-[0.04]" />
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#2196F3] rounded-full blur-[120px] opacity-[0.04]" />
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x md:divide-white/10">
            {statsData.map((stat, i) => (
              <StatItem key={i} {...stat} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6 md:px-12 relative z-10 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Our Values</h2>
            <p className="text-xl text-white/40 font-light max-w-2xl mx-auto">Everything we do is guided by our commitment to quality, creativity, and genuine care for our customers.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Quality First", desc: "We never compromise on materials or technique. Every product that leaves our studio meets the highest standards we set for ourselves.", color: "#E91E8C" },
              { num: "02", title: "Personal Touch", desc: "Every order is a unique creation. We treat your memories and ideas with the same respect and care as if they were our own.", color: "#8B2FC9" },
              { num: "03", title: "Customer Love", desc: "Our relationship with customers goes beyond a transaction. We're here to make your celebrations unforgettable.", color: "#2196F3" },
            ].map((v, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-3xl p-10 relative overflow-hidden"
              >
                <span className="absolute top-6 right-6 text-6xl font-black opacity-[0.06]" style={{ color: v.color }}>{v.num}</span>
                <div className="w-1 h-12 rounded-full mb-8" style={{ background: v.color }} />
                <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
                <p className="text-white/50 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
