import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './modules/Main';
import RegisterArtist from './modules/RegisterArtist';
import EventPage from './modules/EventPage';

const history = createBrowserHistory();

history.listen(() => {});
const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route exact path='/test' component={() => <Home />} />
      <Route exact path='/event' component={() => <EventPage />} />
      <Route exact path='/' component={() => <RegisterArtist />} />
    </Switch>
  </Router>
);

export default AppRouter;
