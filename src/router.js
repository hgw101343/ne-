import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Sign from './routes/sign/sign';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/index" component={IndexPage} />
        <Route path="/sign" component={Sign} />
        <Redirect
          to={{
            pathname: "/sign",
          }} ></Redirect>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
