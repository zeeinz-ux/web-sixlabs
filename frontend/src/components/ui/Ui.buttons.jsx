'use client';

import { cn } from '../../lib/utils';
import styles from './Ui.module.css';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  disabled = false,
  type = 'button',
  ...props
}) {
  const classes = cn(
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    disabled && styles['btn--disabled'],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}

/* ── Card ── */
export function Card({ children, hoverable = false, className, ...props }) {
  return (
    <div
      className={cn(
        styles.card,
        hoverable && styles['card--hoverable'],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── Badge ── */
export function Badge({ children, color = 'blue', className, ...props }) {
  return (
    <span
      className={cn(styles.badge, styles[`badge--${color}`], className)}
      {...props}
    >
      {children}
    </span>
  );
}

/* ── Container ── */
export function Container({ children, className, ...props }) {
  return (
    <div className={cn(styles.container, className)} {...props}>
      {children}
    </div>
  );
}

/* ── Section Heading ── */
export function SectionHeading({
  label,
  title,
  subtitle,
  center = false,
  className,
}) {
  return (
    <div
      className={cn(
        styles.sectionHeading,
        center && styles['sectionHeading--center'],
        className,
      )}
    >
      {label && (
        <p className={styles.sectionHeading__label}>
          <span>—</span> {label}
        </p>
      )}
      <h2 className={styles.sectionHeading__title}>{title}</h2>
      {subtitle && (
        <p className={styles.sectionHeading__subtitle}>{subtitle}</p>
      )}
    </div>
  );
}
