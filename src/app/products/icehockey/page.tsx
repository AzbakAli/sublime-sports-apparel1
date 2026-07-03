"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignCard from "@/components/DesignCard";
import ProductNavigation from "@/components/ProductNavigation";
import { motion } from "framer-motion";

export default function IceHockeyDesigns() {
  const designs = [
    { index: 0, imageSrc: "/images/icehockey (1).jfif" },
    { index: 1, imageSrc: "/images/icehockey (2).jfif" },
    { index: 2, imageSrc: "/images/icehockey (3).jfif" },
    { index: 3, imageSrc: "/images/icehockey (4).jfif" },
    { index: 4, imageSrc: "/images/icehockey (5).jfif" },
    { index: 5, imageSrc: "/images/icehockey (6).jfif" },
    { index: 6, imageSrc: "/images/icehockey (7).jfif" },
    { index: 7, imageSrc: "/images/icehockey (8).jfif" },
    { index: 8, imageSrc: "/images/icehockey (9).jfif" },
    { index: 9, imageSrc: "/images/icehockey (10).jfif" },
    { index: 10, imageSrc: "/images/icehockey (11).jfif" },
    { index: 11, imageSrc: "/images/icehockey (12).jfif" },
    { index: 12, imageSrc: "/images/icehockey (13).jfif" },
    { index: 13, imageSrc: "/images/icehockey (14).jfif" },
    { index: 14, imageSrc: "/images/icehockey (15).jfif" },
    { index: 15, imageSrc: "/images/icehockey (16).jfif" },
    { index: 16, imageSrc: "/images/icehockey (17).jfif" },
    { index: 17, imageSrc: "/images/icehockey (18).jfif" },
    { index: 18, imageSrc: "/images/icehockey (19).jfif" },
    { index: 19, imageSrc: "/images/icehockey (20).jfif" },
    { index: 20, imageSrc: "/images/icehockey (21).jfif" },
    { index: 21, imageSrc: "/images/icehockey (22).jfif" },
    { index: 22, imageSrc: "/images/icehockey (23).jfif" },
    { index: 23, imageSrc: "/images/icehockey (24).jfif" },
    { index: 24, imageSrc: "/images/icehockey (25).jfif" },
    { index: 25, imageSrc: "/images/icehockey (26).jfif" },
    { index: 26, imageSrc: "/images/icehockey (27).jfif" },
    { index: 27, imageSrc: "/images/icehockey (28).jfif" },
    { index: 28, imageSrc: "/images/icehockey (29).jfif" },
    { index: 29, imageSrc: "/images/icehockey (30).jfif" },
    { index: 30, imageSrc: "/images/icehockey (31).jfif" },
    { index: 31, imageSrc: "/images/icehockey (32).jfif" },
    { index: 32, imageSrc: "/images/icehockey (33).jfif" },
    { index: 33, imageSrc: "/images/icehockey (34).jfif" },
    { index: 34, imageSrc: "/images/icehockey (35).jfif" },
    { index: 35, imageSrc: "/images/icehockey (36).jfif" },
    { index: 36, imageSrc: "/images/icehockey (37).jfif" },
    { index: 37, imageSrc: "/images/icehockey (38).jfif" },
    { index: 38, imageSrc: "/images/icehockey (39).jfif" },
    { index: 39, imageSrc: "/images/icehockey (40).jfif" },
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
              <span className="text-gradient-gold">Ice Hockey</span> Designs
            </h1>
            <p className="text-primary/70 text-lg max-w-2xl mx-auto">
              Explore our collection of 40 premium ice hockey uniform designs
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
