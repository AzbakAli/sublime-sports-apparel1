"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const productTypes = [
  { name: "Baseball", href: "/products/baseball" },
  { name: "Basketball", href: "/products/basketball" },
  { name: "Soccer", href: "/products/soccer" },
  { name: "Football", href: "/products/football" },
  { name: "Ice Hockey", href: "/products/icehockey" },
  { name: "Sublimated Hoodies", href: "/products/sublimatedhoodies" },
  { name: "T-Shirts & Polo", href: "/products/sublimatedtshirtpolo" },
];

export default function ProductNavigation() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white border-b border-gray-200 pt-36">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide">
          {productTypes.map((product, index) => {
            const isActive = pathname === product.href;
            return (
              <div key={product.href} className="flex items-center">
                <Link
                  href={product.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-primary shadow-gold-glow"
                      : "bg-gray-100 text-primary/70 hover:bg-gray-200 hover:text-primary"
                  }`}
                >
                  {product.name}
                </Link>
                {index < productTypes.length - 1 && (
                  <div className="w-6 h-px bg-gray-300 mx-2 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
