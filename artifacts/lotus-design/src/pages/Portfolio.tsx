import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fadeIn } from "../lib/animations";
import { portfolio, whatsappLink } from "../lib/data";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("all");
  const filtered = activeTab === "all" ? portfolio : portfolio.filter(p => p.category === activeTab);

  return (
    <>
      {/* Page Header */}
      <section className="py-24 px-6 md:px-12 relative z-10 bg-[#0A0A0A] border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2196F3] rounded-full blur-[250px] opacity-[0.04]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#2196F3]/30 bg-[#2196F3]/5 text-xs font-semibold text-[#2196F3] uppercase tracking-widest">Our Work</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Portfolio</h1>
            <p className="text-xl text-white/50 font-light max-w-2xl">A glimpse into our crafted pieces, where every detail is considered.</p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-32 px-6 md:px-12 relative z-10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Selected Works</h2>
              <p className="text-lg text-white/50 font-light max-w-xl">Every piece tells the story of a special moment.</p>
            </div>
            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="bg-white/5 border border-white/10 rounded-full p-1 w-full md:w-auto overflow-x-auto flex-nowrap hide-scrollbar">
                <TabsTrigger value="all" className="rounded-full px-6 data-[state=active]:bg-[#E91E8C] data-[state=active]:text-black transition-all">All</TabsTrigger>
                <TabsTrigger value="frames" className="rounded-full px-6 data-[state=active]:bg-[#E91E8C] data-[state=active]:text-black transition-all">Frames</TabsTrigger>
                <TabsTrigger value="mugs" className="rounded-full px-6 data-[state=active]:bg-[#E91E8C] data-[state=active]:text-black transition-all">Mugs</TabsTrigger>
                <TabsTrigger value="tshirts" className="rounded-full px-6 data-[state=active]:bg-[#E91E8C] data-[state=active]:text-black transition-all">T-Shirts</TabsTrigger>
                <TabsTrigger value="branding" className="rounded-full px-6 data-[state=active]:bg-[#E91E8C] data-[state=active]:text-black transition-all">Branding</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div key={item.id} layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`group relative rounded-2xl overflow-hidden ${item.aspect} cursor-pointer`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                  <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "14px 14px" }} />
                  <div className="absolute inset-0 flex items-center justify-center text-white/10 group-hover:text-white/15 transition-colors duration-500 scale-125">{item.icon}</div>
                  <img src={item.image} alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 p-6 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-xs font-semibold text-[#E91E8C] uppercase tracking-wider mb-2 block">{item.category}</span>
                    <h3 className="text-xl font-bold text-white leading-tight">{item.title}</h3>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-[#E91E8C] flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="mt-20 text-center">
            <p className="text-white/40 mb-8 text-lg">Want something just like this — or completely unique?</p>
            <Button
              onClick={() => window.open(whatsappLink, "_blank")}
              className="h-14 px-10 bg-[#E91E8C] hover:bg-[#c9166e] text-white rounded-full font-semibold text-base transition-all shadow-[0_0_30px_rgba(233,30,140,0.3)]"
            >
              Order a Custom Piece <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
