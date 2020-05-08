import gql from 'graphql-tag';

export const eventType = `
  id
  name
  subscribers {
    id
    about
    avatar_image {
      mimified
      thumbnail
    }
    name
  }
  approved_artists {
    id
    about
    avatar_image {
      mimified
      thumbnail
    }
    name
  }
  reproved_artists {
    id
    about
    avatar_image {
      mimified
      thumbnail
    }
    name
  }
  cover {
    mimified
  }
  photo {
    mimified
  }
  productor {
    id
  }
`;

export const getAllEventsQuery = gql`
  query allEvents( 
    $event: EventInput
    $paginator: PaginatorInput
  ) {
    allEvents( 
      event: $event
      paginator: $paginator
    ) {
     ${eventType}
    }
  }
`;
