"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Michael R.", role: "CEO, Titans Wear", content: "Sublime transformed our brand. The sublimation printing quality is unmatched—colors are incredibly vibrant and haven't faded after 50+ washes." },
  { name: "Sarah L.", role: "Coach, Elite Academy", content: "We needed 500 custom basketball uniforms fast. Not only did they deliver early, but the print quality was flawless. Highly recommend." },
  { name: "David C.", role: "Founder, Atlas FC", content: "Their attention to detail on our football kits was top tier. The all-over print design came out exactly like the mockups. A reliable B2B partner." },
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-light-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">Client Feedback</span>
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold mt-4">Trusted by Industry Leaders</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-white p-10 rounded-2xl shadow-luxury border border-black/5 flex flex-col">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-accent text-accent" />)}
              </div>
              <p className="text-primary/70 leading-relaxed flex-grow text-lg">"{r.content}"</p>
              <div className="mt-8 pt-6 border-t border-black/5">
                <div className="font-heading font-bold text-xl">{r.name}</div>
                <div className="text-sm text-primary/40 mt-1">{r.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

