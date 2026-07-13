import type { ReactNode } from 'react';
import type { PaginationAlign } from '../Pagination';

export type TableAlign = 'left' | 'center' | 'right';
export type TableSortDirection = 'asc' | 'desc';

export interface TableColumn<T> {
  key: string;
  title: ReactNode;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, index: number) => ReactNode;
  width?: number | string;
  align?: TableAlign;
  sortable?: boolean;
  sorter?: (a: T, b: T) => number;
}

export interface TableRowSelection<T> {
  selectedRowKeys: (string | number)[];
  onChange: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
  getCheckboxProps?: (record: T) => { disabled?: boolean };
}

export interface TablePaginationConfig {
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
  onChange?: (page: number) => void;
  align?: PaginationAlign;
  showTotal?: boolean;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: keyof T | ((record: T, index: number) => string | number);
  rowSelection?: TableRowSelection<T>;
  loading?: boolean;
  pagination?: false | TablePaginationConfig;
  emptyText?: ReactNode;
  headerBackground?: string;
  className?: string;
}
