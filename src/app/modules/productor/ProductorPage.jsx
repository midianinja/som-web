import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { black, tertiaryBlack } from '../../settings/colors';
import ProductorBasicInfo from '../../components/templates/productor/ProductorBasicInfo';
import Cover from '../../components/atoms/Cover';
import Header from '../../components/organisms/Header';
import InstagramMedia from '../../components/molecules/InstagramMedias';
// import Store from '../../store/Store';
import { fetchProductorData, fetchProductorInstaImages } from './ProductorController';
import DialogModal from '../../components/modals/Dialog.modal';
import Eventcard from '../event/components/event-card/EventCard';
import PrimaryButton from '../../components/atoms/PrimaryButton';
import Store from '../../store/Store';

const ProductorWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${black};
  color: white;
  text-align: center;

  @media (min-width: 1024px) {
    padding-bottom: 30px;
  }
`;

const CoverWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 0;
  margin-top: 51px;

  @media (min-width: 1024px) {
    position: fixed;
    top: 53px;
    margin-top: 0px;
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  min-height: 50vh;
`;

const Content = styled.div`
  width: 100%;
  display: inline-block;
  padding-top: 64px;
  position: relative;
  max-width: 1024px;

  @media (min-width: 1024px) {
    padding-top: 150px;
    display: inline-flex;
    justify-content: space-between;
  }
`;

const ColumnWrapper = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 130px;
  vertical-align: top;

  @media (min-width: 1024px) {
    max-width: calc(100% - 454px);
    text-align: left;
  }
`;

const EventsTitle = styled.h2`
  text-align: left;
  font-size: 1.3rem;
  font-weight: 400;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const NotEvents = styled.span`
  font-weight: 200;
`;
const EventsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const renderEvents = (events, more, setMore, onSuccess) => {
  let sortedEvents = events.sort((a, b) => (
    new Date(+a.event_date) > new Date(+b.event_date) ? 1 : -1));

  if (!more) sortedEvents = sortedEvents.slice(0, 2);

  return (
    <EventsContainer>
      {
        sortedEvents.map(event => (
          <Eventcard
            key={event.id}
            customStyle="margin: 40px 0;"
            event={event}
            onSubscribe={onSuccess}
          />
        ))
      }
      {
        events.length > 2 ? (
          <PrimaryButton
            customStyle={`
              background-color: ${tertiaryBlack};
              width: 200px;
            `}
            onClick={() => setMore(!more)}
          >
            {more ? 'Carregar menos eventos' : 'Carregar mais eventos'}
          </PrimaryButton>
        ) : null
      }
    </EventsContainer>
  );
};

function ProductorPage({ match, history }) {
  // const { state } = useContext(Store);
  const { state } = useContext(Store);
  const [productorLoading, setProductorLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [more, setMore] = useState(false);
  const [productor, setProductor] = useState(null);
  const [instagramPhotos, setInstagramPhotos] = useState([]);
  const [alertModal, setAlertModal] = useState({
    title: '',
    icon: '',
    description: '',
    agreeText: '',
    disagreeText: '',
    confirmAction: '',
    disagreeAction: '',
    isOpen: false,
  });

  useEffect(() => {
    const { id } = match.params;
    if (id) {
      fetchProductorData(id, setProductor, setProductorLoading, setAlertModal);
    }
  }, []);
  useEffect(() => {
    if (productor) fetchProductorData(productor.id, setProductor, () => '', setAlertModal);
  }, [update]);

  useEffect(() => {
    if (productor && productor.instagram) {
      fetchProductorInstaImages(productor.instagram, setInstagramPhotos);
    }
  }, [productor]);

  if (!productor) return null;
  if (productorLoading) return null;
  if (alertModal.isOpen) {
    return (
      <DialogModal
        title={alertModal.title}
        description={alertModal.description}
        agreeText={alertModal.agreeText}
        disagreeText={alertModal.disagreeText}
        confirmAction={alertModal.confirmAction}
        disagreeAction={alertModal.disagreeAction}
        isOpen={alertModal.isOpen}
      />
    );
  }

  const isMyProductor = state.user
    && state.user.productor && state.user.productor.id === productor.id;

  return (
    <ProductorWrapper>
      <Header />
      <CoverWrapper>
        <Cover cover={productor.cover}>
          <HeaderWrapper />
        </Cover>
      </CoverWrapper>
      <Content>
        <ProductorBasicInfo
          avatar={productor.photo ? productor.photo : ''}
          about={productor.description}
          name={productor.name}
          facebook={productor.facebook}
          twitter={productor.twitter}
          instagram={productor.instagram}
          musicalStyles={productor.musical_styles}
          address={productor.location}
          email={productor.contact_email}
          isMyProductor={isMyProductor}
          history={history}
        />
        <ColumnWrapper>
          <EventsTitle>Eventos</EventsTitle>
          {
            productor.events.length ? (
              renderEvents(
                productor.events,
                more,
                setMore,
                () => setUpdate(!update),
              )
            ) : <NotEvents>Nenhum evento cadastrado</NotEvents>
          }
          {
            instagramPhotos.length ? (
              <InstagramMedia
                images={instagramPhotos}
                navigateToInstagram={() => {
                  if (productor.instagram) {
                    window.open(productor.instagram, '_blank');
                  }
                }}
              />
            ) : null
          }
        </ColumnWrapper>
      </Content>
    </ProductorWrapper>
  );
}

const paramsShape = {
  id: PropTypes.string,
};

const historyShape = {
  push: PropTypes.func.isRequired,
};

const matchShape = {
  params: PropTypes.shape(paramsShape).isRequired,
};

ProductorPage.propTypes = {
  history: PropTypes.shape(historyShape).isRequired,
  match: PropTypes.shape(matchShape).isRequired,
};

export default withRouter(ProductorPage);
