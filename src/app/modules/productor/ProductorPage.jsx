import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { black } from '../../settings/colors';
import ProductorBasicInfo from '../../components/templates/productor/ProductorBasicInfo';
import Cover from '../../components/atoms/Cover';
import Header from '../../components/organisms/Header';
import InstagramMedia from '../../components/molecules/InstagramMedias';
// import Store from '../../store/Store';
import { fetchProductorData, fetchProductorInstaImages } from './ProductorController';
import DialogModal from '../../components/modals/Dialog.modal';

const ProductorWrapper = styled.div`
  width: 100%;
  min-height: 150vh;
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
  vertical-align: top;

  @media (min-width: 1024px) {
    max-width: calc(100% - 454px);
    text-align: left;
  }
`;

const EventsTitle = styled.h2`
  text-align: left;
  font-size: 2.375rem;
  font-weight: 400;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const NotEvents = styled.span`
  font-weight: 200;
`;

function ProductorPage({ match }) {
  // const { state } = useContext(Store);
  const [productorLoading, setProductorLoading] = useState(false);
  const [productor, setProductor] = useState(null);
  const [instagramPhotos, setInstagramPhotos] = useState(false);
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
          location={productor.location}
          email={productor.contact_email}
        />
        <ColumnWrapper>
          <EventsTitle>Eventos</EventsTitle>
          <NotEvents>Nenhum evento cadastrado</NotEvents>
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

// const historyShape = {
//   push: PropTypes.func.isRequired,
// };

const matchShape = {
  params: PropTypes.shape(paramsShape).isRequired,
};

ProductorPage.propTypes = {
  // history: PropTypes.shape(historyShape).isRequired,
  match: PropTypes.shape(matchShape).isRequired,
};

export default withRouter(ProductorPage);
