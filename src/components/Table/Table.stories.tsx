import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge';
import { Table } from './Table';
import type { TableColumn, TableRowSelection } from './Table.types';

interface Person {
  id: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const data: Person[] = [
  { id: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', tags: ['nice', 'developer'] },
  { id: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', tags: ['kawaii'] },
  { id: 3, name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park', tags: ['cool', 'teacher'] },
];

const columns: TableColumn<Person>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true, align: 'center' },
  { key: 'address', title: 'Address', dataIndex: 'address' },
  {
    key: 'tags',
    title: 'Tags',
    render: (_v, record) => (
      <div style={{ display: 'flex', gap: 4 }}>
        {record.tags.map((tag) => (
          <Badge key={tag} variant="info">
            {tag.toUpperCase()}
          </Badge>
        ))}
      </div>
    ),
  },
];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => <Table columns={columns} data={data} rowKey="id" />,
};

export const Loading: Story = {
  render: () => <Table columns={columns} data={data} rowKey="id" loading />,
};

export const Empty: Story = {
  render: () => <Table columns={columns} data={[]} rowKey="id" />,
};

export const NoPagination: Story = {
  render: () => <Table columns={columns} data={data} rowKey="id" pagination={false} />,
};

function SelectableDemo() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const rowSelection: TableRowSelection<Person> = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };
  return <Table columns={columns} data={data} rowKey="id" rowSelection={rowSelection} />;
}

export const RowSelection: Story = {
  render: () => <SelectableDemo />,
};

export const PaginationCentered: Story = {
  render: () => (
    <Table
      columns={columns}
      data={Array.from({ length: 25 }, (_, i) => ({
        id: i,
        name: `Person ${i}`,
        age: 30,
        address: 'Somewhere',
        tags: [],
      }))}
      rowKey="id"
      pagination={{ pageSize: 5, align: 'center' }}
    />
  ),
};
