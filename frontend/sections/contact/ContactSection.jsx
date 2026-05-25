"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/index.jsx";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import styles from "./contact.module.css";

export function ContactSection() {
  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <SectionHeading
          badge="Contact Us"
          title="Hubungi"
          highlight="SixLabs"
          subtitle="Ada project yang ingin kamu kerjakan? Ceritakan kepada kami dan kita mulai diskusi."
        />

        <div className={styles.grid}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactForm />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ContactInfo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
