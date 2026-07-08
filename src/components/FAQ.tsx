"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  { q: "How long does production take?", a: "Standard production takes 2-3 weeks depending on the order volume and complexity. Rush orders are available upon request." },
  { q: "Do you ship worldwide?", a: "Yes, we provide worldwide shipping. We partner with major logistics companies to ensure safe and tracked delivery to your destination." },
  { q: "Can I customize designs entirely?", a: "Absolutely. With our sublimation printing, you have 100% freedom over the design. You can provide your own artwork or have our team create a design based on your concepts." },
  { q: "What file formats do you accept?", a: "For sublimation and printing, we prefer vector files (AI, EPS, PDF) or high-resolution PNG/JPG. If you only have a sketch, our team can redraw it for you." },
  { q: "What is the minimum order quantity (MOQ)?", a: "Our standard MOQ is 10 pieces per design for apparel. Contact us for details on custom orders." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-32 bg-secondary">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">FAQ</span>
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold mt-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-light-gray rounded-2xl shadow-sm overflow-hidden border border-black/5">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center p-8 text-left">
                <span className="font-heading font-bold text-xl">{faq.q}</span>
                <Plus className={`w-6 h-6 text-accent transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <p className="px-8 pb-8 text-primary/60 leading-relaxed text-lg">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

