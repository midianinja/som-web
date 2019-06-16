import gql from 'graphql-tag';

export const oneMusicalStyleOptionQuery = gql`
  query oneMusicalStyleOption($id: ID!) {
    oneMusicalStyleOption(id: $id) {
      id
      name
    }
  }
`;

export const allMusicalStyleOptionsQuery = gql`
  query allMusicalStyleOptions(
    $musical_style_option: MusicalStyleOptionInput
    $paginator: PaginatorInput
  ) {
    allMusicalStyleOptions(
      musical_style_option: $musical_style_option
      paginator: $paginator
    ) {
      id
      name
    }
  }
`;
