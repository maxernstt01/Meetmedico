import type { PasswordRule } from './PasswordInput.types';

export const defaultPasswordRules: PasswordRule[] = [
  { id: 'length', label: 'Password Must have 8 Character', test: (value) => value.length >= 8 },
  { id: 'lowercase', label: 'Password Must have 1 small Letter', test: (value) => /[a-z]/.test(value) },
  { id: 'uppercase', label: 'Password Must have 1 Capital Letter', test: (value) => /[A-Z]/.test(value) },
  {
    id: 'special',
    label: 'Password Must have 1 Special Character',
    test: (value) => /[^A-Za-z0-9]/.test(value),
  },
  { id: 'number', label: 'Password Must have 1 Number', test: (value) => /[0-9]/.test(value) },
];
