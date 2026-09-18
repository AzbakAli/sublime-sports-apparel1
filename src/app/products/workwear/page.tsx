"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignCard from "@/components/DesignCard";
import ProductNavigation from "@/components/ProductNavigation";
import { motion } from "framer-motion";

export default function WorkwearDesigns() {
  const designs = [
    { index: 0, imageSrc: "/images/workwear (1).jpeg" },
    { index: 1, imageSrc: "/images/workwear (2).jpeg" },
    { index: 2, imageSrc: "/images/workwear (3).jpeg" },
    { index: 3, imageSrc: "/images/workwear (4).jpeg" },
    { index: 4, imageSrc: "/images/workwear (5).jpeg" },
    { index: 5, imageSrc: "/images/workwear (6).jpeg" },
    { index: 6, imageSrc: "/images/workwear (7).jpeg" },
    { index: 7, imageSrc: "/images/workwear (8).jpeg" },
    { index: 8, imageSrc: "/images/workwear (9).jpeg" },
    { index: 9, imageSrc: "/images/workwear (10).jpeg" },
    { index: 10, imageSrc: "/images/workwear (11).jpeg" },
    { index: 11, imageSrc: "/images/workwear (12).jpeg" },
    { index: 12, imageSrc: "/images/workwear (13).jpeg" },
    { index: 13, imageSrc: "/images/workwear (14).jpeg" },
    { index: 14, imageSrc: "/images/workwear (15).jpeg" },
    { index: 15, imageSrc: "/images/workwear (16).jpeg" },
    { index: 16, imageSrc: "/images/workwear (17).jpeg" },
    { index: 17, imageSrc: "/images/workwear (18).jpeg" },
    { index: 18, imageSrc: "/images/workwear (19).jpeg" },
    { index: 19, imageSrc: "/images/workwear (20).jpeg" },
    { index: 20, imageSrc: "/images/workwear (21).jpeg" },
    { index: 21, imageSrc: "/images/workwear (22).jpeg" },
    { index: 22, imageSrc: "/images/workwear (23).jpeg" },
    { index: 23, imageSrc: "/images/workwear (24).jpeg" },
    { index: 24, imageSrc: "/images/workwear (25).jpeg" },
    { index: 25, imageSrc: "/images/workwear (26).jpeg" },
    { index: 26, imageSrc: "/images/workwear (27).jpeg" },
    { index: 27, imageSrc: "/images/workwear (28).jpeg" },
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
              <span className="text-gradient-gold">Workwear</span> Designs
            </h1>
            <p className="text-primary/70 text-lg max-w-2xl mx-auto">
              Explore our collection of 28 premium workwear designs
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
