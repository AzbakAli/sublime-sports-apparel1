"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, UploadCloud, Send, Mail, Phone, MapPin, Clock, AlertCircle, Loader2, X } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sales@sublimesportsapparel.net",
    href: "mailto:sales@sublimesportsapparel.net",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(713) 367-1479",
    href: "tel:+17133671479",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Industrial Area, Karachi, Sindh, Pakistan",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Sat, 9:00 AM – 5:00 PM Central Standard Time (CST)",
  },
];

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Revoke object URLs on cleanup to avoid memory leaks
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    // Validate max 10 files
    if (files.length + selectedFiles.length > 10) {
      setError("Maximum 10 files allowed");
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif", "application/pdf", "application/postscript"];
    const maxSize = 10 * 1024 * 1024; // 10MB per file
    const maxTotalSize = 40 * 1024 * 1024; // 40MB total (Resend limit)

    const validFiles: File[] = [];
    const newPreviewUrls: string[] = [];

    for (const file of selectedFiles) {
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        setError(`Invalid file type: ${file.name}. Allowed: PNG, JPG, JPEG, WEBP, GIF, PDF, AI`);
        return;
      }

      // Validate file size
      if (file.size > maxSize) {
        setError(`File size exceeds 10MB limit: ${file.name}`);
        return;
      }

      validFiles.push(file);

      // Create preview URL for images
      if (file.type.startsWith("image/")) {
        newPreviewUrls.push(URL.createObjectURL(file));
      } else {
        newPreviewUrls.push("");
      }
    }

    // Validate total size
    const currentTotalSize = files.reduce((sum, f) => sum + f.size, 0);
    const newFilesTotalSize = validFiles.reduce((sum, f) => sum + f.size, 0);
    if (currentTotalSize + newFilesTotalSize > maxTotalSize) {
      setError("Total file size exceeds 40MB limit");
      return;
    }

    setFiles([...files, ...validFiles]);
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    setError(null);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    
    // Revoke the URL being removed
    URL.revokeObjectURL(previewUrls[index]);
    
    setFiles(newFiles);
    setPreviewUrls(newPreviewUrls);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Add files if present
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("/.netlify/functions/submit-quote", {
        method: "POST",
        body: formData,
      });

      // Check if response has content before parsing JSON
      const text = await response.text();
      let data;
      
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error("Failed to parse response:", text);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setSubmitted(true);
      form.reset();
      // Revoke all preview URLs
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      setFiles([]);
      setPreviewUrls([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 md:py-32 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">Get Started</span>
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold mt-4 text-white">Request a Free Quote</h2>
          <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto">
            Fill out the form below or reach us directly. Our team in Karachi, Pakistan will respond promptly with a quotation.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Contact sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <h3 className="font-heading text-2xl font-bold text-white mb-6">Contact Information</h3>
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-white/85 text-sm leading-relaxed">{item.value}</div>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 bg-secondary p-8 md:p-12 rounded-[2rem] shadow-luxury border border-accent/20"
          >
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
                    <input required type="text" name="fullName" className="w-full px-5 py-4 rounded-xl bg-light-gray border border-transparent focus:border-accent focus:bg-white focus:outline-none transition-all" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary/70 mb-3">Company / Team Name</label>
                    <input type="text" name="company" className="w-full px-5 py-4 rounded-xl bg-light-gray border border-transparent focus:border-accent focus:bg-white focus:outline-none transition-all" placeholder="Your brand or club name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary/70 mb-3">Email</label>
                    <input required type="email" name="email" className="w-full px-5 py-4 rounded-xl bg-light-gray border border-transparent focus:border-accent focus:bg-white focus:outline-none transition-all" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary/70 mb-3">Phone</label>
                    <input required type="tel" name="phone" className="w-full px-5 py-4 rounded-xl bg-light-gray border border-transparent focus:border-accent focus:bg-white focus:outline-none transition-all" placeholder="(713) 367-1479" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-primary/70 mb-3">Country</label>
                    <input required type="text" name="country" defaultValue="Pakistan" className="w-full px-5 py-4 rounded-xl bg-light-gray border border-transparent focus:border-accent focus:bg-white focus:outline-none transition-all" placeholder="Pakistan" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-primary/70 mb-3">Service Required</label>
                    <select required name="service" className="w-full px-5 py-4 rounded-xl bg-light-gray border border-transparent focus:border-accent focus:bg-white focus:outline-none transition-all">
                      <option value="">Select a service</option>
                      <option>Sublimation Printing</option>
                      <option>Custom Sportswear</option>
                      <option>Embroidery &amp; Digitizing</option>
                      <option>Custom Patches</option>
                      <option>DTF Printing</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-primary/70 mb-3">Message</label>
                    <textarea required rows={4} name="message" className="w-full px-5 py-4 rounded-xl bg-light-gray border border-transparent focus:border-accent focus:bg-white focus:outline-none transition-all resize-none" placeholder="Tell us about your project, quantities, and timelines..."></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-primary/70 mb-3">Upload Design/File (Optional)</label>
                    {files.length === 0 ? (
                      <div className="w-full px-5 py-8 rounded-xl bg-light-gray border border-dashed border-primary/20 flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-colors" onClick={() => fileInputRef.current?.click()}>
                        <UploadCloud className="w-10 h-10 text-primary/30 mb-3" />
                        <span className="text-sm text-primary/60 font-medium">Click to upload or drag and drop</span>
                        <span className="text-xs text-primary/30 mt-2">PNG, JPG, JPEG, WEBP, GIF, PDF, AI up to 10MB each (max 10 files, 40MB total)</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          className="hidden"
                          accept=".png,.jpg,.jpeg,.webp,.gif,.pdf,.ai"
                          onChange={handleFileChange}
                        />
                      </div>
                    ) : (
                      <div className="w-full p-4 rounded-xl bg-light-gray border border-primary/20">
                        <div className="space-y-3">
                          {files.map((file, index) => (
                            <div key={index} className="flex items-start gap-4">
                              {previewUrls[index] ? (
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                                  <img src={previewUrls[index]} alt={file.name} className="w-full h-full object-cover" />
                                </div>
                              ) : (
                                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <UploadCloud className="w-6 h-6 text-primary/40" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-primary truncate">{file.name}</p>
                                <p className="text-xs text-primary/50 mt-1">{formatFileSize(file.size)}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                                className="p-2 rounded-lg hover:bg-red-50 text-primary/50 hover:text-red-500 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-4 text-sm text-accent font-medium hover:text-accent/80 transition-colors"
                        >
                          + Add more files
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          className="hidden"
                          accept=".png,.jpg,.jpeg,.webp,.gif,.pdf,.ai"
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                  {error && (
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-red-600">{error}</span>
                      </div>
                    </div>
                  )}
                  <div className="md:col-span-2 mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-yellow-600 text-primary px-8 py-5 rounded-xl font-bold hover:shadow-gold-glow transition-all duration-300 hover:scale-[1.02] text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit Quote Request
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
