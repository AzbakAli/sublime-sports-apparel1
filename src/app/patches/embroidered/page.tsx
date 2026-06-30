"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignCard from "@/components/DesignCard";
import PatchNavigation from "@/components/PatchNavigation";
import { motion } from "framer-motion";

export default function EmbroideredPatches() {
  const designs = [
    { index: 0, imageSrc: "/images/embroidered (1).jfif" },
    { index: 1, imageSrc: "/images/embroidered (2).jfif" },
    { index: 2, imageSrc: "/images/embroidered (3).jfif" },
    { index: 3, imageSrc: "/images/embroidered (4).webp" },
    { index: 4, imageSrc: "/images/embroidered (5).webp" },
    { index: 5, imageSrc: "/images/embroidered (6).webp" },
    { index: 6, imageSrc: "/images/embroidered (7).webp" },
    { index: 7, imageSrc: "/images/embroidered (8).jfif" },
    { index: 8, imageSrc: "/images/embroidered (9).jfif" },
    { index: 9, imageSrc: "/images/embroidered (10).jfif" },
    { index: 10, imageSrc: "/images/embroidered (11).jfif" },
    { index: 11, imageSrc: "/images/embroidered (12).jfif" },
    { index: 12, imageSrc: "/images/embroidered (13).jfif" },
    { index: 13, imageSrc: "/images/embroidered (14).jfif" },
    { index: 14, imageSrc: "/images/embroidered (15).jfif" },
    { index: 15, imageSrc: "/images/embroidered (16).jfif" },
    { index: 16, imageSrc: "/images/embroidered (17).jfif" },
    { index: 17, imageSrc: "/images/embroidered (18).jfif" },
    { index: 18, imageSrc: "/images/embroidered (19).jfif" },
    { index: 19, imageSrc: "/images/embroidered (20).jfif" },
    { index: 20, imageSrc: "/images/embroidered (21).jfif" },
    { index: 21, imageSrc: "/images/embroidered (22).jfif" },
    { index: 22, imageSrc: "/images/embroidered (23).jpg" },
    { index: 23, imageSrc: "/images/embroidered (24).webp" },
    { index: 24, imageSrc: "/images/embroidered (25).webp" },
    { index: 25, imageSrc: "/images/embroidered (26).jfif" },
    { index: 26, imageSrc: "/images/embroidered (27).jpg" },
    { index: 27, imageSrc: "/images/embroidered (28).jfif" },
    { index: 28, imageSrc: "/images/embroidered (29).jfif" },
    { index: 29, imageSrc: "/images/embroidered (30).jfif" },
  ];

  return (
    <main className="relative min-h-screen bg-secondary">
      <Navbar />
      <PatchNavigation />
      
      <section className="pt-20 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-primary mb-4">
              <span className="text-gradient-gold">Embroidered</span> Patches
            </h1>
            <p className="text-primary/70 text-lg max-w-2xl mx-auto">
              Premium quality embroidered patches with intricate stitching and vibrant colors
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
