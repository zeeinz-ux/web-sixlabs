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
import { SERVICES } from "@/constants/services";
import { Container, SectionHeading } from "@/components/ui/index.jsx";
import styles from "./services.module.css";

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
