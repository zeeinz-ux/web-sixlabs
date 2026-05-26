import styles from './css/messageBubble.module.css';

const MessageBubble = ({ message, isUser = false, timestamp, avatar }) => {
  const timeStr = timestamp
    ? new Date(timestamp).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <div
      className={`${styles.bubbleRow} ${isUser ? styles.userRow : styles.botRow}`}
      aria-label={isUser ? 'Pesan Anda' : 'Pesan asisten'}
    >
      {/* Avatar — hanya tampil untuk bot di kiri */}
      {!isUser && (
        <div className={styles.avatar}>
          {avatar ? (
            <img src={avatar} alt="AI Avatar" className={styles.avatarImg} />
          ) : (
            <div className={styles.avatarFallback}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </div>
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
          <span className={`${styles.time} ${isUser ? styles.timeUser : styles.timeBot}`}>
            {timeStr}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
