export const ItemsColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
  },
  {
    title: 'User name',
    dataIndex: 'username',
    sorter: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: true,
  },
  {
    title: 'Text',
    dataIndex: 'text',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: true,
  },
];

export type ITableRow = {
  id: number;
  key: number,
  username: string,
  email: string,
  text: string,
  status: number,
}

export const DefaultPageSize = 3;
