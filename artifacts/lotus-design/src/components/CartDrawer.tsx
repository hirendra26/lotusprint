import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "../lib/CartContext";

export function CartDrawer() {
  const { items, totalItems, totalPrice, isOpen, closeCart, removeItem, updateQty, clearCart } = useCart();

  const handleOrder = () => {
    if (items.length === 0) return;
    const lines = items.map(
      item => `• ${item.name} (x${item.quantity}) — Rs. ${(item.price * item.quantity).toLocaleString()}`
    );
    const msg = encodeURIComponent(
      `Hello Lotus Print & Custom Gift! 🛍️\n\nI'd like to order:\n\n${lines.join("\n")}\n\nSubtotal: Rs. ${totalPrice.toLocaleString()}\n\nPlease guide me on the next steps. Thank you!`
    );
    window.open(`https://wa.me/9779848363025?text=${msg}`, "_blank");
    closeCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] z-[210] bg-[#111] border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#E91E8C]" />
                <h2 className="text-lg font-bold">Your Cart</h2>
                {totalItems > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#E91E8C]/15 text-[#E91E8C] text-xs font-bold">
                    {totalItems} item{totalItems !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-white/30 hover:text-white/60 text-xs font-medium transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 px-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                    <ShoppingBag className="w-9 h-9 text-white/20" />
                  </div>
                  <div>
                    <p className="text-white/60 font-semibold mb-1">Your cart is empty</p>
                    <p className="text-white/30 text-sm leading-relaxed">Browse our pricing guide and add items</p>
                  </div>
                  <Link
                    href="/payment"
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#E91E8C] hover:underline mt-2"
                  >
                    View Pricing Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, scaleY: 0.8 }}
                        transition={{ duration: 0.22 }}
                        className="flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.07] rounded-2xl p-4 border border-white/8 group transition-colors"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: item.color + "22" }}
                        >
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm leading-tight truncate">{item.name}</p>
                          <p className="text-white/40 text-xs mt-0.5">{item.note}</p>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-sm font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0 min-w-[60px]">
                          <span className="text-sm font-bold" style={{ color: item.color }}>
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-white/20 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm font-medium">Subtotal</span>
                  <span className="text-2xl font-black text-gradient-brand">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-white/25 text-xs leading-relaxed">
                  Final price may vary based on customisation &amp; size. We'll confirm on WhatsApp before production.
                </p>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleOrder}
                  className="w-full h-14 rounded-2xl bg-[#25D366] hover:bg-[#1db954] text-white font-bold text-base flex items-center justify-center gap-3 shadow-[0_0_28px_rgba(37,211,102,0.25)] transition-colors"
                >
                  <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.002 3C9.373 3 4 8.373 4 15.002c0 2.14.565 4.243 1.637 6.09L4 29l8.11-1.61A12.93 12.93 0 0 0 16.002 28C22.63 28 28 22.63 28 16.002 28 9.373 22.63 3 16.002 3zm0 2c5.523 0 10 4.477 10 10.002C26.002 20.525 21.524 26 16.002 26a10.93 10.93 0 0 1-5.49-1.48l-.394-.23-4.81.956.977-4.71-.257-.408A9.956 9.956 0 0 1 4.998 15c0-5.523 4.48-10 10.004-10zm-3.14 5.5c-.21 0-.547.079-.835.394-.287.315-1.097 1.073-1.097 2.616s1.123 3.033 1.28 3.243c.157.21 2.186 3.474 5.367 4.734 2.664 1.06 3.208.847 3.784.795.577-.052 1.863-.76 2.125-1.494.264-.734.264-1.363.184-1.494-.078-.131-.288-.21-.603-.368-.315-.158-1.863-.92-2.152-1.024-.289-.104-.5-.157-.71.158-.21.314-.813 1.023-.997 1.233-.184.21-.368.236-.683.079-.315-.158-1.33-.49-2.534-1.563-.937-.836-1.57-1.867-1.753-2.182-.184-.315-.02-.486.138-.643.14-.14.315-.367.472-.55.158-.184.21-.315.315-.525.105-.21.052-.394-.026-.552-.079-.157-.697-1.71-.96-2.34-.236-.576-.49-.498-.683-.507l-.632-.011z"/>
                  </svg>
                  Order via WhatsApp
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
