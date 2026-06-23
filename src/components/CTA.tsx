"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative rounded-[2rem] overflow-hidden p-12 md:p-24 text-center shadow-luxury"
        >
          <div className="absolute inset-0 bg-primary z-0">
            <Image
              src="/images/hero-kits.jpg"
              alt=""
              fill
              className="object-cover object-center opacity-20"
              sizes="(max-width: 1280px) 100vw, 1280px"
              aria-hidden
            />
            <div className="absolute inset-0 hero-overlay opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
          </div>

          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full border border-accent/30 text-accent text-xs font-semibold tracking-[0.2em] uppercase"
            >
              Start Your Project
            </motion.span>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight text-shadow-hero">
              Ready to Build Your{" "}
              <br />
              <span className="text-gradient-gold">Sportswear Brand?</span>
            </h2>
            <p className="mt-8 text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Partner with a manufacturer that cares about your success as much as you do.
              Get a free, no-obligation quote today.
            </p>
            <a
              href="#contact"
              className="group btn-shimmer inline-flex items-center gap-2.5 bg-gradient-to-r from-accent to-yellow-600 text-primary px-12 py-5 rounded-full font-bold mt-12 hover:shadow-gold-glow transition-all duration-300 hover:scale-105 text-lg"
            >
              Request Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
