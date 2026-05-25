# SixLabs

> Digital Agency Startup — Website & Backend Platform

## 🚀 Project Overview

**SixLabs** adalah startup digital agency berisi 6 orang yang menyediakan jasa:

- 🌐 **Web Application Development**
- 📱 **Mobile Application Development**
- 🏢 **Company Profile Website**
- 🎯 **Landing Page Development**
- 🔍 **SEO Optimization**

---

## 📁 Repository Structure

Repo ini menggunakan **monorepo** dengan 2 folder utama:

```

web-sixlabs/
├── 📁 frontend/          # Next.js 14 — Website UI/UX (Static Export)
│   ├── app/
│   │   ├── styles/       # CSS global (variables, animations, utilities)
│   │   ├── layout.js     # Root layout + SEO metadata
│   │   ├── page.js       # Landing page (all sections)
│   │   ├── loading.js    # Loading state
│   │   ├── not-found.js  # 404 page
│   │   └── error.js      # Error boundary
│   │
│   ├── components/
│   │   ├── navbar/       # Navbar + ThemeToggle + MobileMenu ✅
│   │   ├── footer/       # Footer + FooterLinks ⬜ Stage 6
│   │   ├── ui/           # Button, Card, Container, Badge, SectionHeading ✅
│   │   └── buttons/      # CTAButton, WhatsAppButton ⬜ Stage 6
│   │
│   ├── sections/         # Hero, Services, Portfolio, Contact, FAQ ✅ Stage 5
│   ├── hooks/            # useDarkMode, useScrollPosition, useMediaQuery ✅
│   ├── lib/              # Utils (cn, debounce) + Formatters ✅
│   ├── constants/        # Navigation, Services, Portfolio, FAQ, Contact data ✅
│   ├── public/           # Images, icons, favicon
│   └── package.json
│
├── 📁 backend/           # API Server (Coming Soon — Stage 8)
│   └── (coming soon)
│
├── 📄 README.md          # Dokumentasi ini
└── 📄 .gitignore         # Git ignore rules (root + subfolder)

```

---

## 🛠️ Tech Stack

### Frontend

| Teknologi             | Versi           | Purpose                                |
| --------------------- | --------------- | -------------------------------------- |
| Next.js               | 14 (App Router) | Framework                              |
| React                 | 18              | UI Library                             |
| Tailwind CSS          | 3.4             | Styling                                |
| CSS Modules           | Native          | Scoped styles per component            |
| Framer Motion         | Latest          | Advanced Component & Reveal Animations |
| Lucide React          | Latest          | Icons                                  |
| clsx + tailwind-merge | Latest          | Class merging                          |

> **Note:** Animasi dasar menggunakan kombinasi CSS Transitions untuk komponen UI mikro, sedangkan **Framer Motion** dioptimalkan secara modular pada area interaktif khusus seperti _reveal animation_ pada section dan transisi _smooth accordion_ pada FAQ (KISS Principle tetap terjaga).

### Backend (Coming Soon — Stage 8)

| Teknologi          | Status |
| ------------------ | ------ |
| Firebase Functions | 🔜     |
| Firestore          | 🔜     |
| Google Sheets API  | 🔜     |

---

## 🚀 Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev

```

Buka [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

### Build Production (Static Export)

```bash
cd frontend
npm run build

```

Output akan ada di folder `dist/` (konfigurasi static export untuk Render.com).

---

## 📦 Deployment

| Service  | Platform              | Type                | Status |
| -------- | --------------------- | ------------------- | ------ |
| Frontend | Render.com            | Static Site         | 🔜     |
| Backend  | Render.com            | Web Service (512MB) | 🔜     |
| Database | Firebase Spark (Free) | 🔜                  |        |

---

## 📋 Development Stages

| Stage       | Status             | Deskripsi                                                        |
| ----------- | ------------------ | ---------------------------------------------------------------- |
| **Stage 1** | ✅ **Complete**    | Config, CSS Variables, Layout, Utilities                         |
| **Stage 2** | ✅ **Complete**    | Komponen Dasar (Button, Card, Container, Badge, SectionHeading)  |
| **Stage 3** | ✅ **Complete**    | Data & Hooks (constants + custom hooks)                          |
| **Stage 4** | ✅ **Complete**    | Navbar (Navbar, MobileMenu, ThemeToggle)                         |
| **Stage 5** | ✅ **Complete**    | Sections (Hero, Services, Portfolio, Contact, FAQ) + Integration |
| **Stage 6** | 🔄 **In Progress** | Footer & Page Assembly                                           |
| **Stage 7** | ⬜                 | Polish, Error Pages & Deploy Config                              |
| **Stage 8** | ⬜                 | Backend Integration                                              |

---

## 🎨 Design System

- **Light Mode:** Clean white `#FAFAFA` + soft gray `#E2E8F0` + blue accent `#2563EB`
- **Dark Mode:** Dark navy `#0F172A` + slate `#1E293B` + blue accent `#60A5FA`
- **Font:** Inter (Google Fonts via next/font)
- **Animation Strategy:**
- **Sections Reveal:** Framer Motion (`motion.div` dengan viewport triggers tunggal)
- **FAQ Accordion:** Framer Motion `AnimatePresence` untuk transisi tinggi dinamis yang mulus
- **UI Primitives:** CSS Transitions murni (hover & focus states)

- **Icons:** Lucide React
- **Dark Mode Strategy:** `class` toggle via `document.documentElement`
- **Responsive:** Mobile-first (sm:640px, md:768px, lg:1024px)

---

## 🏗️ Architecture Decisions

### CSS & Animation Strategy

| File / Library  | Purpose                                                              |
| --------------- | -------------------------------------------------------------------- |
| `globals.css`   | Tailwind directives + base styles                                    |
| `variables.css` | CSS variables light/dark mode                                        |
| `*.module.css`  | Scoped styles per component/section untuk layouting                  |
| `Framer Motion` | Handling interpolasi tinggi dinamis (FAQ) dan _fade/slide on scroll_ |

---

## 👥 Team

SixLabs — 6 Founders, 1 Vision.

---

## 📝 License

Private internal project — SixLabs.
