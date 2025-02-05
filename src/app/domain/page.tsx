"use client"

import React, {  useState, useEffect } from 'react';
import {useDomainViewModel} from "../viewmodels/domain";
import type Domain from "../model/domain";
import PaginatedTable from "../components/TableWithPage";
import InputDialog from "../components/InputDialog";

const columns: { type: string; key: keyof Domain; label: string; readonly: boolean }[] = [
  { type: "input", key: "domainName", label: "도메인명", readonly: true },
  { type: "input", key: "dataType", label: "데이타타입", readonly: false },
  { type: "input", key: "domainType", label: "도메인타입", readonly: false },
  { type: "input", key: "domainTypeDtl", label: "도메인상세타입", readonly: false },
  { type: "input", key: "dataLength", label: "데이터길이", readonly: false }
];


export default function Domain() {

  const {domains, loading, addDomain, updateDomain, deleteDomain} = useDomainViewModel();  // error: useDomainViewModel is not function
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 여부
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [formValues, setFormValues] = useState<Domain>({
    domainName: "",
    dataType: "",
    domainType: "",
    domainTypeDtl: "",
    dataLength: 0
  });
  useEffect(() => {
    if (selectedDomain) {
        setFormValues((prev) => (prev !== selectedDomain ? selectedDomain : prev));
    }
  }, [selectedDomain]);
  const openNewDialog = () => {
    setFormValues({
        domainName: "",
        dataType: "",
        domainType: "",
        domainTypeDtl: "",
        dataLength: 0
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const openModifyDialog = (word: Domain) => {
    setFormValues(word);
    setSelectedDomain(word);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const closeDialog = () => {
    setIsDialogOpen(false)
    if(!isEditMode){
      setFormValues({
        domainName: "",
        dataType: "",
        domainType: "",
        domainTypeDtl: "",
        dataLength: 0
      });
    }
  }
  const deleteConfirm = (word: Domain) => {
    if (window.confirm(`정말로 "${word.domainName}" 단어를 삭제하시겠습니까?`)) {
      deleteDomain(word.domainName);
    }
  };
  const handleUpdateDomain = () => {
    if ( selectedDomain) {
      
      updateDomain(selectedDomain.domainName, formValues);
      closeDialog();
    } else {
      alert("수정할 단어 정보를 선택해주세요");
    }
  };
  // 도메인 추가
  const handleAddDomain = () => {
    if(formValues){
        addDomain(formValues); // viewModel의 addDomain 호출
        closeDialog(); // 다이얼로그 닫기
    } else {
        alert("도메인 정보를 입력해주세요");
    }
  };


  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <h1 style={{ textAlign: "center" }}> 도메인리스트</h1>
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
          field.key === "domainName"
            ? { ...field, readonly: isEditMode } // ✅ 신규 입력(false), 수정(true) 적용
            : field
        )}
        values={formValues }
        onChange={handleChange}
        onConfirm={isEditMode ? handleUpdateDomain : handleAddDomain}
        onCancel={closeDialog}
      />
 
      <PaginatedTable 
              columns={columns} rows={domains} 
              onRowClick={(word) => {
                console.log("selected" + word)
                setSelectedDomain(word)
              }} 
              onEdit={updateDomain}
              onDelete={deleteDomain}
              />
      </div>
    );
}