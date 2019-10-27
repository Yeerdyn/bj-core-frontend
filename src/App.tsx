import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PageLayout from 'src/pages/PageLayout';
import { ITEMS, ROOT_PAGE, SIGNIN } from 'src/constants/routes';
import SigninPage from 'src/pages/SigninPage';
import ItemsPage from 'src/pages/ItemsPage';
import { connect, Provider } from 'react-redux';
import store, { RootState } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <PageLayout>
          <ConnectedRoutes />
        </PageLayout>
      </Router>
    </Provider>
  );
};

interface IRoutesProps {
  userProfile: RootState['userProfile'];
}

const Routes: React.FC<IRoutesProps> = ({ userProfile }) => (
  <Switch>
    <Route
      path={ROOT_PAGE}
      exact={true}
      component={() => <Redirect to={ITEMS} />}
    />
    <Route path={ITEMS} component={ItemsPage} />
    <Route
      path={SIGNIN}
      component={() =>
        !userProfile ? <SigninPage /> : <Redirect to={ROOT_PAGE} />
      }
    />
    <Route component={() => <Redirect to={ROOT_PAGE} />} />
  </Switch>
);

const ConnectedRoutes = connect((state: RootState) => ({
  userProfile: state.userProfile,
}))(Routes);

export default App;
