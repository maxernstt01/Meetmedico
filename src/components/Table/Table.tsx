import { useMemo, useState, type ReactNode } from 'react';
import ArrowUpGlyph from '@/assets/icons/Primary Button/ArrowUp01Icon.svg?react';
import ArrowDownGlyph from '@/assets/icons/Primary Button/ArrowDown01Icon.svg?react';
import ArrowUpDownGlyph from '@/assets/icons/Primary Button/ArrowUpDownIcon.svg?react';
import { Checkbox } from '../Checkbox';
import { Pagination } from '../Pagination';
import { Skeleton } from '../Loader';
import styles from './Table.module.css';
import type { TableProps, TableSortDirection } from './Table.types';

interface SortState {
  key: string;
  direction: TableSortDirection;
}

function getSortDirection(sortState: SortState | null, key: string): TableSortDirection | null {
  if (!sortState || sortState.key !== key) return null;
  return sortState.direction;
}

function defaultCompare(a: unknown, b: unknown): number {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  return String(a ?? '').localeCompare(String(b ?? ''));
}

export function Table<T extends object>({
  columns,
  data,
  rowKey,
  rowSelection,
  loading = false,
  pagination,
  emptyText = 'No data',
  headerBackground,
  className,
}: TableProps<T>) {
  const [sortState, setSortState] = useState<SortState | null>(null);
  const [internalPage, setInternalPage] = useState(1);

  const getRowKey = (record: T, index: number): string | number =>
    typeof rowKey === 'function' ? rowKey(record, index) : (record[rowKey] as string | number);

  const handleSort = (key: string) => {
    setSortState((prev) => {
      if (!prev || prev.key !== key) return { key, direction: 'asc' };
      if (prev.direction === 'asc') return { key, direction: 'desc' };
      return null;
    });
  };

  const sortedData = useMemo(() => {
    if (!sortState) return data;
    const column = columns.find((c) => c.key === sortState.key);
    if (!column) return data;
    const sorted = [...data].sort((a, b) => {
      if (column.sorter) return column.sorter(a, b);
      const av = column.dataIndex ? a[column.dataIndex] : undefined;
      const bv = column.dataIndex ? b[column.dataIndex] : undefined;
      return defaultCompare(av, bv);
    });
    if (sortState.direction === 'desc') sorted.reverse();
    return sorted;
  }, [data, sortState, columns]);

  const paginationEnabled = pagination !== false;
  const pageSize = paginationEnabled ? pagination?.pageSize ?? 10 : sortedData.length || 1;
  const isControlledPage = paginationEnabled && pagination?.current !== undefined;
  const currentPage = isControlledPage ? pagination!.current! : internalPage;
  const pageCount = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const pagedData = paginationEnabled
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  const handlePageChange = (page: number) => {
    if (!isControlledPage) setInternalPage(page);
    if (pagination) pagination.onChange?.(page);
  };

  const selectedSet = useMemo(
    () => new Set(rowSelection?.selectedRowKeys ?? []),
    [rowSelection?.selectedRowKeys]
  );

  const pageSelectableKeys = pagedData
    .map((record, index) => ({ record, key: getRowKey(record, index) }))
    .filter(({ record }) => !rowSelection?.getCheckboxProps?.(record)?.disabled)
    .map(({ key }) => key);

  const allOnPageSelected =
    pageSelectableKeys.length > 0 && pageSelectableKeys.every((key) => selectedSet.has(key));
  const someOnPageSelected = pageSelectableKeys.some((key) => selectedSet.has(key));

  const emitSelection = (newSet: Set<string | number>) => {
    if (!rowSelection) return;
    const newKeys = Array.from(newSet);
    const newRows = data.filter((record, index) => newSet.has(getRowKey(record, index)));
    rowSelection.onChange(newKeys, newRows);
  };

  const handleToggleAll = (checked: boolean) => {
    const newSet = new Set(selectedSet);
    pageSelectableKeys.forEach((key) => (checked ? newSet.add(key) : newSet.delete(key)));
    emitSelection(newSet);
  };

  const handleToggleRow = (key: string | number, checked: boolean) => {
    const newSet = new Set(selectedSet);
    if (checked) newSet.add(key);
    else newSet.delete(key);
    emitSelection(newSet);
  };

  const columnCount = columns.length + (rowSelection ? 1 : 0);
  const skeletonRowCount = Math.min(pageSize, 5);

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.scrollContainer}>
        <table className={styles.table}>
          <thead>
            <tr
              className={styles.headerRow}
              style={headerBackground ? { backgroundColor: headerBackground } : undefined}
            >
              {rowSelection && (
                <th className={[styles.headerCell, styles.selectionCell].join(' ')}>
                  <Checkbox
                    checked={allOnPageSelected}
                    indeterminate={!allOnPageSelected && someOnPageSelected}
                    onChange={handleToggleAll}
                  />
                </th>
              )}
              {columns.map((column) => {
                const direction = getSortDirection(sortState, column.key);
                return (
                  <th
                    key={column.key}
                    className={[styles.headerCell, styles[`align${capitalize(column.align ?? 'left')}`]]
                      .filter(Boolean)
                      .join(' ')}
                    style={{ width: column.width }}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        className={styles.sortButton}
                        onClick={() => handleSort(column.key)}
                      >
                        <span>{column.title}</span>
                        {direction === 'asc' ? (
                          <ArrowUpGlyph className={[styles.sortIcon, styles.sortIconActive].join(' ')} aria-hidden="true" />
                        ) : direction === 'desc' ? (
                          <ArrowDownGlyph className={[styles.sortIcon, styles.sortIconActive].join(' ')} aria-hidden="true" />
                        ) : (
                          <ArrowUpDownGlyph className={styles.sortIcon} aria-hidden="true" />
                        )}
                      </button>
                    ) : (
                      column.title
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: skeletonRowCount }).map((_, index) => (
                <tr key={`skeleton-${index}`} className={styles.row}>
                  {rowSelection && (
                    <td className={[styles.cell, styles.selectionCell].join(' ')}>
                      <Skeleton shape="rect" width={20} height={20} />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className={styles.cell}>
                      <Skeleton shape="text" />
                    </td>
                  ))}
                </tr>
              ))
            ) : pagedData.length === 0 ? (
              <tr>
                <td className={styles.emptyCell} colSpan={columnCount}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              pagedData.map((record, index) => {
                const key = getRowKey(record, index);
                const disabled = rowSelection?.getCheckboxProps?.(record)?.disabled;
                return (
                  <tr key={key} className={styles.row}>
                    {rowSelection && (
                      <td className={[styles.cell, styles.selectionCell].join(' ')}>
                        <Checkbox
                          checked={selectedSet.has(key)}
                          disabled={disabled}
                          onChange={(checked) => handleToggleRow(key, checked)}
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      const value = column.dataIndex ? record[column.dataIndex] : undefined;
                      return (
                        <td
                          key={column.key}
                          className={[styles.cell, styles[`align${capitalize(column.align ?? 'left')}`]]
                            .filter(Boolean)
                            .join(' ')}
                        >
                          {column.render
                            ? column.render(value, record, index)
                            : ((value as ReactNode) ?? null)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {paginationEnabled && sortedData.length > 0 && (
        <div className={styles.paginationRow}>
          <Pagination
            total={pageCount}
            current={currentPage}
            onChange={handlePageChange}
            align={(pagination && pagination.align) || 'right'}
            showTotal={(pagination && pagination.showTotal) || false}
            totalItems={sortedData.length}
            pageSize={pageSize}
            prevNext="icon"
          />
        </div>
      )}
    </div>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
