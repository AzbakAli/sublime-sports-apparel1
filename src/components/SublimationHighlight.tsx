"use client";
import { motion } from "framer-motion";
import { ArrowRight, Droplet, Wind, Palette, Layers } from "lucide-react";

const benefits = [
  { icon: Palette, title: "Limitless Designs", desc: "All-over print capabilities with any color, pattern, or gradient." },
  { icon: Droplet, title: "Never Fades", desc: "Dye is infused directly into the fabric. No cracking or peeling." },
  { icon: Wind, title: "Highly Breathable", desc: "Moisture-wicking polyester keeps athletes cool and dry." },
  { icon: Layers, title: "Lightweight Feel", desc: "Zero added weight. The design becomes part of the fabric." },
];

export default function SublimationHighlight() {
  return (
    <section id="sublimation" className="py-32 bg-primary text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">Our Speciality</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="font-heading text-4xl md:text-6xl font-extrabold mt-4 leading-tight">
            Professional <span className="text-gradient-gold">Sublimation</span> Printing
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-8 text-lg text-white/60 leading-relaxed">
            Sublimation is the ultimate choice for custom sportswear. It allows for vibrant, permanent, all-over prints that won't fade, crack, or peel. Perfect for teams who want to stand out with unique, complex designs.
          </motion.p>

          <div className="mt-12 grid sm:grid-cols-2 gap-8">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-accent border border-accent/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold">{b.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <a href="#contact" className="group inline-flex items-center gap-2 bg-gradient-to-r from-accent to-yellow-600 text-primary px-8 py-4 rounded-full font-bold mt-12 hover:shadow-gold-glow transition-all duration-300 hover:scale-105">
            Request Sublimation Quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative h-[550px] hidden lg:block">
          {/* Using newaboutus image for Sublimation showcase */}
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-luxury border border-white/10 bg-primary">
            <img src="/images/newaboutus.jpeg" alt="Sublimated Football Uniforms" className="w-full h-full object-contain" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-2xl glass flex flex-col items-center justify-center text-center p-4 animate-float">
            <div className="text-4xl font-heading font-extrabold text-accent">100%</div>
            <div className="text-xs text-white/70 mt-1 uppercase tracking-widest">Color Fastness</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

