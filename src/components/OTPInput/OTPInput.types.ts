export interface OTPInputProps {
  label?: string;
  required?: boolean;
  length?: number;
  value?: string;
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
  resendSeconds?: number;
  onResend?: () => void;
  error?: boolean;
  helperText?: string;
}
