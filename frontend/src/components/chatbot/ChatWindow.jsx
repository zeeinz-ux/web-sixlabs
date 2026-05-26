import { useChatbotContext } from './context/ChatbotContext';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import styles from './css/chatWindow.module.css';

const ChatWindow = ({ onClose }) => {
  const {
    messages,
    isLoading,
    messagesContainerRef,
    handleScroll,
    sendMessage,
    clearChat,
  } = useChatbotContext();

  return (
    <div className={styles.window} role="dialog" aria-label="SixLabs AI Chat">
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.avatar}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
          </div>
          <div className={styles.headerText}>
            <h3 className={styles.title}>SixLabs AI</h3>
            <span className={styles.status}>
              <span className={styles.statusDot} />
              {isLoading ? 'Mengetik...' : 'Online'}
            </span>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={clearChat}
            aria-label="Bersihkan chat"
            title="Bersihkan chat"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={onClose}
            aria-label="Tutup chat"
            title="Tutup chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div
        className={styles.messagesArea}
        ref={messagesContainerRef}
        onScroll={handleScroll}
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.content}
            isUser={msg.role === 'user'}
            timestamp={msg.createdAt}
          />
        ))}

        {/* Typing Indicator — controlled via isLoading state */}
        {isLoading && (
          <div className={styles.typingRow}>
            <div className={styles.typingAvatar}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </div>
            <div className={styles.typingBubble}>
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} disabled={isLoading} />
    </div>
  );
};

export default ChatWindow;
