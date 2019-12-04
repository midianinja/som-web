import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Welcome from './modules/welcome/Welcome';
import HandleArtist from './modules/handle-artist';
import EventPage from './modules/event/EventPage';
import Events from './modules/events/EventsPage';
import ArtistPage from './modules/artist/ArtistPage';
import ValidationEmailToken from './modules/validation-email-token/ValidationEmailToken';
import Home from './modules/home/Home';
import Private from './Private';
import Main from './main/Main';

const history = createBrowserHistory();
history.listen(() => {});
const AppRouter = ({ children }) => (
  <Router history={history}>
    <Main>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route path="/welcome" component={() => <Welcome />} />
        <Route path="/events" component={() => <Events />} />
        <Route path="/event/:id" component={() => <EventPage />} />
        <Route path="/artist/:id" component={() => <ArtistPage />} />
        <Route path="/ativacao/:ida" component={() => <ValidationEmailToken />} />
        <Private>
          <Switch>
            <Route path="/register-artist" component={() => <HandleArtist />} />
          </Switch>
        </Private>
      </Switch>
      {children}
    </Main>
  </Router>
);

AppRouter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppRouter;
