"use client";
import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Globe, Factory, Award } from "lucide-react";

const stats = [
  { icon: Award, label: "500+ Projects", sub: "Delivered worldwide", delay: 0.5 },
  { icon: ShieldCheck, label: "Premium Quality", sub: "Premium materials", delay: 0.65 },
  { icon: Globe, label: "Worldwide Shipping", sub: "50+ countries served", delay: 0.8 },
  { icon: Factory, label: "Fast Production", sub: "7–14 day turnaround", delay: 0.95 },
];

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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-40 grid lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full bg-black/50 border border-accent/30"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
              Premium Sublimation & Sportswear
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight text-shadow-hero"
          >
            Elevate Your{" "}
            <br />
            <span className="text-gradient-gold">Athletic</span> Identity
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-lg md:text-xl text-white/90 max-w-xl leading-relaxed text-shadow-hero"
          >
            High-quality custom sublimated sports apparel and patches for teams,
            businesses, and organizations worldwide. Vibrant designs that won&apos;t
            crack, peel, or fade.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-12 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group btn-shimmer inline-flex items-center gap-2.5 bg-gradient-to-r from-accent to-yellow-600 text-primary px-8 py-4 rounded-full font-bold hover:shadow-gold-glow transition-all duration-300 hover:scale-105"
            >
              Get Free Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="#products"
              className="group inline-flex items-center gap-2.5 border border-white/30 bg-black/30 text-white px-8 py-4 rounded-full font-bold hover:bg-black/50 hover:border-white/50 transition-all duration-300"
            >
              <Play className="w-4 h-4 fill-white" />
              View Products
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-14 grid grid-cols-2 gap-4 lg:hidden"
          >
            {stats.slice(0, 2).map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-black/55 border border-white/10 p-4 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center text-accent flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-white text-sm font-semibold">{stat.label}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        <div className="hidden lg:flex flex-col gap-4 items-end">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: stat.delay,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                whileHover={{ x: -8, transition: { duration: 0.2 } }}
                className={`w-80 p-5 rounded-2xl bg-black/55 border border-white/10 flex items-center gap-4 animate-float ${i % 2 === 0 ? "mr-10" : "mr-0"}`}
                style={{ animationDelay: `${i * 0.6}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/25 to-accent/5 flex items-center justify-center text-accent border border-accent/25 flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-white font-semibold text-lg block">{stat.label}</span>
                  <span className="text-white/60 text-sm">{stat.sub}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
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
