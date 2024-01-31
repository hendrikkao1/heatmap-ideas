import React from "react";

export type HeatmapTableDataCell<TDataCell> = {
  id: string;
  value: number;
} & TDataCell;

export type HeatmapTableRowKeyCell<TRowKeyCell = object> = {
  id: string;
  label: string;
} & TRowKeyCell;

export type HeatmapTableColumnKeyCell<TColumnKeyCell> = {
  id: string;
  label: string;
} & TColumnKeyCell;

export type HeatmapTableSort<TColumnKeyCellId extends string> = {
  id: TColumnKeyCellId;
  order: "asc" | "desc";
};

interface HeatmapTableProps<TRowKeyCell, TColumnKeyCell, TDataCell> {
  children?: (cell: HeatmapTableDataCell<TDataCell>) => React.ReactNode;
  renderRowKey?: (cell: HeatmapTableRowKeyCell<TRowKeyCell>) => React.ReactNode;
  renderColumnKey?: (
    cell: HeatmapTableColumnKeyCell<TColumnKeyCell>
  ) => React.ReactNode;
  sort: HeatmapTableSort<HeatmapTableColumnKeyCell<TColumnKeyCell>["id"]>;
  onSort?: (
    sort: HeatmapTableSort<HeatmapTableColumnKeyCell<TColumnKeyCell>["id"]>
  ) => void;
  rowKeys: HeatmapTableRowKeyCell<TRowKeyCell>[];
  colKeys: HeatmapTableColumnKeyCell<TColumnKeyCell>[];
  data: HeatmapTableDataCell<TDataCell>[][];
}

export const HeatmapTable = <TRowKeyCell, TColumnKeyCell, TDataCell>({
  children = (cell) => cell.value,
  colKeys,
  data,
  renderColumnKey = (col) => col.label,
  renderRowKey = (row) => row.label,
  rowKeys,
  sort,
}: HeatmapTableProps<TRowKeyCell, TColumnKeyCell, TDataCell>) => {
  const sortedData = data.sort((a, b) => {
    const colIndex = colKeys.findIndex((col) => col.id === sort.id);

    if (colIndex === -1) {
      return 0;
    }

    const aCol = a[colIndex];
    const bCol = b[colIndex];

    if (sort.order === "asc") {
      return aCol.value - bCol.value;
    }

    return bCol.value - aCol.value;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>
            {/**  TODO: What is the best way to allow consumers to render this column? */}
          </th>
          {colKeys.map((colKey) => (
            <th key={colKey.id}>{renderColumnKey?.(colKey)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, y) => (
          <tr key={rowKeys[y].id}>
            <th>{renderRowKey?.(rowKeys[y])}</th>
            {row.map((col) => (
              <td key={col.id}>{children?.(col)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
