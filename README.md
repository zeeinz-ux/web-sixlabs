# 🚀 SixLabs — Modern Digital Solutions Agency

Selamat datang di repositori resmi **SixLabs**, sebuah startup digital agency modern yang berfokus pada pengembangan:

- Web Application
- Mobile Application
- Company Profile Website
- Landing Page
- SEO Optimization
- AI Integration

Website ini dibangun menggunakan teknologi modern dengan arsitektur yang scalable, responsive, dan siap dikembangkan menjadi platform digital agency production-ready.

---

# ✨ Fitur Utama

## 🌙 Dark Mode Support

Menggunakan implementasi modern berbasis `:root {}` dan `data-theme`, sehingga tampilan website dapat berpindah antara light mode dan dark mode secara dinamis.

---

## 📱 Fully Responsive Design

Website dirancang menggunakan pendekatan **mobile-first** sehingga optimal di:

- Android
- iPhone
- Tablet
- Laptop
- Desktop PC

Menggunakan:

- Flexbox
- CSS Grid
- Media Queries
- Responsive Navigation

---

## 🤖 AI Chatbot Integration *(Frontend Done — Backend Tahap 1 Done)*

SixLabs memiliki chatbot AI dengan sistem fallback multi-provider untuk menjaga stabilitas layanan AI.

### Urutan AI Fallback (Backend — Coming Soon)

1. Gemini 2.5 Flash
2. Groq Llama 3.3 70B
3. Hugging Face Inference API
4. Mistral AI
5. Cohere Command R+

### Chatbot Architecture (Frontend — Implemented)

| Layer | Status | File |
|---|---|---|
| UI Components | ✅ Done | `ChatWidget`, `ChatWindow`, `ChatInput`, `MessageBubble` |
| State Management | ✅ Done | `useChatbot.js` + `ChatbotContext.jsx` |
| Networking Abstraction | ✅ Done | `lib/chatbot.js` (mock mode + retry + error normalization) |
| Styling | ✅ Done | CSS Modules + Global CSS Variables |
| API Integration | ⏳ Pending | Menunggu backend chat endpoint (Tahap 3) |
| AI Provider Abstraction | ⏳ Pending | Menunggu backend layer |
| Firestore Logging | ⏳ Pending | Menunggu backend layer |

### Message Data Shape

Semua message object mengikuti shape konsisten untuk future backend integration:

```js
{
  id: string,              // UUID generated client-side
  role: "user" | "assistant" | "system",
  content: string,
  createdAt: string,         // ISO 8601
  provider?: string,        // AI provider name (optional, backend nanti)
  status?: "sending" | "sent" | "error"
}
```

### Chatbot UX Features

- **Floating Widget** dengan toggle animation (180–250ms)
- **Fullscreen Mobile** saat viewport < 640px
- **Body Scroll Lock** saat chatbot terbuka di mobile
- **Auto-scroll** ke latest message (dengan user scroll detection)
- **Typing Indicator** controlled via state
- **Enter-to-Send** (Shift+Enter untuk newline)
- **Textarea Auto-resize**
- **Optimistic UI** — message muncul langsung dengan status "sending"
- **Clear Chat** — reset conversation ke welcome message
- **Z-Index Layering** — chatbot layer 500, konsisten dengan elemen lain
- **Hybrid Mock Mode** — template response + echo fallback untuk demo tanpa backend

---

## ☁️ Free Tier Friendly Architecture

Project dirancang agar tetap optimal menggunakan layanan free tier:

- Firebase Firestore (Spark Plan)
- Firebase Hosting
- GitHub Actions
- Google Sheets Integration

---

## 🔄 Automatic Deployment

Website mendukung auto deployment menggunakan GitHub Actions.

Setiap perubahan pada branch utama dapat langsung:

- build otomatis
- deploy otomatis
- update production

---

## 📊 Google Sheets Integration

Data dari:

- Contact Form
- Leads
- Chatbot Logs
- Project Requests

dapat langsung disinkronkan ke Google Sheets untuk kebutuhan operasional tim.

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- CSS Modules (styling utama)
- Tailwind CSS (utility tambahan)

## Backend *(Tahap 1 — Foundational Layer Done)*

- Node.js
- TypeScript (strict mode)
- Express.js
- Zod (schema validation)
- CORS

## Database & Services *(Coming Soon)*

- Firebase Firestore
- Firebase Hosting
- Google Sheets API

## AI Providers *(Backend Integration — Coming Soon)*

- Gemini API
- Groq API
- Hugging Face API
- Mistral API
- Cohere API

---

# 🏗️ Architecture Decisions

## CSS Variables System

Semua komponen chatbot consume global CSS variables:

```css
:root {
  --bg: #ffffff;
  --text: #111827;
  --primary: #6366f1;
  --primary-soft: rgba(99, 102, 241, 0.1);
  --primary-hover: #4f46e5;
  --surface: #f8fafc;
  --surface-hover: #f1f5f9;
  --border: #e5e7eb;
  --muted: #6b7280;
  --success: #22c55e;
  --success-soft: rgba(34, 197, 94, 0.25);
  --danger: #ef4444;
  --danger-soft: rgba(239, 68, 68, 0.2);

  /* Z-Index Layer System */
  --z-navbar: 100;
  --z-mobile-menu: 200;
  --z-modal: 300;
  --z-toast: 400;
  --z-chatbot: 500;
}

[data-theme="dark"] {
  --bg: #1e1e2e;
  --text: #cdd6f4;
  --primary: #89b4fa;
  --primary-soft: rgba(137, 180, 250, 0.1);
  --primary-hover: #74c7ec;
  --surface: #181825;
  --surface-hover: #313244;
  --border: #313244;
  --muted: #6c7086;
  --success: #a6e3a1;
  --success-soft: rgba(166, 227, 161, 0.25);
  --danger: #f38ba8;
  --danger-soft: rgba(243, 139, 168, 0.2);
}
```

## Hybrid Styling Approach

- **CSS Modules** → layout, animation, theme-aware styling, feature-specific styles
- **Tailwind CSS** → utility classes (flex, gap, hidden, responsive) via `className`

## State Management Strategy

- **Tidak menggunakan Redux/Zustand** di tahap awal untuk menghindari overengineering
- **React Context + Custom Hooks** untuk state chatbot yang cukup kompleks
- **Props drilling minimal** karena semua chatbot sub-components consume `ChatbotContext`

## Networking Abstraction Layer

- **Frontend tidak boleh langsung call AI provider** — semua lewat backend proxy
- **API key tidak di-expose ke frontend** — aman di backend environment
- **Mock mode default** — kalau `VITE_API_URL` kosong, otomatis fallback ke mock
- **Request/Response contract konsisten** — `{ success, data, meta }` / `{ success, error, meta }`

---

# 📁 Struktur Folder Project

```bash
/web-sixlabs
├── frontend/
│   ├── public/
│   │   └── sixlabs.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── buttons/
│   │   │   ├── chatbot/
│   │   │   │   ├── css/
│   │   │   │   │   ├── chatWidget.module.css
│   │   │   │   │   ├── chatWindow.module.css
│   │   │   │   │   ├── chatInput.module.css
│   │   │   │   │   └── messageBubble.module.css
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useChatbot.js
│   │   │   │   ├── context/
│   │   │   │   │   └── ChatbotContext.jsx
│   │   │   │   ├── ChatWidget.jsx
│   │   │   │   ├── ChatWindow.jsx
│   │   │   │   ├── ChatInput.jsx
│   │   │   │   └── MessageBubble.jsx
│   │   │   ├── footer/
│   │   │   ├── navbar/
│   │   │   └── ui/
│   │   ├── lib/
│   │   │   └── chatbot.js          ← NEW: Networking abstraction layer
│   │   ├── sections/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                        # ✅ Tahap 1 Done
│   ├── src/
│   │   ├── config/
│   │   │   └── env.ts              ← Zod env validation
│   │   ├── controllers/
│   │   │   └── health.controller.ts
│   │   ├── routes/
│   │   │   └── health.routes.ts
│   │   ├── app.ts                  ← Express + middleware
│   │   └── server.ts               ← Entry point
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── firebase.json
├── firestore.rules
├── .gitignore
└── README.md
```

---

# 🚀 Memulai Project

## 1. Clone Repository

```bash
git clone https://github.com/zeeinz-ux/web-sixlabs.git
cd web-sixlabs
```

---

# 📦 Menjalankan Frontend

## Masuk ke folder frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Jalankan development server

```bash
npm run dev
```

Frontend akan berjalan di:

```bash
http://localhost:5173
```

---

# ⚙️ Menjalankan Backend *(Tahap 1 — Foundational Layer)*

## Masuk ke folder backend

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Setup environment

```bash
cp .env.example .env
```

## Jalankan backend server

```bash
npm run dev
```

Backend API akan berjalan di:

```bash
http://localhost:5000
```

## Cek health endpoint

```bash
curl http://localhost:5000/api/v1/health
```

Expected response:
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "service": "sixlabs-backend",
    "uptime": 1.234,
    "timestamp": "2026-05-26T15:31:00.000Z",
    "environment": "development",
    "version": "1.0.0"
  },
  "meta": {
    "timestamp": "2026-05-26T15:31:00.000Z"
  }
}
```

---

# 🔐 Environment Variables

## Frontend

```env
VITE_API_URL=                    # Kosong = auto mock mode
VITE_CHATBOT_MOCK_MODE=true      # Paksa mock mode (optional)
VITE_FIREBASE_API_KEY=
```

## Backend

```env
# Server (Required)
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# AI Provider API Keys (Tahap 3 — AI Integration)
# GEMINI_API_KEY=
# GROQ_API_KEY=
# HF_API_KEY=
# MISTRAL_API_KEY=
# COHERE_API_KEY=

# Firebase (Tahap 5 — Firestore Logging)
# FIREBASE_PROJECT_ID=
# FIREBASE_CLIENT_EMAIL=
# FIREBASE_PRIVATE_KEY=

# Google Sheets (Tahap 6 — Sheets Sync)
# GOOGLE_SHEETS_ID=

# Security (Tahap 4 — Authentication)
# JWT_SECRET=
```

---

# 🤝 Tim SixLabs

SixLabs merupakan startup digital agency yang beranggotakan 6 orang developer dengan fokus pada pengembangan solusi digital modern dan scalable.

---

# 📌 Roadmap

- [x] Landing Page
- [x] Responsive Design
- [x] Dark Mode
- [x] Chatbot UI Layer (Widget, Window, Input, Bubble)
- [x] Chatbot State Management (Context + Hooks)
- [x] Chatbot Networking Abstraction (lib/chatbot.js)
- [x] Backend Foundational Layer (Express + TypeScript + Health Check)
- [ ] Chatbot Backend API Integration (POST /api/v1/chat)
- [ ] AI Provider Abstraction (Gemini, Groq, HF, Mistral, Cohere)
- [ ] Firestore Chat Logging
- [ ] AI Analytics

---

# 📄 License

Project ini dibuat untuk pengembangan dan operasional internal SixLabs.
