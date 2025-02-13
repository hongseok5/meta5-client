import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TablePagination
} from "@mui/material";

interface Column<T> {
    key: keyof T;
    label: string;
}
  
interface PaginatedTableProps<T> {
    columns: Column<T>[]; // 컬럼 정보 배열
    rows: T[]; // 제네릭 데이터 배열
    onRowClick?: (row: T) => void; // 행 클릭 이벤트 핸들러
    onEdit?: (id: string , data: T) => void; // 수정 함수
    onDelete?: (id: string ) => void; // 삭제 함수
}

const PaginatedTable = <T,>({ columns, rows, onRowClick }: PaginatedTableProps<T>) => {
  const [page, setPage] = useState(0); // 현재 페이지
  const [rowsPerPage, setRowsPerPage] = useState(5); // 페이지당 행 수
  const [selectedRow, setSelectedRow] = useState<string | number | null>(null); // 선택된 행의 key

  // 페이지 변경 핸들러
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // 페이지당 행 수 변경 핸들러
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (row: T) => {

    const key = row[columns[0].key]; // 첫 번째 컬럼의 키 값으로 선택된 행을 관리
    console.log(key)
    setSelectedRow(key);
    onRowClick(row);
  };


  return (
    <Paper sx={{ width: "80%", margin: "auto", mt: 4, p: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, idx) => (
                <TableCell key={column.key ? String(column.key) : `col - ${idx}`}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                <TableRow key={rowIndex} hover onClick={() => handleRowClick(row)} selected={selectedRow === row[columns[0].key]}>
                    {columns.map((column) => (
                    <TableCell key={String(column.key)}>
                        {String(row[column.key])}
                    </TableCell>
                    ))}
                </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 컨트롤 */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows? rows.length: 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PaginatedTable;
