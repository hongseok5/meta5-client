"use client"

import React, { useEffect, useState } from 'react';
import { GenericPagingResponse} from "../response";

interface User {
    id: number;
    username: string;
    password: string;
    role: string;
}

export default function User() {

    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch('http://localhost:8080/user', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": token ? token: `Bearer ${token}`
            }
        })
          .then(response => {
            if (!response.ok) {
              console.log(response)
              throw new Error('Network response was not ok');
            }
            console.log(response.json)
            return response.json();
          })
          .then((data: GenericPagingResponse<User>) => {
            console.log(data)
            setUsers(data.content);
          })
          .catch(error => {
            console.error('Error fetching the users:', error);
          });
      }, []);


    return (
        <div>
        <h2>User List</h2>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => ( 
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>      
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}
