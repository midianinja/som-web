import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Store from '../../../store/Store';
import PrimaryButton from '../../atoms/PrimaryButton';
import {
  buttonCustomStyle, subscribedButtonStyle, unsubscribedButtonStyle,
} from './subscribeButton.style';
import { subscribeAction } from './subscribe.controller';
import DialogModal from '../../modals/Dialog.modal';

const unixTime = unixtime => new Date(+unixtime).toISOString().slice(0, 19);

function SubscribeButton({
  customStyle, onSuccess, onError,
  event, history,
}) {
  const { state, dispatch } = useContext(Store);
  const [isArtist, setIsArtist] = useState(false);
  const [dialog, setDialog] = useState({});
  const [isClosingSubscribe, setIsClosingSubscribe] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (state.connectionType === 'artist' && isArtist) setIsArtist(true);
    if (!isArtist) setIsArtist(false);
    const closingDateInstance = moment(new Date(unixTime(event.subscribe_closing_date)));
    const todayInstance = moment();

    const diffDays = Math.floor(closingDateInstance.diff(todayInstance, 'days', true));
    const diffHours = Math.ceil(closingDateInstance.diff(todayInstance, 'hours', true));

    setIsClosingSubscribe(diffDays <= 0 && diffHours <= 0);

    if (state.user && state.user.artist) {
      const artistId = state.user.artist.id;

      const isSubscribedCheck = !!event.subscribers.find(s => (s.id === artistId));
      const isReprovedCheck = !!event.reproved_artists.find(s => (s.id === artistId));
      const isApprovedCheck = !!event.approved_artists.find(s => (s.id === artistId));

      setIsSubscribed(isSubscribedCheck || isReprovedCheck || isApprovedCheck);
    }
  }, [state.user, event, state.connectionType]);

  if (state.connectionType !== 'artist') return null;
  if (isClosingSubscribe) {
    return (
      <PrimaryButton
        disabled
        size="small"
        customStyle={customStyle || buttonCustomStyle}
      >
        Inscrições encerradas
      </PrimaryButton>
    );
  }

  return (
    <>
      <PrimaryButton
        onClick={() => {
          if (isSubscribed) return history.push(`/event/${event.id}`);
          subscribeAction({
            user: state.user,
            onError,
            event,
            dispatch,
            setDialog,
            onSuccess,
            history,
          });
        }}
        customStyle={
          customStyle || (isSubscribed ? subscribedButtonStyle : unsubscribedButtonStyle)
        }
      >
        {isSubscribed ? 'Inscrito' : 'Inscrever-se'}
      </PrimaryButton>
      {dialog.title ? (
        <DialogModal
          closeAction={() => setDialog({})}
          isOpen
          title={dialog.title}
          icon={dialog.icon}
          description={dialog.description}
          agreeText={dialog.agreeText}
          disagreeText={dialog.disagreeText}
          confirmAction={dialog.confirmAction}
          disagreeAction={dialog.disagreeAction}
        />
      ) : null}
    </>
  );
}

const eventShape = {
  subscribe_closing_date: PropTypes.string,
  event_date: PropTypes.string,
  cover: PropTypes.object,
  id: PropTypes.string,
};


const historyShape = {
  push: PropTypes.func.isRequired,
};

SubscribeButton.propTypes = {
  customStyle: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  history: PropTypes.shape(historyShape).isRequired,
  event: PropTypes.shape(eventShape).isRequired,
};

export default withRouter(SubscribeButton);
