import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { Button } from '../Button';
import styles from './OTPInput.module.css';
import type { OTPInputProps } from './OTPInput.types';

function padDigits(value: string, length: number): string[] {
  const chars = value.split('').slice(0, length);
  return Array.from({ length }, (_, i) => chars[i] ?? '');
}

export function OTPInput({
  label = 'Enter OTP',
  required,
  length = 6,
  value,
  onChange,
  onComplete,
  resendSeconds = 30,
  onResend,
  error,
  helperText,
}: OTPInputProps) {
  const isControlled = value !== undefined;
  const [internalDigits, setInternalDigits] = useState<string[]>(() => Array(length).fill(''));
  const digits = isControlled ? padDigits(value, length) : internalDigits;

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [secondsLeft, setSecondsLeft] = useState(resendSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((seconds) => seconds - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const setDigits = (next: string[]) => {
    if (!isControlled) setInternalDigits(next);
    const code = next.join('');
    onChange?.(code);
    if (next.every((digit) => digit !== '')) {
      onComplete?.(code);
    }
  };

  const handleChange = (index: number, raw: string) => {
    const char = raw.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    event.preventDefault();
    const next = padDigits(pasted, length);
    setDigits(next);
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  const handleResend = () => {
    setSecondsLeft(resendSeconds);
    onResend?.();
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <span className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </span>
      )}
      <div className={styles.boxes}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(node) => {
              inputsRef.current[index] = node;
            }}
            className={[styles.box, error && styles.error].filter(Boolean).join(' ')}
            inputMode="numeric"
            maxLength={1}
            placeholder="-"
            value={digit}
            aria-label={`Digit ${index + 1}`}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      <div className={styles.footer}>
        {secondsLeft > 0 ? (
          <span className={styles.countdown}>
            Request OTP in 00:{String(secondsLeft).padStart(2, '0')}s
          </span>
        ) : (
          <Button type="button" variant="tertiary" onClick={handleResend}>
            Resend OTP
          </Button>
        )}
      </div>
      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
}
