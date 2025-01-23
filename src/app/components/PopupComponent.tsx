import React from "react";

interface PopupProps {
  id: number | null;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

const PopupComponent: React.FC<PopupProps> = ({ id, onClose, onConfirm }) => {
  if (id === null) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        border: "1px solid #ccc",
        padding: "20px",
        zIndex: 1000,
        borderRadius: "5px",
      }}
    >
      <p>Are you sure you want to delete player with ID: {id}?</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={onClose} style={{ padding: "10px", cursor: "pointer" }}>
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm(id);
            onClose();
          }}
          style={{
            padding: "10px",
            backgroundColor: "red",
            color: "white",
            cursor: "pointer",
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default PopupComponent;
