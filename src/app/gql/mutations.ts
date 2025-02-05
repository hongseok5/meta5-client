import { gql } from "@apollo/client";

export const CREATE_WORD = gql`
  mutation CreateWord($input: WordInput!) {
    createWord(input: $input) {
      wordEngName
      wordName
      wordEngFullName
      wordType
      domainName
    }
  }
`;

export const UPDATE_WORD = gql`
  mutation UpdateWord($id: ID!, $input: WordInput!) {
    updateWord(id: $id, input: $input) {
      wordEngName
      wordName
      wordEngFullName
      wordType
      domainName
    }
  }
`;

export const DELETE_WORD = gql`
  mutation DeleteWord($id: ID!) {
    deleteWord(id: $id)
  }
`;
