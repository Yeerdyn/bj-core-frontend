export type IGetAllItemsParams = {
  sort_field?: 'id' | 'username' | 'email' | 'status';
  sort_direction?: 'asc' | 'desc';
  page?: number;
};

export type IGetAllItemsResponse = {
  status: 'ok';
  message: {
    tasks: Array<ITask>;
    total_task_count: string;
  };
};

export type ITask = {
  id: number;
  username: string;
  email: string;
  text: string;
  status: number;
};

