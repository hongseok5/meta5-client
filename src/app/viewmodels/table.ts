// viewmodels/useTodoViewModel.ts
import { useState, useEffect } from 'react';
import Domain from "../model/domain";
import { GenericPagingResponse} from "../response";

interface Domain {
    domainName: string;
    dataType: string;
    domainType: string;
    domainTypeDtl: string;
    dataLength: number;
}

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
    const data: GenericPagingResponse<Domain> = await response.json();

    setDomains(data.content);
    setLoading(false);
  };

  const addDomain = async (todo: Omit<Domain, 'id'>) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    const newTodo = await response.json();
    setDomains((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodo = async (id: number, updatedTodo: Partial<Domain>) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });
    setDomains((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    setDomains((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return {
    domains,
    loading,
    addDomain,
    updateTodo,
    deleteTodo,
  };
};
