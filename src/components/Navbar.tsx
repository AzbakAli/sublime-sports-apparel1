"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Patches", href: "/patches" },
  { name: "Sublimation", href: "/#sublimation" },
  { name: "Products", href: "/#products" },
  { name: "Contact", href: "/#contact" },
];

const patchTypes = [
  { name: "Embroidered Patches", href: "/patches/embroidered" },
  { name: "Sublimated Patches", href: "/patches/sublimated" },
  { name: "Woven Patches", href: "/patches/woven" },
  { name: "PVC / Rubber Patches", href: "/patches/pvc" },
  { name: "Leather Patches", href: "/patches/leather" },
  { name: "Chenille Patches", href: "/patches/chenille" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [patchesOpen, setPatchesOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setPatchesOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setPatchesOpen(false);
    }, 150);
    setDropdownTimeout(timeout);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-4 bg-primary/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "py-8 bg-gradient-to-b from-primary/60 to-transparent backdrop-blur-[2px]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-yellow-700 flex items-center justify-center shadow-gold-glow">
            <span className="text-primary font-bold text-lg">S</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-bold text-xl tracking-wide">SUBLIME</span>
            <span className="text-[10px] tracking-[0.3em] text-accent">SPORTS APPAREL</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            if (link.name === "Patches") {
              return (
                <div 
                  key={link.name}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="text-sm text-white/85 hover:text-accent transition-colors duration-300 font-medium flex items-center gap-1">
                    {link.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {patchesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-primary/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden"
                      >
                        {patchTypes.map((patch) => (
                          <a
                            key={patch.name}
                            href={patch.href}
                            className="block px-4 py-3 text-white/80 hover:text-accent hover:bg-white/5 transition-colors text-sm"
                          >
                            {patch.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <a key={link.name} href={link.href} className="text-sm text-white/85 hover:text-accent transition-colors duration-300 font-medium relative group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            );
          })}
        </div>

        <div className="hidden md:block">
          <a href="#contact" className="group inline-flex items-center gap-2 bg-gradient-to-r from-accent to-yellow-600 text-primary px-6 py-3 rounded-full text-sm font-bold hover:shadow-gold-glow transition-all duration-300 hover:scale-105">
            Get Free Quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden bg-primary/95 backdrop-blur-xl">
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-white/80 text-xl" onClick={() => setMobileOpen(false)}>
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3">
                <span className="text-accent text-sm font-semibold tracking-wider uppercase">Patches</span>
                {patchTypes.map((patch) => (
                  <a key={patch.name} href={patch.href} className="text-white/80 text-lg pl-4" onClick={() => setMobileOpen(false)}>
                    {patch.name}
                  </a>
                ))}
              </div>
              <a href="#contact" className="bg-accent text-primary px-6 py-4 rounded-full text-center font-bold mt-4">Get Free Quote</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

