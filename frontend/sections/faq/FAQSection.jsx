"use client";

import { SectionHeading } from "@/components/ui/index.jsx";
import { FAQItem } from "./FAQItem";
import { FAQ } from "@/constants/faq";
import styles from "./faq.module.css";

export function FAQSection() {
  return (
    <section id="faq" className={styles.section}>
      <div className="container">
        <SectionHeading
          badge="FAQ"
          title="Pertanyaan yang"
          highlight="Sering Diajukan"
          subtitle="Punya pertanyaan lain? Langsung hubungi kami melalui WhatsApp atau email."
        />

        <div className={styles.list}>
          {FAQ.map((item, i) => (
            <FAQItem key={item.id} item={item} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
