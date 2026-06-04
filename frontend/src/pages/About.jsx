"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Target,
  ShieldCheck,
  Rocket,
  Users,
  Sparkles,
} from "lucide-react";
import {
  Container,
  SectionHeading,
  Card,
} from "@/components/ui/Ui.buttons.jsx";
import styles from "./css/About.module.css";

const STORY_STATS = [
  { value: "6", label: "Tim Profesional" },
  { value: "5+", label: "Layanan Utama" },
  { value: "20+", label: "Project Selesai" },
  { value: "15+", label: "Klien Puas" },
];

const VALUES = [
  {
    icon: Rocket,
    title: "Modern Technology",
    text: "Menggunakan teknologi modern untuk menghasilkan produk digital yang cepat, aman, dan scalable.",
  },
  {
    icon: Users,
    title: "User Focused",
    text: "Setiap solusi dibangun dengan mempertimbangkan kebutuhan pengguna dan tujuan bisnis.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Development",
    text: "Proses pengembangan terstruktur dengan komunikasi yang jelas dan transparan.",
  },
  {
    icon: Sparkles,
    title: "Quality First",
    text: "Kami percaya kualitas produk adalah investasi jangka panjang bagi klien.",
  },
];

function AboutSection() {
  return (
    <section id="about" className={styles.about}>
      <Container>
        <SectionHeading
          label="About Us"
          title="Membangun Produk Digital yang Benar-Benar Bekerja"
          subtitle="SixLabs adalah digital agency dari Indonesia yang membantu startup, UMKM, dan bisnis membangun solusi digital modern yang siap digunakan dan dikembangkan."
          center
        />

        <div className={styles.story}>
          <div className={styles.story__content}>
            <span className={styles.badge}>Our Story</span>

            <h3>
              Kami percaya teknologi bukan hanya tentang kode, tetapi tentang
              menciptakan solusi yang menyelesaikan masalah nyata.
            </h3>

            <p>
              SixLabs hadir untuk membantu bisnis dan startup membangun website,
              aplikasi, landing page, company profile, hingga solusi digital
              yang mampu meningkatkan efisiensi dan pertumbuhan bisnis.
            </p>

            <p>
              Dengan pendekatan yang berfokus pada kualitas, performa, dan
              pengalaman pengguna, kami membangun produk yang tidak hanya
              terlihat bagus tetapi juga benar-benar bekerja.
            </p>
          </div>

          <div className={styles.story__stats}>
            {STORY_STATS.map((item) => (
              <Card key={item.label} className={styles.statCard}>
                <h4>{item.value}</h4>
                <span>{item.label}</span>
              </Card>
            ))}
          </div>
        </div>

        <div className={styles.vm}>
          <Card className={styles.vmCard}>
            <div className={styles.vmIcon}>
              <Eye size={22} />
            </div>
            <h3>Vision</h3>
            <p>
              Menjadi partner teknologi terpercaya yang membantu bisnis
              berkembang melalui solusi digital yang inovatif, scalable, dan
              berdampak nyata.
            </p>
          </Card>

          <Card className={styles.vmCard}>
            <div className={styles.vmIcon}>
              <Target size={22} />
            </div>
            <h3>Mission</h3>
            <p>
              Mengembangkan website, aplikasi, dan solusi digital berkualitas
              tinggi yang mengutamakan performa, pengalaman pengguna, serta
              kebutuhan bisnis klien.
            </p>
          </Card>
        </div>

        <div className={styles.values}>
          {VALUES.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Card hoverable className={styles.valueCard}>
                  <div className={styles.valueIcon}>
                    <Icon size={20} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export { AboutSection };
export default AboutSection;
