import React from "react";
import styles from "./css/Home.module.css";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/utils";
import { Container } from "@/components/ui/Ui.buttons.jsx";

// === TAMBAHKAN IMPORT SEKSI LAIN DI SINI ===
// Karena file ini ada di dalam folder 'pages', kita panggil file di folder yang sama pakai './'
import { ServicesSection } from "./Services.jsx";
import { ContactSection } from "./Contact.jsx";
import { PortfolioSection } from "./Portfolio.jsx";
import { AboutSection } from "./About.jsx";
import { FAQSection } from "./Faq.jsx";

const HERO = {
  badge: "🚀 Digital Agency dari Indonesia",
  headline1: "Kami Membangun",
  headline2: "Produk Digital",
  headline3: "yang Benar-Benar Bekerja",
  subheadline:
    "Dari web app hingga mobile app — SixLabs membantu startup dan bisnis tumbuh dengan solusi software modern, scalable, dan siap production.",
  cta_primary: {
    label: "Lihat Layanan",
    href: "#services",
  },
  cta_secondary: {
    label: "Portofolio Kami",
    href: "#portfolio",
  },
};

const STATS = [
  { value: "20+", label: "Project Selesai" },
  { value: "15+", label: "Klien Puas" },
  { value: "6", label: "Tim Profesional" },
  { value: "1yr", label: "Pengalaman" },
];

function HeroIllustration() {
  return (
    <div className={styles.illustration}>
      {/* Main floating card */}
      <motion.div
        className={styles.card__main}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={styles.card__mainHeader}>
          <span
            className={styles.card__dot}
            style={{ background: "#ef4444" }}
          />
          <span
            className={styles.card__dot}
            style={{ background: "#f59e0b" }}
          />
          <span
            className={styles.card__dot}
            style={{ background: "#22c55e" }}
          />
          <span className={styles.card__mainTitle}>
            SixLabs — Project Brief
          </span>
        </div>
        <div className={styles.card__mainBody}>
          <div className={styles.card__row}>
            <span className={styles.card__label}>Client</span>
            <span className={styles.card__value}>PT. Maju Digital</span>
          </div>
          <div className={styles.card__row}>
            <span className={styles.card__label}>Type</span>
            <span className={styles.card__value}>Web Application</span>
          </div>
          <div className={styles.card__row}>
            <span className={styles.card__label}>Timeline</span>
            <span className={styles.card__value}>6 weeks</span>
          </div>
          <div className={styles.card__row}>
            <span className={styles.card__label}>Status</span>
            <span className={styles.statusBadge}>
              <span className={styles.statusDot} />
              In Progress
            </span>
          </div>
          <div className={styles.card__progress}>
            <div className={styles.card__progressBar}>
              <div
                className={styles.card__progressFill}
                style={{ width: "68%" }}
              />
            </div>
            <span className={styles.card__progressLabel}>68% complete</span>
          </div>
        </div>
      </motion.div>

      {/* Tech stack floating chip */}
      <motion.div
        className={styles.chip__tech}
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        React + Vite, Node.js, Tailwind CSS
      </motion.div>

      {/* Reviews chip */}
      <motion.div
        className={styles.chip__review}
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className={styles.avatarStack}>
          {["#3b82f6", "#8b5cf6", "#10b981"].map((c, i) => (
            <div key={i} className={styles.avatar} style={{ background: c }} />
          ))}
        </div>
        <div>
          <div className={styles.chip__reviewTitle}>15+ Happy Clients</div>
          <div className={styles.chip__stars}>★★★★★</div>
        </div>
      </motion.div>

      {/* Delivery chip */}
      <motion.div
        className={styles.chip__delivery}
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        <span className={styles.chip__deliveryIcon}>🚀</span>
        <span>On-time delivery</span>
      </motion.div>
    </div>
  );
}

function HeroSection() {
  return (
    <section id="home" className={styles.hero}>
      <Container>
        <div className={styles.split}>
          {/* Left: Text content */}
          <div className={styles.content}>
            <motion.div
              className={styles.badge}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Zap size={12} />
              {HERO.badge}
            </motion.div>

            <motion.h1
              className={styles.headline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {HERO.headline1}{" "}
              <span className={styles.headline__accent}>{HERO.headline2}</span>
              <br />
              {HERO.headline3}
            </motion.h1>

            <motion.p
              className={styles.subheadline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {HERO.subheadline}
            </motion.p>

            <motion.div
              className={styles.ctas}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                onClick={() => scrollToSection(HERO.cta_primary.href)}
                className={styles.ctaPrimary}
              >
                {HERO.cta_primary.label}
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => scrollToSection(HERO.cta_secondary.href)}
                className={styles.ctaSecondary}
              >
                {HERO.cta_secondary.label}
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className={styles.stats}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {STATS.map((stat, i) => (
                <div key={i} className={styles.stat}>
                  <span className={styles.stat__value}>{stat.value}</span>
                  <span className={styles.stat__label}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// === REVISI KOMPONEN UTAMA ===
function Home() {
  return (
    <div className={styles.homePage}>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}

export default Home;
