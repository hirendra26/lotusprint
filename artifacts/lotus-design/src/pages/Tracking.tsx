import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, CheckCircle2, Truck, PartyPopper, X, MessageCircle, Clock, CalendarDays, Hash } from "lucide-react";
import { fadeIn } from "../lib/animations";
import { orders, type Order, type OrderStatus } from "../lib/data";

const steps: { key: OrderStatus; label: string; desc: string; icon: React.ReactNode; color: string }[] = [
  { key: "confirmed",  label: "Order Confirmed",  desc: "We received your order",           icon: <CheckCircle2 className="w-5 h-5" />, color: "#2196F3" },
  { key: "processing", label: "Being Prepared",   desc: "Your item is being made",          icon: <Package className="w-5 h-5" />,      color: "#8B2FC9" },
  { key: "ready",      label: "Ready for Pickup", desc: "Come collect or awaiting dispatch", icon: <Truck className="w-5 h-5" />,        color: "#C4903A" },
  { key: "delivered",  label: "Delivered",         desc: "Order complete — enjoy!",          icon: <PartyPopper className="w-5 h-5" />,  color: "#E91E8C" },
];

const statusIndex = (status: OrderStatus) => {
  if (status === "cancelled") return -1;
  return steps.findIndex((s) => s.key === status);
};

function OrderCard({ order }: { order: Order }) {
  const idx = statusIndex(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-3xl p-7 md:p-9 border border-white/10"
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Hash className="w-3.5 h-3.5 text-white/30" />
            <span className="text-white/40 text-sm font-mono">{order.id}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">{order.product}</h2>
          {order.note && <p className="text-white/40 text-sm mt-1">{order.note}</p>}
        </div>
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
            isCancelled
              ? "bg-red-500/15 text-red-400 border border-red-500/30"
              : "border"
          }`}
          style={!isCancelled ? {
            background: `${steps[idx]?.color ?? "#E91E8C"}18`,
            color: steps[idx]?.color ?? "#E91E8C",
            borderColor: `${steps[idx]?.color ?? "#E91E8C"}35`,
          } : {}}
        >
          {isCancelled ? "Cancelled" : steps[idx]?.label}
        </span>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-5 mb-10 text-sm text-white/40">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="w-4 h-4" />
          Ordered: <span className="text-white/60">{order.date}</span>
        </span>
        {order.estimatedDate && !isCancelled && (
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            Est. ready: <span className="text-white/60">{order.estimatedDate}</span>
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Package className="w-4 h-4" />
          Qty: <span className="text-white/60">{order.qty}</span>
        </span>
      </div>

      {/* Status stepper */}
      {!isCancelled ? (
        <div className="relative">
          {/* Connector line */}
          <div className="absolute top-5 left-5 right-5 h-px bg-white/8 hidden sm:block" />
          <div
            className="absolute top-5 left-5 h-px bg-gradient-to-r from-[#2196F3] via-[#8B2FC9] to-[#E91E8C] hidden sm:block transition-all duration-700"
            style={{ width: idx <= 0 ? "0%" : `${(idx / (steps.length - 1)) * 100}%` }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 relative z-10">
            {steps.map((step, i) => {
              const done = i <= idx;
              const active = i === idx;
              return (
                <div key={step.key} className="flex flex-col items-center text-center gap-3">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: active ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500"
                    style={{
                      background: done ? `${step.color}22` : "transparent",
                      borderColor: done ? step.color : "rgba(255,255,255,0.1)",
                      color: done ? step.color : "rgba(255,255,255,0.2)",
                      boxShadow: active ? `0 0 20px ${step.color}55` : "none",
                    }}
                  >
                    {step.icon}
                  </motion.div>
                  <div>
                    <p className={`text-xs font-semibold leading-tight ${done ? "text-white/80" : "text-white/25"}`}>{step.label}</p>
                    <p className={`text-[11px] mt-0.5 ${active ? "text-white/50" : "text-white/20"}`}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/8 border border-red-500/20">
          <X className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400/80 text-sm">This order has been cancelled. Please contact us on WhatsApp if you have questions.</p>
        </div>
      )}

      {/* WhatsApp CTA */}
      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-white/30 text-sm">Questions about your order?</p>
        <button
          onClick={() => window.open(
            `https://wa.me/9779848363025?text=${encodeURIComponent(`Hello! I'm checking on my order ${order.id} — ${order.product}. Can you give me an update?`)}`,
            "_blank"
          )}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-sm font-semibold hover:bg-[#25D366]/25 transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          Ask on WhatsApp
        </button>
      </div>
    </motion.div>
  );
}

export default function Tracking() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<Order[]>([]);

  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;
    const found = orders.filter(
      (o) =>
        o.id.toLowerCase() === q ||
        o.phone.replace(/\s/g, "") === q.replace(/\s/g, "")
    );
    setResults(found);
    setSearched(true);
  };

  const handleClear = () => {
    setQuery("");
    setSearched(false);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-16 pb-32 px-6 md:px-12">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#8B2FC9] rounded-full blur-[200px] opacity-[0.04]" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-[#E91E8C] rounded-full blur-[200px] opacity-[0.04]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Hero */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center mb-14">
          <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-[#8B2FC9]/30 bg-[#8B2FC9]/5 text-xs font-semibold text-[#8B2FC9] uppercase tracking-widest">
            Order Tracking
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Track Your{" "}
            <span className="text-gradient-brand">Order</span>
          </h1>
          <p className="text-white/40 text-lg font-light max-w-md mx-auto">
            Enter your phone number or order ID to see the live status of your order.
          </p>
        </motion.div>

        {/* Search box */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <div className="relative flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Phone number or Order ID (e.g. ORD-001)"
                className="w-full h-14 pl-11 pr-10 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#E91E8C]/50 focus:bg-white/8 transition-all"
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSearch}
              className="h-14 px-7 rounded-2xl bg-[#E91E8C] text-white font-semibold text-sm hover:bg-[#c9166e] transition-all shadow-[0_0_24px_rgba(233,30,140,0.3)] whitespace-nowrap"
            >
              Track
            </motion.button>
          </div>

          <p className="text-white/20 text-xs text-center mt-3">
            Use the phone number you provided when ordering, or the Order ID sent via WhatsApp.
          </p>
        </motion.div>

        {/* Results */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            {searched && results.length === 0 && (
              <motion.div
                key="not-found"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-3xl p-10 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-5">
                  <Search className="w-7 h-7 text-white/20" />
                </div>
                <h3 className="text-white/70 font-semibold text-lg mb-2">No order found</h3>
                <p className="text-white/35 text-sm max-w-xs mx-auto mb-7">
                  We couldn't find an order matching <span className="text-white/55 font-medium">"{query}"</span>. Double-check your phone number or order ID.
                </p>
                <button
                  onClick={() => window.open(
                    `https://wa.me/9779848363025?text=${encodeURIComponent("Hello! I'd like to check the status of my order. Can you help?")}`,
                    "_blank"
                  )}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-sm font-semibold hover:bg-[#25D366]/25 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact us on WhatsApp
                </button>
              </motion.div>
            )}

            {results.length > 0 && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5"
              >
                <p className="text-white/30 text-sm">
                  Found <span className="text-white/60 font-semibold">{results.length}</span> order{results.length > 1 ? "s" : ""}
                </p>
                {results.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info box */}
        {!searched && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-16 grid sm:grid-cols-3 gap-4">
            {[
              { icon: "📦", title: "Confirmed", desc: "Order received and payment verified" },
              { icon: "🎨", title: "Processing", desc: "Your item is being designed and printed" },
              { icon: "✅", title: "Ready / Delivered", desc: "Pickup ready or dispatched to you" },
            ].map((s, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 text-center">
                <span className="text-3xl block mb-3">{s.icon}</span>
                <p className="text-white/70 text-sm font-semibold mb-1">{s.title}</p>
                <p className="text-white/30 text-xs">{s.desc}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
