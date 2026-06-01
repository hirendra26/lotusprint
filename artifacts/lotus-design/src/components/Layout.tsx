import React, { useEffect, useState, useRef, type ReactNode } from "react";
import { useLocation, Link, useRoute } from "wouter";
import Lenis from "lenis";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { X, Menu, Facebook, Instagram, ShoppingCart } from "lucide-react";
import { TikTokIcon } from "./TikTokIcon";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "../lib/CartContext";
import { socialLinks, whatsappLink } from "../lib/data";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Payment", href: "/payment" },
  { label: "Reviews", href: "/reviews" },
  { label: "Track Order", href: "/tracking" },
  { label: "Contact", href: "/contact" },
];

function Nav({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => location === href;

  return (
    <>
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

      {/* Nav bar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-[#0B0B0B]/95 backdrop-blur-xl border-b border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="Lotus Print & Custom Gift"
              className="h-14 w-auto object-contain group-hover:drop-shadow-[0_0_10px_rgba(233,30,140,0.5)] transition-all duration-500"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-[#E91E8C] bg-[#E91E8C]/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-[#E91E8C]/40 transition-all"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#E91E8C] text-white text-[10px] font-black flex items-center justify-center leading-none shadow-[0_0_8px_rgba(233,30,140,0.6)]"
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </motion.span>
              )}
            </motion.button>
            <Link href="/order">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex h-10 px-6 rounded-full bg-[#E91E8C] text-white text-sm font-semibold items-center hover:bg-[#c9166e] transition-all shadow-[0_0_20px_rgba(233,30,140,0.3)] cursor-pointer"
              >
                Order Now
              </motion.span>
            </Link>
          </div>

          {/* Mobile right — cart + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
              onClick={openCart}
              aria-label="Open cart"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-0.5 rounded-full bg-[#E91E8C] text-white text-[9px] font-black flex items-center justify-center leading-none">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full w-[80vw] max-w-sm z-[95] bg-[#111] border-l border-white/10 flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <img src="/images/logo.png" alt="Lotus" className="h-12 w-auto object-contain" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-6 py-8 space-y-1">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    location === "/" ? "text-[#E91E8C] bg-[#E91E8C]/10" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Home
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive(link.href) ? "text-[#E91E8C] bg-[#E91E8C]/10" : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="p-6 border-t border-white/10">
                <button
                  onClick={() => { setMenuOpen(false); window.open(whatsappLink, "_blank"); }}
                  className="w-full h-12 rounded-full bg-[#E91E8C] text-white font-semibold text-base hover:bg-[#c9166e] transition-all"
                >
                  Order on WhatsApp
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/10 bg-[#050505] relative z-10 text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Link href="/">
          <img src="/images/logo.png" alt="Lotus Print & Custom Gift" className="h-14 w-auto object-contain" />
        </Link>
        <div className="text-white/40 text-sm">
          © {new Date().getFullYear()} Lotus Print &amp; Custom Gift. All rights reserved.
        </div>
        <div className="flex gap-3">
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all hover:scale-110 text-white/60 hover:text-white">
            <Facebook className="w-4 h-4" />
          </a>
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E91E8C] hover:border-[#E91E8C] transition-all hover:scale-110 text-white/60 hover:text-white">
            <Instagram className="w-4 h-4" />
          </a>
          <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all hover:scale-110 text-white/60">
            <TikTokIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
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
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY / document.body.scrollHeight > 0.15);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
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
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[70] origin-left pointer-events-none"
      style={{ scaleX, background: "linear-gradient(90deg, #E91E8C, #8B2FC9, #2196F3)" }}
    />
  );
}

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(() => sessionStorage.getItem("lotus_loaded") !== "1");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("lotus_loaded", "1");
    }, 2000);

    return () => {
      lenis.destroy();
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) { document.body.style.overflow = ""; return; }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  return (
    <div className="relative bg-[#0B0B0B] min-h-screen text-white font-sans selection:bg-[#E91E8C] selection:text-black">
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
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1.2, ease: "easeInOut" }}
                className="h-[1px] bg-gradient-to-r from-transparent via-[#E91E8C] to-transparent mt-6"
                style={{ width: 200 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollProgress />
      <div className="mouse-spotlight hidden md:block pointer-events-none" />

      <div className="flex flex-col min-h-screen">
        <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>

      <WhatsAppFab />
      <BackToTop />
      <CartDrawer />
    </div>
  );
}
