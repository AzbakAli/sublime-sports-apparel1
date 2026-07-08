"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignCard from "@/components/DesignCard";
import ProductNavigation from "@/components/ProductNavigation";
import { motion } from "framer-motion";

export default function WrestlingSingletDesigns() {
  const designs = [
    { index: 0, imageSrc: "/images/wrestlingsinglet (1).jfif" },
    { index: 1, imageSrc: "/images/wrestlingsinglet (2).jfif" },
    { index: 2, imageSrc: "/images/wrestlingsinglet (3).jfif" },
    { index: 3, imageSrc: "/images/wrestlingsinglet (4).jfif" },
    { index: 4, imageSrc: "/images/wrestlingsinglet (5).jfif" },
    { index: 5, imageSrc: "/images/wrestlingsinglet (6).jfif" },
    { index: 6, imageSrc: "/images/wrestlingsinglet (7).jfif" },
    { index: 7, imageSrc: "/images/wrestlingsinglet (8).jfif" },
    { index: 8, imageSrc: "/images/wrestlingsinglet (9).jfif" },
    { index: 9, imageSrc: "/images/wrestlingsinglet (10).jfif" },
    { index: 10, imageSrc: "/images/wrestlingsinglet (11).jfif" },
    { index: 11, imageSrc: "/images/wrestlingsinglet (12).jfif" },
    { index: 12, imageSrc: "/images/wrestlingsinglet (13).jfif" },
    { index: 13, imageSrc: "/images/wrestlingsinglet (14).jfif" },
    { index: 14, imageSrc: "/images/wrestlingsinglet (15).jfif" },
    { index: 15, imageSrc: "/images/wrestlingsinglet (16).jfif" },
    { index: 16, imageSrc: "/images/wrestlingsinglet (17).jfif" },
    { index: 17, imageSrc: "/images/wrestlingsinglet (18).jfif" },
    { index: 18, imageSrc: "/images/wrestlingsinglet (19).jfif" },
    { index: 19, imageSrc: "/images/wrestlingsinglet (20).jfif" },
    { index: 20, imageSrc: "/images/wrestlingsinglet (21).jfif" },
    { index: 21, imageSrc: "/images/wrestlingsinglet (22).jfif" },
    { index: 22, imageSrc: "/images/wrestlingsinglet (23).jfif" },
    { index: 23, imageSrc: "/images/wrestlingsinglet (24).jfif" },
    { index: 24, imageSrc: "/images/wrestlingsinglet (25).jfif" },
    { index: 25, imageSrc: "/images/wrestlingsinglet (26).jfif" },
    { index: 26, imageSrc: "/images/wrestlingsinglet (27).jfif" },
    { index: 27, imageSrc: "/images/wrestlingsinglet (28).png" },
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
              <span className="text-gradient-gold">Wrestling Singlet</span> Designs
            </h1>
            <p className="text-primary/70 text-lg max-w-2xl mx-auto">
              Explore our collection of 28 premium wrestling singlet designs
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
