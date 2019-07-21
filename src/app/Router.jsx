import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Welcome from './modules/welcome/Welcome';
import RegisterArtist from './modules/register-artist';
import EventPage from './modules/event/EventPage';
import ArtistPage from './modules/artist/ArtistPage';
import Private from './Private';
import Main from './main/Main';

const history = createBrowserHistory();
history.listen(() => {});
const AppRouter = ({ children }) => (
  <Router history={history}>
    <Main>
      <Switch>
        <Route path="/welcome" component={() => <Welcome />} />
        <Route path="/event/:id" component={() => <EventPage />} />
        <Route path="/artist/:id" component={() => <ArtistPage />} />
        <Private>
          <Switch>
            <Route path="/register-artist" component={() => <RegisterArtist />} />
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
