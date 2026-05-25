import { Inter } from "next/font/google";
import "./styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "SixLabs — Digital Agency Indonesia",
  description:
    "SixLabs adalah tim digital agency dari Indonesia yang membangun web app, mobile app, company profile, dan landing page modern.",
  keywords: [
    "digital agency",
    "web development",
    "mobile app",
    "Indonesia",
    "SixLabs",
  ],
  authors: [{ name: "SixLabs" }],
  openGraph: {
    title: "SixLabs — Digital Agency Indonesia",
    description:
      "Tim startup digital dari Indonesia yang fokus membangun produk digital modern, scalable, dan siap masa depan.",
    type: "website",
    locale: "id_ID",
    siteName: "SixLabs",
  },
  twitter: {
    card: "summary_large_image",
    title: "SixLabs — Digital Agency Indonesia",
    description: "Tim startup digital dari Indonesia.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('sixlabs-theme');
                  var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  document.documentElement.setAttribute('data-theme', stored || preferred);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
