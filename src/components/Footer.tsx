import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 md:grid-cols-2 gap-16">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-yellow-700 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">S</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-xl tracking-wide">SUBLIME</span>
              <span className="text-[10px] tracking-[0.3em] text-accent">SPORTS APPAREL</span>
            </div>
          </div>
          <p className="text-white/40 text-sm leading-relaxed">
            Premium sublimation printing & custom sportswear manufacturing. Building athletic identities worldwide.
          </p>
          <div className="flex gap-4 mt-8">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/5 hover:bg-accent hover:text-primary flex items-center justify-center transition-colors duration-300">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-bold text-lg mb-8">Quick Links</h4>
          <ul className="space-y-4 text-white/50 text-sm">
            <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
            <li><a href="#sublimation" className="hover:text-accent transition-colors">Sublimation</a></li>
            <li><a href="#products" className="hover:text-accent transition-colors">Products</a></li>
            <li><a href="#contact" className="hover:text-accent transition-colors">Get Quote</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-lg mb-8">Services</h4>
          <ul className="space-y-4 text-white/50 text-sm">
            <li>Sublimation Printing</li>
            <li>Custom Sportswear</li>
            <li>Embroidery & Digitizing</li>
            <li>Screen Printing</li>
            <li>Custom Patches</li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-lg mb-8">Contact Us</h4>
          <ul className="space-y-6 text-white/50 text-sm">
            <li className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span>sales@sublimesports.com</span>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span>+1 (800) 123-4567</span>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span>123 Industry Blvd, Manufacturing District, CA 90210</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 mt-20 pt-8 max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/30 text-xs">© {new Date().getFullYear()} Sublime Sports Apparel. All rights reserved.</p>
        <div className="flex gap-8 text-white/30 text-xs">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}