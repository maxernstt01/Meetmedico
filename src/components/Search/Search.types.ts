import type { ComponentType, InputHTMLAttributes, SVGProps } from 'react';

export type SearchResultIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface SearchResultItem {
  id: string;
  title: string;
  description?: string;
  icon?: SearchResultIcon;
}

export interface SearchProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'value' | 'onChange' | 'defaultValue' | 'results' | 'onSubmit'
  > {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onSubmit?: (value: string) => void;
  results?: SearchResultItem[];
  onResultSelect?: (result: SearchResultItem) => void;
}
