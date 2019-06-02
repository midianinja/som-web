import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './modules/Main';
import RegisterArtist from './modules/RegisterArtist';

const history = createBrowserHistory();

history.listen(() => { });
const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/test" component={() => <Home name="Caetano" />} />
      <Route exact path="/" component={() => <RegisterArtist />} />
    </Switch>
  </Router>
);

export default AppRouter;
