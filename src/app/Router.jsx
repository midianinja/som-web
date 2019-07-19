import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './modules/Main';
import RegisterArtist from './modules/register-artist';
import EventPage from './modules/event/EventPage';
import ArtistPage from './modules/artist/ArtistPage';

const history = createBrowserHistory();
history.listen(() => {});
const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route exact path='/test' component={() => <Home />} />
      <Route exact path='/event/:id' component={() => <EventPage />} />
      <Route exact path='/' component={() => <RegisterArtist />} />
      <Route exact path='/artist/:id' component={() => <ArtistPage />} />
    </Switch>
  </Router>
);

export default AppRouter;
