import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  ArrowRight, Gift, Phone, MapPin, Instagram, Facebook, Camera, Star, 
  Clock, Heart, Award, ShieldCheck, Mail, CheckCircle2,
  Printer, Image as ImageIcon, Briefcase, Shirt, MonitorSmartphone,
  CreditCard, Building2, Smartphone, Copy, Check, X, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

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
    { id: 1, category: "frames", image: "/images/product-frame-1.png", title: "Wedding Portrait", aspect: "aspect-[4/3]" },
    { id: 2, category: "mugs", image: "/images/product-mug-1.png", title: "Matte Black Mug", aspect: "aspect-square" },
    { id: 3, category: "tshirts", image: "/images/product-tshirt-1.png", title: "Premium Cotton Tee", aspect: "aspect-[3/4]" },
    { id: 4, category: "branding", image: "/images/product-branding-1.png", title: "Luxury Business Cards", aspect: "aspect-square" },
    { id: 5, category: "frames", image: "/images/product-frame-2.png", title: "Minimalist Gold Frame", aspect: "aspect-[3/4]" },
    { id: 6, category: "mugs", image: "/images/product-mug-2.png", title: "Couple's Mugs", aspect: "aspect-square" },
    { id: 7, category: "tshirts", image: "/images/product-tshirt-2.png", title: "Boutique Apparel", aspect: "aspect-[3/4]" },
    { id: 8, category: "branding", image: "/images/product-branding-2.png", title: "Premium Packaging", aspect: "aspect-[16/9]" },
  ];

  const testimonials = [
    { name: "Aarav Sharma", role: "Wedding Client", quote: "The frames we ordered for our wedding photos were beyond expectation. The quality and attention to detail are truly premium." },
    { name: "Priya Thapa", role: "Business Owner", quote: "Lotus Print transformed our brand. The business cards and packaging design gave us the luxury feel we were looking for." },
    { name: "Nitesh Gurung", role: "Corporate Partner", quote: "We order our corporate mugs and t-shirts exclusively from Lotus. Fast delivery, impeccable quality every single time." },
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
      <div className="mouse-spotlight hidden md:block pointer-events-none" />

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
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-6 md:px-12 flex justify-between items-center">
        <img src="/images/logo.png" alt="Lotus Print & Custom Gift" className="h-10 w-auto object-contain" />
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#payment" className="hover:text-white transition-colors">Payment</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <Button 
          onClick={() => window.open(whatsappLink, '_blank')}
          className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-6 transition-all"
        >
          Let's Talk
        </Button>
      </nav>

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
            transition={{ duration: 1, delay: 2.8 }}
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
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-card p-8 rounded-2xl group hover:border-[#E91E8C]/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E91E8C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#E91E8C] mb-6 group-hover:scale-110 transition-transform duration-300">
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
                  className={`group relative rounded-2xl overflow-hidden ${item.aspect} bg-white/5 cursor-pointer`}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-xs font-medium text-[#E91E8C] uppercase tracking-wider mb-2 block">{item.category}</span>
                    <h3 className="text-xl font-medium text-white">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us & Order Process */}
      <section className="py-32 px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Why Choose Us */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold tracking-tight mb-12">The Lotus Standard</motion.h2>
            <div className="space-y-8">
              {[
                { icon: <Clock />, title: "Fast Delivery", desc: "Timely execution without compromising on quality." },
                { icon: <Award />, title: "Premium Quality", desc: "Only the finest materials and printing techniques." },
                { icon: <ShieldCheck />, title: "Trusted Studio", desc: "Highly rated by thousands of customers across Nepal." },
                { icon: <Heart />, title: "Made with Care", desc: "Every order is treated as a personal masterpiece." }
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeIn} className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E91E8C] flex-shrink-0 group-hover:bg-[#E91E8C]/10 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/50">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Order Process */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="glass-card p-10 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E91E8C] rounded-full filter blur-[120px] opacity-10" />
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold tracking-tight mb-12">How It Works</motion.h2>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-white/10" />
              <div className="space-y-10">
                {[
                  { step: "01", title: "Choose Product", desc: "Select from our range of premium customizable items." },
                  { step: "02", title: "Upload Details", desc: "Send us your photos, logos, or design requirements." },
                  { step: "03", title: "Confirm Design", desc: "We provide a mockup for your approval before printing." },
                  { step: "04", title: "Fast Delivery", desc: "Receive your beautifully crafted gift at your doorstep." }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={fadeIn} className="flex gap-8 relative">
                    <div className="w-12 h-12 rounded-full bg-[#0B0B0B] border border-[#E91E8C] flex items-center justify-center text-[#E91E8C] font-bold z-10">
                      {item.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-white/50">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div variants={fadeIn} className="mt-12 pt-8 border-t border-white/10">
              <Button 
                onClick={() => window.open(whatsappLink, '_blank')}
                className="w-full h-14 bg-white hover:bg-gray-200 text-black text-lg rounded-xl font-semibold transition-all"
              >
                Start Your Order
              </Button>
            </motion.div>
          </motion.div>

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
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => { setSelectedPayment(method.id); setPaymentModal(true); }}
                className="glass-card p-8 rounded-2xl cursor-pointer group relative overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full filter blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: method.color }}
                />
                <div className="flex justify-between items-start mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
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
            className="mt-12 glass-card rounded-2xl p-8 border border-[#E91E8C]/20"
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
      <section className="py-32 px-6 md:px-12 relative z-10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Words of Trust</h2>
            <p className="text-xl text-white/50 font-light max-w-2xl mx-auto">Don't just take our word for it.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-2xl relative"
              >
                <Star className="text-[#E91E8C] w-8 h-8 mb-6 opacity-50" />
                <p className="text-lg text-white/80 leading-relaxed mb-8 italic font-serif">"{test.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#E91E8C] font-bold text-lg">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{test.name}</h4>
                    <p className="text-sm text-white/50">{test.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E91E8C] hover:text-black transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E91E8C] hover:text-black transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;