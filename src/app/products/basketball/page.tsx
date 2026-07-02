"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignCard from "@/components/DesignCard";
import { motion } from "framer-motion";

export default function BasketballDesigns() {
  const designs = [
    { index: 0, imageSrc: "/images/basketball (1).jfif" },
    { index: 1, imageSrc: "/images/basketball (2).jfif" },
    { index: 2, imageSrc: "/images/basketball (3).jfif" },
    { index: 3, imageSrc: "/images/basketball (4).jfif" },
    { index: 4, imageSrc: "/images/basketball (5).jfif" },
    { index: 5, imageSrc: "/images/basketball (6).jfif" },
    { index: 6, imageSrc: "/images/basketball (7).jfif" },
    { index: 7, imageSrc: "/images/basketball (8).jfif" },
    { index: 8, imageSrc: "/images/basketball (9).jfif" },
    { index: 9, imageSrc: "/images/basketball (10).jfif" },
    { index: 10, imageSrc: "/images/basketball (11).jfif" },
    { index: 11, imageSrc: "/images/basketball (12).jfif" },
    { index: 12, imageSrc: "/images/basketball (13).jfif" },
    { index: 13, imageSrc: "/images/basketball (14).jfif" },
    { index: 14, imageSrc: "/images/basketball (15).jfif" },
    { index: 15, imageSrc: "/images/basketball (16).jfif" },
    { index: 16, imageSrc: "/images/basketball (17).jfif" },
    { index: 17, imageSrc: "/images/basketball (18).jfif" },
    { index: 18, imageSrc: "/images/basketball (19).jfif" },
    { index: 19, imageSrc: "/images/basketball (20).jfif" },
    { index: 20, imageSrc: "/images/basketball (21).jfif" },
    { index: 21, imageSrc: "/images/basketball (22).jfif" },
    { index: 22, imageSrc: "/images/basketball (23).jfif" },
    { index: 23, imageSrc: "/images/basketball (24).jfif" },
    { index: 24, imageSrc: "/images/basketball (25).jfif" },
    { index: 25, imageSrc: "/images/basketball (26).jfif" },
    { index: 26, imageSrc: "/images/basketball (27).jfif" },
    { index: 27, imageSrc: "/images/basketball (28).jfif" },
    { index: 28, imageSrc: "/images/basketball (29).jfif" },
    { index: 29, imageSrc: "/images/basketball (30).jfif" },
    { index: 30, imageSrc: "/images/basketball (31).jfif" },
    { index: 31, imageSrc: "/images/basketball (32).jfif" },
    { index: 32, imageSrc: "/images/basketball (33).jfif" },
    { index: 33, imageSrc: "/images/basketball (34).jfif" },
    { index: 34, imageSrc: "/images/basketball (35).jfif" },
    { index: 35, imageSrc: "/images/basketball (36).jfif" },
    { index: 36, imageSrc: "/images/basketball (37).jfif" },
    { index: 37, imageSrc: "/images/basketball (38).jfif" },
    { index: 38, imageSrc: "/images/basketball (39).jfif" },
    { index: 39, imageSrc: "/images/basketball (40).jfif" },
    { index: 40, imageSrc: "/images/basketball (41).jfif" },
    { index: 41, imageSrc: "/images/basketball (42).jfif" },
    { index: 42, imageSrc: "/images/basketball (43).jfif" },
    { index: 43, imageSrc: "/images/basketball (44).jfif" },
    { index: 44, imageSrc: "/images/basketball (45).jfif" },
    { index: 45, imageSrc: "/images/basketball (46).jfif" },
    { index: 46, imageSrc: "/images/basketball (47).jfif" },
    { index: 47, imageSrc: "/images/basketball (48).jfif" },
    { index: 48, imageSrc: "/images/basketball (49).jfif" },
    { index: 49, imageSrc: "/images/basketball (50).png" },
  ];

  return (
    <main className="relative min-h-screen bg-secondary">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-primary mb-4">
              <span className="text-gradient-gold">Basketball</span> Designs
            </h1>
            <p className="text-primary/70 text-lg max-w-2xl mx-auto">
              Explore our collection of 50 premium basketball uniform designs
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
