import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ['400', '600', '700', '800'], display: 'swap' });

export const metadata: Metadata = {
  title: "Sublime Sports Apparel | Premium Sublimation & Custom Uniforms",
  description: "Premium sportswear manufacturer specializing in custom sublimation printing, team uniforms, and embroidered patches for brands, clubs, and businesses worldwide.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Sublime Sports Apparel | Premium Sportswear Manufacturing",
    description: "High-quality custom sportswear, sublimation printing, uniforms, and embroidered patches. Request a free quote today.",
    images: ["/images/newlogo2.png"],
    type: "website",
  },
  keywords: ["sublimation printing", "custom sportswear", "team uniforms", "football jerseys", "basketball uniforms", "embroidery digitizing"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans bg-secondary">{children}</body>
    </html>
  );
}

