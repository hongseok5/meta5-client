"use client"
// pages/words.js


interface Table{
    
    systemId: string;
    bizId: string;
    tableId: string;
    tableName: string;
    inputType: string;
    deleteType: string;
    comment: string;
}

const Tables = () => {

  return (
    <div>
      <h2>테이블리스트</h2>
      <table>
            <thead>
            <tr>
                <th>시스템</th>
                <th>업무구분</th>
                <th>테이블ID</th>
                <th>테이블명</th>
                <th>입력방식</th>
                <th>삭제방식</th>
                <th>기타</th>
            </tr>
            </thead>
            <tbody>
            {tables.map((domain, idx) => ( 
                <tr key={idx}>
                    <td>{domain.domainName}</td>
                    <td>{domain.dataType}</td>
                    <td>{domain.domainType}</td>      
                    <td>{domain.domainTypeDtl}</td>      
                    <td>{domain.dataLength}</td>      
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
};

export default Words;
