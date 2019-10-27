import { API } from './api';
import { IGetAllItemsParams, IGetAllItemsResponse } from './types';

async function getAllItems(
  params?: IGetAllItemsParams
): Promise<IGetAllItemsResponse> {
  const response = await API.context.get('', {
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

const items = {
  getAll: getAllItems,
};

export default {
  items,
};
