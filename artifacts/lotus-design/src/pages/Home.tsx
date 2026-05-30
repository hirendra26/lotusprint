import { useRef } from "react";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { ArrowRight, Camera, Shirt, Gift, Heart, Printer, Star, Briefcase, MonitorSmartphone, Clock, Award, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatItem } from "../components/StatItem";
import { fadeIn } from "../lib/animations";
import { statsData, whatsappLink, testimonials } from "../lib/data";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  const reelRow1 = [
    { name: "Photo Mug", cat: "Drinkware", tag: "Best Seller", gradient: "from-[#E91E8C] to-[#8B2FC9]", icon: <Camera className="w-7 h-7" /> },
    { name: "Custom T-Shirt", cat: "Apparel", tag: "Fan Favourite", gradient: "from-[#8B2FC9] to-[#2196F3]", icon: <Shirt className="w-7 h-7" /> },
    { name: "Canvas Print", cat: "Wall Art", tag: "Premium", gradient: "from-[#2196F3] to-[#E91E8C]", icon: <MonitorSmartphone className="w-7 h-7" /> },
    { name: "Gift Hamper", cat: "Gifting", tag: "New", gradient: "from-[#E91E8C] to-[#ff6b6b]", icon: <Gift className="w-7 h-7" /> },
    { name: "Photo Frame", cat: "Décor", tag: "Top Rated", gradient: "from-[#C4903A] to-[#E91E8C]", icon: <MonitorSmartphone className="w-7 h-7" /> },
    { name: "Business Card", cat: "Branding", tag: "Popular", gradient: "from-[#8B2FC9] to-[#C4903A]", icon: <Briefcase className="w-7 h-7" /> },
    { name: "Keychain", cat: "Accessories", tag: "Trending", gradient: "from-[#2196F3] to-[#8B2FC9]", icon: <Star className="w-7 h-7" /> },
    { name: "Laptop Sleeve", cat: "Tech", tag: "Premium", gradient: "from-[#E91E8C] to-[#2196F3]", icon: <MonitorSmartphone className="w-7 h-7" /> },
  ];
  const reelRow2 = [
    { name: "Photo Cushion", cat: "Home", tag: "Best Seller", gradient: "from-[#2196F3] to-[#E91E8C]", icon: <Heart className="w-7 h-7" /> },
    { name: "Banner Print", cat: "Advertising", tag: "Commercial", gradient: "from-[#8B2FC9] to-[#E91E8C]", icon: <Printer className="w-7 h-7" /> },
    { name: "Birthday Card", cat: "Stationery", tag: "Personalised", gradient: "from-[#E91E8C] to-[#C4903A]", icon: <Star className="w-7 h-7" /> },
    { name: "Magic Mug", cat: "Drinkware", tag: "Unique", gradient: "from-[#C4903A] to-[#2196F3]", icon: <Camera className="w-7 h-7" /> },
    { name: "Tote Bag", cat: "Accessories", tag: "Eco-Friendly", gradient: "from-[#2196F3] to-[#C4903A]", icon: <Gift className="w-7 h-7" /> },
    { name: "Printed Hoodie", cat: "Apparel", tag: "Cosy Pick", gradient: "from-[#8B2FC9] to-[#ff6b6b]", icon: <Shirt className="w-7 h-7" /> },
    { name: "Desk Plaque", cat: "Corporate", tag: "Gifting", gradient: "from-[#E91E8C] to-[#8B2FC9]", icon: <Award className="w-7 h-7" /> },
    { name: "Sticker Pack", cat: "Branding", tag: "Fun", gradient: "from-[#2196F3] to-[#E91E8C]", icon: <Gift className="w-7 h-7" /> },
  ];
  const ReelCard = ({ item }: { item: typeof reelRow1[0] }) => (
    <div className="flex-shrink-0 w-52 h-64 mx-3 rounded-2xl overflow-hidden relative group cursor-pointer select-none">
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80`} />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 text-white rounded-full px-3 py-1 backdrop-blur-sm">{item.tag}</span>
        </div>
        <div>
          <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
          <p className="text-white/70 text-xs uppercase tracking-widest mb-1">{item.cat}</p>
          <h3 className="text-white font-bold text-lg leading-tight">{item.name}</h3>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <div className="absolute inset-0 bg-[#0B0B0B]" />
          <img
            src="/images/hero-bg.png"
            alt=""
            className="w-full h-full object-cover opacity-25"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/40 via-transparent to-[#0B0B0B]" />
        </motion.div>

        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E91E8C] rounded-full blur-[200px] opacity-[0.07]" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#8B2FC9] rounded-full blur-[180px] opacity-[0.06]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#E91E8C]/30 bg-[#E91E8C]/5 text-xs font-semibold text-[#E91E8C] uppercase tracking-widest">
              Nepalgunj's Premier Gift Studio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-8 max-w-5xl"
          >
            <span className="block text-white">Gifts That</span>
            <span className="block text-gradient-brand">Tell a Story.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="text-xl md:text-2xl text-white/50 font-light max-w-2xl mb-12 leading-relaxed"
          >
            Premium personalised gifts, custom printing &amp; professional branding — crafted with precision in Nepalgunj, Nepal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={() => window.open(whatsappLink, "_blank")}
              className="h-16 px-10 bg-[#E91E8C] hover:bg-[#c9166e] text-white text-lg rounded-full font-bold transition-all shadow-[0_0_40px_rgba(233,30,140,0.35)] hover:shadow-[0_0_60px_rgba(233,30,140,0.5)]"
            >
              Order via WhatsApp <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => window.location.href = "/portfolio"}
              variant="outline"
              className="h-16 px-10 border-white/20 text-white hover:bg-white/5 rounded-full text-lg font-semibold bg-transparent transition-all"
            >
              View Portfolio
            </Button>
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

      {/* Work Reel */}
      <section className="py-24 relative z-10 bg-[#080808] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-14">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[#E91E8C] text-sm font-semibold uppercase tracking-widest mb-3">What We Make</p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">From Our Studio</h2>
            </div>
            <p className="text-white/40 text-lg max-w-sm font-light">Every product is made with care, precision, and a personal touch.</p>
          </motion.div>
        </div>
        <div className="space-y-5 reel-track">
          <div className="overflow-hidden">
            <div className="flex animate-marquee-left w-max">
              {[...reelRow1, ...reelRow1].map((item, i) => <ReelCard key={i} item={item} />)}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex animate-marquee-right w-max">
              {[...reelRow2, ...reelRow2].map((item, i) => <ReelCard key={i} item={item} />)}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-14 text-center">
          <Button
            onClick={() => window.open(whatsappLink, "_blank")}
            className="h-14 px-10 bg-transparent border border-white/20 text-white hover:bg-white/5 rounded-full text-base font-semibold transition-all"
          >
            Order Any of These <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-16">
            <p className="text-[#E91E8C] text-sm font-semibold uppercase tracking-widest mb-4">Why Lotus</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">The Lotus Standard</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Clock className="w-6 h-6" />, title: "Fast Delivery", desc: "Timely execution without compromising on quality.", grad: "from-[#E91E8C]/10 to-transparent" },
              { icon: <Award className="w-6 h-6" />, title: "Premium Quality", desc: "Only the finest materials and printing techniques.", grad: "from-[#8B2FC9]/10 to-transparent" },
              { icon: <ShieldCheck className="w-6 h-6" />, title: "Trusted Studio", desc: "Highly rated by thousands of customers across Nepal.", grad: "from-[#2196F3]/10 to-transparent" },
              { icon: <Heart className="w-6 h-6" />, title: "Made with Care", desc: "Every order is treated as a personal masterpiece.", grad: "from-[#C4903A]/10 to-transparent" },
            ].map((item, idx) => (
              <motion.div key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`glass-card rounded-2xl p-8 bg-gradient-to-b ${item.grad} group hover:border-white/20 transition-colors`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#E91E8C] mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 md:px-12 relative z-10 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#E91E8C] rounded-full blur-[160px] opacity-[0.04]" />
          <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-[#8B2FC9] rounded-full blur-[160px] opacity-[0.04]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-14">
            <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-[#E91E8C]/30 bg-[#E91E8C]/5 text-xs font-semibold text-[#E91E8C] uppercase tracking-widest">Customer Reviews</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Words of Trust</h2>
            <p className="text-xl text-white/40 font-light max-w-2xl mx-auto">Real customers, real experiences — straight from Nepalgunj and across Nepal.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex justify-center mb-14">
            <div className="inline-flex items-center gap-4 glass-card rounded-full px-6 py-3 border border-[#E91E8C]/20">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4" fill="#FBBC04" stroke="#FBBC04" />)}
              </div>
              <span className="text-white font-bold text-lg">4.9</span>
              <div className="w-px h-5 bg-white/15" />
              <span className="text-white/50 text-sm">Highly Rated · 500+ Reviews</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((test, idx) => (
              <motion.div key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card p-7 rounded-2xl relative flex flex-col hover:border-white/20 transition-colors duration-300"
              >
                <div className="flex gap-1 mb-5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4" fill="#FBBC04" stroke="#FBBC04" />)}
                </div>
                <p className="text-base text-white/75 leading-relaxed mb-6 italic font-serif flex-1">"{test.quote}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-base text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #E91E8C, #8B2FC9)" }}>
                      {test.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{test.name}</h4>
                      <p className="text-xs text-white/40">{test.role} · {test.location}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#E91E8C]/10 text-[#E91E8C] border border-[#E91E8C]/20 uppercase tracking-wider flex-shrink-0">✓ Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
