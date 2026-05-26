import { useState, useRef, useCallback } from 'react';
import styles from './css/chatInput.module.css';

const ChatInput = ({ onSend, isLoading = false, disabled = false }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleSend = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed || isLoading || disabled) return;

    onSend?.(trimmed);
    setText('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [text, isLoading, disabled, onSend]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleChange = useCallback((e) => {
    setText(e.target.value);

    // Auto-resize textarea
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, []);

  const isEmpty = text.trim().length === 0;

  return (
    <div className={styles.inputBar}>
      <div className={styles.inputWrapper}>
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ketik pesan Anda..."
          className={styles.textarea}
          disabled={disabled || isLoading}
          aria-label="Ketik pesan"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={isEmpty || isLoading || disabled}
          className={`${styles.sendBtn} ${isEmpty ? styles.sendDisabled : ''}`}
          aria-label="Kirim pesan"
        >
          {isLoading ? (
            <span className={styles.spinner}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            </span>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
