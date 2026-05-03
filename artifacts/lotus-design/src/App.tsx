import { useEffect, useState, useRef, useCallback } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { 
  ArrowRight, Gift, Phone, MapPin, Instagram, Facebook, Camera, Star, 
  Clock, Heart, Award, ShieldCheck, Mail, CheckCircle2,
  Printer, Image as ImageIcon, Briefcase, Shirt, MonitorSmartphone,
  CreditCard, Building2, Smartphone, Copy, Check, X, AlertCircle, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const socialLinks = {
  facebook: "https://www.facebook.com/lotusdesign977",
  instagram: "https://www.instagram.com/lotusprint977",
  tiktok: "https://www.tiktok.com/@lotusdesign977",
};

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
);

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const statsData = [
  { value: 5000, suffix: "+", label: "Happy Customers", color: "#E91E8C" },
  { value: 12000, suffix: "+", label: "Products Delivered", color: "#8B2FC9" },
  { value: 100, suffix: "%", label: "Satisfaction Rate", color: "#2196F3" },
  { value: 4, suffix: "+", label: "Years in Business", color: "#C4903A" },
];

function StatItem({ value, suffix, label, color, delay }: { value: number; suffix: string; label: string; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCounter(value, 2200, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center px-6 relative group"
    >
      <span className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter tabular-nums" style={{ color }}>
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-white/50 text-base mt-3 font-light tracking-wide">{label}</span>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:hidden" />
    </motion.div>
  );
}

  const fadeIn = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  };

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const orderSteps = [
  {
    num: "01",
    title: "Choose Your Product",
    desc: "Browse our range of personalised products — mugs, frames, t-shirts, cushions, keychains, banners, and much more.",
    detail: "Not sure what to pick? Send us a message on WhatsApp and our team will suggest the perfect product for your occasion.",
    icon: <Gift className="w-8 h-8" />,
    color: "#E91E8C",
  },
  {
    num: "02",
    title: "Send Your Details",
    desc: "Share your photos, text, logos, or design ideas with us via WhatsApp. High-resolution images give the best print quality.",
    detail: "We accept images via WhatsApp, Google Drive, or direct file transfer. Our team will guide you through exactly what we need.",
    icon: <Smartphone className="w-8 h-8" />,
    color: "#8B2FC9",
  },
  {
    num: "03",
    title: "Review Your Mockup",
    desc: "We create a digital preview of your product before printing. You approve it, request changes, or give us the green light.",
    detail: "We won't print a single item without your final approval. Your satisfaction is guaranteed from the very first step.",
    icon: <CheckCircle2 className="w-8 h-8" />,
    color: "#2196F3",
  },
  {
    num: "04",
    title: "Receive Your Order",
    desc: "Your beautifully crafted product is delivered to your doorstep across Nepalgunj and Nepal — fast, safe, and packaged with care.",
    detail: "Local delivery is available in Nepalgunj. For orders outside the city, we ship via trusted courier services.",
    icon: <ArrowRight className="w-8 h-8" />,
    color: "#C4903A",
  },
];

function OrderStepPanel({
  step, idx, onActive,
}: {
  step: typeof orderSteps[0];
  idx: number;
  onActive: (idx: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-35% 0px -35% 0px" });
  useEffect(() => { if (inView) onActive(idx); }, [inView, idx, onActive]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-[65vh] flex items-center py-20 border-b border-white/5 last:border-0"
    >
      <div className="max-w-xl w-full">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
          style={{ background: `${step.color}1A`, color: step.color }}
        >
          {step.icon}
        </div>
        <div className="flex items-center gap-4 mb-5">
          <span className="text-5xl font-bold tabular-nums" style={{ color: step.color }}>{step.num}</span>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{step.title}</h3>
        </div>
        <p className="text-white/60 text-lg font-light leading-relaxed mb-6">{step.desc}</p>
        <p
          className="text-white/35 text-sm leading-relaxed border-l-2 pl-4 py-1"
          style={{ borderColor: step.color }}
        >
          {step.detail}
        </p>
      </div>
    </motion.div>
  );
}

function HowToOrderSection({ whatsappLink }: { whatsappLink: string }) {
  const [activeStep, setActiveStep] = useState(0);
  const handleActive = useCallback((idx: number) => setActiveStep(idx), []);
  return (
    <div className="pt-16 pb-24 lg:grid lg:grid-cols-[280px_1fr] lg:gap-20">
      {/* Sticky left — progress tracker */}
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

      {/* Scrollable step panels */}
      <div>
        {orderSteps.map((step, idx) => (
          <OrderStepPanel key={idx} step={step} idx={idx} onActive={handleActive} />
        ))}

        {/* Mobile CTA */}
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

function FaqItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors duration-300 bg-white/[0.03]"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-6 md:px-8 py-5 flex items-center justify-between gap-6 text-left"
        aria-expanded={open}
      >
        <span className="text-base md:text-lg font-semibold text-white/90">{q}</span>
        <motion.div
          animate={{
            rotate: open ? 45 : 0,
            backgroundColor: open ? "#E91E8C" : "rgba(255,255,255,0.05)",
            borderColor: open ? "#E91E8C" : "rgba(255,255,255,0.15)",
          }}
          transition={{ duration: 0.25 }}
          className="w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0"
          style={{ color: open ? "#000" : "#E91E8C" }}
        >
          <span className="text-xl leading-none font-light select-none">+</span>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 md:px-8 pb-6 text-white/50 leading-relaxed text-sm md:text-base border-t border-white/5 pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Mouse spotlight effect
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Simulate premium loading
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => {
      lenis.destroy();
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const whatsappLink = "https://wa.me/9779848363025?text=Hello%20Lotus%20Print%20%26%20Custom%20Gift,%20I%20would%20like%20to%20order%20a%20personalized%20gift.";

  const services = [
    { icon: <ImageIcon className="w-6 h-6" />, title: "Custom Photo Frames", desc: "Premium framing for your most cherished memories." },
    { icon: <Printer className="w-6 h-6" />, title: "Sublimation Printing", desc: "High-quality, long-lasting prints on various materials." },
    { icon: <Gift className="w-6 h-6" />, title: "Mug Printing", desc: "Personalized ceramic mugs for gifts or corporate branding." },
    { icon: <Shirt className="w-6 h-6" />, title: "T-Shirt Printing", desc: "Custom apparel with premium fabric and crisp prints." },
    { icon: <Briefcase className="w-6 h-6" />, title: "Visiting Cards", desc: "Luxury business cards with foil and embossing options." },
    { icon: <Award className="w-6 h-6" />, title: "Logo Design", desc: "Bespoke identity design for modern brands." },
    { icon: <MonitorSmartphone className="w-6 h-6" />, title: "Flex / Banner", desc: "Large format printing for events and advertising." },
    { icon: <Camera className="w-6 h-6" />, title: "Digital Branding", desc: "Cohesive visual systems for your digital presence." },
  ];

  const portfolio = [
    { id: 1, category: "frames", image: "/images/product-frame-1.png", title: "Wedding Portrait", aspect: "aspect-[4/3]", gradient: "from-[#C4903A]/40 via-[#8B2FC9]/20 to-[#0B0B0B]", icon: <ImageIcon className="w-16 h-16" /> },
    { id: 2, category: "mugs", image: "/images/product-mug-1.png", title: "Matte Black Mug", aspect: "aspect-square", gradient: "from-[#E91E8C]/40 via-[#8B2FC9]/20 to-[#0B0B0B]", icon: <Camera className="w-16 h-16" /> },
    { id: 3, category: "tshirts", image: "/images/product-tshirt-1.png", title: "Premium Cotton Tee", aspect: "aspect-[3/4]", gradient: "from-[#2196F3]/40 via-[#E91E8C]/20 to-[#0B0B0B]", icon: <Shirt className="w-16 h-16" /> },
    { id: 4, category: "branding", image: "/images/product-branding-1.png", title: "Luxury Business Cards", aspect: "aspect-square", gradient: "from-[#8B2FC9]/40 via-[#2196F3]/20 to-[#0B0B0B]", icon: <Briefcase className="w-16 h-16" /> },
    { id: 5, category: "frames", image: "/images/product-frame-2.png", title: "Minimalist Gold Frame", aspect: "aspect-[3/4]", gradient: "from-[#C4903A]/40 via-[#E91E8C]/20 to-[#0B0B0B]", icon: <ImageIcon className="w-16 h-16" /> },
    { id: 6, category: "mugs", image: "/images/product-mug-2.png", title: "Couple's Mugs", aspect: "aspect-square", gradient: "from-[#8B2FC9]/40 via-[#C4903A]/20 to-[#0B0B0B]", icon: <Camera className="w-16 h-16" /> },
    { id: 7, category: "tshirts", image: "/images/product-tshirt-2.png", title: "Boutique Apparel", aspect: "aspect-[3/4]", gradient: "from-[#E91E8C]/40 via-[#C4903A]/20 to-[#0B0B0B]", icon: <Shirt className="w-16 h-16" /> },
    { id: 8, category: "branding", image: "/images/product-branding-2.png", title: "Premium Packaging", aspect: "aspect-[16/9]", gradient: "from-[#2196F3]/40 via-[#8B2FC9]/20 to-[#0B0B0B]", icon: <Briefcase className="w-16 h-16" /> },
  ];

  const testimonials = [
    { name: "Aarav Sharma", role: "Wedding Client", location: "Nepalgunj", quote: "The frames we ordered for our wedding photos were beyond expectation. The quality and attention to detail are truly premium." },
    { name: "Priya Thapa", role: "Business Owner", location: "Banke", quote: "Lotus Print transformed our brand. The business cards and packaging design gave us the luxury feel we were looking for." },
    { name: "Nitesh Gurung", role: "Corporate Partner", location: "Nepalgunj", quote: "We order our corporate mugs and t-shirts exclusively from Lotus. Fast delivery, impeccable quality every single time." },
    { name: "Sunita Rana", role: "Birthday Gift", location: "Kohalpur", quote: "Ordered a magic mug for my husband's birthday. He absolutely loved it! The photo print quality was stunning and delivery was on time." },
    { name: "Roshan KC", role: "Anniversary Gift", location: "Nepalgunj", quote: "Got a beautiful canvas print of our couple photo. It now hangs proudly in our living room. I can't recommend Lotus enough!" },
    { name: "Kavita Sah", role: "School Event", location: "Banke", quote: "Ordered custom t-shirts for our school sports event. The team was so helpful, the colours were vibrant, and delivery was fast." },
  ];

  const [activeTab, setActiveTab] = useState("all");
  const filteredPortfolio = activeTab === "all" ? portfolio : portfolio.filter(p => p.category === activeTab);

  // Payment modal state
  const [paymentModal, setPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const bankDetails = {
    bank: "Rastriya Banijya Bank",
    accountName: "Lotus Print & Custom Gift",
    accountNumber: "4400100000060001",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (!menuOpen) { document.body.style.overflow = ""; return; }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => setShowBackToTop(v > 0.15));
  }, [scrollYProgress]);

  const paymentMethods = [
    {
      id: "esewa",
      name: "eSewa",
      tagline: "Pay instantly with eSewa",
      color: "#6DB54E",
      textColor: "#fff",
      icon: <Smartphone className="w-6 h-6" />,
      badge: "Most Popular",
      steps: [
        "Open your eSewa app",
        "Go to 'Send Money' or 'Pay'",
        "Enter our eSewa ID: 9848363025",
        "Enter the amount and confirm",
        "Screenshot the payment and send via WhatsApp",
      ],
      note: "eSewa ID: 9848363025",
    },
    {
      id: "khalti",
      name: "Khalti",
      tagline: "Pay with Khalti wallet",
      color: "#5C2D91",
      textColor: "#fff",
      icon: <Smartphone className="w-6 h-6" />,
      badge: "Fast & Secure",
      steps: [
        "Open your Khalti app",
        "Tap 'Send Money'",
        "Enter number: 9848363025",
        "Enter the amount and confirm",
        "Share the payment screenshot on WhatsApp",
      ],
      note: "Khalti number: 9848363025",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      tagline: "Direct bank / ConnectIPS transfer",
      color: "#8B2FC9",
      textColor: "#fff",
      icon: <Building2 className="w-6 h-6" />,
      badge: "All Banks",
      steps: [
        "Log in to your banking app or visit a branch",
        "Transfer to our account below",
        "Use 'Lotus Order' as the remark",
        "Send the transaction receipt via WhatsApp",
      ],
      note: null,
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      tagline: "Pay when you receive your order",
      color: "#fff",
      textColor: "#000",
      icon: <CreditCard className="w-6 h-6" />,
      badge: "No Advance",
      steps: [
        "Place your order via WhatsApp",
        "We confirm and prepare your item",
        "Pay cash upon delivery",
        "Available within Nepalgunj & nearby areas",
      ],
      note: "Available locally in Nepalgunj, Banke",
    },
  ];

  return (
    <div ref={containerRef} className="relative bg-[#0B0B0B] min-h-screen text-white font-sans overflow-hidden selection:bg-[#E91E8C] selection:text-black">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[70] origin-left"
        style={{ scaleX, background: "linear-gradient(90deg, #E91E8C, #8B2FC9, #2196F3)" }}
      />

      <div className="mouse-spotlight hidden md:block pointer-events-none" />

      {/* Announcement Banner */}
      <AnimatePresence>
        {announcementVisible && (
          <motion.div
            initial={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-30 overflow-hidden border-b border-[#E91E8C]/20"
            style={{ background: "linear-gradient(90deg, rgba(233,30,140,0.08), rgba(139,47,201,0.08), rgba(33,150,243,0.08))" }}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-2.5 flex items-center justify-between gap-4">
              <div className="flex-1 text-center text-sm text-white/75 leading-tight">
                <span className="text-[#E91E8C] font-semibold">🎉 Festival Offer:</span>{" "}
                Special discounts on bulk orders this season!{" "}
                <button
                  onClick={() => window.open(whatsappLink, "_blank")}
                  className="text-[#E91E8C] font-semibold hover:underline ml-1"
                >
                  Claim Now →
                </button>
              </div>
              <button
                onClick={() => setAnnouncementVisible(false)}
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-white/30 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0B0B]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <motion.img
                src="/images/logo.png"
                alt="Lotus Print & Custom Gift"
                className="h-28 md:h-36 w-auto object-contain drop-shadow-[0_0_30px_rgba(233,30,140,0.4)]"
              />
              <motion.div 
                className="h-[1px] bg-gradient-to-r from-transparent via-[#E91E8C] to-transparent mt-6"
                initial={{ width: 0 }}
                animate={{ width: "220px" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-5 md:px-12 flex justify-between items-center">
        <img src="/images/logo.png" alt="Lotus Print & Custom Gift" className="h-10 w-auto object-contain" />
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#payment" className="hover:text-white transition-colors">Payment</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => window.open(whatsappLink, '_blank')}
            className="hidden md:flex bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-6 transition-all"
          >
            Let's Talk
          </Button>
          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors rounded-xl bg-white/5 border border-white/10"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 bottom-0 w-[82%] max-w-sm bg-[#0D0D0D] border-l border-white/10 flex flex-col p-8 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-10">
                <img src="/images/logo.png" alt="Lotus Print" className="h-9 w-auto object-contain" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1 flex-1">
                {[
                  { href: "#about", label: "About Us" },
                  { href: "#services", label: "Services" },
                  { href: "#portfolio", label: "Portfolio" },
                  { href: "#payment", label: "Payment" },
                  { href: "#contact", label: "Contact" },
                ].map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
                    className="text-xl font-semibold text-white/60 hover:text-white py-4 border-b border-white/5 flex items-center justify-between group transition-colors"
                  >
                    {link.label}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </motion.a>
                ))}
              </nav>

              {/* Bottom actions */}
              <div className="pt-8 space-y-3">
                <Button
                  onClick={() => { setMenuOpen(false); window.open(whatsappLink, "_blank"); }}
                  className="w-full h-13 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-base py-3.5 shadow-[0_0_20px_rgba(37,211,102,0.2)]"
                >
                  Chat on WhatsApp
                </Button>
                <div className="flex justify-center gap-4 pt-2">
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#1877F2] hover:border-[#1877F2]/30 transition-all">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#E91E8C] hover:border-[#E91E8C]/30 transition-all">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all">
                    <TikTokIcon className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-center text-white/20 text-xs pt-1">Nepalgunj, Banke, Nepal</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 md:px-12 overflow-hidden">
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 300]) }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/images/hero-bg.png" 
            alt="Dark luxury mesh background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/40 via-transparent to-[#0B0B0B]" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#E91E8C]/30 bg-[#E91E8C]/5 backdrop-blur-md"
          >
            <span className="text-xs md:text-sm font-medium text-[#E91E8C] uppercase tracking-wider">Premium Craft Studio · Nepalgunj, Banke</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8"
          >
            We Create Gifts That <br />
            <span className="text-gradient-brand italic font-serif pr-4">Leave Memories.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.6 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mb-12 font-light"
          >
            Photo Frames · T-Shirts · Cups · Printing & Branding
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Button 
              onClick={() => window.open(whatsappLink, '_blank')}
              className="h-14 px-8 bg-[#E91E8C] hover:bg-[#c9166e] text-white text-lg rounded-full font-semibold transition-all hover:scale-105 shadow-[0_0_30px_rgba(233,30,140,0.35)]"
            >
              Order Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-14 px-8 bg-transparent hover:bg-white/5 border-white/20 text-white text-lg rounded-full font-medium transition-all"
            >
              View Portfolio
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 md:px-12 relative z-10 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              A luxury atelier where <br />
              <span className="text-gradient-brand italic font-serif">memories are treated like fine art.</span>
            </motion.h2>
            <motion.div variants={fadeIn} className="space-y-6 text-lg text-white/60 font-light">
              <p>
                Lotus Print & Custom Gift is not just a print shop. We are a boutique craft studio dedicated to turning ordinary photos and ideas into heirloom-grade keepsakes.
              </p>
              <p>
                Every piece we create is personal, intentional, and meticulously crafted. Whether it's a framed wedding portrait, custom apparel, or premium digital branding, we treat your memories with the respect they deserve.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="mt-12 flex gap-8">
              <div>
                <h4 className="text-3xl font-bold text-[#E91E8C] mb-2">5+</h4>
                <p className="text-sm text-white/50 uppercase tracking-wider">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-[#E91E8C] mb-2">10k+</h4>
                <p className="text-sm text-white/50 uppercase tracking-wider">Happy Clients</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
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
            {/* Decorative element */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#E91E8C] rounded-full filter blur-[100px] opacity-20 pointer-events-none" />
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

      {/* Services Showcase */}
      <section id="services" className="py-32 px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Our Services</h2>
            <p className="text-xl text-white/50 font-light max-w-2xl mx-auto">Meticulous craftsmanship across a spectrum of personalized products and professional branding.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
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
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section id="portfolio" className="py-32 px-6 md:px-12 relative z-10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Selected Works</h2>
              <p className="text-xl text-white/50 font-light max-w-xl">A glimpse into our crafted pieces, where every detail is considered.</p>
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
              {filteredPortfolio.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`group relative rounded-2xl overflow-hidden ${item.aspect} cursor-pointer`}
                >
                  {/* Gradient background — always visible */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                  {/* Subtle grid pattern overlay */}
                  <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "14px 14px" }} />
                  {/* Icon watermark */}
                  <div className="absolute inset-0 flex items-center justify-center text-white/10 group-hover:text-white/15 transition-colors duration-500 scale-125">
                    {item.icon}
                  </div>
                  {/* Real image — hides on error */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Info revealed on hover */}
                  <div className="absolute bottom-0 left-0 p-6 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-xs font-semibold text-[#E91E8C] uppercase tracking-wider mb-2 block">{item.category}</span>
                    <h3 className="text-xl font-bold text-white leading-tight">{item.title}</h3>
                  </div>
                  {/* Corner badge */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-[#E91E8C] flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Work Reel */}
      {(() => {
        const reelRow1 = [
          { name: "Photo Mug", cat: "Drinkware", tag: "Best Seller", gradient: "from-[#E91E8C] to-[#8B2FC9]", icon: <Camera className="w-7 h-7" /> },
          { name: "Custom T-Shirt", cat: "Apparel", tag: "Fan Favourite", gradient: "from-[#8B2FC9] to-[#2196F3]", icon: <Shirt className="w-7 h-7" /> },
          { name: "Canvas Print", cat: "Wall Art", tag: "Premium", gradient: "from-[#2196F3] to-[#E91E8C]", icon: <ImageIcon className="w-7 h-7" /> },
          { name: "Gift Hamper", cat: "Gifting", tag: "New", gradient: "from-[#E91E8C] to-[#ff6b6b]", icon: <Gift className="w-7 h-7" /> },
          { name: "Photo Frame", cat: "Décor", tag: "Top Rated", gradient: "from-[#C4903A] to-[#E91E8C]", icon: <ImageIcon className="w-7 h-7" /> },
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
          { name: "Sticker Pack", cat: "Branding", tag: "Fun", gradient: "from-[#2196F3] to-[#E91E8C]", icon: <Smartphone className="w-7 h-7" /> },
        ];
        const ReelCard = ({ item }: { item: typeof reelRow1[0] }) => (
          <div className="flex-shrink-0 w-52 h-64 mx-3 rounded-2xl overflow-hidden relative group cursor-pointer select-none">
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80`} />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 h-full flex flex-col justify-between p-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest bg-white/20 text-white rounded-full px-3 py-1 backdrop-blur-sm">
                  {item.tag}
                </span>
              </div>
              <div>
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <p className="text-white/70 text-xs uppercase tracking-widest mb-1">{item.cat}</p>
                <h3 className="text-white font-bold text-lg leading-tight">{item.name}</h3>
              </div>
            </div>
          </div>
        );
        return (
          <section className="py-24 relative z-10 bg-[#080808] border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-14">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4"
              >
                <div>
                  <p className="text-[#E91E8C] text-sm font-semibold uppercase tracking-widest mb-3">What We Make</p>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight">From Our Studio</h2>
                </div>
                <p className="text-white/40 text-lg max-w-sm font-light">Every product is made with care, precision, and a personal touch.</p>
              </motion.div>
            </div>

            <div className="space-y-5 reel-track">
              {/* Row 1 — scrolls left */}
              <div className="overflow-hidden">
                <div className="flex animate-marquee-left w-max">
                  {[...reelRow1, ...reelRow1].map((item, i) => <ReelCard key={i} item={item} />)}
                </div>
              </div>
              {/* Row 2 — scrolls right */}
              <div className="overflow-hidden">
                <div className="flex animate-marquee-right w-max">
                  {[...reelRow2, ...reelRow2].map((item, i) => <ReelCard key={i} item={item} />)}
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-14 text-center">
              <Button
                onClick={() => window.open(whatsappLink, '_blank')}
                className="h-14 px-10 bg-transparent border border-white/20 text-white hover:bg-white/5 rounded-full text-base font-semibold transition-all"
              >
                Order Any of These <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </section>
        );
      })()}

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
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`glass-card rounded-2xl p-8 bg-gradient-to-b ${item.grad} group hover:border-white/20 transition-colors`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#E91E8C] mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Order — sticky progress */}
      <section className="relative z-10 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Section header */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="py-24 pb-0"
          >
            <p className="text-[#E91E8C] text-sm font-semibold uppercase tracking-widest mb-4">Simple Process</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-xl">How to Order in 4 Easy Steps</h2>
          </motion.div>

          <HowToOrderSection whatsappLink={whatsappLink} />
        </div>
      </section>

      {/* Payment Methods Section */}
      <section id="payment" className="py-32 px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-20"
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#E91E8C]/30 bg-[#E91E8C]/5 text-xs font-medium text-[#E91E8C] uppercase tracking-wider">
              Secure Payments
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Pay Your Way</h2>
            <p className="text-xl text-white/50 font-light max-w-2xl mx-auto">
              We support all major payment methods trusted by customers across Nepal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method, idx) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.18 } }}
                onClick={() => { setSelectedPayment(method.id); setPaymentModal(true); }}
                className="glass-card p-8 rounded-3xl cursor-pointer group relative overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full filter blur-[60px] opacity-0 group-hover:opacity-18 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: method.color }}
                />
                <div className="flex justify-between items-start mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                    style={{ backgroundColor: method.color, color: method.textColor }}
                  >
                    {method.icon}
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/50 font-medium">
                    {method.badge}
                  </span>
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 glass-card rounded-3xl p-8 border border-[#E91E8C]/20"
          >
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
                  <button
                    onClick={() => copyToClipboard(bankDetails.accountNumber)}
                    className="ml-2 p-2 rounded-lg bg-white/5 hover:bg-[#E91E8C]/20 transition-colors text-white/50 hover:text-[#E91E8C]"
                    title="Copy account number"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Payment Modal */}
      <AnimatePresence>
        {paymentModal && selectedPayment && (() => {
          const method = paymentMethods.find(m => m.id === selectedPayment)!;
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full filter blur-[100px] opacity-10 pointer-events-none"
                  style={{ backgroundColor: method.color }}
                />
                <button
                  onClick={() => setPaymentModal(false)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: method.color, color: method.textColor }}
                  >
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
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: method.color, color: method.textColor }}
                      >
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
                        <button
                          onClick={() => copyToClipboard(bankDetails.accountNumber)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#E91E8C]/20 transition-colors text-white/50 hover:text-[#E91E8C]"
                        >
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
                  onClick={() => { setPaymentModal(false); window.open(whatsappLink, '_blank'); }}
                  className="w-full h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(37,211,102,0.2)]"
                >
                  Confirm via WhatsApp
                </Button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Testimonials */}
      <section className="py-32 px-6 md:px-12 relative z-10 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#E91E8C] rounded-full blur-[160px] opacity-[0.04]" />
          <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-[#8B2FC9] rounded-full blur-[160px] opacity-[0.04]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-14"
          >
            <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-[#E91E8C]/30 bg-[#E91E8C]/5 text-xs font-semibold text-[#E91E8C] uppercase tracking-widest">
              Customer Reviews
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Words of Trust</h2>
            <p className="text-xl text-white/40 font-light max-w-2xl mx-auto">Real customers, real experiences — straight from Nepalgunj and across Nepal.</p>
          </motion.div>

          {/* Google rating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-14"
          >
            <div className="inline-flex items-center gap-4 glass-card rounded-full px-6 py-3 border border-[#E91E8C]/20">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4" fill="#FBBC04" stroke="#FBBC04" />
                ))}
              </div>
              <span className="text-white font-bold text-lg">4.9</span>
              <div className="w-px h-5 bg-white/15" />
              <span className="text-white/50 text-sm">Highly Rated · 500+ Reviews</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card p-7 rounded-2xl relative flex flex-col hover:border-white/20 transition-colors duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4" fill="#FBBC04" stroke="#FBBC04" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base text-white/75 leading-relaxed mb-6 italic font-serif flex-1">
                  "{test.quote}"
                </p>

                {/* Author + verified badge */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-base text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, #E91E8C, #8B2FC9)` }}>
                      {test.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{test.name}</h4>
                      <p className="text-xs text-white/40">{test.role} · {test.location}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#E91E8C]/10 text-[#E91E8C] border border-[#E91E8C]/20 uppercase tracking-wider flex-shrink-0">
                    ✓ Verified
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Occasions */}
      {(() => {
        const occasions = [
          {
            emoji: "🎂",
            title: "Birthdays",
            subtitle: "Make their day unforgettable",
            gradient: "from-[#E91E8C]/20 via-[#8B2FC9]/10 to-transparent",
            border: "border-[#E91E8C]/20 hover:border-[#E91E8C]/50",
            glow: "rgba(233,30,140,0.15)",
            color: "#E91E8C",
            products: ["Photo Mug", "Cushion Print", "Birthday Card", "Photo Frame", "Keychain", "Magic Mug"],
            msg: "Hello! I need a birthday gift — can you help me pick something special?",
          },
          {
            emoji: "💍",
            title: "Weddings",
            subtitle: "Gifts as timeless as your love",
            gradient: "from-[#C4903A]/20 via-[#8B2FC9]/10 to-transparent",
            border: "border-[#C4903A]/20 hover:border-[#C4903A]/50",
            glow: "rgba(196,144,58,0.15)",
            color: "#C4903A",
            products: ["Couple Photo Frame", "Canvas Print", "Custom Pillow", "Memory Book", "Engraved Keychain", "Couple Mugs"],
            msg: "Hello! I'm looking for a wedding gift. Can you suggest some personalised options?",
          },
          {
            emoji: "❤️",
            title: "Anniversaries",
            subtitle: "Celebrate every milestone in style",
            gradient: "from-[#8B2FC9]/20 via-[#E91E8C]/10 to-transparent",
            border: "border-[#8B2FC9]/20 hover:border-[#8B2FC9]/50",
            glow: "rgba(139,47,201,0.15)",
            color: "#8B2FC9",
            products: ["Canvas Print", "Couple Frame", "Love Keychain", "Photo Book", "Custom T-Shirt", "Heart Cushion"],
            msg: "Hello! I need an anniversary gift idea. Can you help me create something special?",
          },
          {
            emoji: "🏢",
            title: "Corporate",
            subtitle: "Brand gifts that leave an impression",
            gradient: "from-[#2196F3]/20 via-[#8B2FC9]/10 to-transparent",
            border: "border-[#2196F3]/20 hover:border-[#2196F3]/50",
            glow: "rgba(33,150,243,0.15)",
            color: "#2196F3",
            products: ["Business Cards", "Branded Mugs", "Logo T-Shirts", "Event Banners", "Desk Plaque", "Branded Stickers"],
            msg: "Hello! I need corporate branded gifts for our company. Can we discuss bulk order options?",
          },
        ];
        return (
          <section className="py-32 px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#0A0A0A] overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E91E8C] rounded-full blur-[160px] opacity-[0.03]" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2196F3] rounded-full blur-[160px] opacity-[0.03]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              {/* Header */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="text-center mb-20"
              >
                <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-[#E91E8C]/30 bg-[#E91E8C]/5 text-xs font-semibold text-[#E91E8C] uppercase tracking-widest">
                  Perfect For Every Occasion
                </span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Gifts for Every Moment</h2>
                <p className="text-xl text-white/40 font-light max-w-2xl mx-auto">
                  Whatever the celebration, we have the perfect personalised gift to make it truly memorable.
                </p>
              </motion.div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {occasions.map((occ, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => window.open(`https://wa.me/9779848363025?text=${encodeURIComponent(occ.msg)}`, "_blank")}
                    whileHover={{ y: -6 }}
                    className={`group relative rounded-3xl border bg-gradient-to-br ${occ.gradient} ${occ.border} p-8 md:p-10 cursor-pointer transition-all duration-300 overflow-hidden`}
                    style={{ boxShadow: `0 0 0 0 ${occ.glow}` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 60px ${occ.glow}` }}
                    />

                    <div className="relative z-10">
                      {/* Top row */}
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <span className="text-5xl mb-4 block">{occ.emoji}</span>
                          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{occ.title}</h3>
                          <p className="text-white/50 text-sm font-light">{occ.subtitle}</p>
                        </div>
                        <motion.div
                          className="w-11 h-11 rounded-full border flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-300"
                          style={{ borderColor: occ.color, color: occ.color }}
                          whileHover={{ rotate: 45 }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>

                      {/* Product tags */}
                      <div className="flex flex-wrap gap-2">
                        {occ.products.map((p, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 group-hover:border-white/20 group-hover:text-white/80 transition-all duration-300"
                          >
                            {p}
                          </span>
                        ))}
                      </div>

                      {/* CTA line */}
                      <div className="mt-8 flex items-center gap-2 text-sm font-semibold" style={{ color: occ.color }}>
                        <span>Order via WhatsApp</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom note */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center text-white/30 text-sm mt-12"
              >
                Bulk orders available for weddings &amp; corporate events · Same-day consultation on WhatsApp
              </motion.p>
            </div>
          </section>
        );
      })()}

      {/* Pricing Guide */}
      {(() => {
        const pricingItems = [
          { icon: <Camera className="w-5 h-5" />, name: "Photo Mug", price: "350", unit: "per piece", note: "11oz ceramic", tag: null, color: "#E91E8C" },
          { icon: <Camera className="w-5 h-5" />, name: "Magic Mug", price: "500", unit: "per piece", note: "Color-changing", tag: "Popular", color: "#8B2FC9" },
          { icon: <Shirt className="w-5 h-5" />, name: "Custom T-Shirt", price: "450", unit: "per piece", note: "DTF/screen print", tag: "Best Seller", color: "#2196F3" },
          { icon: <ImageIcon className="w-5 h-5" />, name: "Canvas Print", price: "800", unit: "per piece", note: "12×16 inch", tag: null, color: "#E91E8C" },
          { icon: <ImageIcon className="w-5 h-5" />, name: "Photo Frame", price: "300", unit: "per piece", note: "With print", tag: null, color: "#C4903A" },
          { icon: <Heart className="w-5 h-5" />, name: "Cushion Print", price: "600", unit: "per piece", note: "12×12 inch", tag: null, color: "#8B2FC9" },
          { icon: <Star className="w-5 h-5" />, name: "Keychain", price: "150", unit: "per piece", note: "Acrylic/metal", tag: "Great Gift", color: "#2196F3" },
          { icon: <Gift className="w-5 h-5" />, name: "Birthday Card", price: "100", unit: "per piece", note: "Custom design", tag: null, color: "#E91E8C" },
          { icon: <Briefcase className="w-5 h-5" />, name: "Business Cards", price: "500", unit: "per 100 pcs", note: "Glossy / matte", tag: "Bulk Discount", color: "#C4903A" },
          { icon: <Printer className="w-5 h-5" />, name: "Banner Print", price: "200", unit: "per sq.ft", note: "Flex / vinyl", tag: null, color: "#8B2FC9" },
          { icon: <MonitorSmartphone className="w-5 h-5" />, name: "Laptop Sleeve", price: "700", unit: "per piece", note: "Custom printed", tag: null, color: "#2196F3" },
          { icon: <Gift className="w-5 h-5" />, name: "Tote Bag", price: "350", unit: "per piece", note: "Printed canvas", tag: "Eco-Friendly", color: "#E91E8C" },
        ];
        return (
          <section className="py-32 px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#0B0B0B] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#8B2FC9] rounded-full blur-[160px] opacity-[0.04]" />
              <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-[#E91E8C] rounded-full blur-[160px] opacity-[0.04]" />
            </div>
            <div className="max-w-7xl mx-auto relative z-10">
              {/* Header */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="text-center mb-20"
              >
                <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-[#8B2FC9]/30 bg-[#8B2FC9]/5 text-xs font-semibold text-[#8B2FC9] uppercase tracking-widest">
                  Transparent Pricing
                </span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Starting Prices</h2>
                <p className="text-xl text-white/40 font-light max-w-2xl mx-auto">
                  All prices are in Nepali Rupees (NPR) and start from the amounts shown. Final price depends on design complexity, quantity, and customisation.
                </p>
              </motion.div>

              {/* Pricing grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {pricingItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative glass-card rounded-2xl p-5 hover:border-white/20 transition-all duration-300 cursor-default overflow-hidden"
                  >
                    {/* Tag badge */}
                    {item.tag && (
                      <span
                        className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: `${item.color}22`, color: item.color }}
                      >
                        {item.tag}
                      </span>
                    )}

                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${item.color}18`, color: item.color }}
                    >
                      {item.icon}
                    </div>

                    {/* Name */}
                    <p className="text-sm font-semibold text-white/80 mb-3 leading-tight">{item.name}</p>

                    {/* Price */}
                    <div className="flex items-baseline gap-1">
                      <span className="text-white/40 text-xs">Rs.</span>
                      <span className="text-2xl font-bold tracking-tight" style={{ color: item.color }}>{item.price}</span>
                      <span className="text-white/30 text-[11px]">+</span>
                    </div>
                    <p className="text-white/30 text-[11px] mt-0.5">{item.unit}</p>

                    {/* Note */}
                    <p className="text-white/25 text-[11px] mt-2 border-t border-white/5 pt-2">{item.note}</p>
                  </motion.div>
                ))}
              </div>

              {/* Disclaimer + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 glass-card rounded-2xl px-8 py-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#E91E8C]/10 flex items-center justify-center text-[#E91E8C] flex-shrink-0 mt-0.5">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white/80 font-medium mb-1">Need a custom quote?</p>
                    <p className="text-white/40 text-sm">Prices vary by quantity, material &amp; design. Bulk orders get special discounts. Send us your requirements and we'll give you an exact price — no hidden fees.</p>
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
        );
      })()}

      {/* FAQ Section */}
      <section className="py-32 px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#E91E8C] rounded-full blur-[160px] opacity-[0.03]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#2196F3] rounded-full blur-[160px] opacity-[0.03]" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-[#2196F3]/30 bg-[#2196F3]/5 text-xs font-semibold text-[#2196F3] uppercase tracking-widest">
              Frequently Asked Questions
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Everything You Need to Know</h2>
            <p className="text-xl text-white/40 font-light max-w-2xl mx-auto">
              Quick answers to the questions customers ask most before placing an order.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-3">
            {[
              { q: "How long does delivery take?", a: "Most orders are ready within 1–3 days depending on quantity and complexity. Urgent orders can often be accommodated — just let us know your deadline on WhatsApp." },
              { q: "Can I send my own design or photo?", a: "Absolutely! Send your photo, logo, text, or any reference image on WhatsApp and we’ll handle everything. Higher resolution images give the best print quality." },
              { q: "Do you do bulk and corporate orders?", a: "Yes — we specialise in bulk orders for weddings, offices, schools, festivals, and corporate events. Special pricing applies for quantities above 10 pieces." },
              { q: "What file formats do you accept?", a: "We accept JPG, PNG, PDF, and vector files (AI, SVG, EPS). Even a high-quality phone photo works — we’ll advise you on what’s best." },
              { q: "Can I pay on delivery?", a: "Cash on Delivery is available for customers in Nepalgunj and nearby areas. We also accept eSewa, Khalti, and direct bank transfer for all locations." },
              { q: "Do I get a preview before printing?", a: "Yes — we always send you a digital mockup before printing. We won’t proceed until you’ve approved the design and are completely happy with it." },
              { q: "Do you deliver outside Nepalgunj?", a: "Yes! We ship across Nepal via trusted courier services. Delivery outside Nepalgunj typically takes 3–7 days depending on your location." },
            ].map((item, idx) => (
              <FaqItem key={idx} q={item.q} a={item.a} idx={idx} />
            ))}
          </div>

          {/* Still have a question? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-white/35 mb-5 text-sm">Still have a question? We’re just a message away.</p>
            <Button
              onClick={() => window.open(whatsappLink, "_blank")}
              className="h-12 px-8 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-semibold shadow-[0_0_20px_rgba(37,211,102,0.2)] transition-all"
            >
              Ask on WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/10 p-1 md:p-2">
            <div className="bg-[#0A0A0A] rounded-[2rem] p-10 md:p-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E91E8C] rounded-full filter blur-[150px] opacity-5 pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Let's Create <br/>Something Special.</h2>
                  <p className="text-xl text-white/50 font-light mb-12">Ready to order or have a custom request? Send us a message on WhatsApp for the fastest response.</p>
                  
                  <div className="space-y-6 mb-12">
                    <a href="tel:+9779848363025" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors">
                      <Phone className="w-6 h-6 text-[#E91E8C]" />
                      <span className="text-lg">+977 9848363025</span>
                    </a>
                    <div className="flex items-center gap-4 text-white/80">
                      <MapPin className="w-6 h-6 text-[#E91E8C] shrink-0" />
                      <span className="text-lg">Nepalgunj, Ranjha Airport, Banke, Nepal</span>
                    </div>
                    <a href="mailto:lotusdesign977@gmail.com" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors">
                      <Mail className="w-6 h-6 text-[#E91E8C]" />
                      <span className="text-lg">lotusdesign977@gmail.com</span>
                    </a>
                  </div>

                  <Button 
                    onClick={() => window.open(whatsappLink, '_blank')}
                    className="h-16 px-10 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xl rounded-full font-bold transition-all shadow-[0_0_30px_rgba(37,211,102,0.2)]"
                  >
                    Chat on WhatsApp
                  </Button>

                  <div className="flex items-center gap-4 mt-10">
                    <span className="text-white/30 text-sm uppercase tracking-widest">Follow Us</span>
                    <div className="flex gap-3">
                      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all hover:scale-110" title="Facebook">
                        <Facebook className="w-5 h-5" />
                      </a>
                      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#E91E8C] hover:text-white hover:border-[#E91E8C] transition-all hover:scale-110" title="Instagram">
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white hover:text-black hover:border-white transition-all hover:scale-110" title="TikTok">
                        <TikTokIcon className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="h-full min-h-[300px] rounded-2xl overflow-hidden border border-white/10"
                >
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src="https://www.openstreetmap.org/export/embed.html?bbox=81.6571%2C28.0936%2C81.6771%2C28.1136&amp;layer=mapnik&amp;marker=28.1036%2C81.6671" 
                    className="grayscale contrast-125 brightness-75 invert filter"
                  ></iframe>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/10 bg-[#050505] relative z-10 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <img src="/images/logo.png" alt="Lotus Print & Custom Gift" className="h-14 w-auto object-contain" />
          
          <div className="text-white/40 text-sm">
            © {new Date().getFullYear()} Lotus Print &amp; Custom Gift. All rights reserved.
          </div>

          <div className="flex gap-3">
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all hover:scale-110" title="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E91E8C] hover:border-[#E91E8C] transition-all hover:scale-110" title="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all hover:scale-110" title="TikTok">
              <TikTokIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Live WhatsApp Chat Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.open(whatsappLink, "_blank", "noopener,noreferrer")}
        className="wa-fab fixed bottom-6 right-6 z-[300] w-auto h-16 px-5 rounded-full bg-[#25D366] flex items-center gap-3 shadow-[0_4px_24px_rgba(37,211,102,0.45)] cursor-pointer group"
        title="Chat on WhatsApp"
      >
        <span className="relative flex items-center justify-center w-8 h-8">
          <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.002 3C9.373 3 4 8.373 4 15.002c0 2.14.565 4.243 1.637 6.09L4 29l8.11-1.61A12.93 12.93 0 0 0 16.002 28C22.63 28 28 22.63 28 16.002 28 9.373 22.63 3 16.002 3zm0 2c5.523 0 10 4.477 10 10.002C26.002 20.525 21.524 26 16.002 26a10.93 10.93 0 0 1-5.49-1.48l-.394-.23-4.81.956.977-4.71-.257-.408A9.956 9.956 0 0 1 4.998 15c0-5.523 4.48-10 10.004-10zm-3.14 5.5c-.21 0-.547.079-.835.394-.287.315-1.097 1.073-1.097 2.616s1.123 3.033 1.28 3.243c.157.21 2.186 3.474 5.367 4.734 2.664 1.06 3.208.847 3.784.795.577-.052 1.863-.76 2.125-1.494.264-.734.264-1.363.184-1.494-.078-.131-.288-.21-.603-.368-.315-.158-1.863-.92-2.152-1.024-.289-.104-.5-.157-.71.158-.21.314-.813 1.023-.997 1.233-.184.21-.368.236-.683.079-.315-.158-1.33-.49-2.534-1.563-.937-.836-1.57-1.867-1.753-2.182-.184-.315-.02-.486.138-.643.14-.14.315-.367.472-.55.158-.184.21-.315.315-.525.105-.21.052-.394-.026-.552-.079-.157-.697-1.71-.96-2.34-.236-.576-.49-.498-.683-.507l-.632-.011z"/>
          </svg>
          <span className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-white animate-pulse" />
        </span>
        <span className="hidden sm:inline text-white font-semibold tracking-wide whitespace-nowrap">Live Chat</span>
        <span className="absolute right-[5.25rem] bg-[#111] text-white text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 shadow-lg border border-white/10 transition-opacity duration-200">
          Chat with Lotus now
        </span>
      </motion.button>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-[300] w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            title="Back to top"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;