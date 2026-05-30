import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqItem } from "../components/FaqItem";
import { TikTokIcon } from "../components/TikTokIcon";
import { fadeIn } from "../lib/animations";
import { socialLinks, whatsappLink } from "../lib/data";

const faqs = [
  { q: "How do I place an order?", a: "Simply send us a message on WhatsApp with your product choice, design details, and quantity. We'll guide you through the entire process and send a mockup before printing." },
  { q: "How long does delivery take?", a: "Most orders are ready within 1–3 business days. Custom and bulk orders may take 3–5 days. We'll always confirm the timeline when you place your order." },
  { q: "Can I see a preview before printing?", a: "Absolutely! We always create a digital mockup of your product and send it for your approval before we print anything. You can request changes until you're 100% happy." },
  { q: "Do you deliver outside Nepalgunj?", a: "Yes! We ship across Nepal via trusted courier services. Local Nepalgunj delivery is also available. Shipping charges depend on your location and order size." },
  { q: "What image quality do I need for my photos?", a: "For the best print quality, we recommend images of at least 1MB and 300 DPI resolution. WhatsApp sometimes compresses images — you can also share via Google Drive for best results." },
  { q: "Are bulk order discounts available?", a: "Yes! We offer attractive discounts for bulk orders, especially for corporate gifts, events, and weddings. Contact us on WhatsApp with your quantity and we'll give you a custom quote." },
  { q: "What payment methods do you accept?", a: "We accept eSewa, Khalti, direct bank transfer (Rastriya Banijya Bank), and cash on delivery for local Nepalgunj orders." },
];

export default function Contact() {
  return (
    <>
      {/* Page Header */}
      <section className="py-24 px-6 md:px-12 relative z-10 bg-[#0B0B0B] border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E91E8C] rounded-full blur-[200px] opacity-[0.05]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#E91E8C]/30 bg-[#E91E8C]/5 text-xs font-semibold text-[#E91E8C] uppercase tracking-widest">Get in Touch</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Contact Us</h1>
            <p className="text-xl text-white/50 font-light max-w-2xl">Ready to order or have a custom request? We'd love to hear from you.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 md:px-12 relative z-10 bg-[#0B0B0B]">
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
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Let's Create <br />Something Special.</h2>
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
                    onClick={() => window.open(whatsappLink, "_blank")}
                    className="h-16 px-10 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xl rounded-full font-bold transition-all shadow-[0_0_30px_rgba(37,211,102,0.2)]"
                  >
                    Chat on WhatsApp
                  </Button>

                  <div className="flex items-center gap-4 mt-10">
                    <span className="text-white/30 text-sm uppercase tracking-widest">Follow Us</span>
                    <div className="flex gap-3">
                      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all hover:scale-110">
                        <Facebook className="w-5 h-5" />
                      </a>
                      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#E91E8C] hover:text-white hover:border-[#E91E8C] transition-all hover:scale-110">
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white hover:text-black hover:border-white transition-all hover:scale-110">
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
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#E91E8C] rounded-full blur-[160px] opacity-[0.03]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#2196F3] rounded-full blur-[160px] opacity-[0.03]" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
            <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-[#2196F3]/30 bg-[#2196F3]/5 text-xs font-semibold text-[#2196F3] uppercase tracking-widest">Frequently Asked Questions</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Everything You Need to Know</h2>
            <p className="text-xl text-white/40 font-light max-w-2xl mx-auto">Still have questions? Our team is always just a WhatsApp message away.</p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((item, idx) => (
              <FaqItem key={idx} question={item.q} answer={item.a} index={idx} />
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="mt-16 text-center glass-card rounded-3xl p-10">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-white/50 mb-8">Our team responds on WhatsApp within minutes.</p>
            <Button
              onClick={() => window.open(`https://wa.me/9779848363025?text=${encodeURIComponent("Hello! I have a question about an order.")}`, "_blank")}
              className="h-14 px-10 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-bold text-lg transition-all shadow-[0_0_30px_rgba(37,211,102,0.2)]"
            >
              Ask on WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
