import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PageLayout from 'src/views/pages/PageLayout';
import { ITEMS, ROOT_PAGE, SIGNIN } from 'src/constants/routes';
import SigninPage from 'src/views/pages/SigninPage';
import ItemsPage from 'src/views/pages/ItemsPage';
import {Provider} from "react-redux";
import store from "./store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <PageLayout>
          <Switch>
            <Route
              path={ROOT_PAGE}
              exact={true}
              component={() => <Redirect to={ITEMS} />}
            />
            <Route path={ITEMS} component={ItemsPage} />

            <Route path={SIGNIN} component={SigninPage} />
            <Route component={() => <Redirect to={ROOT_PAGE} />} />
          </Switch>
        </PageLayout>
      </Router>
    </Provider>
  );
};

export default App;
