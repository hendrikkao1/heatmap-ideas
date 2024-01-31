import { ReactNode, useState } from "react";
import { scaleLinear } from "@visx/scale";
import {
  HeatmapCell,
  HeatmapTable,
  HeatmapTableData,
  HeatmapTableDatum,
  HeatmapTableHeader,
  HeatmapTableSort,
} from "./Heatmap/HeatmapChur";

interface WithTooltipProps {
  tooltip: string;
  children: ReactNode;
}

const WithTooltip = ({ children, tooltip }: WithTooltipProps) => (
  <span title={tooltip}>{children}</span>
);

const App = () => {
  const data: HeatmapTableDatum<{
    value: number;
    customMetric: number;
  }>[] = [
    { id: "r0", value: 0, customMetric: 3 },
    { id: "r1", value: 1, customMetric: 2 },
    { id: "r2", value: 2, customMetric: 1 },
    { id: "r3", value: 3, customMetric: 0 },
  ];

  const heatmapScale = scaleLinear({
    range: [0, 1],
    domain: [0, Math.max(0, ...data.map(({ customMetric }) => customMetric))],
  });

  const [sort, setSort] = useState<HeatmapTableSort<(typeof data)[number]>>({
    key: "customMetric",
    order: "desc",
  });

  const handleHeaderClick = (key: keyof (typeof data)[number]) => () =>
    setSort({
      key,
      order: sort.order === "desc" ? "asc" : "desc",
    });

  return (
    <>
      <HeatmapTable
        data={data}
        sort={sort}
        renderHeader={() => (
          <>
            <HeatmapTableHeader>
              <button onClick={handleHeaderClick("id")}>row.id</button>
            </HeatmapTableHeader>
            <HeatmapTableHeader>
              <button onClick={handleHeaderClick("value")}>row.value</button>
            </HeatmapTableHeader>
            <HeatmapTableHeader>
              <button onClick={handleHeaderClick("customMetric")}>
                row.customMetric
              </button>
            </HeatmapTableHeader>
          </>
        )}
      >
        {(row) => (
          <>
            <HeatmapTableData>{row.id}</HeatmapTableData>
            <HeatmapTableData>{row.value}</HeatmapTableData>
            <HeatmapTableData>
              <WithTooltip tooltip="This is a tooltip">
                <HeatmapCell value={heatmapScale(row.customMetric)}>
                  {row.customMetric}
                </HeatmapCell>
              </WithTooltip>
            </HeatmapTableData>
          </>
        )}
      </HeatmapTable>
      <HeatmapCell value={0.2}>Good</HeatmapCell>
      <HeatmapCell value={0.4}>OK</HeatmapCell>
      <HeatmapCell value={0.6}>Maybe</HeatmapCell>
      <HeatmapCell value={0.8}>Bad</HeatmapCell>
    </>
  );
};

export default App;
