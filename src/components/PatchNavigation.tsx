"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const patchTypes = [
  { name: "Embroidered", href: "/patches/embroidered" },
  { name: "Sublimated", href: "/patches/sublimated" },
  { name: "Woven", href: "/patches/woven" },
  { name: "PVC", href: "/patches/pvc" },
  { name: "Leather", href: "/patches/leather" },
  { name: "Chenille", href: "/patches/chenille" },
];

export default function PatchNavigation() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white border-b border-gray-200 pt-36">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {patchTypes.map((patch, index) => {
            const isActive = pathname === patch.href;
            return (
              <div key={patch.href} className="flex items-center">
                <Link
                  href={patch.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-primary shadow-gold-glow"
                      : "bg-gray-100 text-primary/70 hover:bg-gray-200 hover:text-primary"
                  }`}
                >
                  {patch.name} Patches
                </Link>
                {index < patchTypes.length - 1 && (
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
