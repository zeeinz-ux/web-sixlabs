import { sendChatMessage } from "@/lib/chatbot.js";
import { useState, useCallback, useRef, useEffect } from "react";

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

const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const INITIAL_MESSAGE = {
  id: generateId(),
  role: "assistant",
  content:
    "Halo! 👋 Saya asisten AI SixLabs. Ada yang bisa saya bantu terkait layanan kami?",
  createdAt: new Date().toISOString(),
  status: "sent",
};

export const useChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesContainerRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);
  const sessionIdRef = useRef(generateId());

  /* ── Body Scroll Lock (Mobile) ── */
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("bodyScrollLock");
    } else {
      document.body.classList.remove("bodyScrollLock");
    }
    return () => {
      document.body.classList.remove("bodyScrollLock");
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

  const scrollToBottom = useCallback((behavior = "smooth") => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      scrollToBottom("smooth");
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
        role: "assistant",
        content: "Chat telah dibersihkan. Ada yang bisa saya bantu?",
        createdAt: new Date().toISOString(),
        status: "sent",
      },
    ]);
    shouldAutoScrollRef.current = true;
    setTimeout(() => scrollToBottom("auto"), 50);
  }, [scrollToBottom]);

  /* ── Send Message (with networking layer) ──
     Optimistic UI flow:
     1. Message user muncul langsung dengan status "sending"
     2. Delegate ke lib/chatbot.js (mock or real backend)
     3. Update status user ke "sent"
     4. Push assistant response dengan status "sent"
     5. Kalau error: update user message ke "error" */
  const sendMessage = useCallback(
    async (content) => {
      const trimmed = content.trim();
      if (!trimmed || isLoading) return;

      // Optimistic user message
      const userMsg = {
        id: generateId(),
        role: "user",
        content: trimmed,
        createdAt: new Date().toISOString(),
        status: "sending",
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      shouldAutoScrollRef.current = true;

      try {
        // Delegate ke networking layer
        const response = await sendChatMessage({
          sessionId: sessionIdRef.current,
          message: userMsg,
          history: messages
            .filter((m) => m.status === "sent" && m.role !== "system")
            .map((m) => ({ role: m.role, content: m.content })),
        });

        // Update user message status → sent
        setMessages((prev) =>
          prev.map((m) => (m.id === userMsg.id ? { ...m, status: "sent" } : m)),
        );

        // Assistant response dari networking layer
        const botMsg = {
          id: response.data.id,
          role: response.data.role,
          content: response.data.content,
          createdAt: response.data.createdAt,
          provider: response.data.provider,
          status: "sent",
        };

        setMessages((prev) => [...prev, botMsg]);
      } catch (error) {
        // Error sudah dalam bentuk ChatError (normalized)
        console.error("[useChatbot] sendMessage error:", error);

        // Update user message status → error
        setMessages((prev) =>
          prev.map((m) =>
            m.id === userMsg.id ? { ...m, status: "error" } : m,
          ),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages],
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
