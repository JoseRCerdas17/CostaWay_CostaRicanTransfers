"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const trustImages = [
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
  "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80",
];

export default function TrustSection() {
  const t = useTranslations();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-surface-container-low py-xl">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
          <div className="lg:col-span-7 flex flex-col gap-lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <motion.p
                className="font-data-label text-[14px] text-[--color-tide] uppercase tracking-wider mb-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {t("trust.label")}
              </motion.p>
              <h2 className="font-display text-[48px] text-primary leading-[1.1] mb-md">
                {t("trust.title")}
              </h2>
              <p className="font-body text-[16px] text-on-surface-variant leading-relaxed">
                {t("trust.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <motion.div
                className="bg-surface-container-lowest card-border rounded-lg p-md"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(31, 58, 46, 0.1)" }}
              >
                <div className="w-12 h-12 bg-[--color-tide]/10 rounded-lg flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined text-[--color-tide] text-[24px]">explore</span>
                </div>
                <h3 className="font-headline text-[24px] text-primary mb-sm">
                  {t("trust.localExpertise.title")}
                </h3>
                <p className="font-data-value text-[14px] text-on-surface-variant leading-[1.5]">
                  {t("trust.localExpertise.description")}
                </p>
              </motion.div>

              <motion.div
                className="bg-surface-container-lowest card-border rounded-lg p-md"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(31, 58, 46, 0.1)" }}
              >
                <div className="w-12 h-12 bg-[--color-tide]/10 rounded-lg flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined text-[--color-tide] text-[24px]">shield</span>
                </div>
                <h3 className="font-headline text-[24px] text-primary mb-sm">
                  {t("trust.safetyProtocol.title")}
                </h3>
                <p className="font-data-value text-[14px] text-on-surface-variant leading-[1.5]">
                  {t("trust.safetyProtocol.description")}
                </p>
              </motion.div>
            </div>

            <motion.div
              className="grid grid-cols-3 gap-md"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {[
                { value: "500+", label: t("trust.stats.transfers") },
                { value: "4.9", label: t("trust.stats.rating") },
                { value: "24/7", label: t("trust.stats.support") },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <p className="font-display text-[36px] text-primary font-bold">{stat.value}</p>
                  <p className="font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <div className="aspect-[4/5] bg-surface-container-highest card-border rounded-lg overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full"
                >
                  <Image
                    alt="Professional Costa Rica transfer driver"
                    src={trustImages[0]}
                    fill
                    className="object-cover grayscale-[20%]"
                    unoptimized
                  />
                </motion.div>
              </div>

              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-lg overflow-hidden card-border shadow-lg"
                initial={{ scale: 0, rotate: -10 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <Image
                  alt="Costa Rica scenic route"
                  src={trustImages[1]}
                  fill
                  className="object-cover grayscale-[20%]"
                  unoptimized
                />
              </motion.div>

              <motion.div
                className="absolute -top-2 -left-2 bg-[--color-sunset] text-white px-md py-sm rounded-lg shadow-lg"
                initial={{ x: -20, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <span className="font-data-label text-[12px] font-bold">Trusted</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}