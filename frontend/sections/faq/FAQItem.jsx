"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./faq.module.css";

export function FAQItem({ item, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`${styles.item} ${open ? styles.itemOpen : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className={styles.question}
        aria-expanded={open}
      >
        <span>{item.question}</span>
        <ChevronDown
          size={20}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={styles.answerWrap}
          >
            <p className={styles.answer}>{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
