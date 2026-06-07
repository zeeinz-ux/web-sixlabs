import styles from "./css/messageBubble.module.css";

const MessageBubble = ({ message, isUser = false, timestamp, avatar }) => {
  const timeStr = timestamp
    ? new Date(timestamp).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className={`${styles.bubbleRow} ${isUser ? styles.userRow : styles.botRow}`}
      aria-label={isUser ? "Pesan Anda" : "Pesan asisten"}
    >
      {/* Avatar 🤖 — hanya untuk bot, di kiri sejajar bubble */}
      {!isUser && (
        <div className={styles.avatar} aria-hidden="true">
          {avatar ? (
            <img src={avatar} alt="AI Avatar" className={styles.avatarImg} />
          ) : (
            <span className={styles.avatarFallback}>🤖</span>
          )}
        </div>
      )}

      <div className={styles.content}>
        <div
          className={`${styles.bubble} ${isUser ? styles.userBubble : styles.botBubble}`}
        >
          <p className={styles.text}>{message}</p>
        </div>

        {timeStr && (
          <span
            className={`${styles.time} ${isUser ? styles.timeUser : styles.timeBot}`}
          >
            {timeStr}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
