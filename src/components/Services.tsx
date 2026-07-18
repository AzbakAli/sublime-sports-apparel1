"use client";
import { motion } from "framer-motion";
import {
  Shirt,
  Scissors,
  Layers,
  Flame,
  Wind,
  MousePointerClick,
  Award,
  Printer,
} from "lucide-react";

const services = [
  { icon: Wind, title: "Sublimation Printing", desc: "All-over, fade-resistant custom prints." },
  { icon: Shirt, title: "Custom Sportswear", desc: "End-to-end design and manufacturing." },
  { icon: Scissors, title: "Embroidery", desc: "Premium embroidery and stitching." },
  { icon: Layers, title: "Screen Printing", desc: "Vibrant prints for bulk orders." },
  { icon: Flame, title: "Heat Transfer", desc: "Detailed, high-resolution transfers." },
  { icon: MousePointerClick, title: "Digitizing Services", desc: "Artwork to embroidery files." },
  { icon: Award, title: "Custom Patches", desc: "Chenille, PVC, woven, leather." },
  { icon: Printer, title: "DTF Printing", desc: "Direct-to-film transfers with vibrant colors and excellent detail." },
];

export default function Services() {
  return (
    <section className="py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <span className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">Featured Services</span>
            <h2 className="font-heading text-4xl md:text-6xl font-extrabold mt-4">Comprehensive Apparel Solutions</h2>
          </div>
          <p className="text-primary/50 text-lg flex items-end">
            From concept to final stitch, we provide everything you need to build a premium sportswear brand.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="group relative overflow-hidden rounded-2xl border border-black/5 p-8 bg-white hover:bg-primary transition-colors duration-500 cursor-pointer shadow-luxury">
                <Icon className="w-10 h-10 text-accent mb-6 transition-transform duration-500 group-hover:scale-110" />
                <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-white transition-colors duration-500">{s.title}</h3>
                <p className="text-sm text-primary/50 group-hover:text-white/50 transition-colors duration-500">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

