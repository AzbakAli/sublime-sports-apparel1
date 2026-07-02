"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignCard from "@/components/DesignCard";
import ProductNavigation from "@/components/ProductNavigation";
import { motion } from "framer-motion";

export default function SoccerDesigns() {
  const designs = [
    { index: 0, imageSrc: "/images/soccer (1).jfif" },
    { index: 1, imageSrc: "/images/soccer (2).webp" },
    { index: 2, imageSrc: "/images/soccer (3).jfif" },
    { index: 3, imageSrc: "/images/soccer (4).jfif" },
    { index: 4, imageSrc: "/images/soccer (5).jfif" },
    { index: 5, imageSrc: "/images/soccer (6).jfif" },
    { index: 6, imageSrc: "/images/soccer (7).jfif" },
    { index: 7, imageSrc: "/images/soccer (8).jfif" },
    { index: 8, imageSrc: "/images/soccer (9).jfif" },
    { index: 9, imageSrc: "/images/soccer (10).jfif" },
    { index: 10, imageSrc: "/images/soccer (11).jfif" },
    { index: 11, imageSrc: "/images/soccer (12).jfif" },
    { index: 12, imageSrc: "/images/soccer (13).jfif" },
    { index: 13, imageSrc: "/images/soccer (14).jfif" },
    { index: 14, imageSrc: "/images/soccer (15).jfif" },
    { index: 15, imageSrc: "/images/soccer (16).jfif" },
    { index: 16, imageSrc: "/images/soccer (17).jfif" },
    { index: 17, imageSrc: "/images/soccer (18).jfif" },
    { index: 18, imageSrc: "/images/soccer (19).jfif" },
    { index: 19, imageSrc: "/images/soccer (20).jfif" },
    { index: 20, imageSrc: "/images/soccer (21).jfif" },
    { index: 21, imageSrc: "/images/soccer (22).jfif" },
    { index: 22, imageSrc: "/images/soccer (23).jfif" },
    { index: 23, imageSrc: "/images/soccer (24).jfif" },
    { index: 24, imageSrc: "/images/soccer (25).jfif" },
    { index: 25, imageSrc: "/images/soccer (26).jfif" },
    { index: 26, imageSrc: "/images/soccer (27).jfif" },
    { index: 27, imageSrc: "/images/soccer (28).jfif" },
    { index: 28, imageSrc: "/images/soccer (29).jfif" },
    { index: 29, imageSrc: "/images/soccer (30).jfif" },
    { index: 30, imageSrc: "/images/soccer (31).jfif" },
    { index: 31, imageSrc: "/images/soccer (32).jfif" },
    { index: 32, imageSrc: "/images/soccer (33).jfif" },
    { index: 33, imageSrc: "/images/soccer (34).jfif" },
    { index: 34, imageSrc: "/images/soccer (35).jfif" },
    { index: 35, imageSrc: "/images/soccer (36).jfif" },
    { index: 36, imageSrc: "/images/soccer (37).jfif" },
    { index: 37, imageSrc: "/images/soccer (38).jfif" },
    { index: 38, imageSrc: "/images/soccer (39).jfif" },
    { index: 39, imageSrc: "/images/soccer (40).webp" },
    { index: 40, imageSrc: "/images/soccer (41).jfif" },
    { index: 41, imageSrc: "/images/soccer (42).webp" },
    { index: 42, imageSrc: "/images/soccer (43).webp" },
    { index: 43, imageSrc: "/images/soccer (44).webp" },
    { index: 44, imageSrc: "/images/soccer (45).webp" },
    { index: 45, imageSrc: "/images/soccer (46).webp" },
    { index: 46, imageSrc: "/images/soccer (47).webp" },
    { index: 47, imageSrc: "/images/soccer (48).webp" },
    { index: 48, imageSrc: "/images/soccer (49).webp" },
    { index: 49, imageSrc: "/images/soccer (50).webp" },
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
              <span className="text-gradient-gold">Soccer</span> Designs
            </h1>
            <p className="text-primary/70 text-lg max-w-2xl mx-auto">
              Explore our collection of 50 premium soccer uniform designs
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
