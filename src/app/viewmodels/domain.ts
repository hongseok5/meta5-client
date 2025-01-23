// viewmodels/useTodoViewModel.ts
import { useState, useEffect } from 'react';
import Domain from "../model/domain";
import { GenericPagingResponse} from "../response";

export const useTodoViewModel = () => {
  const [todos, setTodos] = useState<Domain[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token: string = localStorage.getItem("token")
    fetchData(token);
  }, []);

  const fetchData = async (token: string) => {
    setLoading(true);
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data);
    setLoading(false);
  };

  const addTodo = async (todo: Omit<Todo, 'id'>) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    const newTodo = await response.json();
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodo = async (id: number, updatedTodo: Partial<Todo>) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};
