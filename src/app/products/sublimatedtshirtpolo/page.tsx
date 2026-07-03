"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignCard from "@/components/DesignCard";
import ProductNavigation from "@/components/ProductNavigation";
import { motion } from "framer-motion";

export default function SublimatedTshirtPoloDesigns() {
  const designs = [
    { index: 0, imageSrc: "/images/sublimatedtshirt&polo (1).jfif" },
    { index: 1, imageSrc: "/images/sublimatedtshirt&polo (2).jfif" },
    { index: 2, imageSrc: "/images/sublimatedtshirt&polo (3).jfif" },
    { index: 3, imageSrc: "/images/sublimatedtshirt&polo (4).jfif" },
    { index: 4, imageSrc: "/images/sublimatedtshirt&polo (5).jfif" },
    { index: 5, imageSrc: "/images/sublimatedtshirt&polo (6).jfif" },
    { index: 6, imageSrc: "/images/sublimatedtshirt&polo (7).jfif" },
    { index: 7, imageSrc: "/images/sublimatedtshirt&polo (8).jfif" },
    { index: 8, imageSrc: "/images/sublimatedtshirt&polo (9).jfif" },
    { index: 9, imageSrc: "/images/sublimatedtshirt&polo (10).jfif" },
    { index: 10, imageSrc: "/images/sublimatedtshirt&polo (11).jfif" },
    { index: 11, imageSrc: "/images/sublimatedtshirt&polo (12).jfif" },
    { index: 12, imageSrc: "/images/sublimatedtshirt&polo (13).jfif" },
    { index: 13, imageSrc: "/images/sublimatedtshirt&polo (14).jfif" },
    { index: 14, imageSrc: "/images/sublimatedtshirt&polo (15).jfif" },
    { index: 15, imageSrc: "/images/sublimatedtshirt&polo (16).jfif" },
    { index: 16, imageSrc: "/images/sublimatedtshirt&polo (17).jfif" },
    { index: 17, imageSrc: "/images/sublimatedtshirt&polo (18).jfif" },
    { index: 18, imageSrc: "/images/sublimatedtshirt&polo (19).jfif" },
    { index: 19, imageSrc: "/images/sublimatedtshirt&polo (20).jfif" },
    { index: 20, imageSrc: "/images/sublimatedtshirt&polo (21).jfif" },
    { index: 21, imageSrc: "/images/sublimatedtshirt&polo (22).jfif" },
    { index: 22, imageSrc: "/images/sublimatedtshirt&polo (23).jfif" },
    { index: 23, imageSrc: "/images/sublimatedtshirt&polo (24).jfif" },
    { index: 24, imageSrc: "/images/sublimatedtshirt&polo (25).jfif" },
    { index: 25, imageSrc: "/images/sublimatedtshirt&polo (26).jfif" },
    { index: 26, imageSrc: "/images/sublimatedtshirt&polo (27).jfif" },
    { index: 27, imageSrc: "/images/sublimatedtshirt&polo (28).jfif" },
    { index: 28, imageSrc: "/images/sublimatedtshirt&polo (29).jfif" },
    { index: 29, imageSrc: "/images/sublimatedtshirt&polo (30).jfif" },
    { index: 30, imageSrc: "/images/sublimatedtshirt&polo (31).jfif" },
    { index: 31, imageSrc: "/images/sublimatedtshirt&polo (32).jfif" },
    { index: 32, imageSrc: "/images/sublimatedtshirt&polo (33).jfif" },
    { index: 33, imageSrc: "/images/sublimatedtshirt&polo (34).jfif" },
    { index: 34, imageSrc: "/images/sublimatedtshirt&polo (35).jfif" },
    { index: 35, imageSrc: "/images/sublimatedtshirt&polo (36).jfif" },
    { index: 36, imageSrc: "/images/sublimatedtshirt&polo (37).jfif" },
    { index: 37, imageSrc: "/images/sublimatedtshirt&polo (38).jfif" },
    { index: 38, imageSrc: "/images/sublimatedtshirt&polo (39).jfif" },
    { index: 39, imageSrc: "/images/sublimatedtshirt&polo (40).jfif" },
    { index: 40, imageSrc: "/images/sublimatedtshirt&polo (41).jfif" },
    { index: 41, imageSrc: "/images/sublimatedtshirt&polo (42).jfif" },
    { index: 42, imageSrc: "/images/sublimatedtshirt&polo (43).jfif" },
    { index: 43, imageSrc: "/images/sublimatedtshirt&polo (44).jfif" },
    { index: 44, imageSrc: "/images/sublimatedtshirt&polo (45).jfif" },
    { index: 45, imageSrc: "/images/sublimatedtshirt&polo (46).jfif" },
    { index: 46, imageSrc: "/images/sublimatedtshirt&polo (47).jfif" },
    { index: 47, imageSrc: "/images/sublimatedtshirt&polo (48).jfif" },
    { index: 48, imageSrc: "/images/sublimatedtshirt&polo (49).jfif" },
    { index: 49, imageSrc: "/images/sublimatedtshirt&polo (50).jfif" },
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
              <span className="text-gradient-gold">Sublimated T-Shirts & Polo</span> Designs
            </h1>
            <p className="text-primary/70 text-lg max-w-2xl mx-auto">
              Explore our collection of 50 premium sublimated t-shirt and polo designs
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
