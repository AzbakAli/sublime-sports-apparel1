"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, UploadCloud, Send } from "lucide-react";

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-accent/5 to-transparent"></div>
      
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">Get Started</span>
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold mt-4 text-white">Request a Free Quote</h2>
          <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto">Fill out the form below and our team will contact you shortly with a quotation.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-secondary p-8 md:p-12 rounded-[2rem] shadow-luxury border border-accent/20">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-20">
                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mb-8">
                  <CheckCircle className="w-12 h-12 text-accent" />
                </div>
                <h3 className="font-heading text-3xl font-bold mb-4">Thank You!</h3>
                <p className="text-primary/60 text-lg max-w-md">Our team will contact you shortly with a quotation.</p>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary/70 mb-3">Full Name</label>
                  <input required type="text" className="w-full px-5 py-4 rounded-xl bg-light-gray border border-transparent focus:border-accent focus:bg-white focus:outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary/70 mb-3">Company Name</label>
                  <input type="text" className="w-full px-5 py-4 rounded-xl bg-light-gray border border-transparent focus:border-accent focus:bg-white focus:outline-none transition-all" placeholder="Your Brand Inc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary/70 mb-3">Email</label>
                  <input required type="email" className="w-full px-5 py-4 rounded-xl bg-light-gray border border-transparent focus:border-accent focus:bg-white focus:outline-none transition-all" placeholder="john@brand.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary/70 mb-3">Phone</label>
                  <input type="tel" className="w-full px-5 py-4 rounded-xl bg-light-gray border border-transparent focus:border-accent focus:bg-white focus:outline-none transition-all" placeholder="+1 234 567 890" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary/70 mb-3">Country</label>
                  <input type="text" className="w-full px-5 py-4 rounded-xl bg-light-gray border border-transparent focus:border-accent focus:bg-white focus:outline-none transition-all" placeholder="United States" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary/70 mb-3">Service Required</label>
                  <select required className="w-full px-5 py-4 rounded-xl bg-light-gray border border-transparent focus:border-accent focus:bg-white focus:outline-none transition-all">
                    <option value="">Select a service</option>
                    <option>Sublimation Printing</option>
                    <option>Custom Sportswear</option>
                    <option>Embroidery & Digitizing</option>
                    <option>Custom Patches</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary/70 mb-3">Message</label>
                  <textarea rows={4} className="w-full px-5 py-4 rounded-xl bg-light-gray border border-transparent focus:border-accent focus:bg-white focus:outline-none transition-all resize-none" placeholder="Tell us about your project, quantities, and timelines..."></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary/70 mb-3">Upload Design/File (Optional)</label>
                  <div className="w-full px-5 py-8 rounded-xl bg-light-gray border border-dashed border-primary/20 flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-colors">
                    <UploadCloud className="w-10 h-10 text-primary/30 mb-3" />
                    <span className="text-sm text-primary/60 font-medium">Click to upload or drag and drop</span>
                    <span className="text-xs text-primary/30 mt-2">PNG, JPG, PDF, AI up to 10MB</span>
                  </div>
                </div>
                <div className="md:col-span-2 mt-4">
                  <button type="submit" className="w-full group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-black text-white px-8 py-5 rounded-xl font-bold hover:shadow-luxury transition-all duration-300 hover:scale-[1.02] text-lg">
                    Submit Quote Request
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

