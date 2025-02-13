
import { useState, useEffect } from 'react';
import Term from "../model/term";
import { GenericPagingResponse} from "../response";


export const useTermViewModel = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token: string = localStorage.getItem("token")
    fetchData(token);
  }, []);

  const fetchData = async (token: string) => {
    setLoading(true);
    const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/term',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token ? token: `Bearer ${token}`
      }
    });
    const data: GenericPagingResponse<Term> = await response.json();
    setTerms(data.content)
    setLoading(false)
  };

  const addTerms = async (term: Term) => {
    console.log(term)
    const token: string = localStorage.getItem("token") || ""
    term.wordList = splitWordList(term.wordList[0]);
    console.log(term)
    const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/term', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        "Authorization": token ? token: `Bearer ${token}`
      },
      body: JSON.stringify(term),
    });
    fetchData(token);
  };

  const updateTerms = async (id: string, updatedTodo: Partial<Term>) => {
    const token: string = localStorage.getItem("token") || ""
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/term', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        "Authorization": token ? token: `Bearer ${token}`
      },
      body: JSON.stringify(updatedTodo),
    });
    fetchData(token);
  };

  const deleteTerms = async (id: string) => {
    const token: string = localStorage.getItem("token") || ""
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/term', {
       method: 'DELETE' ,
       headers: { 
        'Content-Type': 'application/json',
        "Authorization": token ? token: `Bearer ${token}`
        },
        body: JSON.stringify({domainName: id}),
    });
    fetchData(token);
  };
  const splitWordList = (wordList: string) => {
    return wordList.split("_");
  }

  return {
    terms,
    loading,
    addTerms,
    updateTerms,
    deleteTerms,
  };
};
