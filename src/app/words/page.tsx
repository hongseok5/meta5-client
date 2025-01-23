"use client"
// pages/words.js
import { useQuery } from '@apollo/client';
import client from '../../lib/apolloClient';
import { GET_WORDS } from '../gql/query';

interface Word{
    wordEngName: string;
    wordName: string;
    wordEngFullName: string;
    wordType: string;
    domainName: string;
}

const Words = () => {

  const { loading, error, data } = useQuery(GET_WORDS, { client });
  console.log(data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Words List</h1>
      <ul>
        {data.allWords.map((word: Word, idx: number) => (
          <li key={idx}>
            {word.wordEngName} ({word.wordEngName})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Words;
