// import gql from 'graphql-tag';
import apollo from '../../apollo';
import { getAllEventsQuery } from './eventCuratorship.query';
import { approveArtistMutation, reproveArtistMutation, resetSubscriptionMutation } from './eventCuratorship.mutations';

const getArtistsDetails = ({
  evtArtists, event,
  hasApprove, aprovationStats,
}) => evtArtists.map(art => ({
  uniqueId: `${art.id}-${event.id}`,
  id: art.id,
  about: art.about,
  avatar: art.avatar_image,
  name: art.name,
  approved: hasApprove ? aprovationStats : '',
  event: {
    name: event.name,
    id: event.id,
  },
}));

export const getArtsts = async ({ productor, setArtists, setRatedArtists }) => {
  let subscribers = [];
  let rateds = [];
  try {
    const events = await apollo.query({
      query: getAllEventsQuery,
      variables: {
        event: { productor: productor.id },
        paginator: {},
      },
    });

    events.data.allEvents.forEach((evt) => {
      const subsArtists = getArtistsDetails({
        evtArtists: evt.subscribers,
        event: evt,
        hasApprove: false,
      });
      subscribers = [...subscribers, ...subsArtists];

      const apprArtists = getArtistsDetails({
        evtArtists: evt.approved_artists,
        event: evt,
        hasApprove: true,
        aprovationStats: 'aprovada',
      });
      rateds = [...rateds, ...apprArtists];

      const reprArtists = getArtistsDetails({
        evtArtists: evt.reproved_artists,
        event: evt,
        hasApprove: true,
        aprovationStats: 'reprovada',
      });
      rateds = [...rateds, ...reprArtists];
    });

    setArtists(subscribers);
    setRatedArtists(rateds);
  } catch (err) {
    console.error('err:', err);
  }
};

export const approveArtist = async ({
  artist, artists, setArtists,
  ratedArtists, setRatedArtists,
  setArtist,
}) => {
  try {
    await apollo.mutate({
      mutation: approveArtistMutation,
      variables: {
        event_id: artist.event.id,
        artist_id: artist.id,
      },
    });
    setArtists(artists.filter(art => art.uniqueId !== `${artist.id}-${artist.event.id}`));
    setRatedArtists([...ratedArtists, { ...artist, approved: 'aprovada' }]);
    setArtist(null);
  } catch (err) {
    console.error('err:', err);
  }
};

export const reproveArtist = async ({
  artist, artists, setArtists,
  ratedArtists, setRatedArtists,
  setArtist,
}) => {
  try {
    await apollo.mutate({
      mutation: reproveArtistMutation,
      variables: {
        event_id: artist.event.id,
        artist_id: artist.id,
      },
    });
    setArtists(artists.filter(art => art.uniqueId !== `${artist.id}-${artist.event.id}`));
    setRatedArtists([...ratedArtists, { ...artist, approved: 'reprovada' }]);
    setArtist(null);
  } catch (err) {
    console.error('err:', err);
  }
};

export const resetSubscriptionAction = async ({
  artist, artists, setArtists,
  ratedArtists, setRatedArtists,
  setArtist,
}) => {
  try {
    await apollo.mutate({
      mutation: resetSubscriptionMutation,
      variables: {
        event_id: artist.event.id,
        artist_id: artist.id,
      },
    });
    setArtists([...artists, { ...artist, approved: '' }]);
    setRatedArtists(ratedArtists.filter(art => art.uniqueId !== `${artist.id}-${artist.event.id}`));
    setArtist(null);
  } catch (err) {
    console.error('err:', err);
  }
};

export const todelete = '';
