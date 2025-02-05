
import { useState, useEffect } from 'react';
import Domain from "../model/domain";
import { GenericPagingResponse} from "../response";


export const useDomainViewModel = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token: string = localStorage.getItem("token")
    fetchData(token);
  }, []);

  const fetchData = async (token: string) => {
    setLoading(true);
    const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/domain/list',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token ? token: `Bearer ${token}`
      }
    });
    console.log(response)
    const data: GenericPagingResponse<Domain> = await response.json();
    console.log(data)
    setDomains(data.content)
    setLoading(false)
  };

  const addDomain = async (domain: Domain) => {
    const token: string = localStorage.getItem("token") || ""
    const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/domain', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        "Authorization": token ? token: `Bearer ${token}`
      },
      body: JSON.stringify(domain),
    });
    //const result = await response.json();
    fetchData(token);
  };

  const updateDomain = async (id: string, updatedTodo: Partial<Domain>) => {
    const token: string = localStorage.getItem("token") || ""
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/domain', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        "Authorization": token ? token: `Bearer ${token}`
      },
      body: JSON.stringify(updatedTodo),
    });
    fetchData(token);
  };

  const deleteDomain = async (id: string) => {
    const token: string = localStorage.getItem("token") || ""
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/domain', {
       method: 'DELETE' ,
       headers: { 
        'Content-Type': 'application/json',
        "Authorization": token ? token: `Bearer ${token}`
        },
        body: JSON.stringify({domainName: id}),
    });
    fetchData(token);
  };

  return {
    domains,
    loading,
    addDomain,
    updateDomain,
    deleteDomain,
  };
};
