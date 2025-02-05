//import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import client from "../../lib/apolloClient";
import { GET_WORDS } from "../gql/query";
import { CREATE_WORD, UPDATE_WORD, DELETE_WORD } from "../gql/mutations";

interface Word {
  wordEngName: string;
  wordName?: string;
  wordEngFullName?: string;
  wordType?: string;
  domainName?: string;
}

export function useWordViewModel() {
  
  const { data, loading, error, refetch } = useQuery(GET_WORDS, { client })
  const [createWord] = useMutation(CREATE_WORD, {
    client,
    onCompleted: () => refetch(),
  });

  const [updateWord] = useMutation(UPDATE_WORD, {
    client,
    onCompleted: () => refetch(),
  });

  const [deleteWord] = useMutation(DELETE_WORD, {
    client,
    onCompleted: () => refetch(),
  });

  const addWord = async (newWord: Word) => {

    try {
      await createWord({
        variables: { input: newWord },
      });
    } catch (err) {
      console.error("Error adding word:", err);
    }
  };

  const editWord = async (id: string, word: Word) => {
    try {

      const { __typename, ...wordInput } = word;  // __typename 제거
      await updateWord({
        variables: { id, input: wordInput },
      });
    } catch (err) {
      console.error("Error updating word:", err);
    }
  };

  const removeWord = async (id: string) => {
    try {
      await deleteWord({
        variables: { id },
      });
    } catch (err) {
      console.error("Error deleting word:", err);
    }
  };

  return {
    words: data?.allWords || [],
    loading,
    error,
    addWord,
    editWord,
    removeWord,
  };
}
