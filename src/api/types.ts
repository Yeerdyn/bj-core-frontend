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

export type ICreateItemParams = {
  username: string;
  email: string;
  text: string;
};

export type ICreateItemResponse = {
  status: 'ok';
  message: {
    id: number;
    username: string;
    email: string;
    text: string;
    status: number;
  };
};

export type ILoginParams = {
  username: string;
  password: string;
};

export type ILoginResponse = {
  status: 'ok';
  message: {
    token: string;
  };
};
