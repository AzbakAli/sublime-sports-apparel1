"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignCard from "@/components/DesignCard";
import ProductNavigation from "@/components/ProductNavigation";
import { motion } from "framer-motion";

export default function FootballDesigns() {
  const designs = [
    { index: 0, imageSrc: "/images/football (1).jfif" },
    { index: 1, imageSrc: "/images/football (2).jfif" },
    { index: 2, imageSrc: "/images/football (3).jfif" },
    { index: 3, imageSrc: "/images/football (4).jfif" },
    { index: 4, imageSrc: "/images/football (5).jfif" },
    { index: 5, imageSrc: "/images/football (6).jfif" },
    { index: 6, imageSrc: "/images/football (7).jfif" },
    { index: 7, imageSrc: "/images/football (8).jfif" },
    { index: 8, imageSrc: "/images/football (9).jfif" },
    { index: 9, imageSrc: "/images/football (10).jfif" },
    { index: 10, imageSrc: "/images/football (11).jfif" },
    { index: 11, imageSrc: "/images/football (12).jfif" },
    { index: 12, imageSrc: "/images/football (13).jfif" },
    { index: 13, imageSrc: "/images/football (14).jfif" },
    { index: 14, imageSrc: "/images/football (15).jfif" },
    { index: 15, imageSrc: "/images/football (16).jfif" },
    { index: 16, imageSrc: "/images/football (17).jfif" },
    { index: 17, imageSrc: "/images/football (18).jfif" },
    { index: 18, imageSrc: "/images/football (19).jfif" },
    { index: 19, imageSrc: "/images/football (20).jfif" },
    { index: 20, imageSrc: "/images/football (21).jfif" },
    { index: 21, imageSrc: "/images/football (22).jfif" },
    { index: 22, imageSrc: "/images/football (23).jfif" },
    { index: 23, imageSrc: "/images/football (24).jfif" },
    { index: 24, imageSrc: "/images/football (25).jfif" },
    { index: 25, imageSrc: "/images/football (26).jfif" },
    { index: 26, imageSrc: "/images/football (27).jfif" },
    { index: 27, imageSrc: "/images/football (28).jfif" },
    { index: 28, imageSrc: "/images/football (29).jfif" },
    { index: 29, imageSrc: "/images/football (30).jfif" },
    { index: 30, imageSrc: "/images/football (31).jfif" },
    { index: 31, imageSrc: "/images/football (32).jfif" },
    { index: 32, imageSrc: "/images/football (33).jfif" },
    { index: 33, imageSrc: "/images/football (34).jfif" },
    { index: 34, imageSrc: "/images/football (35).jfif" },
    { index: 35, imageSrc: "/images/football (36).jfif" },
    { index: 36, imageSrc: "/images/football (37).jfif" },
    { index: 37, imageSrc: "/images/football (38).jfif" },
    { index: 38, imageSrc: "/images/football (39).jfif" },
    { index: 39, imageSrc: "/images/football (40).jfif" },
    { index: 40, imageSrc: "/images/football (41).jfif" },
    { index: 41, imageSrc: "/images/football (42).jfif" },
    { index: 42, imageSrc: "/images/football (43).jfif" },
    { index: 43, imageSrc: "/images/football (44).jfif" },
    { index: 44, imageSrc: "/images/football (45).jfif" },
    { index: 45, imageSrc: "/images/football (46).jfif" },
    { index: 46, imageSrc: "/images/football (47).jfif" },
    { index: 47, imageSrc: "/images/football (48).jfif" },
    { index: 48, imageSrc: "/images/football (49).jfif" },
    { index: 49, imageSrc: "/images/football (50).jpg" },
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
              <span className="text-gradient-gold">Football</span> Designs
            </h1>
            <p className="text-primary/70 text-lg max-w-2xl mx-auto">
              Explore our collection of 50 premium football uniform designs
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
