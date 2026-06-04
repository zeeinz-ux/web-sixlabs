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

Menggunakan sistem theme modern berbasis CSS Variables dan `data-theme`, memungkinkan perpindahan antara Light Mode dan Dark Mode secara dinamis dengan pengalaman pengguna yang konsisten.

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

---

## 🎨 Modern UI/UX

SixLabs menerapkan desain modern dengan fokus pada:

- Clean Layout
- Accessibility
- Smooth Animation
- Consistent Design System
- Theme Awareness
- Fast User Interaction

---

## 🤖 AI Chatbot Integration

Website dilengkapi chatbot AI yang dirancang menggunakan arsitektur provider abstraction sehingga mudah dikembangkan dan ditingkatkan pada masa mendatang.

### AI Fallback Flow

1. Gemini 2.5 Flash
2. llama-3.3-70b-versatile
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

- Floating Chat Widget
- Mobile Fullscreen Experience
- Auto Scroll Conversation
- Typing Indicator
- Enter to Send
- Shift + Enter New Line
- Auto Resize Textarea
- Optimistic UI Updates
- Clear Conversation
- Error Handling
- Mock Mode Support

---

# 🛠️ Tech Stack

## Frontend

- React 18
- Vite
- React Router DOM
- Framer Motion
- Lucide React
- CSS Modules

## Backend

- Node.js
- Express.js
- TypeScript
- Zod
- Dotenv
- CORS

## AI Integration

- Google Gemini 2.5 Flash
- Provider Abstraction Layer
- Mock Provider Fallback

---

# 🏗️ Architecture Principles

## Component-Based Architecture

Frontend dibangun menggunakan pendekatan reusable component sehingga setiap bagian website dapat digunakan kembali dengan mudah dan mudah dipelihara.

---

## Theme System

Semua komponen menggunakan CSS Variables global sehingga perubahan tema dapat dilakukan secara konsisten tanpa perlu mengubah setiap komponen secara manual.

---

## State Management Strategy

Menggunakan:

- React Context
- Custom Hooks

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

```bash
web-sixlabs/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── sections/
│   │   ├── lib/
│   │   ├── App.jsx
│   │   └── Main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
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

```bash
http://localhost:5173
```

---

# ⚙️ Menjalankan Backend

```bash
cd backend

npm install

cp .env.example .env

npm run dev
```

Backend berjalan pada:

```bash
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
```

---

# 🔐 Environment Variables

## Frontend

```env
VITE_API_URL=
VITE_CHATBOT_MOCK_MODE=true
```

## Backend

```env
PORT=5000
NODE_ENV=development

FRONTEND_URL=http://localhost:5173

GEMINI_API_KEY=

JWT_SECRET=
```

---

# 📈 Future Integrations

Fitur berikut masih berada dalam tahap pengembangan:

- Firestore Chat Logging
- Google Sheets Sync
- Authentication System
- Rate Limiting
- Analytics Dashboard
- AI Usage Monitoring
- Lead Management System

---

# 📌 Roadmap

## Frontend

- [x] Landing Page
- [x] Responsive Design
- [x] Dark Mode
- [x] Component System
- [x] Chatbot UI
- [x] Animation System

## Backend

- [x] Express API
- [x] TypeScript Setup
- [x] Health Endpoint
- [x] Chat Endpoint
- [x] Zod Validation
- [x] Gemini Integration
- [x] Groq Integration

## Future Development

- [ ] Firestore Logging
- [ ] Google Sheets Sync
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
