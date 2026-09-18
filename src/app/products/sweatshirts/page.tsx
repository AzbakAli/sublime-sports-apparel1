"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignCard from "@/components/DesignCard";
import ProductNavigation from "@/components/ProductNavigation";
import { motion } from "framer-motion";

export default function SweatshirtsDesigns() {
  const designs = [
    { index: 0, imageSrc: "/images/sweatshirts (1).jpeg" },
    { index: 1, imageSrc: "/images/sweatshirts (2).jpeg" },
    { index: 2, imageSrc: "/images/sweatshirts (3).jpeg" },
    { index: 3, imageSrc: "/images/sweatshirts (4).jpeg" },
    { index: 4, imageSrc: "/images/sweatshirts (5).jpeg" },
    { index: 5, imageSrc: "/images/sweatshirts (6).jpeg" },
    { index: 6, imageSrc: "/images/sweatshirts (7).jpeg" },
    { index: 7, imageSrc: "/images/sweatshirts (8).jpeg" },
    { index: 8, imageSrc: "/images/sweatshirts (9).jpeg" },
    { index: 9, imageSrc: "/images/sweatshirts (10).jpeg" },
    { index: 10, imageSrc: "/images/sweatshirts (11).jpeg" },
    { index: 11, imageSrc: "/images/sweatshirts (12).jpeg" },
    { index: 12, imageSrc: "/images/sweatshirts (13).jpeg" },
    { index: 13, imageSrc: "/images/sweatshirts (14).jpeg" },
    { index: 14, imageSrc: "/images/sweatshirts (15).jpeg" },
    { index: 15, imageSrc: "/images/sweatshirts (16).jpeg" },
    { index: 16, imageSrc: "/images/sweatshirts (17).jpeg" },
    { index: 17, imageSrc: "/images/sweatshirts (18).jpeg" },
    { index: 18, imageSrc: "/images/sweatshirts (19).jpeg" },
    { index: 19, imageSrc: "/images/sweatshirts (20).jpeg" },
    { index: 20, imageSrc: "/images/sweatshirts (21).jpeg" },
    { index: 21, imageSrc: "/images/sweatshirts (22).jpeg" },
    { index: 22, imageSrc: "/images/sweatshirts (23).jpeg" },
    { index: 23, imageSrc: "/images/sweatshirts (24).jpeg" },
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
              <span className="text-gradient-gold">Sweatshirts</span> Designs
            </h1>
            <p className="text-primary/70 text-lg max-w-2xl mx-auto">
              Explore our collection of 24 premium sweatshirt designs
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
