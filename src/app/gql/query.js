// queries.js
import { gql } from '@apollo/client';

export const GET_WORDS = gql`
  query allWords {
    allWords {
      wordEngName
      wordName
      wordEngFullName
      wordType
      domainName
      }
  }
`;
