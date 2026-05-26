# Halaman Arahan SixLabs

Ini adalah halaman arahan resmi untuk **SixLabs**, sebuah aplikasi web modern yang dibangun dengan teknologi front-end terbaru.

Proyek ini awalnya adalah aplikasi Next.js yang telah dimigrasikan ke pengaturan **Vite + React** untuk pengalaman pengembangan yang lebih cepat dan efisien.

## ✨ Fitur

*   **Sangat Cepat:** Dibangun dengan Vite untuk waktu mulai server yang hampir instan dan Hot Module Replacement (HMR).
*   **Desain Responsif:** Tata letak yang sepenuhnya responsif menggunakan Tailwind CSS, memastikan pengalaman yang hebat di semua perangkat.
*   **Tumpukan Modern:** Memanfaatkan React untuk membangun antarmuka pengguna yang dinamis dan interaktif.

## 🚀 Memulai

Ikuti petunjuk ini untuk mendapatkan salinan proyek dan menjalankannya di mesin lokal Anda untuk tujuan pengembangan dan pengujian.

### Prasyarat

*   Node.js (v18.x atau yang lebih baru direkomendasikan)
*   npm atau yarn

### Instalasi & Menjalankan

1.  **Gandakan (clone) repositori ini:**
    ```bash
    git clone https://github.com/zeeinz-ux/test-code.git
    cd test-code
    ```

2.  **Masuk ke direktori `frontend`:**
    ```bash
    cd frontend
    ```

3.  **Instal semua dependensi:**
    ```bash
    npm install
    ```

4.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```

Aplikasi akan tersedia di `http://localhost:5173` (atau port berikutnya yang tersedia).

## 📁 Struktur Folder Proyek

Berikut adalah gambaran umum struktur file dan folder dalam proyek ini:

```
/test-code
├── frontend/
│   ├── public/
│   │   └── sixlabs.svg            # Ikon atau aset publik
│   ├── src/
│   │   ├── assets/                # Aset gambar dan lainnya
│   │   ├── components/            # Komponen React yang dapat digunakan kembali
│   │   ├── lib/                   # Fungsi bantuan dan utilitas
│   │   ├── sections/              # Komponen besar yang mewakili bagian halaman
│   │   ├── App.jsx                # Komponen root aplikasi
│   │   ├── index.css              # File CSS global
│   │   └── main.jsx               # Titik masuk utama aplikasi React
│   ├── .gitignore               # File yang diabaikan oleh Git
│   ├── index.html               # Template HTML utama
│   ├── package.json             # Dependensi dan skrip proyek
│   ├── postcss.config.js        # Konfigurasi PostCSS
│   └── tailwind.config.js       # Konfigurasi Tailwind CSS
├── .gitignore                   # File yang diabaikan oleh Git di root
└── README.md                    # File yang sedang Anda baca
```

## 🛠️ Dibangun Dengan

*   [Vite](https://vitejs.dev/) - Perkakas front-end generasi berikutnya.
*   [React](https://reactjs.org/) - Pustaka JavaScript untuk membangun antarmuka pengguna.
*   [Tailwind CSS](https://tailwindcss.com/) - Kerangka kerja CSS yang mengutamakan utilitas.
