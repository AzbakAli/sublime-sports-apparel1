"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const features = ["Custom Sublimation", "Team Jerseys", "Hoodies & T-Shirts", "Tracksuits", "Custom Embroidery", "Digitizing", "Custom Patches"];

export default function About() {
  return (
    <section id="about" className="py-32 bg-secondary relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-light-gray -skew-x-12 origin-top-right"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
          <div className="absolute -inset-6 bg-gradient-to-tr from-accent/30 to-transparent rounded-[2rem] blur-2xl"></div>
          {/* Using Image 2 (Single detailed soccer kit) for About section */}
          <img src="https://z-cdn-media.chatglm.cn/files/b1a80459-a026-4ff9-bee3-a5f8f353d009.png?auth_key=1882131241-6db3fafb52964d25b60e52719648906b-0-70a7a94c838c4400c7bb7e65f437e31b" alt="Sublime Soccer Kit" className="relative rounded-[2rem] shadow-luxury object-cover w-full h-[700px]" />
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="absolute bottom-8 left-8 p-8 rounded-2xl glass-light shadow-luxury border border-accent/20">
            <div className="font-heading text-5xl font-extrabold text-gradient-gold">15+</div>
            <div className="text-sm text-primary/60 mt-1 font-medium">Years Manufacturing</div>
          </motion.div>
        </motion.div>

        <div>
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">About Sublime Sports</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="font-heading text-4xl md:text-6xl font-extrabold mt-4 leading-tight">
            Crafting Excellence in <br />Every Stitch
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-8 text-lg text-primary/60 leading-relaxed">
            At Sublime Sports Apparel, we specialize in high-definition sublimation printing and premium athletic wear. Our state-of-the-art manufacturing process ensures that every piece meets the highest standards of durability, comfort, and style. Say goodbye to fading and cracking—your colors stay vibrant forever.
          </motion.p>

          <div className="mt-10 grid grid-cols-2 gap-5">
            {features.map((feat, i) => (
              <motion.div key={feat} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-luxury">
                  <Check className="w-4 h-4 text-accent" />
                </div>
                <span className="text-primary/80 font-semibold text-lg">{feat}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

