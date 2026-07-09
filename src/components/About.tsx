"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const apparelItems = [
  "Jerseys & Team Uniforms",
  "T-Shirts & Polo Shirts",
  "Hoodies & Tracksuits",
  "Leggings & Cycling Wear",
];

const patchTypes = ["Embroidered", "Woven", "Sublimated", "PVC", "Chenille", "Leather"];

const intro =
  "At Sublime Sports Apparel, we specialize in manufacturing high-quality custom sublimated sports apparel and custom patches for teams, businesses, organizations and promotional events worldwide.";

const body = [
  "With years of industry experience, we produce custom apparel and patches designed for durability, comfort, and style — vibrant, long-lasting designs that won't crack, peel, or fade.",
  "Using advanced sublimation printing technology and premium materials, we deliver fully customized sportswear with superior comfort. Our range includes jerseys, team uniforms, T-shirts, polo shirts, hoodies, leggings, tracksuits, cycling wear, and more.",
  "We manufacture in Pakistan as overseas manufacturers, which allows us to offer cost-effective pricing while maintaining quality that is up to international standards.",
  "We also manufacture embroidered, woven, sublimated, PVC, chenille, and leather patches, crafted with precision to meet your exact requirements.",
  "Our focus is simple: exceptional quality, competitive pricing, reliable service, and on-time delivery. From design to production, we work closely with our customers to bring their ideas to life.",
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.06),transparent_55%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold text-accent uppercase tracking-[0.25em]"
          >
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold mt-3 leading-snug text-primary"
          >
            Your Trusted Partner for Custom Sportswear &amp; Patches
          </motion.h2>
        </div>

        {/* Image + intro — image dominant */}
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative rounded-2xl overflow-hidden shadow-luxury border border-black/10 bg-white"
          >
            {/* Native img for full resolution — no compression */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about-patches.jpg"
              alt="Sublimated sports apparel and custom patches — leather, embroidered, PVC and team uniforms"
              className="w-full h-auto object-cover rounded-2xl"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col justify-center"
          >
            <p className="text-[15px] md:text-base text-primary leading-[1.75] font-medium">
              {intro}
            </p>
            <div className="mt-5 space-y-3.5">
              {body.map((text, i) => (
                <p key={i} className={`text-sm md:text-[15px] leading-[1.7] ${text.includes("We manufacture in Pakistan") ? "text-accent font-bold" : "text-primary/85"}`}>
                  {text}
                </p>
              ))}
            </div>
            <p className="mt-6 pt-5 border-t border-black/10 text-sm font-bold text-primary">
              Your Trusted Partner for Custom Sportswear &amp; Patches.
            </p>
          </motion.div>
        </div>

        {/* Feature cards — full width below */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 lg:mt-14 grid sm:grid-cols-2 gap-5"
        >
          <div className="bg-white rounded-xl p-5 md:p-6 shadow-luxury border border-black/5">
            <h3 className="font-heading font-bold text-base mb-4 text-primary">Sportswear Range</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
              {apparelItems.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-primary/90 text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-5 md:p-6 shadow-luxury border border-black/5">
            <h3 className="font-heading font-bold text-base mb-4 text-primary">Custom Patches</h3>
            <div className="flex flex-wrap gap-2">
              {patchTypes.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 rounded-full bg-light-gray text-primary text-xs font-semibold border border-black/8"
                >
                  {type}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-primary/75 leading-relaxed">
              Embroidered, woven, sublimated, PVC, chenille &amp; leather — made to your exact specs.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
