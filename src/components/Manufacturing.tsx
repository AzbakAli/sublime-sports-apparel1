"use client";
import { motion } from "framer-motion";
import { PenTool, CheckCircle, Factory, Search, Truck } from "lucide-react";

const steps = [
  { icon: PenTool, title: "Design Consultation", desc: "We collaborate to bring your vision to life." },
  { icon: CheckCircle, title: "Sample Approval", desc: "Review physical samples before bulk." },
  { icon: Factory, title: "Production", desc: "State-of-the-art sublimation begins." },
  { icon: Search, title: "Quality Inspection", desc: "Rigorous quality checks on every piece." },
  { icon: Truck, title: "Worldwide Delivery", desc: "Fast, tracked shipping to your door." },
];

export default function Manufacturing() {
  return (
    <section id="manufacturing" className="py-32 bg-primary text-white overflow-hidden relative">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-24">
          <span className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">The Process</span>
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold mt-4">Our Manufacturing Journey</h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-white/10">
            <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 2, ease: "easeInOut" }} className="h-full bg-gradient-to-r from-accent to-yellow-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-16 lg:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2 }} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 w-24 h-24 rounded-full bg-primary border-2 border-accent flex items-center justify-center mb-8 group hover:bg-accent transition-colors duration-300 cursor-default shadow-gold-glow">
                    <Icon className="w-8 h-8 text-accent group-hover:text-primary transition-colors duration-300" />
                    <span className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-primary text-sm font-bold flex items-center justify-center border-4 border-primary shadow-luxury">{i+1}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-sm text-white/50 max-w-[220px] leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

