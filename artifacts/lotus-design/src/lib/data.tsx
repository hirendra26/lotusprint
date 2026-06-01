import {
  ImageIcon, Camera, Briefcase, Gift, Shirt, Printer, Award, MonitorSmartphone,
  Smartphone, CreditCard, Building2, Heart, Star, CheckCircle2, ArrowRight,
} from "lucide-react";

export const socialLinks = {
  facebook: "https://www.facebook.com/lotusdesign977",
  instagram: "https://www.instagram.com/lotusprint977",
  tiktok: "https://www.tiktok.com/@lotusdesign977",
};

export const whatsappLink =
  "https://wa.me/9779848363025?text=Hello%20Lotus%20Print%20%26%20Custom%20Gift,%20I%20would%20like%20to%20order%20a%20personalized%20gift.";

export const bankDetails = {
  bank: "Rastriya Banijya Bank",
  accountName: "Lotus Print & Custom Gift",
  accountNumber: "4400100000060001",
};

export const statsData = [
  { value: 5000, suffix: "+", label: "Happy Customers", color: "#E91E8C" },
  { value: 12000, suffix: "+", label: "Products Delivered", color: "#8B2FC9" },
  { value: 100, suffix: "%", label: "Satisfaction Rate", color: "#2196F3" },
  { value: 4, suffix: "+", label: "Years in Business", color: "#C4903A" },
];

export const services = [
  { icon: <ImageIcon className="w-6 h-6" />, title: "Custom Photo Frames", desc: "Premium framing for your most cherished memories." },
  { icon: <Printer className="w-6 h-6" />, title: "Sublimation Printing", desc: "High-quality, long-lasting prints on various materials." },
  { icon: <Gift className="w-6 h-6" />, title: "Mug Printing", desc: "Personalized ceramic mugs for gifts or corporate branding." },
  { icon: <Shirt className="w-6 h-6" />, title: "T-Shirt Printing", desc: "Custom apparel with premium fabric and crisp prints." },
  { icon: <Briefcase className="w-6 h-6" />, title: "Visiting Cards", desc: "Luxury business cards with foil and embossing options." },
  { icon: <Award className="w-6 h-6" />, title: "Logo Design", desc: "Bespoke identity design for modern brands." },
  { icon: <MonitorSmartphone className="w-6 h-6" />, title: "Flex / Banner", desc: "Large format printing for events and advertising." },
  { icon: <Camera className="w-6 h-6" />, title: "Digital Branding", desc: "Cohesive visual systems for your digital presence." },
];

export const portfolio = [
  { id: 1, category: "frames", image: "/images/product-frame-1.png", title: "Wedding Portrait", aspect: "aspect-[4/3]", gradient: "from-[#C4903A]/40 via-[#8B2FC9]/20 to-[#0B0B0B]", icon: <ImageIcon className="w-16 h-16" /> },
  { id: 2, category: "mugs", image: "/images/product-mug-1.png", title: "Matte Black Mug", aspect: "aspect-square", gradient: "from-[#E91E8C]/40 via-[#8B2FC9]/20 to-[#0B0B0B]", icon: <Camera className="w-16 h-16" /> },
  { id: 3, category: "tshirts", image: "/images/product-tshirt-1.png", title: "Premium Cotton Tee", aspect: "aspect-[3/4]", gradient: "from-[#2196F3]/40 via-[#E91E8C]/20 to-[#0B0B0B]", icon: <Shirt className="w-16 h-16" /> },
  { id: 4, category: "branding", image: "/images/product-branding-1.png", title: "Luxury Business Cards", aspect: "aspect-square", gradient: "from-[#8B2FC9]/40 via-[#2196F3]/20 to-[#0B0B0B]", icon: <Briefcase className="w-16 h-16" /> },
  { id: 5, category: "frames", image: "/images/product-frame-2.png", title: "Minimalist Gold Frame", aspect: "aspect-[3/4]", gradient: "from-[#C4903A]/40 via-[#E91E8C]/20 to-[#0B0B0B]", icon: <ImageIcon className="w-16 h-16" /> },
  { id: 6, category: "mugs", image: "/images/product-mug-2.png", title: "Couple's Mugs", aspect: "aspect-square", gradient: "from-[#8B2FC9]/40 via-[#C4903A]/20 to-[#0B0B0B]", icon: <Camera className="w-16 h-16" /> },
  { id: 7, category: "tshirts", image: "/images/product-tshirt-2.png", title: "Boutique Apparel", aspect: "aspect-[3/4]", gradient: "from-[#E91E8C]/40 via-[#C4903A]/20 to-[#0B0B0B]", icon: <Shirt className="w-16 h-16" /> },
  { id: 8, category: "branding", image: "/images/product-branding-2.png", title: "Premium Packaging", aspect: "aspect-[16/9]", gradient: "from-[#2196F3]/40 via-[#8B2FC9]/20 to-[#0B0B0B]", icon: <Briefcase className="w-16 h-16" /> },
];

export const testimonials = [
  { name: "Aarav Sharma", role: "Wedding Client", location: "Nepalgunj", quote: "The frames we ordered for our wedding photos were beyond expectation. The quality and attention to detail are truly premium." },
  { name: "Priya Thapa", role: "Business Owner", location: "Banke", quote: "Lotus Print transformed our brand. The business cards and packaging design gave us the luxury feel we were looking for." },
  { name: "Nitesh Gurung", role: "Corporate Partner", location: "Nepalgunj", quote: "We order our corporate mugs and t-shirts exclusively from Lotus. Fast delivery, impeccable quality every single time." },
  { name: "Sunita Rana", role: "Birthday Gift", location: "Kohalpur", quote: "Ordered a magic mug for my husband's birthday. He absolutely loved it! The photo print quality was stunning and delivery was on time." },
  { name: "Roshan KC", role: "Anniversary Gift", location: "Nepalgunj", quote: "Got a beautiful canvas print of our couple photo. It now hangs proudly in our living room. I can't recommend Lotus enough!" },
  { name: "Kavita Sah", role: "School Event", location: "Banke", quote: "Ordered custom t-shirts for our school sports event. The team was so helpful, the colours were vibrant, and delivery was fast." },
];

export const paymentMethods = [
  {
    id: "esewa",
    name: "eSewa",
    tagline: "Pay instantly with eSewa",
    color: "#6DB54E",
    textColor: "#fff",
    icon: <Smartphone className="w-6 h-6" />,
    badge: "Most Popular",
    steps: ["Open your eSewa app", "Go to 'Send Money' or 'Pay'", "Enter our eSewa ID: 9848363025", "Enter the amount and confirm", "Screenshot the payment and send via WhatsApp"],
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
    steps: ["Open your Khalti app", "Tap 'Send Money'", "Enter number: 9848363025", "Enter the amount and confirm", "Share the payment screenshot on WhatsApp"],
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
    steps: ["Log in to your banking app or visit a branch", "Transfer to our account below", "Use 'Lotus Order' as the remark", "Send the transaction receipt via WhatsApp"],
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
    steps: ["Place your order via WhatsApp", "We confirm and prepare your item", "Pay cash upon delivery", "Available within Nepalgunj & nearby areas"],
    note: "Available locally in Nepalgunj, Banke",
  },
];

export const orderSteps = [
  {
    num: "01", title: "Choose Your Product",
    desc: "Browse our range of personalised products — mugs, frames, t-shirts, cushions, keychains, banners, and much more.",
    detail: "Not sure what to pick? Send us a message on WhatsApp and our team will suggest the perfect product for your occasion.",
    icon: <Gift className="w-8 h-8" />, color: "#E91E8C",
  },
  {
    num: "02", title: "Send Your Details",
    desc: "Share your photos, text, logos, or design ideas with us via WhatsApp. High-resolution images give the best print quality.",
    detail: "We accept images via WhatsApp, Google Drive, or direct file transfer. Our team will guide you through exactly what we need.",
    icon: <Smartphone className="w-8 h-8" />, color: "#8B2FC9",
  },
  {
    num: "03", title: "Review Your Mockup",
    desc: "We create a digital preview of your product before printing. You approve it, request changes, or give us the green light.",
    detail: "We won't print a single item without your final approval. Your satisfaction is guaranteed from the very first step.",
    icon: <CheckCircle2 className="w-8 h-8" />, color: "#2196F3",
  },
  {
    num: "04", title: "Receive Your Order",
    desc: "Your beautifully crafted product is delivered to your doorstep across Nepalgunj and Nepal — fast, safe, and packaged with care.",
    detail: "Local delivery is available in Nepalgunj. For orders outside the city, we ship via trusted courier services.",
    icon: <ArrowRight className="w-8 h-8" />, color: "#C4903A",
  },
];

export const occasions = [
  {
    emoji: "🎂", title: "Birthdays", subtitle: "Make their day unforgettable",
    gradient: "from-[#E91E8C]/20 via-[#8B2FC9]/10 to-transparent",
    border: "border-[#E91E8C]/20 hover:border-[#E91E8C]/50",
    glow: "rgba(233,30,140,0.15)", color: "#E91E8C",
    products: ["Photo Mug", "Cushion Print", "Birthday Card", "Photo Frame", "Keychain", "Magic Mug"],
    msg: "Hello! I need a birthday gift — can you help me pick something special?",
  },
  {
    emoji: "💍", title: "Weddings", subtitle: "Gifts as timeless as your love",
    gradient: "from-[#C4903A]/20 via-[#8B2FC9]/10 to-transparent",
    border: "border-[#C4903A]/20 hover:border-[#C4903A]/50",
    glow: "rgba(196,144,58,0.15)", color: "#C4903A",
    products: ["Couple Photo Frame", "Canvas Print", "Custom Pillow", "Memory Book", "Engraved Keychain", "Couple Mugs"],
    msg: "Hello! I'm looking for a wedding gift. Can you suggest some personalised options?",
  },
  {
    emoji: "❤️", title: "Anniversaries", subtitle: "Celebrate every milestone in style",
    gradient: "from-[#8B2FC9]/20 via-[#E91E8C]/10 to-transparent",
    border: "border-[#8B2FC9]/20 hover:border-[#8B2FC9]/50",
    glow: "rgba(139,47,201,0.15)", color: "#8B2FC9",
    products: ["Canvas Print", "Couple Frame", "Love Keychain", "Photo Book", "Custom T-Shirt", "Heart Cushion"],
    msg: "Hello! I need an anniversary gift idea. Can you help me create something special?",
  },
  {
    emoji: "🏢", title: "Corporate", subtitle: "Brand gifts that leave an impression",
    gradient: "from-[#2196F3]/20 via-[#8B2FC9]/10 to-transparent",
    border: "border-[#2196F3]/20 hover:border-[#2196F3]/50",
    glow: "rgba(33,150,243,0.15)", color: "#2196F3",
    products: ["Business Cards", "Branded Mugs", "Logo T-Shirts", "Event Banners", "Desk Plaque", "Branded Stickers"],
    msg: "Hello! I need corporate branded gifts for our company. Can we discuss bulk order options?",
  },
];

export const pricingItems = [
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

export type OrderStatus = "confirmed" | "processing" | "ready" | "delivered" | "cancelled";

export interface Order {
  id: string;
  phone: string;
  product: string;
  qty: number;
  date: string;
  status: OrderStatus;
  note?: string;
  estimatedDate?: string;
}

export const orders: Order[] = [
  {
    id: "ORD-001",
    phone: "9848363025",
    product: "Custom Mug (Photo Print)",
    qty: 2,
    date: "2026-05-28",
    status: "delivered",
    note: "Red handle, name 'Raju' printed",
    estimatedDate: "2026-05-30",
  },
  {
    id: "ORD-002",
    phone: "9800000001",
    product: "Custom T-Shirt x3",
    qty: 3,
    date: "2026-05-29",
    status: "processing",
    note: "White base, logo on front",
    estimatedDate: "2026-06-01",
  },
  {
    id: "ORD-003",
    phone: "9800000002",
    product: "Photo Frame + Canvas Print",
    qty: 1,
    date: "2026-05-30",
    status: "confirmed",
    estimatedDate: "2026-06-02",
  },
];
