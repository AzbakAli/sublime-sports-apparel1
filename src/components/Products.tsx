"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const products = [
  { title: "Baseball", desc: "Premium baseball uniforms and jerseys.", img: "/images/baseballcover.jpeg", count: "55 Designs", href: "/products/baseball" },
  { title: "Basketball", desc: "High-performance basketball kits.", img: "/images/basketballcover.jpeg", count: "50 Designs", href: "/products/basketball" },
  { title: "Soccer", desc: "Professional soccer uniforms.", img: "/images/soccercover.jpeg", count: "50 Designs", href: "/products/soccer" },
  { title: "Football", desc: "Custom football jerseys and gear.", img: "/images/footballcover.jpeg", count: "50 Designs", href: "/products/football" },
  { title: "Ice Hockey", desc: "Premium ice hockey uniforms and jerseys.", img: "/images/icehockeycover.jpeg", count: "40 Designs", href: "/products/icehockey" },
  { title: "Sublimated Hoodies", desc: "Custom sublimated hoodies with vibrant designs.", img: "/images/sublimatedhoodiescover.jpeg", count: "30 Designs", href: "/products/sublimatedhoodies" },
  { title: "Sublimated T-Shirts & Polo", desc: "Premium sublimated t-shirts and polo shirts.", img: "/images/sublimatedthsirts&polocover.jpeg", count: "50 Designs", href: "/products/sublimatedtshirtpolo" },
];

export default function Products() {
  return (
    <section id="products" className="py-32 bg-light-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">Our Products</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading text-4xl md:text-6xl font-extrabold mt-4">Premium Gear for Every Sport</motion.h2>
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-primary/50 text-lg max-w-md mt-4 md:mt-0">
            From football to basketball, we manufacture high-performance apparel tailored to your team's exact needs.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod, i) => (
            <a key={prod.title} href={prod.href} className="block">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="group relative bg-white rounded-3xl overflow-hidden shadow-luxury cursor-pointer border border-black/5 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500">
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img src={prod.img} alt={prod.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-accent text-primary px-4 py-2 rounded-full text-xs font-bold shadow-gold-glow flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    {prod.count}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8 relative">
                  <div className="absolute -top-6 left-8 w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-yellow-600 flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300">
                    <ArrowUpRight className="w-7 h-7 text-primary" />
                  </div>
                  <div className="pt-4">
                    <h3 className="font-heading text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">{prod.title}</h3>
                    <p className="text-base text-primary/60 leading-relaxed">{prod.desc}</p>
                  </div>
                </div>
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

