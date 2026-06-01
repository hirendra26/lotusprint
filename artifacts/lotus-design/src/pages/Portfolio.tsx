import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ChevronLeft, ChevronRight, ZoomIn, MessageCircle, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fadeIn } from "../lib/animations";
import { portfolio, whatsappLink } from "../lib/data";

type PortfolioItem = typeof portfolio[0];

/* ─── Lightbox ──────────────────────────────────────────────────────────── */
function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [slideDir, setSlideDir] = useState(0);
  const [currentKey, setCurrentKey] = useState(item.id);
  const touchStartX = useRef<number | null>(null);

  // reset image state when slide changes
  useEffect(() => {
    if (item.id !== currentKey) {
      setImgLoaded(false);
      setImgError(false);
      setCurrentKey(item.id);
    }
  }, [item.id, currentKey]);

  const goNext = useCallback(() => {
    setSlideDir(1);
    onNext();
  }, [onNext]);

  const goPrev = useCallback(() => {
    setSlideDir(-1);
    onPrev();
  }, [onPrev]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goNext, goPrev]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "8%" : "-8%", opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-8%" : "8%", opacity: 0, scale: 0.96 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(5,5,5,0.96)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-white/30 uppercase tracking-widest">{item.category}</span>
          <span className="w-px h-3 bg-white/15" />
          <span className="text-xs text-white/30 font-mono">{index + 1} / {items.length}</span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main image area */}
      <div
        className="relative flex items-center justify-center w-full h-full px-20 md:px-28 py-20"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" custom={slideDir}>
          <motion.div
            key={item.id}
            custom={slideDir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center w-full h-full max-w-4xl max-h-[75vh]"
          >
            {/* Gradient fallback (always rendered below) */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
              <span className="text-white/10">{item.icon}</span>
            </div>

            {/* Actual image */}
            {!imgError && (
              <img
                src={item.image}
                alt={item.title}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`relative z-10 max-w-full max-h-[75vh] rounded-2xl object-contain shadow-[0_40px_80px_rgba(0,0,0,0.6)] transition-opacity duration-400 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              />
            )}

            {/* Loading shimmer */}
            {!imgLoaded && !imgError && (
              <div className="absolute inset-0 rounded-2xl overflow-hidden z-20">
                <div className="absolute inset-0 animate-pulse bg-white/3 rounded-2xl" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all z-10 group"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all z-10 group"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Bottom bar — title + CTA */}
      <div
        className="absolute bottom-0 left-0 right-0 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="text-white font-bold text-lg leading-tight">{item.title}</p>
          <p className="text-white/35 text-sm capitalize">{item.category}</p>
        </div>
        <button
          onClick={() => window.open(
            `https://wa.me/9779848363025?text=${encodeURIComponent(`Hello! I love your "${item.title}" — can I order something similar? Please let me know the price and details.`)}`,
            "_blank"
          )}
          className="flex items-center gap-2 h-10 px-5 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-sm font-semibold hover:bg-[#25D366]/25 transition-all whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4" />
          Order Similar
        </button>
      </div>

      {/* Dot strip */}
      <div className="absolute bottom-[72px] left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setSlideDir(i > index ? 1 : -1); onPrev(); /* handled by parent via index changes */ }}
            className="p-1"
          >
            <span className={`block rounded-full transition-all duration-300 ${i === index ? "w-5 h-1.5 bg-[#E91E8C]" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"}`} />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Portfolio Page ─────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeTab === "all" ? portfolio : portfolio.filter((p) => p.category === activeTab);

  const openAt = (idx: number) => setLightboxIndex(idx);
  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => i === null ? null : (i - 1 + filtered.length) % filtered.length);
  const next = () => setLightboxIndex((i) => i === null ? null : (i + 1) % filtered.length);

  // When filter changes, close lightbox
  useEffect(() => { setLightboxIndex(null); }, [activeTab]);

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
              <p className="text-lg text-white/50 font-light max-w-xl">
                Every piece tells the story of a special moment.{" "}
                <span className="text-white/30 text-base">Click any image to expand.</span>
              </p>
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
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => openAt(idx)}
                  className={`group relative rounded-2xl overflow-hidden ${item.aspect} cursor-pointer`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                  <div className="absolute inset-0 opacity-[0.06]"
                    style={{ backgroundImage: "repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 50%)", backgroundSize: "14px 14px" }} />
                  <div className="absolute inset-0 flex items-center justify-center text-white/10 group-hover:text-white/15 transition-colors duration-500 scale-125">
                    {item.icon}
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Title reveal */}
                  <div className="absolute bottom-0 left-0 p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-xs font-semibold text-[#E91E8C] uppercase tracking-wider mb-1.5 block">{item.category}</span>
                    <h3 className="text-lg font-bold text-white leading-tight">{item.title}</h3>
                  </div>

                  {/* Expand icon */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <Maximize2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  {/* Index counter badge */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-mono text-white/40 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded">
                      {idx + 1}/{filtered.length}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center text-white/20 text-sm mt-10 flex items-center justify-center gap-2"
          >
            <ZoomIn className="w-4 h-4" />
            Click any photo to open fullscreen — use arrow keys or swipe to navigate
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
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

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            index={lightboxIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}
