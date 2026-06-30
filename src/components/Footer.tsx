import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 md:grid-cols-2 gap-16">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <img
              src="/images/newlogo3.png"
              alt="Sublime Sports Apparel"
              className="h-40 w-auto"
            />
          </div>
          <p className="text-white/50 text-sm leading-relaxed">
            Premium sublimation printing, custom sportswear, and custom patches.
            Manufacturing excellence from Pakistan to the world.
          </p>
          <div className="flex gap-4 mt-8">
            {[Facebook, Instagram, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-accent hover:text-primary flex items-center justify-center transition-colors duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-bold text-lg mb-8">Quick Links</h4>
          <ul className="space-y-4 text-white/50 text-sm">
            <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
            <li><a href="/#about" className="hover:text-accent transition-colors">About Us</a></li>
            <li><a href="/#sublimation" className="hover:text-accent transition-colors">Sublimation</a></li>
            <li><a href="/#products" className="hover:text-accent transition-colors">Products</a></li>
            <li><a href="/#contact" className="hover:text-accent transition-colors">Get Quote</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-lg mb-8">Services</h4>
          <ul className="space-y-4 text-white/50 text-sm">
            <li>Sublimation Printing</li>
            <li>Custom Sportswear</li>
            <li>Embroidery &amp; Digitizing</li>
            <li>Screen Printing</li>
            <li>Custom Patches</li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-lg mb-8">Contact Us</h4>
          <ul className="space-y-6 text-white/50 text-sm">
            <li className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <a href="mailto:info@sublimesports.com" className="hover:text-accent transition-colors">
                info@sublimesports.com
              </a>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <a href="tel:+923001234567" className="hover:text-accent transition-colors">
                +92 300 123 4567
              </a>
            </li>
            <li className="flex items-start gap-4">
              <MessageCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span>WhatsApp: +92 300 123 4567</span>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span>
                Industrial Area, Sialkot,
                <br />
                Punjab, Pakistan
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 mt-20 pt-8 max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} Sublime Sports Apparel. All rights reserved. · Sialkot, Pakistan
        </p>
        <div className="flex gap-8 text-white/30 text-xs">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
