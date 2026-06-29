"use client";
import { motion } from "framer-motion";

interface DesignCardProps {
  index: number;
  imageSrc?: string;
  title?: string;
}

export default function DesignCard({ index, imageSrc = "/images/hero-banner.png", title = `Design ${index + 1}` }: DesignCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.02 }}
      className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-gold-glow hover:-translate-y-1"
    >
      <div className="aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-4">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="text-primary font-semibold text-lg">{title}</h3>
      </div>
    </motion.div>
  );
}
