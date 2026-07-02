"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignCard from "@/components/DesignCard";
import ProductNavigation from "@/components/ProductNavigation";
import { motion } from "framer-motion";

export default function BaseballDesigns() {
  const designs = [
    { index: 0, imageSrc: "/images/baseball (1).webp" },
    { index: 1, imageSrc: "/images/baseball (2).jfif" },
    { index: 2, imageSrc: "/images/baseball (3).jfif" },
    { index: 3, imageSrc: "/images/baseball (4).jfif" },
    { index: 4, imageSrc: "/images/baseball (5).jfif" },
    { index: 5, imageSrc: "/images/baseball (6).jfif" },
    { index: 6, imageSrc: "/images/baseball (7).jfif" },
    { index: 7, imageSrc: "/images/baseball (8).jfif" },
    { index: 8, imageSrc: "/images/baseball (9).jfif" },
    { index: 9, imageSrc: "/images/baseball (10).jfif" },
    { index: 10, imageSrc: "/images/baseball (11).jfif" },
    { index: 11, imageSrc: "/images/baseball (12).jfif" },
    { index: 12, imageSrc: "/images/baseball (13).jfif" },
    { index: 13, imageSrc: "/images/baseball (14).jfif" },
    { index: 14, imageSrc: "/images/baseball (15).jfif" },
    { index: 15, imageSrc: "/images/baseball (16).jfif" },
    { index: 16, imageSrc: "/images/baseball (17).jfif" },
    { index: 17, imageSrc: "/images/baseball (18).jfif" },
    { index: 18, imageSrc: "/images/baseball (19).jfif" },
    { index: 19, imageSrc: "/images/baseball (20).jfif" },
    { index: 20, imageSrc: "/images/baseball (21).jfif" },
    { index: 21, imageSrc: "/images/baseball (22).jfif" },
    { index: 22, imageSrc: "/images/baseball (23).jfif" },
    { index: 23, imageSrc: "/images/baseball (24).jfif" },
    { index: 24, imageSrc: "/images/baseball (25).jfif" },
    { index: 25, imageSrc: "/images/baseball (26).jfif" },
    { index: 26, imageSrc: "/images/baseball (27).jfif" },
    { index: 27, imageSrc: "/images/baseball (28).jfif" },
    { index: 28, imageSrc: "/images/baseball (29).jfif" },
    { index: 29, imageSrc: "/images/baseball (30).jfif" },
    { index: 30, imageSrc: "/images/baseball (31).jfif" },
    { index: 31, imageSrc: "/images/baseball (32).jfif" },
    { index: 32, imageSrc: "/images/baseball (33).jfif" },
    { index: 33, imageSrc: "/images/baseball (34).jfif" },
    { index: 34, imageSrc: "/images/baseball (35).jfif" },
    { index: 35, imageSrc: "/images/baseball (36).jfif" },
    { index: 36, imageSrc: "/images/baseball (37).jfif" },
    { index: 37, imageSrc: "/images/baseball (38).jfif" },
    { index: 38, imageSrc: "/images/baseball (39).jfif" },
    { index: 39, imageSrc: "/images/baseball (40).jfif" },
    { index: 40, imageSrc: "/images/baseball (41).jfif" },
    { index: 41, imageSrc: "/images/baseball (42).jfif" },
    { index: 42, imageSrc: "/images/baseball (43).jfif" },
    { index: 43, imageSrc: "/images/baseball (44).jfif" },
    { index: 44, imageSrc: "/images/baseball (45).jfif" },
    { index: 45, imageSrc: "/images/baseball (46).jfif" },
    { index: 46, imageSrc: "/images/baseball (47).jfif" },
    { index: 47, imageSrc: "/images/baseball (48).jfif" },
    { index: 48, imageSrc: "/images/baseball (49).jfif" },
    { index: 49, imageSrc: "/images/baseball (50).jfif" },
    { index: 50, imageSrc: "/images/baseball (51).jfif" },
    { index: 51, imageSrc: "/images/baseball (52).jfif" },
    { index: 52, imageSrc: "/images/baseball (53).jfif" },
    { index: 53, imageSrc: "/images/baseball (54).jfif" },
    { index: 54, imageSrc: "/images/baseball (55).jfif" },
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
              <span className="text-gradient-gold">Baseball</span> Designs
            </h1>
            <p className="text-primary/70 text-lg max-w-2xl mx-auto">
              Explore our collection of 55 premium baseball uniform designs
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
