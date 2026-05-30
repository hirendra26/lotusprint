import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building2, AlertCircle, Copy, Check, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeIn } from "../lib/animations";
import { paymentMethods, pricingItems, bankDetails, whatsappLink, occasions } from "../lib/data";
import { useCart } from "../lib/CartContext";

export default function Payment() {
  const [paymentModal, setPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCart();

  const handleAddToCart = (item: typeof pricingItems[0]) => {
    const id = item.name.toLowerCase().replace(/\s+/g, "-");
    addItem({ id, name: item.name, price: parseInt(item.price), unit: item.unit, note: item.note, color: item.color });
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Page Header */}
      <section className="py-24 px-6 md:px-12 relative z-10 bg-[#0A0A0A] border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E91E8C] rounded-full blur-[200px] opacity-[0.04]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#E91E8C]/30 bg-[#E91E8C]/5 text-xs font-semibold text-[#E91E8C] uppercase tracking-widest">Secure Payments</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Pay Your Way</h1>
            <p className="text-xl text-white/50 font-light max-w-2xl">We support all major payment methods trusted by customers across Nepal.</p>
          </motion.div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-32 px-6 md:px-12 relative z-10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method, idx) => (
              <motion.div key={method.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.18 } }}
                onClick={() => { setSelectedPayment(method.id); setPaymentModal(true); }}
                className="glass-card p-8 rounded-3xl cursor-pointer group relative overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full filter blur-[60px] opacity-0 group-hover:opacity-18 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: method.color }} />
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                    style={{ backgroundColor: method.color, color: method.textColor }}>
                    {method.icon}
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/50 font-medium">{method.badge}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{method.name}</h3>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">{method.tagline}</p>
                <div className="flex items-center gap-2 text-sm font-medium group-hover:text-[#E91E8C] transition-colors text-white/60">
                  <span>How to pay</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bank Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 glass-card rounded-3xl p-8 border border-[#E91E8C]/20">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-[#E91E8C]/10 flex items-center justify-center text-[#E91E8C] flex-shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-1">Bank Transfer Details</h4>
                <p className="text-white/50 text-sm">Use ConnectIPS or any Nepal bank to transfer directly.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 text-sm w-full md:w-auto">
                <div className="bg-white/5 rounded-xl px-5 py-3 border border-white/10">
                  <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Bank</p>
                  <p className="font-medium text-white">{bankDetails.bank}</p>
                </div>
                <div className="bg-white/5 rounded-xl px-5 py-3 border border-white/10">
                  <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Account Name</p>
                  <p className="font-medium text-white">{bankDetails.accountName}</p>
                </div>
                <div className="bg-white/5 rounded-xl px-5 py-3 border border-white/10 flex items-center gap-3">
                  <div>
                    <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Account Number</p>
                    <p className="font-mono font-bold text-[#E91E8C] text-lg tracking-widest">{bankDetails.accountNumber}</p>
                  </div>
                  <button onClick={() => copyToClipboard(bankDetails.accountNumber)}
                    className="ml-2 p-2 rounded-lg bg-white/5 hover:bg-[#E91E8C]/20 transition-colors text-white/50 hover:text-[#E91E8C]">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Guide */}
      <section className="py-32 px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#0B0B0B] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#8B2FC9] rounded-full blur-[160px] opacity-[0.04]" />
          <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-[#E91E8C] rounded-full blur-[160px] opacity-[0.04]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-20">
            <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-[#8B2FC9]/30 bg-[#8B2FC9]/5 text-xs font-semibold text-[#8B2FC9] uppercase tracking-widest">Transparent Pricing</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Starting Prices</h2>
            <p className="text-xl text-white/40 font-light max-w-2xl mx-auto">All prices are in Nepali Rupees (NPR). Final price depends on design complexity, quantity, and customisation.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {pricingItems.map((item, idx) => {
              const itemId = item.name.toLowerCase().replace(/\s+/g, "-");
              const isAdded = addedId === itemId;
              return (
                <motion.div key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative glass-card rounded-2xl p-5 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {item.tag && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: `${item.color}22`, color: item.color }}>
                      {item.tag}
                    </span>
                  )}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${item.color}18`, color: item.color }}>
                    {item.icon}
                  </div>
                  <p className="text-sm font-semibold text-white/80 mb-3 leading-tight">{item.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white/40 text-xs">Rs.</span>
                    <span className="text-2xl font-bold tracking-tight" style={{ color: item.color }}>{item.price}</span>
                    <span className="text-white/30 text-[11px]">+</span>
                  </div>
                  <p className="text-white/30 text-[11px] mt-0.5">{item.unit}</p>
                  <p className="text-white/25 text-[11px] mt-2 border-t border-white/5 pt-2">{item.note}</p>

                  <motion.button
                    onClick={() => handleAddToCart(item)}
                    whileTap={{ scale: 0.93 }}
                    className={`mt-4 w-full h-8 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 ${
                      isAdded
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 group-hover:border-opacity-50"
                    }`}
                    style={!isAdded ? { "--hover-color": item.color } as React.CSSProperties : {}}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add to Cart
                      </>
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 glass-card rounded-2xl px-8 py-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E91E8C]/10 flex items-center justify-center text-[#E91E8C] flex-shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white/80 font-medium mb-1">Need a custom quote?</p>
                <p className="text-white/40 text-sm">Prices vary by quantity, material &amp; design. Bulk orders get special discounts. Send us your requirements for an exact price — no hidden fees.</p>
              </div>
            </div>
            <Button
              onClick={() => window.open(`https://wa.me/9779848363025?text=${encodeURIComponent("Hello! I'd like to get a price quote for my order. Can you help?")}`, "_blank")}
              className="flex-shrink-0 h-12 px-8 bg-[#E91E8C] hover:bg-[#c9166e] text-white rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(233,30,140,0.25)] whitespace-nowrap"
            >
              Get Free Quote
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Special Occasions */}
      <section className="py-32 px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E91E8C] rounded-full blur-[160px] opacity-[0.03]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2196F3] rounded-full blur-[160px] opacity-[0.03]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-20">
            <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-[#E91E8C]/30 bg-[#E91E8C]/5 text-xs font-semibold text-[#E91E8C] uppercase tracking-widest">Perfect For Every Occasion</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Gifts for Every Moment</h2>
            <p className="text-xl text-white/40 font-light max-w-2xl mx-auto">Whatever the celebration, we have the perfect personalised gift to make it truly memorable.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {occasions.map((occ, idx) => (
              <motion.div key={idx}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => window.open(`https://wa.me/9779848363025?text=${encodeURIComponent(occ.msg)}`, "_blank")}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative rounded-3xl border bg-gradient-to-br ${occ.gradient} ${occ.border} p-8 md:p-10 cursor-pointer transition-all duration-300 overflow-hidden`}
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 60px ${occ.glow}` }} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <span className="text-5xl mb-4 block">{occ.emoji}</span>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{occ.title}</h3>
                      <p className="text-white/50 text-sm font-light">{occ.subtitle}</p>
                    </div>
                    <motion.div whileHover={{ rotate: 45 }}
                      className="w-11 h-11 rounded-full border flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-300"
                      style={{ borderColor: occ.color, color: occ.color }}>
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {occ.products.map((p, i) => (
                      <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 group-hover:border-white/20 group-hover:text-white/80 transition-all duration-300">{p}</span>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold" style={{ color: occ.color }}>
                    <span>Order via WhatsApp</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="text-center text-white/30 text-sm mt-12">
            Bulk orders available for weddings &amp; corporate events · Same-day consultation on WhatsApp
          </motion.p>
        </div>
      </section>

      {/* Payment Modal */}
      <AnimatePresence>
        {paymentModal && selectedPayment && (() => {
          const method = paymentMethods.find(m => m.id === selectedPayment)!;
          return (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setPaymentModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={e => e.stopPropagation()}
                className="relative bg-[#111] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full filter blur-[100px] opacity-10 pointer-events-none"
                  style={{ backgroundColor: method.color }} />
                <button onClick={() => setPaymentModal(false)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: method.color, color: method.textColor }}>
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{method.name}</h3>
                    <p className="text-white/50 text-sm">{method.tagline}</p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  {method.steps.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: method.color, color: method.textColor }}>
                        {i + 1}
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
                {method.id === "bank" && (
                  <div className="bg-white/5 rounded-2xl p-5 mb-6 border border-white/10 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Bank</span>
                      <span className="font-medium">{bankDetails.bank}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Name</span>
                      <span className="font-medium">{bankDetails.accountName}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/40">Account No.</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#E91E8C] tracking-wider">{bankDetails.accountNumber}</span>
                        <button onClick={() => copyToClipboard(bankDetails.accountNumber)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#E91E8C]/20 transition-colors text-white/50 hover:text-[#E91E8C]">
                          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {method.note && (
                  <div className="flex gap-3 items-start bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                    <AlertCircle className="w-4 h-4 text-[#E91E8C] flex-shrink-0 mt-0.5" />
                    <p className="text-white/60 text-sm">{method.note}</p>
                  </div>
                )}
                <Button
                  onClick={() => { setPaymentModal(false); window.open(whatsappLink, "_blank"); }}
                  className="w-full h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(37,211,102,0.2)]"
                >
                  Confirm via WhatsApp
                </Button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </>
  );
}
