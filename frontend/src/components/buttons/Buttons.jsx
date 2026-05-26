'use client';

import { ArrowRight, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/constants';
import { buildWhatsAppLink, scrollToSection } from '@/lib/utils';
import styles from './buttons.module.css';

/* ── CTA Button ── */
export function CTAButton({
  label = 'Get in Touch',
  href = '#contact',
  icon = true,
  className = '',
}) {
  const handleClick = (e) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${styles.ctaBtn} ${className}`}
    >
      {label}
      {icon && <ArrowRight size={16} className={styles.ctaBtn__icon} />}
    </a>
  );
}

/* ── WhatsApp Button ── */
export function WhatsAppButton({
  label = 'Chat via WhatsApp',
  message,
  className = '',
}) {
  const msg = message || SITE.whatsappMsg;
  const link = buildWhatsAppLink(SITE.whatsapp, msg);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.waBtn} ${className}`}
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle size={16} />
      {label}
    </a>
  );
}
