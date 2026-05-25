"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import styles from "./contact.module.css";

const INITIAL = { name: "", email: "", service: "", message: "" };

const SERVICES = [
  "Web Application",
  "Mobile Application",
  "Company Profile",
  "Landing Page",
  "SEO Optimization",
  "Other",
];

export function ContactForm() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Nama wajib diisi";
    if (!form.email.trim()) errs.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Format email tidak valid";
    if (!form.message.trim()) errs.message = "Pesan wajib diisi";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus("loading");

    try {
      // TODO: Replace with Firestore integration in Stage 2
      // await addDoc(collection(db, 'contacts'), { ...form, timestamp: serverTimestamp() });
      await new Promise((r) => setTimeout(r, 1200)); // simulate API call
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.successState}>
        <CheckCircle2 size={40} style={{ color: "#22c55e" }} />
        <h3>Pesan Terkirim!</h3>
        <p>
          Terima kasih sudah menghubungi kami. Tim SixLabs akan membalas dalam
          1×24 jam.
        </p>
        <button onClick={() => setStatus("idle")} className={styles.resetBtn}>
          Kirim pesan lain
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Name */}
      <div className={styles.field}>
        <label className={styles.label}>Nama Lengkap *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
        />
        {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
      </div>

      {/* Email */}
      <div className={styles.field}>
        <label className={styles.label}>Email Address *</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
        />
        {errors.email && (
          <span className={styles.errorMsg}>{errors.email}</span>
        )}
      </div>

      {/* Service */}
      <div className={styles.field}>
        <label className={styles.label}>Layanan yang Dibutuhkan</label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className={styles.input}
        >
          <option value="">Pilih layanan...</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className={styles.field}>
        <label className={styles.label}>Ceritakan Project Kamu *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Halo SixLabs! Saya ingin membuat..."
          rows={5}
          className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ""}`}
        />
        {errors.message && (
          <span className={styles.errorMsg}>{errors.message}</span>
        )}
      </div>

      {status === "error" && (
        <p className={styles.errorMsg}>Terjadi kesalahan. Silakan coba lagi.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={styles.submitBtn}
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className={styles.spin} /> Mengirim...
          </>
        ) : (
          <>
            <Send size={18} /> Kirim Pesan
          </>
        )}
      </button>
    </form>
  );
}
