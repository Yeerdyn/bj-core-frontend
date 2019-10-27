import React from 'react';
import bemClassNames from 'src/utilities/bemClassNames';
import { Icon, Menu } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import { ITEMS, SIGNIN } from 'src/constants/routes';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from 'src/store';
import { unsetAccessToken } from 'src/utilities/authOperations';

interface IPageLayoutProps extends RouteComponentProps {
  userProfile: RootState['userProfile'];
}

const b = bemClassNames('page-layout');

class PageLayout extends React.Component<IPageLayoutProps> {
  handleSignout = () => {
    unsetAccessToken();
  };

  render() {
    const {
      children,
      location: { pathname },
      userProfile,
    } = this.props;
    return (
      <div className={b()}>
        <Menu selectedKeys={[pathname]} mode="horizontal">
          <Menu.Item key={ITEMS}>
            <Link to={ITEMS}>
              <Icon type="unordered-list" />
              List of items
            </Link>
          </Menu.Item>
          <Menu.Item key={SIGNIN}>
            {userProfile && (
              <div onClick={this.handleSignout}>
                <Icon type="lock" />
                Signout
              </div>
            )}
            {!userProfile && (
              <Link to={SIGNIN}>
                <Icon type="lock" />
                Signin
              </Link>
            )}
          </Menu.Item>
        </Menu>
        <div className={b('main-container')}>{children}</div>
      </div>
    );
  }
}

const ConnectedPageLayout = connect((state: RootState) => ({
  userProfile: state.userProfile,
}))(PageLayout);

export default withRouter(ConnectedPageLayout);
