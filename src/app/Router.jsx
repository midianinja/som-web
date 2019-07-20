import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './modules/Main';
import Welcome from './modules/welcome/Welcome';
import RegisterArtist from './modules/register-artist';
import EventPage from './modules/event/EventPage';
import ArtistPage from './modules/artist/ArtistPage';
import Private from './Private';


const history = createBrowserHistory();
history.listen(() => {});
const AppRouter = ({ children }) => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={() => <Home />} />
      <Route path="/welcome" component={() => <Welcome />} />
      <Route path="/event/:id" component={() => <EventPage />} />
      <Route path="/artist/:id" component={() => <ArtistPage />} />
      <Route path="/private">
        <Private>
          <Switch>
            <Route path="/private/register-artist" component={() => <RegisterArtist />} />
          </Switch>
        </Private>
      </Route>
    </Switch>
    {children}
  </Router>
);

AppRouter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppRouter;
