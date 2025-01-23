"use client";

import React, { useState, useEffect } from "react";
import ActionButtons from "@/app/components/ActionButtons";
import SearchBar from "@/app/components/SearchBar";

interface Player {
  id: number;
  name: string;
  position: string;
  birth: string;
  create_dt: string;
  modify_dt: string;
}

const PlayerList = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchFilters, setSearchFilters] = useState<{ name: string; position: string }>({
    name: "",
    position: "",
  });

  const fetchPlayers = async () => {
    const response = await fetch(`/api/player?name=${searchFilters.name}&position=${searchFilters.position}`);
    console.log(response)
    if(!response.ok) {
      return alert("로그인해야함")
    }
    const data = await response.json();
    setPlayers(data);
  };

  useEffect(() => {
    fetchPlayers();
  }, [searchFilters]);

  const handleAdd = () => {
    alert("신규 다이얼로그 호출");
  };

  const handleEdit = () => {
    alert("수정 다이얼로그 호출");
  };

  const handleDelete = () => {
    alert("삭제 다이얼로그 호출");
  };

  const handleSearch = (filters: { name: string; position: string }) => {
    setSearchFilters(filters);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <SearchBar onSearch={handleSearch} />
        <ActionButtons onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          border: "1px solid #ccc",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Position</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Birth</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Created At</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Modified At</th>
          </tr>
        </thead>
        <tbody>
          {players && players.map((player) => (
            <tr key={player.id}>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>{player.id}</td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>{player.name}</td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>{player.position}</td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>{player.birth}</td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>{player.create_dt}</td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>{player.modify_dt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;
