"use client";
import { motion } from "framer-motion";
import { Gem, Clock, Globe, DollarSign, Users, Palette, Heart } from "lucide-react";

const features = [
  { icon: Gem, title: "High Quality Materials", desc: "We source only the finest fabrics." },
  { icon: Clock, title: "Fast Turnaround", desc: "Quick production without compromise." },
  { icon: Globe, title: "Worldwide Shipping", desc: "Reliable global delivery." },
  { icon: DollarSign, title: "Affordable Pricing", desc: "Competitive B2B rates." },
  { icon: Users, title: "Experienced Team", desc: "15+ years of expertise." },
  { icon: Palette, title: "Custom Designs", desc: "Full creative control." },
  { icon: Heart, title: "100% Satisfaction", desc: "We don't stop until you love it." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 bg-light-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">Why Choose Us</span>
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold mt-4">The Sublime Advantage</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} whileHover={{ y: -8 }} className="bg-white p-8 rounded-2xl shadow-luxury hover:shadow-gold-glow transition-shadow duration-300 border border-black/5">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{f.title}</h3>
                <p className="text-sm text-primary/50 leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.35 }} className="bg-gradient-to-br from-primary to-black p-8 rounded-2xl text-white flex flex-col justify-center items-center text-center shadow-luxury border border-accent/20">
            <h3 className="font-heading font-bold text-2xl mb-6">Ready to start?</h3>
            <a href="#contact" className="bg-gradient-to-r from-accent to-yellow-600 text-primary px-8 py-3 rounded-full text-sm font-bold hover:scale-105 transition-transform">
              Get Free Quote
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

