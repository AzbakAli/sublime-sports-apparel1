"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, ShoppingBag, Clock, Truck, RotateCcw, FileText, AlertCircle, Mail, Phone } from "lucide-react";

const sections = [
  {
    icon: Shield,
    title: "Acceptance of Terms",
    content: "By accessing and using Sublime Sports Apparel's website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site."
  },
  {
    icon: ShoppingBag,
    title: "Products and Services",
    content: "Sublime Sports Apparel offers custom sportswear, sublimation printing, embroidery services, and custom patches. All products are manufactured to order based on customer specifications. We reserve the right to refuse service to anyone at any time."
  },
  {
    icon: FileText,
    title: "Orders and Payment",
    content: "All orders are subject to acceptance and availability. We reserve the right to limit quantities and to refuse orders. Payment must be received before production begins. Prices are subject to change without notice."
  },
  {
    icon: AlertCircle,
    title: "Custom Orders",
    content: "Custom orders are non-refundable and non-returnable unless defective. Customers are responsible for ensuring all design specifications, colors, and sizes are correct before production begins. We are not responsible for errors in customer-provided artwork or specifications."
  },
  {
    icon: Clock,
    title: "Production Time",
    content: "Production times vary based on order complexity and volume. Standard production takes 2-3 weeks. Rush orders may be available at additional cost. We make every effort to meet delivery deadlines but are not responsible for delays caused by factors beyond our control."
  },
  {
    icon: Truck,
    title: "Shipping",
    content: "We ship worldwide using reputable carriers. Shipping costs are calculated based on destination and weight. Risk of loss transfers to the buyer upon delivery to the carrier. International customers are responsible for any customs duties, taxes, or import fees."
  },
  {
    icon: RotateCcw,
    title: "Returns and Refunds",
    content: "Due to the custom nature of our products, we do not accept returns or exchanges unless the product is defective. Defective items will be replaced or refunded at our discretion. Claims must be made within 7 days of receipt."
  },
  {
    icon: Shield,
    title: "Intellectual Property",
    content: "Customers represent and warrant that they have the right to use any artwork, logos, or designs provided to Sublime Sports Apparel. We are not responsible for copyright or trademark infringement. All designs created by Sublime Sports Apparel remain our property until full payment is received."
  },
  {
    icon: AlertCircle,
    title: "Limitation of Liability",
    content: "Sublime Sports Apparel shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services. Our total liability shall not exceed the purchase price of the product."
  },
  {
    icon: FileText,
    title: "Privacy Policy",
    content: "Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the website and informs users of our data collection practices."
  },
  {
    icon: AlertCircle,
    title: "Changes to Terms",
    content: "We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the modified terms."
  }
];

export default function TermsOfService() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <section className="py-32 bg-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">Legal</span>
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-primary mt-4 mb-6">Terms of Service</h1>
            <p className="text-primary/50 text-lg max-w-2xl mx-auto">
              Please read these terms carefully before using our services
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mt-6">
              <span className="text-sm text-primary/60">Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </motion.div>

          <div className="grid gap-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-8 border border-black/5 shadow-luxury hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-xl font-bold text-primary mb-3">
                        {index + 1}. {section.title}
                      </h3>
                      <p className="text-primary/70 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 bg-primary rounded-2xl p-8 text-white"
          >
            <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
              <Mail className="w-6 h-6 text-accent" />
              Contact Information
            </h3>
            <p className="text-white/70 mb-6">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="mailto:sales@sublimesportsapparel.net"
                className="flex items-center gap-3 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-white/90">sales@sublimesportsapparel.net</span>
              </a>
              <a
                href="tel:+17133671479"
                className="flex items-center gap-3 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Phone className="w-5 h-5 text-accent" />
                <span className="text-white/90">(713) 367-1479</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
