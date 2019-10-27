import { API } from './api';
import {
  ICreateItemParams,
  ICreateItemResponse,
  IGetAllItemsParams,
  IGetAllItemsResponse,
  ILoginParams,
  ILoginResponse,
} from './types';
import { ItemsResourceUrl } from '../constants/api';

async function getAllItems(
  params?: IGetAllItemsParams
): Promise<IGetAllItemsResponse> {
  const response = await API.context.get(ItemsResourceUrl, {
    params,
  });
  const {
    data: { message, status },
  } = response;

  if (status === 'error') {
    throw new Error(message);
  }

  return response.data;
}

async function createItem(
  params: ICreateItemParams
): Promise<ICreateItemResponse> {
  const formData = new FormData();
  formData.append('username', params.username);
  formData.append('email', params.email);
  formData.append('text', params.text);

  const response = await API.context.post(
    ItemsResourceUrl.concat('create'),
    formData
  );
  const {
    data: { message, status },
  } = response;

  if (status === 'error') {
    throw new Error(message);
  }

  return response.data;
}

const items = {
  getAll: getAllItems,
  create: createItem,
};

async function login(params: ILoginParams): Promise<ILoginResponse> {
  const formData = new FormData();
  formData.append('username', params.username);
  formData.append('password', params.password);

  const response = await API.context.post(
    ItemsResourceUrl.concat('login'),
    formData
  );
  const {
    data: { message, status },
  } = response;

  console.log('response', response);

  if (status === 'error') {
    throw new Error(Object.values(message).join('/n'));
  }

  return response.data;
}

const auth = {
  login,
};

export default {
  items,
  auth,
};
