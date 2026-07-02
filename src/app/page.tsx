import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Trusted from "@/components/Trusted";
import About from "@/components/About";
import SublimationHighlight from "@/components/SublimationHighlight";
import Products from "@/components/Products";
import Manufacturing from "@/components/Manufacturing";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import QuoteForm from "@/components/QuoteForm";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <Trusted />
      <Products />
      <SublimationHighlight />
      <About />
      <Manufacturing />
      <WhyChooseUs />
      <Services />
      <QuoteForm />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

