import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './modules/Main';
import Welcome from './modules/welcome/Welcome';
import RegisterArtist from './modules/register-artist';
import EventPage from './modules/event/EventPage';
import ArtistPage from './modules/artist/ArtistPage';

const history = createBrowserHistory();
history.listen(() => {});
const AppRouter = ({ children }) => (
  <Router history={history}>
    <Switch>
      <Route exact path="/test" component={() => <Home />} />
      <Route exact path="/welcome" component={() => <Welcome />} />
      <Route exact path="/event/:id" component={() => <EventPage />} />
      <Route exact path="/" component={() => <RegisterArtist />} />
      <Route exact path="/artist/:id" component={() => <ArtistPage />} />
    </Switch>
    {children}
  </Router>
);

export default AppRouter;
