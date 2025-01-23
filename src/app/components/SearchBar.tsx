import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (filters: { name: string; position: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  const handleSearch = () => {
    onSearch({ name, position });
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "5px", flex: 1 }}
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        style={{ padding: "5px", flex: 1 }}
      />
      <button
        onClick={handleSearch}
        style={{
          backgroundColor: "#2196F3",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        검색
      </button>
    </div>
  );
};

export default SearchBar;
