import {Divider, Tag} from "antd";
import React from "react";

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
    render: getTagByStatus
  },
];

export const AuthorizedItemsColumns = [
  ...ItemsColumns,
  {
    title: 'Actions',
    dataIndex: 'actions',
    render: () => (<div>
      <a>Complete</a>
      <Divider type="horizontal" />
      <a>Edit</a>
    </div>)
  },
];

function getTagByStatus(status: number) {
  return (<>
    {status === 0 && <Tag color='yellow'>New</Tag>}
    {status === 10 && <Tag color='green'>Completed</Tag>}
  </>)
}

export type ITableRow = {
  id: number;
  key: number;
  username: string;
  email: string;
  text: string;
  status: number;
};

export const DefaultPageSize = 3;
