"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Building2,
  Layout,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Ui.buttons.jsx";
import styles from "./css/Services.module.css";

const SERVICES = [
  {
    id: "web-app",
    icon: "Globe",
    title: "Web Application",
    description:
      "Kami membangun web app modern yang scalable, cepat, dan siap production — dari MVP hingga platform enterprise.",
    features: [
      "React + Vite",
      "REST & GraphQL API",
      "Responsive UI",
      "Performance Optimized",
    ],
    color: "#3b82f6",
  },
  {
    id: "mobile-app",
    icon: "Smartphone",
    title: "Mobile Application",
    description:
      "Aplikasi mobile cross-platform yang berjalan mulus di iOS dan Android dengan user experience yang intuitif.",
    features: [
      "React Native",
      "iOS & Android",
      "Push Notification",
      "Offline Support",
    ],
    color: "#8b5cf6",
  },
  {
    id: "company-profile",
    icon: "Building2",
    title: "Company Profile",
    description:
      "Website company profile profesional yang merepresentasikan brand kamu dengan kesan premium dan terpercaya.",
    features: ["Custom Design", "Fast Loading", "SEO Ready", "CMS Integration"],
    color: "#06b6d4",
  },
  {
    id: "landing-page",
    icon: "Layout",
    title: "Landing Page",
    description:
      "Landing page high-converting yang dirancang untuk menarik leads dan meningkatkan conversion rate bisnis kamu.",
    features: [
      "Conversion Focused",
      "A/B Testing Ready",
      "Analytics Integrated",
      "Mobile First",
    ],
    color: "#10b981",
  },
  {
    id: "seo",
    icon: "TrendingUp",
    title: "SEO Optimization",
    description:
      "Strategi SEO terukur untuk meningkatkan visibilitas organik website kamu di search engine secara signifikan.",
    features: [
      "Technical SEO",
      "On-Page SEO",
      "Content Strategy",
      "Monthly Report",
    ],
    color: "#f59e0b",
  },
];

const ICONS = { Globe, Smartphone, Building2, Layout, TrendingUp };

function ServiceCard({ service, index }) {
  const Icon = ICONS[service.icon] || Globe;

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        className={styles.card__icon}
        style={{ color: service.color, background: `${service.color}18` }}
      >
        <Icon size={22} strokeWidth={1.75} />
      </div>

      <h3 className={styles.card__title}>{service.title}</h3>
      <p className={styles.card__desc}>{service.description}</p>

      <ul className={styles.card__features}>
        {service.features.map((f) => (
          <li key={f} className={styles.card__feature}>
            <CheckCircle2
              size={13}
              style={{ color: service.color, flexShrink: 0 }}
            />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className={styles.section}>
      <Container>
        <SectionHeading
          label="What We Do"
          title="Layanan yang kami tawarkan"
          subtitle="Dari web app hingga SEO — kami hadir sebagai mitra teknologi yang siap membantu bisnis kamu tumbuh secara digital."
          center
        />

        <div className={styles.grid}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
