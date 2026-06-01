import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Check, ThumbsUp, BadgeCheck, MessageSquarePlus, Quote } from "lucide-react";
import { fadeIn } from "../lib/animations";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  product?: string;
  date: string;
  seed?: boolean;
}

const SEED_REVIEWS: Review[] = [
  { id: "s1", name: "Priya Sharma", rating: 5, text: "Absolutely amazing quality! I ordered custom mugs for my office team and everyone loved them. The print is sharp, colors are vivid, and delivery was on time. Lotus Print is my go-to for all gifting needs.", product: "Custom Mug", date: "2026-05-20", seed: true },
  { id: "s2", name: "Ramesh KC", rating: 5, text: "Ordered personalized t-shirts for our college event — 50 pieces! The quality was outstanding and the price was very reasonable. Highly recommend for bulk orders.", product: "Custom T-Shirt", date: "2026-05-15", seed: true },
  { id: "s3", name: "Sunita Thapa", rating: 5, text: "Got a beautiful photo frame for my parents' anniversary. The printing was crystal clear and the frame quality was premium. They were so happy. Thank you Lotus Print!", product: "Photo Frame", date: "2026-05-10", seed: true },
  { id: "s4", name: "Anil Gurung", rating: 4, text: "Very professional service. Ordered visiting cards and the finish was excellent — glossy on one side, matte on the other. Will definitely order again for my business.", product: "Business Cards", date: "2026-05-05", seed: true },
  { id: "s5", name: "Meena Pandey", rating: 5, text: "I was skeptical at first but the results exceeded my expectations. The canvas print looks like a real painting. Fast delivery and great packaging too!", product: "Canvas Print", date: "2026-04-28", seed: true },
  { id: "s6", name: "Bikash Lama", rating: 5, text: "Best gift shop in Nepalgunj! Ordered a custom cushion with a photo for my girlfriend's birthday and she loved it. Staff on WhatsApp were very helpful and responsive.", product: "Cushion Print", date: "2026-04-20", seed: true },
];

const PRODUCTS = [
  "Custom Mug", "Magic Mug", "Custom T-Shirt", "Canvas Print",
  "Photo Frame", "Cushion Print", "Keychain", "Birthday Card",
  "Business Cards", "Banner Print", "Laptop Sleeve", "Tote Bag", "Other",
];

const LS_KEY = "lotus_customer_reviews";

function loadSaved(): Review[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(reviews: Review[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(reviews));
}

function StarRating({ value, onChange, size = "md" }: { value: number; onChange?: (v: number) => void; size?: "sm" | "md" | "lg" }) {
  const [hover, setHover] = useState(0);
  const sz = size === "lg" ? "w-9 h-9" : size === "md" ? "w-7 h-7" : "w-4 h-4";
  const active = hover || value;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange?.(i)}
          onMouseEnter={() => onChange && setHover(i)}
          onMouseLeave={() => onChange && setHover(0)}
          className={`transition-transform duration-100 ${onChange ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
        >
          <Star
            className={sz}
            fill={i <= active ? "#F59E0B" : "transparent"}
            stroke={i <= active ? "#F59E0B" : "rgba(255,255,255,0.2)"}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const colors = ["#E91E8C", "#8B2FC9", "#2196F3", "#C4903A", "#10B981", "#F59E0B"];
  const color = colors[name.charCodeAt(0) % colors.length];
  const sz = size === "lg" ? "w-12 h-12 text-base" : size === "md" ? "w-10 h-10 text-sm" : "w-8 h-8 text-xs";
  return (
    <div className={`${sz} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ background: `${color}30`, border: `1.5px solid ${color}50`, color }}>
      {initials}
    </div>
  );
}

function ReviewCard({ review, isNew }: { review: Review; isNew?: boolean }) {
  const date = new Date(review.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-card rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden ${isNew ? "border-[#E91E8C]/30" : ""}`}
    >
      {isNew && (
        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E91E8C]/15 text-[#E91E8C] border border-[#E91E8C]/25">
          New
        </span>
      )}
      <Quote className="absolute bottom-3 right-4 w-8 h-8 text-white/4" />

      <div className="flex items-center gap-3">
        <Avatar name={review.name} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-white/90 text-sm truncate">{review.name}</p>
            <BadgeCheck className="w-3.5 h-3.5 text-[#2196F3] flex-shrink-0" title="Verified Customer" />
          </div>
          {review.product && <p className="text-white/35 text-xs">{review.product}</p>}
        </div>
      </div>

      <StarRating value={review.rating} size="sm" />

      <p className="text-white/60 text-sm leading-relaxed">{review.text}</p>

      <p className="text-white/25 text-xs mt-auto">{date}</p>
    </motion.div>
  );
}

function RatingSummary({ all }: { all: Review[] }) {
  const avg = all.reduce((s, r) => s + r.rating, 0) / (all.length || 1);
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: all.filter((r) => r.rating === star).length,
    pct: (all.filter((r) => r.rating === star).length / (all.length || 1)) * 100,
  }));

  return (
    <div className="glass-card rounded-3xl p-7 flex flex-col sm:flex-row items-center gap-8">
      <div className="text-center flex-shrink-0">
        <p className="text-6xl font-black text-white tracking-tighter">{avg.toFixed(1)}</p>
        <StarRating value={Math.round(avg)} size="md" />
        <p className="text-white/35 text-xs mt-2">{all.length} review{all.length !== 1 ? "s" : ""}</p>
        <div className="mt-3 flex items-center justify-center gap-1.5">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-4 opacity-40" />
          <span className="text-white/25 text-[10px]">style</span>
        </div>
      </div>
      <div className="flex-1 w-full space-y-2">
        {counts.map(({ star, count, pct }) => (
          <div key={star} className="flex items-center gap-2">
            <span className="text-white/35 text-xs w-2">{star}</span>
            <Star className="w-3 h-3 text-[#F59E0B] flex-shrink-0" fill="#F59E0B" strokeWidth={0} />
            <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-[#F59E0B]"
              />
            </div>
            <span className="text-white/30 text-xs w-4 text-right">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  const [saved, setSaved] = useState<Review[]>(loadSaved);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [product, setProduct] = useState("");
  const [ratingError, setRatingError] = useState(false);

  const all: Review[] = [
    ...saved.slice().reverse(),
    ...SEED_REVIEWS,
  ];

  const canSubmit = name.trim().length > 0 && rating > 0 && text.trim().length >= 10;

  const handleSubmit = () => {
    if (!canSubmit) {
      if (rating === 0) setRatingError(true);
      return;
    }
    const review: Review = {
      id: `u_${Date.now()}`,
      name: name.trim(),
      rating,
      text: text.trim(),
      product: product || undefined,
      date: new Date().toISOString().split("T")[0],
    };
    const updated = [...saved, review];
    setSaved(updated);
    save(updated);
    setNewIds((s) => new Set(s).add(review.id));
    setSubmitted(true);
    setName(""); setRating(0); setText(""); setProduct("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  useEffect(() => {
    if (submitted && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [submitted]);

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-12 pb-32 px-6 md:px-12">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#F59E0B] rounded-full blur-[220px] opacity-[0.03]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#E91E8C] rounded-full blur-[200px] opacity-[0.04]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center mb-12">
          <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/5 text-xs font-semibold text-[#F59E0B] uppercase tracking-widest">
            Customer Reviews
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            What Our Customers{" "}
            <span className="text-gradient-brand">Say</span>
          </h1>
          <p className="text-white/40 text-lg font-light max-w-xl mx-auto">
            Real reviews from real customers. Share your experience and help others find the perfect gift.
          </p>
        </motion.div>

        {/* Rating summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mb-10">
          <RatingSummary all={all} />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Reviews grid */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white/60 text-sm font-semibold uppercase tracking-wider">
                {all.length} Review{all.length !== 1 ? "s" : ""}
              </h2>
            </div>
            <motion.div layout className="columns-1 sm:columns-2 gap-4 space-y-4">
              {all.map((r) => (
                <div key={r.id} className="break-inside-avoid mb-4">
                  <ReviewCard review={r} isNew={newIds.has(r.id)} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Submit form — sticky on desktop */}
          <div className="lg:sticky lg:top-28" ref={formRef}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card rounded-3xl p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 260 }}
                    className="w-16 h-16 rounded-full bg-[#F59E0B]/15 border-2 border-[#F59E0B]/40 flex items-center justify-center mx-auto mb-5"
                  >
                    <Check className="w-7 h-7 text-[#F59E0B]" />
                  </motion.div>
                  <h3 className="text-white font-bold text-xl mb-2">Thank you!</h3>
                  <p className="text-white/40 text-sm">Your review has been posted. We appreciate your feedback! 🙏</p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card rounded-3xl p-7"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <MessageSquarePlus className="w-5 h-5 text-[#E91E8C]" />
                    <h2 className="text-white font-bold text-lg">Leave a Review</h2>
                  </div>

                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 block">
                        Your Name <span className="text-[#E91E8C]">*</span>
                      </label>
                      <input
                        type="text" value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Shrestha"
                        className="input-field"
                      />
                    </div>

                    {/* Star rating */}
                    <div>
                      <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 block">
                        Rating <span className="text-[#E91E8C]">*</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <StarRating
                          value={rating}
                          size="lg"
                          onChange={(v) => { setRating(v); setRatingError(false); }}
                        />
                        {rating > 0 && (
                          <span className="text-white/40 text-xs">
                            {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
                          </span>
                        )}
                      </div>
                      <AnimatePresence>
                        {ratingError && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                            className="text-red-400 text-xs mt-1.5">
                            Please select a star rating
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Product */}
                    <div>
                      <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 block">
                        Product <span className="text-white/20">(optional)</span>
                      </label>
                      <select value={product} onChange={(e) => setProduct(e.target.value)} className="input-field">
                        <option value="">Select a product…</option>
                        {PRODUCTS.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>

                    {/* Review text */}
                    <div>
                      <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 block">
                        Your Review <span className="text-[#E91E8C]">*</span>
                      </label>
                      <textarea
                        value={text} onChange={(e) => setText(e.target.value)}
                        rows={4} placeholder="Share your experience — quality, delivery, design…"
                        className="input-field resize-none"
                      />
                      <p className={`text-xs mt-1 text-right transition-colors ${text.length < 10 && text.length > 0 ? "text-red-400/60" : "text-white/20"}`}>
                        {text.length}/10 min
                      </p>
                    </div>

                    {/* Submit */}
                    <motion.button
                      whileHover={{ scale: canSubmit ? 1.02 : 1 }}
                      whileTap={{ scale: canSubmit ? 0.97 : 1 }}
                      onClick={handleSubmit}
                      className={`w-full h-12 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                        canSubmit
                          ? "bg-[#E91E8C] text-white hover:bg-[#c9166e] shadow-[0_0_20px_rgba(233,30,140,0.3)]"
                          : "bg-white/5 text-white/25 cursor-not-allowed"
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      Post Review
                    </motion.button>

                    <p className="text-white/20 text-[11px] text-center leading-tight">
                      Reviews are saved on your device and visible to everyone who visits this site on this device.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Verified badge */}
            <div className="mt-4 flex items-center justify-center gap-2 text-white/25 text-xs">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>All reviews are from verified customers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
