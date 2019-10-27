import React from 'react';
import bemClassNames from 'src/utilities/bemClassNames';
import { Icon, Menu } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import { ITEMS, SIGNIN } from 'src/constants/routes';
import { Link } from 'react-router-dom';

interface IPageLayoutProps extends RouteComponentProps {}

const b = bemClassNames('page-layout');

const PageLayout: React.FC<IPageLayoutProps> = ({
  children,
  location: { pathname },
}) => (
  <div className={b()}>
    <Menu selectedKeys={[pathname]} mode="horizontal">
      <Menu.Item key={ITEMS}>
        <Link to={ITEMS}>
          <Icon type="unordered-list" />
          List of items
        </Link>
      </Menu.Item>
      <Menu.Item key={SIGNIN}>
        <Link to={SIGNIN}>
          <Icon type="lock" />
          Signin
        </Link>
      </Menu.Item>
    </Menu>
    <div className={b('main-container')}>{children}</div>
  </div>
);

export default withRouter(PageLayout);
