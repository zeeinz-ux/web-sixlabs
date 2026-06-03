"use client";

import { SITE } from "../../lib/constants";
import { buildWhatsAppLink, scrollToSection } from "../../lib/utils";
import styles from "./footer.module.css";

// Inlined navigation links to fix build error
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
  { label: "About Us", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export function FooterLinks() {
  return (
    <div className={styles.linksGrid}>
      {/* Services */}
      <div className={styles.col}>
        <h4 className={styles.colTitle}>Services</h4>
        <ul className={styles.colList}>
          {[
            "Web Application",
            "Mobile Application",
            "Company Profile",
            "Landing Page",
            "SEO Optimization",
          ].map((s) => (
            <li key={s}>
              <button
                onClick={() => scrollToSection("#services")}
                className={styles.colLink}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Company */}
      <div className={styles.col}>
        <h4 className={styles.colTitle}>Company</h4>
        <ul className={styles.colList}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollToSection(link.href)}
                className={styles.colLink}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div className={styles.col}>
        <h4 className={styles.colTitle}>Contact</h4>
        <ul className={styles.colList}>
          <li>
            <a href={`mailto:${SITE.email}`} className={styles.colLink}>
              {SITE.email}
            </a>
          </li>
          <li>
            <a
              href={buildWhatsAppLink(SITE.whatsapp, SITE.whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.colLink}
            >
              WhatsApp
            </a>
          </li>
          <li>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.colLink}
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.colLink}
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.colLink}
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
