import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Phone, Package, Hash, Palette, FileText,
  ChevronRight, ChevronLeft, MessageCircle, Check, Sparkles, ArrowRight
} from "lucide-react";
import { fadeIn } from "../lib/animations";

const PRODUCTS = [
  "Custom Mug (Photo Print)",
  "Magic Mug (Color-Changing)",
  "Custom T-Shirt",
  "Canvas Print",
  "Photo Frame (with Print)",
  "Cushion Print",
  "Keychain (Acrylic/Metal)",
  "Birthday Card",
  "Business / Visiting Cards",
  "Banner / Flex Print",
  "Laptop Sleeve",
  "Tote Bag",
  "Sublimation Printing (Other)",
  "Logo Design",
  "Digital Branding Pack",
  "Other / Not Listed",
];

const OCCASIONS = [
  "Birthday 🎂", "Wedding 💍", "Anniversary 💕", "Graduation 🎓",
  "Corporate / Office", "Festival / Holiday", "Personal Use", "Other",
];

const BUDGETS = [
  "Under Rs. 500", "Rs. 500 – 1,000", "Rs. 1,000 – 5,000",
  "Rs. 5,000 – 10,000", "Rs. 10,000+", "Need a quote",
];

interface FormData {
  name: string;
  phone: string;
  product: string;
  qty: string;
  budget: string;
  occasion: string;
  colors: string;
  notes: string;
}

const initial: FormData = {
  name: "", phone: "", product: "", qty: "1",
  budget: "", occasion: "", colors: "", notes: "",
};

const STEP_LABELS = ["Your Details", "Product", "Design & Notes"];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

function buildMessage(f: FormData): string {
  return `🎨 *New Order Request — Lotus Print & Custom Gift*

👤 *Customer Details*
• Name: ${f.name}
• Phone: ${f.phone}

📦 *Order Details*
• Product: ${f.product}
• Quantity: ${f.qty}
• Budget: ${f.budget || "Not specified"}

🎯 *Design Details*
• Occasion: ${f.occasion || "Not specified"}
• Colour Preferences: ${f.colors || "No preference"}
• Notes / Instructions:
  ${f.notes || "—"}

_Please confirm the price and availability. I will send design files on WhatsApp. Thank you!_ 🙏`;
}

export default function Order() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormData, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const canNext = [
    form.name.trim().length > 0 && form.phone.trim().length >= 7,
    form.product.length > 0 && parseInt(form.qty) > 0,
    true,
  ];

  const handleSubmit = () => {
    const msg = buildMessage(form);
    window.open(`https://wa.me/9779848363025?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-3xl p-12 text-center max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260 }}
            className="w-20 h-20 rounded-full bg-[#25D366]/15 border-2 border-[#25D366]/40 flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-9 h-9 text-[#25D366]" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-3">Order Sent!</h2>
          <p className="text-white/45 text-sm mb-8 leading-relaxed">
            Your order details have been sent to our WhatsApp. We'll confirm the price and availability shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => { setForm(initial); setStep(0); setSubmitted(false); }}
              className="flex-1 h-11 rounded-2xl border border-white/10 text-white/60 text-sm font-medium hover:bg-white/5 transition-all"
            >
              Place Another Order
            </button>
            <button
              onClick={() => window.location.href = "/tracking"}
              className="flex-1 h-11 rounded-2xl bg-[#E91E8C] text-white text-sm font-semibold hover:bg-[#c9166e] transition-all"
            >
              Track Orders
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-12 pb-32 px-6 md:px-12">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#E91E8C] rounded-full blur-[220px] opacity-[0.04]" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-[#8B2FC9] rounded-full blur-[220px] opacity-[0.04]" />
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center mb-12">
          <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-[#E91E8C]/30 bg-[#E91E8C]/5 text-xs font-semibold text-[#E91E8C] uppercase tracking-widest">
            Place an Order
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Order via{" "}
            <span className="text-gradient-brand">WhatsApp</span>
          </h1>
          <p className="text-white/40 text-base font-light max-w-md mx-auto">
            Fill in your details and we'll open a pre-formatted WhatsApp message — ready to send instantly.
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEP_LABELS.map((label, i) => (
            <button
              key={i}
              onClick={() => canNext.slice(0, i).every(Boolean) && go(i)}
              className="flex items-center gap-2 group"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                  i < step
                    ? "bg-[#E91E8C] border-[#E91E8C] text-white"
                    : i === step
                    ? "border-[#E91E8C] text-[#E91E8C] bg-[#E91E8C]/10"
                    : "border-white/15 text-white/25"
                }`}
              >
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block transition-colors ${i === step ? "text-white/70" : i < step ? "text-white/50" : "text-white/20"}`}>
                {label}
              </span>
              {i < STEP_LABELS.length - 1 && (
                <div className={`w-8 h-px mx-1 transition-all ${i < step ? "bg-[#E91E8C]/60" : "bg-white/10"}`} />
              )}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div className="glass-card rounded-3xl p-7 md:p-9 overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            {step === 0 && (
              <motion.div key="step0" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                <h2 className="text-lg font-bold text-white mb-7 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#E91E8C]" /> Your Details
                </h2>
                <div className="space-y-5">
                  <Field icon={<User className="w-4 h-4" />} label="Full Name" required>
                    <input
                      type="text" value={form.name} onChange={(e) => set("name", e.target.value)}
                      placeholder="e.g. Ramesh Shrestha"
                      className="input-field"
                    />
                  </Field>
                  <Field icon={<Phone className="w-4 h-4" />} label="WhatsApp Number" required>
                    <input
                      type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                      placeholder="e.g. 9800000000"
                      className="input-field"
                    />
                  </Field>
                  <p className="text-white/25 text-xs pt-1">
                    We'll use this number to confirm your order on WhatsApp.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                <h2 className="text-lg font-bold text-white mb-7 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#8B2FC9]" /> Product & Quantity
                </h2>
                <div className="space-y-5">
                  <Field icon={<Package className="w-4 h-4" />} label="Product Type" required>
                    <select value={form.product} onChange={(e) => set("product", e.target.value)} className="input-field">
                      <option value="">Select a product…</option>
                      {PRODUCTS.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </Field>
                  <Field icon={<Hash className="w-4 h-4" />} label="Quantity" required>
                    <div className="flex items-center gap-3">
                      <button onClick={() => set("qty", String(Math.max(1, parseInt(form.qty) - 1)))}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 flex items-center justify-center text-lg font-bold transition-all">−</button>
                      <input type="number" min="1" value={form.qty} onChange={(e) => set("qty", e.target.value)}
                        className="flex-1 h-10 rounded-xl bg-white/5 border border-white/10 text-white text-center font-semibold focus:outline-none focus:border-[#8B2FC9]/50 transition-all" />
                      <button onClick={() => set("qty", String(parseInt(form.qty) + 1))}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 flex items-center justify-center text-lg font-bold transition-all">+</button>
                    </div>
                  </Field>
                  <Field icon={<Sparkles className="w-4 h-4" />} label="Budget Range">
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {BUDGETS.map((b) => (
                        <button key={b} onClick={() => set("budget", b)}
                          className={`h-9 rounded-xl text-xs font-medium border transition-all ${
                            form.budget === b
                              ? "bg-[#8B2FC9]/20 border-[#8B2FC9]/50 text-[#8B2FC9]"
                              : "bg-white/5 border-white/10 text-white/40 hover:bg-white/8 hover:text-white/60"
                          }`}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                <h2 className="text-lg font-bold text-white mb-7 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#2196F3]" /> Design & Notes
                </h2>
                <div className="space-y-5">
                  <Field icon={<Sparkles className="w-4 h-4" />} label="Occasion">
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {OCCASIONS.map((o) => (
                        <button key={o} onClick={() => set("occasion", o)}
                          className={`h-9 rounded-xl text-xs font-medium border transition-all ${
                            form.occasion === o
                              ? "bg-[#2196F3]/20 border-[#2196F3]/50 text-[#2196F3]"
                              : "bg-white/5 border-white/10 text-white/40 hover:bg-white/8 hover:text-white/60"
                          }`}>
                          {o}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field icon={<Palette className="w-4 h-4" />} label="Colour Preferences">
                    <input type="text" value={form.colors} onChange={(e) => set("colors", e.target.value)}
                      placeholder="e.g. Blue and white, or match my logo"
                      className="input-field" />
                  </Field>
                  <Field icon={<FileText className="w-4 h-4" />} label="Design Notes / Instructions">
                    <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)}
                      rows={4} placeholder="e.g. Add my name 'Ramesh' in bold, with a birthday cake image. I'll send the photo on WhatsApp."
                      className="input-field resize-none" />
                  </Field>
                  <p className="text-white/25 text-xs">
                    💡 You can send photos, logos, or design files directly after opening WhatsApp.
                  </p>
                </div>

                {/* Message preview */}
                <div className="mt-7 rounded-2xl bg-[#075E54]/10 border border-[#25D366]/15 p-4">
                  <p className="text-[#25D366]/60 text-[10px] uppercase tracking-widest font-semibold mb-3 flex items-center gap-1.5">
                    <MessageCircle className="w-3 h-3" /> WhatsApp Message Preview
                  </p>
                  <pre className="text-white/40 text-[11px] leading-relaxed whitespace-pre-wrap font-mono">
                    {buildMessage(form)}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
            <button
              onClick={() => go(step - 1)}
              className={`flex items-center gap-2 h-11 px-5 rounded-2xl border border-white/10 text-white/50 text-sm font-medium hover:bg-white/5 transition-all ${step === 0 ? "invisible" : ""}`}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {step < 2 ? (
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => canNext[step] && go(step + 1)}
                className={`flex items-center gap-2 h-11 px-7 rounded-2xl text-sm font-semibold transition-all ${
                  canNext[step]
                    ? "bg-[#E91E8C] text-white hover:bg-[#c9166e] shadow-[0_0_20px_rgba(233,30,140,0.3)]"
                    : "bg-white/5 text-white/25 cursor-not-allowed"
                }`}
              >
                Next <ChevronRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                className="flex items-center gap-2 h-11 px-7 rounded-2xl bg-[#25D366] text-white text-sm font-bold hover:bg-[#1da851] transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)]"
              >
                <MessageCircle className="w-4 h-4" />
                Send via WhatsApp
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Trust badges */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-5 mt-8 text-xs text-white/25">
          {["🔒 Your data stays private", "⚡ Instant WhatsApp confirmation", "🎁 5000+ happy customers"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Field({ icon, label, required, children }: {
  icon: React.ReactNode; label: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
        <span className="text-white/20">{icon}</span>
        {label}
        {required && <span className="text-[#E91E8C]">*</span>}
      </label>
      {children}
    </div>
  );
}
