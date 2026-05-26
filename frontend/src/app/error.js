'use client';

export default function Error({ error, reset }) {
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
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Terjadi Kesalahan</h2>
      <p style={{ color: "var(--text-secondary)" }}>
        {error?.message || "Something went wrong."}
      </p>
      <button
        onClick={reset}
        style={{
          padding: "12px 28px",
          background: "var(--accent)",
          color: "#fff",
          borderRadius: "9999px",
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
        }}
      >
        Coba Lagi
      </button>
    </div>
  );
}
