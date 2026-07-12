export type PaginationPrevNext = 'none' | 'icon' | 'button';

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
  className?: string;
}
