"use client";
import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";

interface DesignCardProps {
  index: number;
  imageSrc?: string;
  title?: string;
}

export default function DesignCard({ index, imageSrc = "/images/hero-banner.png", title = `Design ${index + 1}` }: DesignCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.04, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-white via-gray-50 to-white border-2 border-gray-200/50 rounded-[2rem] overflow-hidden hover:border-accent/60 hover:shadow-[0_25px_50px_-12px_rgba(234,179,8,0.25)] transition-all duration-700"
    >
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-yellow-500/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]" />
      
      {/* Card content */}
      <div className="relative bg-gradient-to-br from-white via-gray-50/50 to-white rounded-[2rem]">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100/50 via-white to-gray-50/50 flex items-center justify-center p-8">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />
          
          <motion.div
            whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-contain drop-shadow-2xl filter brightness-105 group-hover:brightness-110 transition-all duration-500"
            />
          </motion.div>
          
          {/* Premium hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end justify-center pb-8">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span>Premium Design</span>
              </div>
              <p className="text-white/80 text-sm">Click to view details</p>
            </motion.div>
          </div>

          {/* Enhanced sparkle badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-accent via-yellow-500 to-accent text-primary px-4 py-2 rounded-full text-xs font-bold shadow-xl shadow-accent/30 flex items-center gap-2 z-20">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="tracking-wide">#{index + 1}</span>
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-3xl" />
        </div>
        
        <div className="p-6 bg-white/90 backdrop-blur-md border-t border-gray-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-2xl font-bold bg-gradient-to-r from-primary via-gray-700 to-accent bg-clip-text text-transparent">
                {title}
              </h3>
              <p className="text-gray-500 text-sm mt-1 group-hover:text-accent/70 transition-colors">
                High Quality
              </p>
            </div>
            <motion.div
              whileHover={{ rotate: 180, scale: 1.2 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-accent via-yellow-500 to-accent flex items-center justify-center text-white shadow-lg shadow-accent/30 transition-all duration-500"
            >
              <Star className="w-6 h-6 fill-white" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
