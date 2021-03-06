import React from 'react';
import { Table } from 'antd';
import {AuthorizedItemsColumns, DefaultPageSize, ITableRow, ItemsColumns} from './config';
import { PaginationConfig } from 'antd/lib/pagination';
import { SorterResult, TableStateFilters } from 'antd/lib/table';
import CreateItemForm from './partials/CreateItemForm';
import bemClassNames from 'src/utilities/bemClassNames';
import { API } from 'src/api';
import { ICreateItemParams, IGetAllItemsParams, ITask } from 'src/api/types';
import {getAccessToken} from "src/utilities/authOperations";

interface IItemsPageProps {}

interface IItemsPageState {
  data: ITableRow[];
  pagination: PaginationConfig;
  loading: boolean;
}

const b = bemClassNames('items-page');

class ItemsPage extends React.Component<IItemsPageProps, IItemsPageState> {
  state = {
    data: [],
    pagination: { pageSize: DefaultPageSize } as PaginationConfig,
    loading: false,
  };

  componentDidMount(): void {
    this.loadItems();
  }

  async loadItems(params?: IGetAllItemsParams) {
    const { pagination } = this.state;

    this.setState({ loading: true });

    try {
      const {
        message: { tasks, total_task_count },
      } = await API.methods.items.getAll(params);

      const data = tasks.map((item: ITask) => ({
        id: item.id,
        key: item.id,
        username: item.username,
        email: item.email,
        text: item.text,
        status: item.status,
      }));

      const updatedPagination = {
        ...pagination,
        total: Number(total_task_count),
        current: params ? params.page : pagination.current,
      };

      this.setState({
        data,
        pagination: updatedPagination,
      });
    } catch (e) {
      // Do nothing
    } finally {
      this.setState({ loading: false });
    }
  }

  handleTableChange = (
    newPagination: PaginationConfig,
    filters: TableStateFilters,
    sorter: SorterResult<any>
  ) => {
    this.loadItems({
      page: newPagination.current,
      sort_field: sorter.field as IGetAllItemsParams['sort_field'],
      sort_direction: sorter.order === 'ascend' ? 'asc' : 'desc',
    });
  };

  handleCreateItem = (values: ICreateItemParams) => {
    this.loadItems({ page: 1, sort_direction: 'desc' });
  };

  render() {
    const { data, pagination, loading } = this.state;

    return (
      <div className={b()}>
        <div className={b('table')}>
          <Table
            columns={getAccessToken() ? AuthorizedItemsColumns : ItemsColumns}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          />
        </div>

        <div className={b('form')}>
          <CreateItemForm onSubmit={this.handleCreateItem} />
        </div>
      </div>
    );
  }
}

export default ItemsPage;
