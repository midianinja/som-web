import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Welcome from './modules/welcome/Welcome';
import HandleArtist from './modules/handle-artist';
import EventPage from './modules/event/EventPage';
import RegisterEvent from './modules/register-event/RegisterEvent';
import RegisterProdctor from './modules/register-productor/RegisterProductor';
import Events from './modules/events/EventsPage';
import ArtistPage from './modules/artist/ArtistPage';
import ProcutorPage from './modules/productor/ProductorPage';
import ValidationEmailToken from './modules/validation-email-token/ValidationEmailToken';
import Home from './modules/home/Home';
import Terms from './modules/terms/Terms';
import Private from './Private';
import Main from './main/Main';
import MyEventsPage from './modules/my-events/MyEventsPage';

const history = createBrowserHistory();
history.listen(() => {});
const AppRouter = ({ children }) => (
  <Router history={history}>
    <Main>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route path="/terms" component={() => <Terms />} />
        <Route path="/reset-password" component={() => <Home />} />
        <Route path="/welcome" component={() => <Welcome />} />
        <Route path="/events" component={() => <Events />} />
        <Route path="/event/:id" component={() => <EventPage />} />
        <Route path="/artist/:id" component={() => <ArtistPage />} />
        <Route path="/productor/:id" component={() => <ProcutorPage />} />
        <Route path="/ativacao/:ida" component={() => <ValidationEmailToken />} />
        <Private>
          <Switch>
            <Route path="/register-artist" component={() => <HandleArtist />} />
            <Route path="/register-productor" component={() => <RegisterProdctor />} />
            <Route path="/register-event" component={() => <RegisterEvent />} />
            <Route path="/my-events" component={() => <MyEventsPage />} />
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
