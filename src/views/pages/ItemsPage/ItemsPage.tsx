import React from 'react';
import { Table } from 'antd';
import {DefaultPageSize, ItemsColumns} from "./config";
import range from 'lodash/range';
import {PaginationConfig} from "antd/lib/pagination";
import {SorterResult, TableStateFilters} from "antd/lib/table";
import CreateItemForm from "./partials/CreateItemForm";
import bemClassNames from "../../../utilities/bemClassNames";

interface IItemsPageProps {}

interface IItemsPageState {
  data: any [],
  pagination: PaginationConfig,
  loading: boolean
}

const b = bemClassNames('items-page');

class ItemsPage extends React.Component<IItemsPageProps, IItemsPageState> {
  state = {
    data: [],
    pagination: { pageSize: DefaultPageSize } as PaginationConfig,
    loading: false
  };

  componentDidMount(): void {
    this.loadItems();
  }

  async loadItems() {
    this.setState({
      data: range(DefaultPageSize*5).map(i => ({
        key: i,
        name: `Edward King ${i}`,
        email: 32,
        text: `London, Park Lane no. ${i}`,
        status: 'new',
      }))
    })
  }

  handleTableChange = (newPagination: PaginationConfig, filters: TableStateFilters, sorter: SorterResult<any>) => {
    const { pagination } = this.state;

    this.setState({
      pagination: {
          ...pagination,
          current: newPagination.current
      }});

    console.log('PARAMS', {
      results: pagination.pageSize,
      page: newPagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  handleCreateItem = (values: object) => {
    console.log('handleCreateItem', values);
  };

  render() {
    const { data, pagination, loading } = this.state;

    return (
      <div className={b()}>
        <div className={b('table')}>
          <Table
            columns={ItemsColumns}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          />
        </div>

        <div className={b('form')}>
          <CreateItemForm

          />
        </div>
      </div>
    );
  }
}

export default ItemsPage;
