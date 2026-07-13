export type PaginationPrevNext = 'none' | 'icon' | 'button';
export type PaginationAlign = 'left' | 'center' | 'right';

export interface PaginationProps {
  total: number;
  current?: number;
  defaultCurrent?: number;
  onChange?: (page: number) => void;
  showTotal?: boolean;
  totalItems?: number;
  pageSize?: number;
  prevNext?: PaginationPrevNext;
  siblingCount?: number;
  boundaryCount?: number;
  align?: PaginationAlign;
  className?: string;
}
