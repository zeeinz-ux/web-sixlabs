import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        background: "var(--bg-page)",
        color: "var(--text-primary)",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <h1 style={{ fontSize: "4rem", fontWeight: 800, color: "var(--accent)" }}>
        404
      </h1>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
        Halaman tidak ditemukan
      </h2>
      <p style={{ color: "var(--text-secondary)", maxWidth: 400 }}>
        Halaman yang kamu cari tidak ada atau telah dipindahkan.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "8px",
          padding: "12px 28px",
          background: "var(--accent)",
          color: "#fff",
          borderRadius: "9999px",
          fontWeight: 600,
          fontSize: "0.95rem",
          textDecoration: "none",
        }}
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
