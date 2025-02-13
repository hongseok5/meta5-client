"use client"

import React, {  useState, useEffect } from 'react';
import {useTermViewModel} from "../viewmodels/term";
import type Term from "../model/term";
import PaginatedTable from "../components/TableWithPage";
import InputDialog from "../components/InputDialog";

const columns: { type: string; key: keyof Term; label: string; readonly: boolean }[] = [
  { type: "input", key: "termEngName", label: "용어영문명", readonly: true },
  { type: "input", key: "termName", label: "용어명", readonly: false },
  { type: "input", key: "domainName", label: "도메인명", readonly: false },
  { type: "input", key: "wordList", label: "단어리스트", readonly: false }
];


export default function Term() {

  const {terms, loading, addTerms, updateTerms, deleteTerms} = useTermViewModel();  // error: useDomainViewModel is not function
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 여부
  const [selectedDomain, setSelectedDomain] = useState<Term | null>(null);
  const [formValues, setFormValues] = useState<Term>({
    termEngName: "",
    termName: "",
    dataType: "",
    domainName: "",
    wordList: []
  });
  useEffect(() => {
    if (selectedDomain) {
        setFormValues((prev) => (prev !== selectedDomain ? selectedDomain : prev));
    }
  }, [selectedDomain]);

  const openNewDialog = () => {
    setFormValues({
      termEngName: "",
      termName: "",
      wordList: [],
      domainName: "",
      dataType: ""
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const openModifyDialog = (word: Term) => {
    setFormValues(word);
    setSelectedDomain(word);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
    // 도메인 추가
  const handleAddDomain = () => {
    if(formValues){
      addTerms(formValues); // viewModel의 addDomain 호출
      closeDialog(); // 다이얼로그 닫기
    } else {
      alert("도메인 정보를 입력해주세요");
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false)
    if(!isEditMode){
      setFormValues({
        termEngName: "",
        termName: "",
        wordList: [],
        domainName: "",
        dataType: ""
      });
    }
  }
  const deleteConfirm = (term: Term) => {
    if (window.confirm(`정말로 "${term.termEngName}" 단어를 삭제하시겠습니까?`)) {
      deleteTerms(term.termEngName);
    }
  };
  const handleUpdateDomain = () => {
    if ( selectedDomain) {
      
      updateTerms(selectedDomain.termEngName, formValues);
      closeDialog();
    } else {
      alert("수정할 단어 정보를 선택해주세요");
    }
  };


  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <h1 style={{ textAlign: "center" }}> 용어리스트</h1>
      <div className="flex justify-end gap-5">
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-600" 
                type="button" 
                onClick={openNewDialog}> new </button>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-blue-600" 
                type="button" 
                disabled={!selectedDomain}
                onClick={() => selectedDomain && openModifyDialog(selectedDomain)}> mod </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                type="button" 
                disabled={!selectedDomain}
                onClick={() => selectedDomain && deleteConfirm(selectedDomain)}> del </button>
      </div>
      <InputDialog
        isOpen={isDialogOpen}
        title={isEditMode ? "수정" : "신규"}
        fields={columns.map((field) =>
          field.key === "termEngName"
            ? { ...field, readonly: isEditMode } // ✅ 신규 입력(false), 수정(true) 적용
            : field
        )}
        values={formValues }
        onChange={handleChange}
        onConfirm={isEditMode ? handleUpdateDomain : handleAddDomain}
        onCancel={closeDialog}
      />
 
        <PaginatedTable 
          columns={columns} rows={terms} 
          onRowClick={(word) => {

            setSelectedDomain(word)
          }} 
          onEdit={updateTerms}
          onDelete={deleteTerms}
        />
      </div>
    );
}