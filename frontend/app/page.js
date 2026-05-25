import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { HeroSection } from "@/sections/hero/HeroSection";
import { ServicesSection } from "@/sections/services/ServicesSection";
import { PortfolioSection } from "@/sections/portfolio/PortfolioSection";
import { ContactSection } from "@/sections/contact/ContactSection";
import { FAQSection } from "@/sections/faq/FAQSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
