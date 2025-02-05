"use client"

import PaginatedTable from "../components/TableWithPage";
import InputDialog from "../components/InputDialog"; // 새로 만든 컴포넌트 import
import { useState, useEffect } from "react";
import {useWordViewModel} from "../viewmodels/word";
import type Word from "../model/word";

const columns2: { type: string; key: keyof Word; label: string; readonly: boolean }[] = [
  { type: "input", key: "wordEngName", label: "단어영문명", readonly: true },
  { type: "input", key: "wordName", label: "단어명", readonly: false },
  { type: "input", key: "wordEngFullName", label: "단어전체영문명", readonly: false },
  { type: "input", key: "wordType", label: "단어타입", readonly: false },
  { type: "input", key: "domainName", label: "도메인명", readonly: false }
];

const Words = () => {

  const { words, loading, addWord, editWord, removeWord } = useWordViewModel();
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 여부
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [formValues, setFormValues] = useState<Word>({
    wordEngName: "",
    wordName: "",
    wordEngFullName: "",
    wordType: "",
    domainName: "",
  });

  // 🔥 선택된 단어가 바뀔 때 `formValues` 업데이트
  useEffect(() => {
    if (selectedWord) {
      setFormValues((prev) => (prev !== selectedWord ? selectedWord : prev));
    }
  }, [selectedWord]);
  // 신규 단어 추가 다이얼로그 오픈
  const openNewDialog = () => {
    setFormValues({
      wordEngName: "",
      wordName: "",
      wordEngFullName: "",
      wordType: "",
      domainName: ""
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const openModifyDialog = (word: Word) => {
    setFormValues(word);
    setSelectedWord(word);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // 단어 추가
  const handleAddWord = () => {
    if(formValues){
      addWord(formValues); 
      closeDialog(); // 다이얼로그 닫기
    } else {
      alert("단어 정보를 입력해주세요");
    }
  };

  const handleUpdateWord = () => {
    if ( selectedWord) {
      
      editWord(selectedWord.wordEngName, formValues);
      closeDialog();
    } else {
      alert("수정할 단어 정보를 선택해주세요");
    }
  };
  const deleteConfirm = (word: Word) => {
    if (window.confirm(`정말로 "${word.wordName}" 단어를 삭제하시겠습니까?`)) {
      removeWord(word.wordEngName);
    }
  };
  const closeDialog = () => {
    setIsDialogOpen(false)
    if(!isEditMode){
      setFormValues({
        wordEngName: "",
        wordName: "",
        wordEngFullName: "",
        wordType: "",
        domainName: ""
      });
    }
  };
  
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}> 단어리스트</h1>
      <div className="flex justify-end gap-5">
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-600" 
                type="button" 
                onClick={openNewDialog}> new </button>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-blue-600" 
                type="button" 
                disabled={!selectedWord}
                onClick={() => selectedWord && openModifyDialog(selectedWord)}> mod </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                type="button" 
                disabled={!selectedWord}
                onClick={() => selectedWord && deleteConfirm(selectedWord)}> del </button>
      </div>
      <InputDialog
        isOpen={isDialogOpen}
        title={isEditMode ? "수정" : "신규"}
        fields={columns2.map((field) =>
          field.key === "wordEngName"
            ? { ...field, readonly: isEditMode } // ✅ 신규 입력(false), 수정(true) 적용
            : field
        )}
        values={formValues }
        onChange={handleChange}
        onConfirm={isEditMode ? handleUpdateWord : handleAddWord}
        onCancel={closeDialog}
      />

      <PaginatedTable 
        columns={columns2} rows={words} 
        onRowClick={(word) => {
          console.log("selected" + word)
          setSelectedWord(word)
        }} 
        onEdit={editWord}
        onDelete={removeWord}
        />
    </div>
  );
};

export default Words;
