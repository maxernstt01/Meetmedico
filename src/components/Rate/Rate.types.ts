export type RateVariant = 'outline' | 'filled' | 'badge';
export type RateSize = 16 | 20 | 26;

export interface RateProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  count?: number;
  variant?: RateVariant;
  size?: RateSize;
  allowClear?: boolean;
  disabled?: boolean;
  className?: string;
}
