import { useState, useCallback, useRef, useEffect } from 'react';

/* ─────────────────────────────────────────
   Message Data Shape (Konsisten untuk backend):
   {
     id: string,
     role: "user" | "assistant" | "system",
     content: string,
     createdAt: string,      // ISO 8601
     provider?: string,      // AI provider (optional, backend nanti)
     status?: "sending" | "sent" | "error"
   }
   ───────────────────────────────────────── */

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const INITIAL_MESSAGE = {
  id: generateId(),
  role: 'assistant',
  content: 'Halo! 👋 Saya asisten AI SixLabs. Ada yang bisa saya bantu terkait layanan kami?',
  createdAt: new Date().toISOString(),
  status: 'sent',
};

export const useChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesContainerRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);

  /* ── Body Scroll Lock (Mobile) ── */
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('bodyScrollLock');
    } else {
      document.body.classList.remove('bodyScrollLock');
    }
    return () => {
      document.body.classList.remove('bodyScrollLock');
    };
  }, [isOpen]);

  /* ── Auto Scroll Logic ──
     Hanya scroll otomatis ke bawah jika user berada
     di dekat bottom (threshold 80px).
     Kalau user sedang scroll ke atas membaca pesan lama,
     jangan paksa scroll. */
  const checkNearBottom = useCallback(() => {
    const el = messagesContainerRef.current;
    if (!el) return true;
    const threshold = 80;
    return el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
  }, []);

  const handleScroll = useCallback(() => {
    shouldAutoScrollRef.current = checkNearBottom();
  }, [checkNearBottom]);

  const scrollToBottom = useCallback((behavior = 'smooth') => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      scrollToBottom('smooth');
    }
  }, [messages, scrollToBottom]);

  /* ── Widget Toggle ── */
  const toggleWidget = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeWidget = useCallback(() => {
    setIsOpen(false);
  }, []);

  /* ── Clear Chat ── */
  const clearChat = useCallback(() => {
    setMessages([
      {
        id: generateId(),
        role: 'assistant',
        content: 'Chat telah dibersihkan. Ada yang bisa saya bantu?',
        createdAt: new Date().toISOString(),
        status: 'sent',
      },
    ]);
    shouldAutoScrollRef.current = true;
    setTimeout(() => scrollToBottom('auto'), 50);
  }, [scrollToBottom]);

  /* ── Send Message (Mock — belum backend) ──
     Implementasi optimistic UI:
     1. Message user muncul langsung dengan status "sending"
     2. Simulasi delay network / AI thinking
     3. Update status user ke "sent"
     4. Push assistant response dengan status "sent"

     Nanti akan diganti dengan fetch ke backend API. */
  const sendMessage = useCallback(
    async (content) => {
      const trimmed = content.trim();
      if (!trimmed || isLoading) return;

      // Optimistic user message
      const userMsg = {
        id: generateId(),
        role: 'user',
        content: trimmed,
        createdAt: new Date().toISOString(),
        status: 'sending',
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      shouldAutoScrollRef.current = true;

      // Simulasi network delay (1.2–2.0s)
      await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800));

      // Update user message status → sent
      setMessages((prev) =>
        prev.map((m) => (m.id === userMsg.id ? { ...m, status: 'sent' } : m))
      );

      // Mock assistant response
      const botMsg = {
        id: generateId(),
        role: 'assistant',
        content: `Terima kasih atas pesan Anda. SixLabs AI sedang dalam mode simulasi.\n\nPesan Anda: "${trimmed}"\n\nIntegrasi backend AI provider akan ditambahkan di tahap berikutnya.`,
        createdAt: new Date().toISOString(),
        status: 'sent',
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);
    },
    [isLoading]
  );

  return {
    // State
    isOpen,
    messages,
    isLoading,

    // Refs
    messagesContainerRef,

    // Actions
    toggleWidget,
    closeWidget,
    clearChat,
    sendMessage,
    handleScroll,
    scrollToBottom,
  };
};
