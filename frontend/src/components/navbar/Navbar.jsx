"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { scrollToSection } from "../../lib/utils";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import styles from "./navbar.module.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
  { label: "About Us", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

const NAV_CTA = {
  label: "Get in Touch",
  href: "#contact",
};

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isScrolled } = useScrollPosition();

  const handleNav = (href) => scrollToSection(href);

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles["header--scrolled"] : ""}`}
      >
        <nav className={styles.nav} aria-label="Main navigation">
          {/* Logo */}
          <a
            href="#home"
            className={styles.logo}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
          >
            <span className={styles.logo__dot} aria-hidden="true" />
            <span className={styles.logo__text}>SixLabs</span>
          </a>

          {/* Desktop links */}
          <ul className={styles.links} role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className={styles.link}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className={styles.right}>
            <ThemeToggle />
            <button
              onClick={() => handleNav(NAV_CTA.href)}
              className={styles.cta}
            >
              {NAV_CTA.label}
            </button>
            {/* Hamburger */}
            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
