import React from "react";

interface ActionButtonsProps {
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onAdd, onEdit, onDelete }) => {
  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button
        onClick={onAdd}
        style={{ ...buttonStyle, backgroundColor: "#4CAF50", color: "white" }}
      >
        신규
      </button>
      <button
        onClick={onEdit}
        style={{ ...buttonStyle, backgroundColor: "#2196F3", color: "white" }}
      >
        수정
      </button>
      <button
        onClick={onDelete}
        style={{ ...buttonStyle, backgroundColor: "#f44336", color: "white" }}
      >
        삭제
      </button>
    </div>
  );
};

export default ActionButtons;
