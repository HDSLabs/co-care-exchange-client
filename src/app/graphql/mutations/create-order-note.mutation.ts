import gql from 'graphql-tag';

export const CreateOrderNote = gql`
  mutation CreateOrderNote($input: CreateOrderNoteInput!) {
    createOrderNote(input: $input) {
      clientMutationId
    }
  }
`;
