import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/Ui.buttons.jsx";
import styles from "./css/Faq.module.css";

const FAQ = [
  {
    id: 1,
    question: "Berapa lama pengerjaan project?",
    answer:
      "Durasi pengerjaan tergantung kompleksitas project. Company profile dan landing page biasanya memakan waktu 1–2 minggu. Web app sederhana 3–6 minggu, dan aplikasi kompleks bisa 1–3 bulan. Kami selalu memberikan timeline yang jelas di awal.",
  },
  {
    id: 2,
    question: "Bagaimana sistem pembayaran yang berlaku?",
    answer:
      "Kami menggunakan sistem pembayaran bertahap: 50% di awal sebagai down payment setelah kontrak ditandatangani, dan 50% sisanya setelah project selesai dan kamu puas dengan hasilnya. Pembayaran via transfer bank atau e-wallet.",
  },
  {
    id: 3,
    question: "Apakah ada garansi dan free revision?",
    answer:
      "Ya! Setiap project mendapatkan garansi bug fixing selama 30 hari setelah launch, serta 3 kali free minor revision selama masa pengerjaan. Revision besar di luar scope awal akan didiskusikan terpisah.",
  },
  {
    id: 4,
    question: "Apakah SixLabs menerima project dari luar kota?",
    answer:
      "Tentu saja! Kami bekerja secara remote dan sudah terbiasa berkolaborasi dengan klien dari seluruh Indonesia bahkan luar negeri. Semua komunikasi dilakukan via WhatsApp, email, Google Meet, atau platform lain sesuai preferensi kamu.",
  },
  {
    id: 5,
    question: "Teknologi apa yang digunakan?",
    answer:
      "Kami menggunakan tech stack modern:  React + vite untuk frontend, Node.js / Firebase untuk backend, React Native untuk mobile, dan berbagai tools pendukung seperti Tailwind CSS, Prisma, Supabase, dan lainnya sesuai kebutuhan project.",
  },
  {
    id: 6,
    question: "Apakah bisa konsultasi gratis dulu?",
    answer:
      "Tentu! Kami menyediakan sesi konsultasi awal gratis selama 30–60 menit via WhatsApp atau Google Meet. Di sesi ini kita diskusi kebutuhan project kamu, dan kami berikan estimasi biaya serta timeline tanpa kewajiban apapun.",
  },
];

function FAQItem({ item, defaultOpen = false }) {
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
