# 🚀 SixLabs — Modern Digital Solutions Agency

Selamat datang di repositori resmi **SixLabs**, sebuah startup digital agency modern yang berfokus pada pengembangan solusi digital yang scalable, responsive, dan siap digunakan untuk kebutuhan bisnis maupun organisasi modern.

## 🌐 Layanan Kami

- Web Application Development
- Mobile Application Development
- Company Profile Website
- Landing Page Development
- SEO Optimization
- AI Integration
- UI/UX Implementation
- Digital Product Development

---

# ✨ Fitur Utama

## 🌙 Dark Mode Support

Menggunakan sistem theme modern berbasis CSS Variables dan `data-theme`, memungkinkan perpindahan antara Light Mode dan Dark Mode secara dinamis. Semua komponen chatbot, bubble pesan, input area, dan header sepenuhnya theme-aware menggunakan CSS Variables global — tidak ada hardcoded color.

---

## 📱 Fully Responsive Design

Website dirancang menggunakan pendekatan Mobile-First sehingga optimal digunakan pada:

- Android
- iPhone
- Tablet
- Laptop
- Desktop

Menggunakan:

- Flexbox
- CSS Grid
- Media Queries
- Responsive Navigation
- `env(safe-area-inset-top/bottom)` untuk dukungan notch & home bar

---

## 🎨 Modern UI/UX

SixLabs menerapkan desain modern dengan fokus pada:

- Clean Layout
- Accessibility (aria-label, aria-expanded, role)
- Smooth Animation (Framer Motion)
- Consistent Design System
- Theme Awareness (Light & Dark Mode)
- Fast User Interaction

---

## 🤖 AI Chatbot Integration

Website dilengkapi chatbot AI yang dirancang menggunakan arsitektur provider abstraction sehingga mudah dikembangkan dan ditingkatkan pada masa mendatang.

### AI Fallback Flow

1. Gemini 3.5 Flash
2. Groq — llama-3.3-70b-versatile
3. Mock Provider Fallback

### Chatbot Architecture

| Layer                | Status     |
| -------------------- | ---------- |
| UI Components        | ✅ Done    |
| State Management     | ✅ Done    |
| Networking Layer     | ✅ Done    |
| API Integration      | ✅ Done    |
| Gemini Integration   | ✅ Done    |
| Provider Abstraction | ✅ Done    |
| Groq Integration     | ✅ Done    |
| Firestore Logging    | ⏳ Planned |
| Analytics Layer      | ⏳ Planned |

---

## 💬 Chatbot UX Features

- Floating Chat Widget (desktop pojok kanan bawah)
- Mobile Fullscreen Experience (fullscreen dengan safe area support)
- Auto Scroll Conversation
- Typing Indicator dengan avatar 🤖
- AI Avatar di setiap bubble pesan bot
- Enter to Send / Shift+Enter New Line
- Auto Resize Textarea
- Optimistic UI Updates
- Clear Conversation
- Error Handling & Retry dengan Exponential Backoff
- Mock Mode Support
- Body Scroll Lock saat chat terbuka di mobile

---

# 🛠️ Tech Stack

## Frontend

- React 18
- Vite 5
- React Router DOM v6
- Framer Motion
- Lucide React
- CSS Modules

## Backend

- Node.js ≥ 18
- Express.js
- TypeScript (strict mode)
- Zod (validation & env parsing)
- Dotenv
- CORS
- Google APIs (Sheets)

## AI Integration

- Google Gemini 3.5 Flash
- Groq — llama-3.3-70b-versatile
- Provider Abstraction Layer
- Mock Provider Fallback

---

# 🏗️ Architecture Principles

## Component-Based Architecture

Frontend dibangun menggunakan pendekatan reusable component sehingga setiap bagian website dapat digunakan kembali dengan mudah dan mudah dipelihara.

---

## Theme System

Semua komponen menggunakan CSS Variables global (`--bg-surface`, `--text-primary`, `--accent`, dst.) sehingga perubahan tema dapat dilakukan secara konsisten. Toggle theme disimpan ke `localStorage` dengan key `sixlabs-theme` dan membaca `prefers-color-scheme` sebagai default.

---

## State Management Strategy

Menggunakan:

- React Context
- Custom Hooks (`useChatbot`, `useDarkMode`, `useScrollPosition`, `useMediaQuery`)

Pendekatan ini dipilih untuk menjaga project tetap ringan tanpa menambahkan kompleksitas berlebih dari state manager eksternal.

---

## API Layer Abstraction

Frontend tidak berkomunikasi langsung dengan provider AI.

Semua request dilakukan melalui backend untuk:

- Menjaga keamanan API Key
- Mempermudah provider switching
- Menyederhanakan maintenance
- Menjaga konsistensi response

---

# 📁 Struktur Project

```
web-sixlabs/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── chatbot/          ← AI Chatbot Widget
│   │   │   │   ├── context/      ← ChatbotContext
│   │   │   │   ├── hooks/        ← useChatbot
│   │   │   │   ├── css/          ← CSS Modules per komponen
│   │   │   │   ├── ChatWidget.jsx
│   │   │   │   ├── ChatWindow.jsx
│   │   │   │   ├── ChatInput.jsx
│   │   │   │   └── MessageBubble.jsx
│   │   │   ├── navbar/
│   │   │   ├── footer/
│   │   │   ├── buttons/
│   │   │   └── ui/
│   │   ├── pages/                ← Home, Services, Portfolio, Contact, About, Faq
│   │   ├── hooks/                ← useDarkMode, useScrollPosition, useMediaQuery
│   │   ├── context/              ← ThemeContext
│   │   ├── lib/                  ← chatbot.js (networking), constants.js, utils.js
│   │   ├── styles/               ← variables.css, globals.css, animations.css
│   │   ├── App.jsx
│   │   └── Main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── env.ts            ← Zod env validation
│   │   ├── controllers/
│   │   │   ├── chat.controller.ts
│   │   │   ├── contact.controller.ts
│   │   │   └── health.controller.ts
│   │   ├── routes/
│   │   ├── schemas/              ← Zod request schemas
│   │   ├── services/
│   │   │   ├── ai/
│   │   │   │   ├── providers/    ← gemini.provider.ts, groq.provider.ts
│   │   │   │   ├── aiFallback.service.ts
│   │   │   │   ├── aiRouter.service.ts
│   │   │   │   └── systemPrompt.ts
│   │   │   └── googleSheets.service.ts
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

# 🚀 Memulai Project

## Clone Repository

```bash
git clone https://github.com/zeeinz-ux/web-sixlabs.git
cd web-sixlabs
```

---

# 📦 Menjalankan Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend berjalan pada:

```
http://localhost:5173
```

---

# ⚙️ Menjalankan Backend

```bash
cd backend

npm install

cp .env.example .env
# Edit .env dan isi API keys yang diperlukan

npm run dev
```

Backend berjalan pada:

```
http://localhost:5000
```

---

# 🔌 API Endpoints

## Health Check

```http
GET /api/v1/health
```

## Chat Endpoint

```http
POST /api/v1/chat

Body:
{
  "message": "string (max 4000 chars)",
  "sessionId": "string (optional)",
  "history": [{ "role": "user|assistant", "content": "string" }] (optional, max 20)
}
```

## Contact / Lead Submission

```http
POST /api/v1/contact

Body:
{
  "name": "string",
  "email": "string",
  "service": "string (optional)",
  "message": "string"
}
```

---

# 🔐 Environment Variables

## Frontend

```env
VITE_API_URL=http://localhost:5000
VITE_CHATBOT_MOCK_MODE=false
```

> Set `VITE_CHATBOT_MOCK_MODE=true` untuk menggunakan mock responses tanpa backend.

## Backend

```env
PORT=5000
NODE_ENV=development

FRONTEND_URL=http://localhost:5173

# AI Providers
GEMINI_API_KEY=
GROQ_API_KEY=

# Google Sheets (untuk lead submission)
GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT=./google-service-account.json

# Security
JWT_SECRET=
```

> ⚠️ **Jangan commit file `.env` atau `google-service-account.json` ke repository.** Keduanya sudah di-exclude via `.gitignore`.

---

# 📈 Future Integrations

Fitur berikut masih berada dalam tahap pengembangan:

- Firestore Chat Logging
- Authentication System
- Rate Limiting per IP
- Analytics Dashboard
- AI Usage Monitoring
- Lead Management System

---

# 📌 Roadmap

## Frontend

- [x] Landing Page
- [x] Responsive Design (Mobile-First)
- [x] Dark Mode (CSS Variables + localStorage)
- [x] Component System
- [x] Chatbot UI (Floating Widget + Mobile Fullscreen)
- [x] Animation System (Framer Motion)
- [x] Contact Form dengan Google Sheets integration
- [x] React Router Future Flags (v7 ready)

## Backend

- [x] Express API
- [x] TypeScript Setup (strict mode)
- [x] Health Endpoint
- [x] Chat Endpoint dengan Zod validation
- [x] Contact Endpoint
- [x] Gemini 3.5 Flash Integration
- [x] Groq Integration
- [x] AI Fallback Chain (Gemini → Groq → Mock)
- [x] Google Sheets Lead Sync

## Future Development

- [ ] Firestore Logging
- [ ] Authentication
- [ ] Rate Limiting
- [ ] Analytics Dashboard
- [ ] AI Insights

---

# 👥 Team

SixLabs merupakan startup digital agency yang berfokus pada pengembangan solusi digital modern dengan pendekatan scalable architecture, modern design, dan AI-powered solutions.

---

# 📄 License

Project ini dikembangkan untuk kebutuhan internal dan pengembangan bisnis SixLabs.
