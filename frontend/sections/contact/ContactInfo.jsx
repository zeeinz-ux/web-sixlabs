import { Mail, MapPin, Clock } from "lucide-react";
import { WhatsAppButton } from "@/components/buttons";
import { CONTACT } from "@/constants/contact";
import styles from "./contact.module.css";

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

export function ContactInfo() {
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
