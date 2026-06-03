import { useChatbotContext } from "./context/ChatbotContext";
import ChatWindow from "./ChatWindow";
import styles from "./css/chatWidget.module.css";

const ChatWidget = () => {
  const { isOpen, toggleWidget, closeWidget } = useChatbotContext();

  return (
    <div className={styles.widgetContainer}>
      {isOpen && (
        <div className={`${styles.windowWrapper} ${styles.windowOpen}`}>
          <ChatWindow onClose={closeWidget} />
        </div>
      )}

      {!isOpen && (
        <button
          type="button"
          onClick={toggleWidget}
          className={styles.toggleBtn}
          aria-label="Buka chat"
          aria-expanded="false"
        >
          <span className={styles.toggleIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
