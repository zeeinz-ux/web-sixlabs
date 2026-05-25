"use client";

import { cn } from "@/lib/utils";
import styles from "./ui.module.css";

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  disabled = false,
  type = "button",
  ...props
}) {
  const classes = cn(
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    disabled && styles["btn--disabled"],
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
