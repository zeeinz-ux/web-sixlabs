"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PORTFOLIO, PORTFOLIO_CATEGORIES } from "@/constants/portfolio";
import { Container, SectionHeading } from "@/components/ui/index.jsx";
import styles from "./portfolio.module.css";

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
