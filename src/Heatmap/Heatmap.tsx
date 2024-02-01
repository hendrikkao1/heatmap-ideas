import { scaleThreshold } from "@visx/scale";
import React from "react";

export type HeatmapTableDatum<TDatum> = {
  id: string;
} & TDatum;

export type HeatmapTableSort<TDatum> = {
  key: keyof HeatmapTableDatum<TDatum>;
  order: "asc" | "desc";
};

export interface HeatmapTableProps<TDatum> {
  children?: (row: HeatmapTableDatum<TDatum>) => React.ReactNode;
  data: HeatmapTableDatum<TDatum>[];
  renderHeader?: (row: HeatmapTableDatum<TDatum>) => React.ReactNode;
  sort: HeatmapTableSort<TDatum>;
}

export const HeatmapTable = <TDatum,>({
  children = (cell) => cell.id,
  data,
  renderHeader,
  sort,
}: HeatmapTableProps<TDatum>) => {
  const sortedData = data.sort((a, b) => {
    if (sort.order === "asc") {
      return a[sort.key] > b[sort.key] ? 1 : -1;
    }
    return a[sort.key] < b[sort.key] ? 1 : -1;
  });

  return (
    <table>
      {renderHeader && (
        <thead>
          <tr>{renderHeader(data[0])}</tr>
        </thead>
      )}
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.id}>{children?.(row)}</tr>
        ))}
      </tbody>
    </table>
  );
};

export interface HeatmapTableDataProps
  extends React.ComponentPropsWithoutRef<"td"> {
  children?: React.ReactNode;
}

export const HeatmapTableData = ({
  children,
  ...rest
}: HeatmapTableDataProps) => <td {...rest}>{children}</td>;

interface HeatmapTableHeaderProps extends React.ComponentPropsWithoutRef<"th"> {
  children?: React.ReactNode;
}

export const HeatmapTableHeader = ({
  children,
  ...rest
}: HeatmapTableHeaderProps) => <th {...rest}>{children}</th>;

const defaultColorScale = scaleThreshold<number, string>({
  range: ["green", "yellow", "orange", "red"],
  domain: [0.25, 0.5, 0.75, 1],
});

export interface HeatmapCellProps
  extends React.ComponentPropsWithoutRef<"span"> {
  children?: React.ReactNode;
  colorScale?: typeof defaultColorScale;
  value: number;
}

export const HeatmapCell = ({
  children,
  colorScale = defaultColorScale,
  value,
  ...rest
}: HeatmapCellProps) => {
  const backgroundColor = colorScale(value);

  return (
    <span
      style={{
        backgroundColor,
      }}
      {...rest}
    >
      {children}
    </span>
  );
};
