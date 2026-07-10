export type DropdownVariant = 'default' | 'tertiary';
export type DropdownMode = 'normal' | 'single' | 'multi';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  variant?: DropdownVariant;
  mode?: DropdownMode;
  options: DropdownOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}
