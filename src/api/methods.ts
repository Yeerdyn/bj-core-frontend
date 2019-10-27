import { API } from './api';
import {
  ICreateItemParams,
  ICreateItemResponse,
  IGetAllItemsParams,
  IGetAllItemsResponse,
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

export default {
  items,
};
