/* ─────────────────────────────────────────
   SixLabs — Chatbot Networking Layer

   Pure JS abstraction. No React. No UI logic.

   Responsibilities:
   • API request/response normalization
   • Timeout handling (AbortController)
   • Retry with exponential backoff
   • Mock mode (hybrid: template + echo)
   • Standardized error shape
   ───────────────────────────────────────── */

/* ── Environment ── */
const ENV = {
  API_URL: import.meta.env?.VITE_API_URL || "",
  MOCK_MODE: import.meta.env?.VITE_CHATBOT_MOCK_MODE === "true",
};

/* ── Runtime Config (mutable for testing/debug) ── */
const _apiUrl = ENV.API_URL?.trim();
let _runtimeConfig = {
  timeoutMs: 15_000,
  maxRetries: 2,
  backoffMs: 1_000,
  mockMode: ENV.MOCK_MODE || !_apiUrl,
  apiUrl: _apiUrl || "",
};

/* ── Public: Get/Set Config ── */
export function getChatConfig() {
  return { ..._runtimeConfig };
}

export function setChatConfig(partial) {
  _runtimeConfig = { ..._runtimeConfig, ...partial };
}

/* ── Public: Create Session ID ── */
export function createChatSession() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}-${Math.random().toString(36).slice(2, 9)}`;
}

/* ── Public: Send Chat Message ── */
export async function sendChatMessage(payload) {
  const config = getChatConfig();

  // Mock mode
  if (config.mockMode) {
    return _mockHandler(payload);
  }

  // Real backend mode — FIX: endpoint jadi /api/v1/chat
  const url = `${config.apiUrl}/api/v1/chat`;

  // FIX: Transform payload ke shape backend yang benar
  const backendPayload = {
    message: payload.message?.content || payload.message,
    sessionId: payload.sessionId,
    history: payload.history || [],
  };

  const execute = async () => {
    const response = await _fetchWithTimeout(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendPayload),
      },
      config.timeoutMs,
    );

    if (!response.ok) {
      const errorBody = await _safeParseError(response);
      throw _normalizeError(
        new Error(errorBody?.message || `HTTP ${response.status}`),
        response.status,
      );
    }

    const raw = await response.json();
    return _normalizeResponse(raw);
  };

  return _retryWithBackoff(execute, config.maxRetries, config.backoffMs);
}

/* ── Internal: Fetch with Timeout ── */
async function _fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    if (error.name === "AbortError") {
      const timeoutError = new Error("Request timeout");
      timeoutError.code = "TIMEOUT";
      throw timeoutError;
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
}

/* ── Internal: Retry with Exponential Backoff ── */
async function _retryWithBackoff(fn, maxRetries, backoffMs) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      const normalized = _normalizeError(error);
      if (!normalized.error.isRetryable || attempt >= maxRetries) {
        break;
      }

      const delay = backoffMs * Math.pow(2, attempt);
      await _sleep(delay);
    }
  }

  const finalError = _normalizeError(lastError);
  if (finalError.error.code !== "MAX_RETRIES_EXCEEDED") {
    finalError.error.code = "MAX_RETRIES_EXCEEDED";
    finalError.error.message =
      "Failed after multiple retries. Please try again later.";
    finalError.error.isRetryable = false;
  }
  throw finalError;
}

/* ── Internal: Normalize Response ── */
function _normalizeResponse(raw) {
  if (raw?.success === true && raw?.data) {
    return {
      success: true,
      data: {
        id: raw.data.id || createChatSession(),
        role: raw.data.role || "assistant",
        content: raw.data.content || "",
        createdAt: raw.data.createdAt || new Date().toISOString(),
        provider: raw.data.provider || "unknown",
        meta: {
          latencyMs: raw.data.meta?.latencyMs || 0,
          retriesUsed: raw.data.meta?.retriesUsed || 0,
          isMock: raw.data.meta?.isMock || false,
        },
      },
    };
  }

  return {
    success: true,
    data: {
      id: raw?.id || createChatSession(),
      role: raw?.role || "assistant",
      content: raw?.content || raw?.message || "",
      createdAt: raw?.createdAt || new Date().toISOString(),
      provider: raw?.provider || "unknown",
      meta: {
        latencyMs: 0,
        retriesUsed: 0,
        isMock: false,
      },
    },
  };
}

/* ── Internal: Normalize Error ── */
function _normalizeError(error, statusCode) {
  if (error?.success === false && error?.error) {
    return error;
  }

  const err = error instanceof Error ? error : new Error(String(error));
  const code = err.code || _inferErrorCode(err, statusCode);

  return {
    success: false,
    error: {
      code,
      message: _getErrorMessage(code, err.message),
      statusCode: statusCode || null,
      isRetryable: _isRetryable(code, statusCode),
      originalError: err,
    },
  };
}

function _inferErrorCode(error, statusCode) {
  if (error.name === "AbortError" || error.code === "TIMEOUT") {
    return "TIMEOUT";
  }
  if (error.message?.includes("fetch") || error.message?.includes("network")) {
    return "NETWORK";
  }
  if (statusCode >= 500) return "SERVER";
  if (statusCode === 429) return "RATE_LIMIT";
  if (statusCode >= 400 && statusCode < 500) return "VALIDATION";
  return "UNKNOWN";
}

function _getErrorMessage(code, originalMessage) {
  const messages = {
    TIMEOUT: "Request took too long. Please try again.",
    NETWORK: "Connection failed. Check your internet connection.",
    SERVER: "Server error. We're working on it.",
    RATE_LIMIT: "Too many requests. Please wait a moment.",
    VALIDATION: "Invalid request. Please check your input.",
    MAX_RETRIES_EXCEEDED:
      "Failed after multiple retries. Please try again later.",
    UNKNOWN: "Something went wrong. Please try again.",
  };
  return messages[code] || originalMessage || messages.UNKNOWN;
}

function _isRetryable(code, statusCode) {
  const retryableCodes = ["TIMEOUT", "NETWORK", "SERVER", "RATE_LIMIT"];
  if (retryableCodes.includes(code)) return true;
  if (statusCode >= 500 || statusCode === 429) return true;
  if (statusCode >= 400 && statusCode < 500) return false;
  return false;
}

async function _safeParseError(response) {
  try {
    return await response.json();
  } catch {
    try {
      return { message: await response.text() };
    } catch {
      return null;
    }
  }
}

function _sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ═════════════════════════════════════════
   MOCK MODE — Hybrid: Template + Echo
   ═════════════════════════════════════════ */

const MOCK_TEMPLATES = [
  {
    keywords: ["layanan", "service", "jasa", "apa saja", "produk"],
    response:
      "SixLabs menyediakan jasa pengembangan web application, mobile application, company profile website, landing page, SEO optimization, dan AI integration.",
  },
  {
    keywords: ["harga", "price", "biaya", "cost", "berapa", "mahal", "murah"],
    response:
      "Harga project di SixLabs disesuaikan dengan scope dan kompleksitas. Silakan hubungi kami melalui form kontak untuk mendapatkan penawaran detail yang sesuai kebutuhan Anda.",
  },
  {
    keywords: ["kontak", "contact", "hubungi", "email", "whatsapp", "telepon"],
    response:
      "Anda bisa menghubungi tim SixLabs melalui form kontak di website ini atau email ke hello@sixlabs.id. Tim kami akan merespons secepatnya.",
  },
  {
    keywords: [
      "tech stack",
      "teknologi",
      "pakai apa",
      "react",
      "vite",
      "firebase",
    ],
    response:
      "SixLabs menggunakan teknologi modern seperti React, Vite, CSS Modules, Tailwind CSS, Node.js, Firebase, dan integrasi AI multi-provider untuk memastikan solusi yang scalable dan maintainable.",
  },
  {
    keywords: ["tim", "team", "developer", "siapa", "orang", "startup"],
    response:
      "SixLabs adalah startup digital agency yang beranggotakan 6 developer berpengalaman dengan fokus pada pengembangan solusi digital modern, scalable, dan production-ready.",
  },
];

const ECHO_PREFIXES = [
  "Baik, saya catat: ",
  "Terima kasih atas pertanyaannya. ",
  "Saya mengerti. ",
  "Menarik. ",
];

function _mockHandler(payload) {
  const userContent = payload?.message?.content || "";
  const startTime = performance.now();

  const delay = 800 + Math.random() * 1200;

  return new Promise((resolve) => {
    setTimeout(() => {
      const latencyMs = Math.round(performance.now() - startTime);
      const matchedResponse = _matchTemplate(userContent);
      const content = matchedResponse || _echoFallback(userContent);

      resolve({
        success: true,
        data: {
          id: createChatSession(),
          role: "assistant",
          content,
          createdAt: new Date().toISOString(),
          provider: "mock",
          meta: {
            latencyMs,
            retriesUsed: 0,
            isMock: true,
          },
        },
      });
    }, delay);
  });
}

function _matchTemplate(userContent) {
  const lower = userContent.toLowerCase();
  for (const template of MOCK_TEMPLATES) {
    const hasKeyword = template.keywords.some((kw) =>
      lower.includes(kw.toLowerCase()),
    );
    if (hasKeyword) {
      return template.response;
    }
  }
  return null;
}

function _echoFallback(userContent) {
  const prefix =
    ECHO_PREFIXES[Math.floor(Math.random() * ECHO_PREFIXES.length)];
  return `${prefix}"${userContent}" — untuk informasi lebih detail, tim SixLabs akan membantu Anda.`;
}
