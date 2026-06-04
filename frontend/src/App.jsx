import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar.jsx";
import { Footer } from "./components/footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import { ServicesSection as Services } from "./pages/Services.jsx";
import { ContactSection as Contact } from "./pages/Contact.jsx";
import { PortfolioSection as Portfolio } from "./pages/Portfolio.jsx";
import { AboutSection as About } from "./pages/About.jsx";
import { FAQSection as Faq } from "./pages/Faq.jsx";

/* ── Chatbot Integration ── */
import { ChatbotProvider } from "./components/chatbot/context/ChatbotContext.jsx";
import ChatWidget from "./components/chatbot/ChatWidget.jsx";

function App() {
  const location = useLocation();

  // Render Navbar and Footer on all pages for this example
  // You can create more complex logic to hide them on specific routes
  const showHeaderFooter = true;

  return (
    <ChatbotProvider>
      <div className="min-h-screen flex flex-col bg-slate-50">
        {showHeaderFooter && <Navbar />}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>
        </main>
        {showHeaderFooter && <Footer />}

        {/* Chatbot Widget — floating on all pages */}
        <ChatWidget />
      </div>
    </ChatbotProvider>
  );
}

export default App;
