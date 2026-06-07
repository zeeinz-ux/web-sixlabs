import { useState } from "react";
import { Send, Loader2, CheckCircle2, Mail, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/Ui.buttons.jsx";
import { WhatsAppButton } from "@/components/buttons/Buttons.jsx";
import styles from "./css/Contact.module.css";

const CONTACT = {
  email: "sixlabs0523@gmail.com",
  whatsapp: "+62 852 8594 4423",
  whatsappDisplay: "+62 852 8594 4423",
  whatsappMessage:
    "Halo SixLabs! Saya tertarik untuk mendiskusikan project bersama kalian.",
  instagram: "https://instagram.com/sixlabs",
  linkedin: "https://linkedin.com/company/sixlabs",
  github: "https://github.com/sixlabs",
  location: "Indonesia 🇮🇩",
};

const INITIAL = { name: "", email: "", service: "", message: "" };

const SERVICES = [
  "Web Application",
  "Mobile Application",
  "Company Profile",
  "Landing Page",
  "SEO Optimization",
  "Other",
];

function ContactForm() {
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
      // Mengambil base URL dari environment variable, fallback ke localhost jika kosong
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(`${baseUrl}/api/v1/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit");
      }

      setStatus("success");
      setForm(INITIAL);
    } catch (error) {
      console.error("[Contact Form Error]", error);
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
          placeholder="Six Labs"
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
          placeholder="sixlabs@example.com"
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

const INFO_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Indonesia 🇮🇩",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Balasan dalam 1×24 jam",
    href: null,
  },
];

function ContactInfo() {
  return (
    <div className={styles.info}>
      <div className={styles.infoHeader}>
        <h3 className={styles.infoTitle}>Siap Mulai Project Bersama?</h3>
        <p className={styles.infoDesc}>
          Hubungi kami sekarang dan diskusikan kebutuhan digital kamu bersama
          tim SixLabs. Konsultasi pertama gratis!
        </p>
      </div>

      <div className={styles.infoItems}>
        {INFO_ITEMS.map((item) => {
          const Icon = item.icon;
          const content = (
            <div className={styles.infoItem} key={item.label}>
              <div className={styles.infoIcon}>
                <Icon size={18} />
              </div>
              <div>
                <p className={styles.infoLabel}>{item.label}</p>
                <p className={styles.infoValue}>{item.value}</p>
              </div>
            </div>
          );
          return item.href ? (
            <a href={item.href} key={item.label} className={styles.infoLink}>
              {content}
            </a>
          ) : (
            <div key={item.label}>{content}</div>
          );
        })}
      </div>

      <WhatsAppButton label="Chat Langsung di WhatsApp" size="lg" />
    </div>
  );
}

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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactForm />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
