"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Ui.buttons.jsx";
import styles from "./css/Portfolio.module.css";

const PORTFOLIO = [
  {
    id: 1,
    title: "Toko Digital",
    category: "Web Application",
    description:
      "Platform e-commerce modern dengan sistem pembayaran terintegrasi dan dashboard admin real-time.",
    tech: ["React + Vite", "Stripe", "Prisma"],
    image: "/images/portfolio/project-1.jpg",
    color: "#3b82f6",
    link: "#",
  },
  {
    id: 2,
    title: "FinTrack App",
    category: "Mobile Application",
    description:
      "Aplikasi manajemen keuangan personal untuk iOS & Android dengan visualisasi data yang elegan.",
    tech: ["React Native", "Firebase", "Chart.js"],
    image: "/images/portfolio/project-2.jpg",
    color: "#8b5cf6",
    link: "#",
  },
  {
    id: 3,
    title: "Konsultan Prima",
    category: "Company Profile",
    description:
      "Website company profile untuk firma konsultan profesional dengan desain corporate premium.",
    tech: ["React + Vite", "Tailwind", "Sanity CMS"],
    image: "/images/portfolio/project-3.jpg",
    color: "#06b6d4",
    link: "#",
  },
  {
    id: 4,
    title: "LaunchPad",
    category: "Landing Page",
    description:
      "Landing page high-conversion untuk startup SaaS dengan animasi modern dan A/B testing built-in.",
    tech: ["React + Vite", "Framer Motion", "Analytics"],
    image: "/images/portfolio/project-4.jpg",
    color: "#10b981",
    link: "#",
  },
  {
    id: 5,
    title: "EduNusa Platform",
    category: "Web Application",
    description:
      "Platform edukasi online dengan fitur video streaming, quiz interaktif, dan sertifikasi digital.",
    tech: ["React + Vite", "Supabase", "WebRTC"],
    image: "/images/portfolio/project-5.jpg",
    color: "#f59e0b",
    link: "#",
  },
  {
    id: 6,
    title: "Growth Studio",
    category: "SEO Optimization",
    description:
      "Strategi SEO komprehensif yang meningkatkan organic traffic sebesar 340% dalam 6 bulan.",
    tech: ["Google Search Console", "Semrush", "Analytics"],
    image: "/images/portfolio/project-6.jpg",
    color: "#ef4444",
    link: "#",
  },
];

const PORTFOLIO_CATEGORIES = [
  "All",
  "Web Application",
  "Mobile Application",
  "Company Profile",
  "Landing Page",
  "SEO Optimization",
];

function PortfolioCard({ item, index }) {
  return (
    <motion.div
      className={styles.card}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      {/* Image placeholder */}
      <div
        className={styles.card__image}
        style={{ background: `${item.color}15` }}
      >
        <div
          className={styles.card__imagePlaceholder}
          style={{ color: item.color }}
        >
          <span style={{ fontSize: "2.5rem" }}>
            {item.category === "Web Application" && "🌐"}
            {item.category === "Mobile Application" && "📱"}
            {item.category === "Company Profile" && "🏢"}
            {item.category === "Landing Page" && "🎯"}
            {item.category === "SEO Optimization" && "📈"}
          </span>
        </div>
        <div className={styles.card__overlay}>
          <a
            href={item.link}
            className={styles.card__link}
            aria-label={`View ${item.title}`}
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      <div className={styles.card__body}>
        <span
          className={styles.card__category}
          style={{ background: `${item.color}18`, color: item.color }}
        >
          {item.category}
        </span>
        <h3 className={styles.card__title}>{item.title}</h3>
        <p className={styles.card__desc}>{item.description}</p>
        <div className={styles.card__tech}>
          {item.tech.map((t) => (
            <span key={t} className={styles.card__techTag}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function PortfolioSection() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.category === active);

  return (
    <section id="portfolio" className={styles.section}>
      <Container>
        <SectionHeading
          label="Our Work"
          title="Proyek pilihan kami"
          subtitle="Beberapa project terbaik yang sudah kami bangun untuk klien dari berbagai industri."
          center
        />

        {/* Filter tabs */}
        <div className={styles.filters}>
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`${styles.filterBtn} ${active === cat ? styles["filterBtn--active"] : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div className={styles.grid} layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <PortfolioCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
