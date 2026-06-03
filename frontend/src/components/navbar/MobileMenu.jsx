"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { scrollToSection } from "../../lib/utils";
import styles from "./navbar.module.css";

// Inlined navigation links to fix build error
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
  { label: "About Us", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

const NAV_CTA = { href: "#contact", label: "Hubungi Kami" };

export function MobileMenu({ isOpen, onClose }) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNav = (href) => {
    scrollToSection(href);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={styles.mobileBackdrop} onClick={onClose} />

      {/* Drawer */}
      <div
        className={styles.mobileMenu}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className={styles.mobileMenu__header}>
          <span className={styles.mobileLogo}>SixLabs</span>
          <button
            onClick={onClose}
            className={styles.mobileClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className={styles.mobileNav}>
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={styles.mobileNavLink}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className={styles.mobileMenu__footer}>
          <button
            onClick={() => handleNav(NAV_CTA.href)}
            className={styles.mobileCTA}
          >
            {NAV_CTA.label}
          </button>
        </div>
      </div>
    </>
  );
}
