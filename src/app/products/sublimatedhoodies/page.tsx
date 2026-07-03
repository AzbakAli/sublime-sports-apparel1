"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignCard from "@/components/DesignCard";
import ProductNavigation from "@/components/ProductNavigation";
import { motion } from "framer-motion";

export default function SublimatedHoodiesDesigns() {
  const designs = [
    { index: 0, imageSrc: "/images/sublimatedhoodies (1).jfif" },
    { index: 1, imageSrc: "/images/sublimatedhoodies (2).jfif" },
    { index: 2, imageSrc: "/images/sublimatedhoodies (3).jfif" },
    { index: 3, imageSrc: "/images/sublimatedhoodies (4).jfif" },
    { index: 4, imageSrc: "/images/sublimatedhoodies (5).jfif" },
    { index: 5, imageSrc: "/images/sublimatedhoodies (6).jfif" },
    { index: 6, imageSrc: "/images/sublimatedhoodies (7).jfif" },
    { index: 7, imageSrc: "/images/sublimatedhoodies (8).jfif" },
    { index: 8, imageSrc: "/images/sublimatedhoodies (9).jfif" },
    { index: 9, imageSrc: "/images/sublimatedhoodies (10).jfif" },
    { index: 10, imageSrc: "/images/sublimatedhoodies (11).jfif" },
    { index: 11, imageSrc: "/images/sublimatedhoodies (12).jfif" },
    { index: 12, imageSrc: "/images/sublimatedhoodies (13).jfif" },
    { index: 13, imageSrc: "/images/sublimatedhoodies (14).jfif" },
    { index: 14, imageSrc: "/images/sublimatedhoodies (15).jfif" },
    { index: 15, imageSrc: "/images/sublimatedhoodies (16).jfif" },
    { index: 16, imageSrc: "/images/sublimatedhoodies (17).jfif" },
    { index: 17, imageSrc: "/images/sublimatedhoodies (18).jfif" },
    { index: 18, imageSrc: "/images/sublimatedhoodies (19).jfif" },
    { index: 19, imageSrc: "/images/sublimatedhoodies (20).jfif" },
    { index: 20, imageSrc: "/images/sublimatedhoodies (21).jfif" },
    { index: 21, imageSrc: "/images/sublimatedhoodies (22).jfif" },
    { index: 22, imageSrc: "/images/sublimatedhoodies (23).jfif" },
    { index: 23, imageSrc: "/images/sublimatedhoodies (24).jfif" },
    { index: 24, imageSrc: "/images/sublimatedhoodies (25).jfif" },
    { index: 25, imageSrc: "/images/sublimatedhoodies (26).jfif" },
    { index: 26, imageSrc: "/images/sublimatedhoodies (27).jfif" },
    { index: 27, imageSrc: "/images/sublimatedhoodies (28).jfif" },
    { index: 28, imageSrc: "/images/sublimatedhoodies (29).jfif" },
    { index: 29, imageSrc: "/images/sublimatedhoodies (30).jfif" },
  ];

  return (
    <main className="relative min-h-screen bg-secondary">
      <Navbar />
      <ProductNavigation />
      
      <section className="pt-20 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-primary mb-4">
              <span className="text-gradient-gold">Sublimated Hoodies</span> Designs
            </h1>
            <p className="text-primary/70 text-lg max-w-2xl mx-auto">
              Explore our collection of 30 premium sublimated hoodie designs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {designs.map((design) => (
              <DesignCard key={design.index} index={design.index} imageSrc={design.imageSrc} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
