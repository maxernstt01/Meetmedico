import { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table } from './Table';
import type { TableColumn, TableRowSelection } from './Table.types';

interface Person {
  id: number;
  name: string;
  age: number;
  address: string;
}

const people: Person[] = [
  { id: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { id: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { id: 3, name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
];

const columns: TableColumn<Person>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  { key: 'address', title: 'Address', dataIndex: 'address' },
];

describe('Table', () => {
  it('renders column headers and row data', () => {
    render(<Table columns={columns} data={people} rowKey="id" />);
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByText('John Brown')).toBeInTheDocument();
    expect(screen.getByText('London No. 1 Lake Park')).toBeInTheDocument();
  });

  it('applies a custom headerBackground when provided', () => {
    const { container } = render(
      <Table columns={columns} data={people} rowKey="id" headerBackground="rgb(240, 253, 244)" />
    );
    const headerRow = container.querySelector('thead tr') as HTMLElement;
    expect(headerRow.style.backgroundColor).toBe('rgb(240, 253, 244)');
  });

  it('uses a custom render function for a column', () => {
    const customColumns: TableColumn<Person>[] = [
      ...columns,
      {
        key: 'tag',
        title: 'Tag',
        render: (_value, record) => <span>Tag for {record.name}</span>,
      },
    ];
    render(<Table columns={customColumns} data={people} rowKey="id" />);
    expect(screen.getByText('Tag for Jim Green')).toBeInTheDocument();
  });

  it('shows the empty state when there is no data', () => {
    render(<Table columns={columns} data={[]} rowKey="id" />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('shows custom empty text', () => {
    render(<Table columns={columns} data={[]} rowKey="id" emptyText="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('shows skeleton rows instead of data when loading', () => {
    render(<Table columns={columns} data={people} rowKey="id" loading />);
    expect(screen.queryByText('John Brown')).not.toBeInTheDocument();
    expect(screen.getAllByRole('status').length).toBeGreaterThan(0);
  });

  it('sorts ascending then descending then clears on repeated header clicks', async () => {
    const user = userEvent.setup();
    render(<Table columns={columns} data={people} rowKey="id" pagination={false} />);
    const nameHeader = screen.getByRole('button', { name: /Name/ });

    await user.click(nameHeader);
    let rows = screen.getAllByRole('row').slice(1);
    expect(within(rows[0]).getByText('Jim Green')).toBeInTheDocument();

    await user.click(nameHeader);
    rows = screen.getAllByRole('row').slice(1);
    expect(within(rows[0]).getByText('John Brown')).toBeInTheDocument();

    await user.click(nameHeader);
    rows = screen.getAllByRole('row').slice(1);
    expect(within(rows[0]).getByText('John Brown')).toBeInTheDocument();
  });

  it('paginates data using the default page size', () => {
    const manyPeople = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      name: `Person ${i}`,
      age: 30,
      address: 'Somewhere',
    }));
    render(<Table columns={columns} data={manyPeople} rowKey="id" />);
    expect(screen.getByText('Person 0')).toBeInTheDocument();
    expect(screen.queryByText('Person 10')).not.toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
  });

  it('renders every row when pagination is false', () => {
    const manyPeople = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      name: `Person ${i}`,
      age: 30,
      address: 'Somewhere',
    }));
    render(<Table columns={columns} data={manyPeople} rowKey="id" pagination={false} />);
    expect(screen.getByText('Person 24')).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Pagination' })).not.toBeInTheDocument();
  });

  function SelectableTable() {
    const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
    const rowSelection: TableRowSelection<Person> = {
      selectedRowKeys,
      onChange: (keys) => setSelectedRowKeys(keys),
      getCheckboxProps: (record) => ({ disabled: record.id === 3 }),
    };
    return (
      <Table columns={columns} data={people} rowKey="id" rowSelection={rowSelection} pagination={false} />
    );
  }

  it('selects an individual row via its checkbox', async () => {
    const user = userEvent.setup();
    render(<SelectableTable />);
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);
    expect(checkboxes[1]).toBeChecked();
  });

  it('selects all selectable rows via the header checkbox and marks it indeterminate after a partial deselect', async () => {
    const user = userEvent.setup();
    render(<SelectableTable />);
    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    const headerCheckbox = checkboxes[0];

    await user.click(headerCheckbox);
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).toBeChecked();
    expect(checkboxes[3]).toBeDisabled();

    await user.click(checkboxes[1]);
    expect(headerCheckbox.indeterminate).toBe(true);
  });

  it('disables the checkbox for rows flagged via getCheckboxProps', () => {
    render(<SelectableTable />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[3]).toBeDisabled();
  });

  it('calls pagination.onChange when navigating pages', async () => {
    const onChange = vi.fn();
    const manyPeople = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      name: `Person ${i}`,
      age: 30,
      address: 'Somewhere',
    }));
    const user = userEvent.setup();
    render(
      <Table
        columns={columns}
        data={manyPeople}
        rowKey="id"
        pagination={{ pageSize: 10, onChange }}
      />
    );
    await user.click(screen.getByRole('button', { name: '2' }));
    expect(onChange).toHaveBeenCalledWith(2);
    expect(screen.getByText('Person 10')).toBeInTheDocument();
  });
});
