"use client";
import { motion } from "framer-motion";

const clients = [
  "ATLAS FC",
  "KINGS SPORTS",
  "ELITE ACADEMY",
  "TITANS WEAR",
  "NORTH SIDE GYM",
  "AQUA CLUB",
];

export default function Trusted() {
  const doubled = [...clients, ...clients];

  return (
    <section className="py-16 bg-primary border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold text-white/40 uppercase tracking-[0.3em]"
        >
          Trusted by Sports Teams, Clubs & Businesses
        </motion.p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee w-max">
          {doubled.map((client, i) => (
            <div
              key={`${client}-${i}`}
              className="font-heading text-2xl md:text-3xl font-bold text-white/15 hover:text-accent/80 transition-colors duration-300 cursor-default px-10 md:px-14 whitespace-nowrap"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
