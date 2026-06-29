"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignCard from "@/components/DesignCard";
import PatchNavigation from "@/components/PatchNavigation";
import { motion } from "framer-motion";

export default function EmbroideredPatches() {
  const designs = Array.from({ length: 22 }, (_, i) => ({
    index: i,
    imageSrc: `/images/embroidered (${i + 1}).jfif`
  }));

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
