import React, { useState, useEffect } from "react";

interface InputDialogProps<T> {
  isOpen: boolean;
  title: string;
  fields: { type: string; key: string; label: string; readonly: boolean }[];
  values: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const InputDialog: React.FC<InputDialogProps<T>> = ({
  isOpen,
  title,
  fields,
  values: initialValues, // 초기값을 props로 받음
  onChange,
  onConfirm,
  onCancel,
}) => {
  const [formData, setFormData] = useState(initialValues);

  // 🔥 useEffect를 이용해 `values` 변경 시 상태 반영
  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    onChange(e); // 부모에도 값 전달
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          {fields.map((field) => (
            <div key={field.key} className="mb-4">
              <label className="block text-gray-700">{field.label}</label>
              <input
                type="text"
                name={field.key}
                value={formData[field.key] || ""}
                onChange={handleChange}
                disabled={field.readonly}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          ))}
          <div className="flex justify-end gap-2">
            <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded-lg">취소</button>
            <button
              onClick={() => {
                onConfirm();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default InputDialog;
