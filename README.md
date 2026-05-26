````md
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

## 🤖 AI Chatbot Integration

SixLabs memiliki chatbot AI dengan sistem fallback multi-provider untuk menjaga stabilitas layanan AI.

### Urutan AI Fallback

1. Gemini 2.5 Flash
2. Groq Llama 3.3 70B
3. Hugging Face Inference API
4. Mistral AI
5. Cohere Command R+

Fitur chatbot:

- Customer support
- Q&A layanan
- Project consultation
- Lead generation
- AI assistance

---

## ☁️ Free Tier Friendly Architecture

Project dirancang agar tetap optimal menggunakan layanan free tier:

- Firebase Firestore
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
- CSS Modules
- Tailwind CSS

## Backend

- Node.js
- TypeScript
- Express.js / Firebase Functions

## Database & Services

- Firebase Firestore
- Firebase Hosting
- Google Sheets API

## AI Providers

- Gemini API
- Groq API
- Hugging Face API
- Mistral API
- Cohere API

---

# 📁 Struktur Folder Project

```bash
/web-sixlabs
├── frontend/
│
│   ├── public/
│   │   └── sixlabs.svg
│   │
│   ├── src/
│   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── buttons/
│   │   │   ├── chatbot/
│   │   │   ├── footer/
│   │   │   ├── navbar/
│   │   │   └── ui/
│   │   │
│   │   ├── lib/
│   │   │
│   │   ├── sections/
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   │   ├── ai/
│   │   │   ├── firestore/
│   │   │   └── sheets/
│   │   │
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
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
````

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

# ⚙️ Menjalankan Backend

## Masuk ke folder backend

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Jalankan backend server

```bash
npm run dev
```

Backend API akan berjalan di:

```bash
http://localhost:5000
```

---

# 🔐 Environment Variables

## Frontend

```env
VITE_API_URL=
VITE_FIREBASE_API_KEY=
```

---

## Backend

```env
GEMINI_API_KEY=
GROQ_API_KEY=
HF_API_KEY=
MISTRAL_API_KEY=
COHERE_API_KEY=

FIREBASE_PROJECT_ID=
GOOGLE_SHEETS_ID=
JWT_SECRET=
```

---

# 🤝 Tim SixLabs

SixLabs merupakan startup digital agency yang beranggotakan 6 orang developer dengan fokus pada pengembangan solusi digital modern dan scalable.

---

# 📌 Roadmap

- [x] Landing Page
- [x] Responsive Design
- [x] Dark Mode
- [ ] AI Chatbot
- [ ] AI Analytics

---

# 📄 License

Project ini dibuat untuk pengembangan dan operasional internal SixLabs.

```

```
