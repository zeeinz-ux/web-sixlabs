import { useChatbotContext } from './context/ChatbotContext';
import ChatWindow from './ChatWindow';
import styles from './css/chatWidget.module.css';

const ChatWidget = () => {
  const { isOpen, toggleWidget, closeWidget } = useChatbotContext();

  return (
    <div className={styles.widgetContainer}>
      {isOpen && (
        <div className={`${styles.windowWrapper} ${styles.windowOpen}`}>
          <ChatWindow onClose={closeWidget} />
        </div>
      )}

      <button
        type="button"
        onClick={toggleWidget}
        className={`${styles.toggleBtn} ${isOpen ? styles.toggleActive : ''}`}
        aria-label={isOpen ? 'Tutup chat' : 'Buka chat'}
        aria-expanded={isOpen}
      >
        <span className={styles.toggleIcon}>
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
};

export default ChatWidget;
