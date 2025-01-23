import React, { useState } from "react";
import {
  useTable,
  ColumnDef,
  getCoreRowModel,
} from "@tanstack/react-table";

interface Player {
  id: number;
  name: string;
  position: string;
  birth: string;
}

interface TableComponentProps {
  data: T[];
  columns: { key: keyof T; label: string }[];
  onRowClick: (row: T) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TableComponent: <T extends object> ({
  data,
  columns,
  onRowClick,
}: TableComponentProps<T>) => {
  const columnsDef: ColumnDef<T>[] = columns.map((column) => ({
    accessor: column.key,
    header: column.label,
  }));
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        {tableInstance.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{ border: "1px solid #ccc", padding: "10px" }}
              >
                {header.isPlaceholder
                  ? null
                  : header.column.columnDef.header}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {tableInstance.getRowModel().rows.map((row: any) => (
          <tr
            key={row.id}
            style={{ cursor: "pointer" }}
            onClick={() => onEdit(row.original.id)}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{ border: "1px solid #ccc", padding: "10px" }}
              >
                {cell.getValue()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
