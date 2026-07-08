"use client";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden bg-primary">
      {/* Full-resolution background — bypasses Next.js image compression */}
      <div className="absolute inset-0 z-0 hero-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-banner2.png"
          alt="Sublime Sports Apparel — custom uniforms for football, basketball, baseball, soccer and athletics"
          className="absolute inset-0 w-full h-full object-cover object-[center_22%] lg:object-[center_20%]"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-40 w-full">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
