"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const products = [
  { title: "Custom Football Kits", desc: "Vibrant sublimated jerseys & shorts.", img: "https://z-cdn-media.chatglm.cn/files/050c079e-a68c-4265-a02f-5a4f3374fb6b.png?auth_key=1882131241-d65e28d1e4ee47478018e11c797bd93d-0-63de88d729332b2d8de22b383c3523e2" },
  { title: "Full Soccer Uniforms", desc: "Jerseys, shorts, socks & equipment.", img: "https://z-cdn-media.chatglm.cn/files/b1a80459-a026-4ff9-bee3-a5f8f353d009.png?auth_key=1882131241-6db3fafb52964d25b60e52719648906b-0-70a7a94c838c4400c7bb7e65f437e31b" },
  { title: "Team Soccer Jerseys", desc: "Multi-color kits for any club.", img: "https://z-cdn-media.chatglm.cn/files/c01f1516-c184-4f99-93d6-d9aeddd42982.png?auth_key=1882131241-9a1f2a585ff04413a5bd26f6a5a3307b-0-125afb54ffc16a0502b6820b6d690459" },
  { title: "Baseball Jerseys", desc: "Tie-dye and classic button-ups.", img: "https://z-cdn-media.chatglm.cn/files/8392e93c-eacb-4752-817c-06b157b0e280.png?auth_key=1882131241-5e0d3ef9cd124b70b17fde42ea3c4ec2-0-31574fe1e7dd5394463ac303f690dca3" },
  { title: "Basketball Uniforms", desc: "Breathable tanks & shorts sets.", img: "https://z-cdn-media.chatglm.cn/files/cd4ae295-2092-474d-861a-547348dd2593.png?auth_key=1882131241-2ea63861f75349cb9f3a30ac18317d00-0-02687150ecc2fa95da606f776894cb46" },
  { title: "Dream Basketball Kits", desc: "Premium sets with shoes & socks.", img: "https://z-cdn-media.chatglm.cn/files/39fe9ff4-bfce-4fb6-9194-ab2be6e6ccef.png?auth_key=1882131241-9f66ae3c538849ee8f8fca03c0cdda12-0-7244f30a943b275ba17340cbdd3b0586" },
];

export default function Products() {
  return (
    <section id="products" className="py-32 bg-light-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">Our Products</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading text-4xl md:text-6xl font-extrabold mt-4">Premium Gear for Every Sport</motion.h2>
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-primary/50 text-lg max-w-md mt-4 md:mt-0">
            From football to basketball, we manufacture high-performance apparel tailored to your team's exact needs.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod, i) => (
            <motion.div key={prod.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="group relative bg-white rounded-2xl overflow-hidden shadow-luxury cursor-pointer border border-black/5">
              <div className="relative h-80 overflow-hidden">
                <img src={prod.img} alt={prod.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-8 flex justify-between items-center">
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-2">{prod.title}</h3>
                  <p className="text-base text-primary/50">{prod.desc}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-light-gray flex items-center justify-center group-hover:bg-accent transition-all duration-300 flex-shrink-0">
                  <ArrowUpRight className="w-6 h-6 text-primary group-hover:text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

