import gql from 'graphql-tag';

export const ArchiveItem = gql`
  mutation ArchiveItem($input: ArchiveItemInput!) {
    archiveItem(input: $input) {
      clientMutationId
      itemId
    }
  }
`;
