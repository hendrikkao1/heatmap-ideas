import { scaleLinear } from "@visx/scale";

const width = 800;
const height = 200;

const cellWidth = 20;
const cellHeight = 20;

interface Column {
  key: string;
  value: number;
  columns?: Column[];
}

interface Row {
  key: string;
  columns: Column[];
}

const data: Row[] = [
  {
    key: "r1",
    columns: [
      {
        key: "r1-1",
        value: 1,
        columns: [
          {
            key: "r1-1-1",
            value: 1,
          },
          {
            key: "r1-1-2",
            value: 1,
            columns: [
              {
                key: "r1-1-2-1",
                value: 1,
              },
              {
                key: "r1-1-2-2",
                value: 1,
              },
            ],
          },
          {
            key: "r1-1-3",
            value: 1,
          },
        ],
      },
      {
        key: "r1-2",
        value: 1,
      },
    ],
  },
  {
    key: "r2",
    columns: [
      {
        key: "r2-1",
        value: 2,
        columns: [
          {
            key: "r2-1-1",
            value: 2,
          },
          {
            key: "r2-1-2",
            value: 2,
            columns: [
              {
                key: "r2-1-2-1",
                value: 2,
              },
              {
                key: "r2-1-2-2",
                value: 2,
              },
            ],
          },
          {
            key: "r2-1-3",
            value: 2,
          },
        ],
      },
      {
        key: "r2-2",
        value: 2,
      },
    ],
  },
];

export const Heatmap = () => {
  const numOfCols = 7;

  const yScale = scaleLinear<number>({
    domain: [0, data.length],
    range: [0, data.length * cellHeight],
  });

  const xScale = scaleLinear<number>({
    domain: [0, numOfCols],
    range: [0, numOfCols * cellWidth],
  });

  const flattenCols = (colsToFlatten: Column[]) => {
    const flattened: Column[] = [];
    const traverse = (columns: Column[]) => {
      columns.forEach((c) => {
        flattened.push(c);
        if (c.columns) {
          traverse(c.columns);
        }
      });
    };

    traverse(colsToFlatten);

    return flattened;
  };

  return (
    <svg width={width} height={height}>
      {data.map((row, y) => {
        const yPos = yScale(y) + y;
        const flattenedColumns = flattenCols(row.columns);
        return flattenedColumns.map((col, x) => {
          const xPos = xScale(x) + x;

          return (
            <rect
              key={col.key}
              id={col.key}
              data-x={x}
              data-y={x}
              x={xPos}
              y={yPos}
              width={cellWidth}
              height={cellHeight}
              fill="red"
            />
          );
        });
      })}
    </svg>
  );

  // return (
  //   <svg width={width} height={height}>
  //     {data.map((row, y) => {
  //       const yPos = yScale(y) + y;
  //       const flattenedColumns = flattenCols(row.columns);
  //       return flattenedColumns.map((col, x) => {
  //         const xPos = xScale(x) + x;

  //         return (
  //           <rect
  //             key={col.key}
  //             id={col.key}
  //             data-x={x}
  //             data-y={x}
  //             x={xPos}
  //             y={yPos}
  //             width={cellWidth}
  //             height={cellHeight}
  //             fill="red"
  //           />
  //         );
  //       });
  //     })}
  //   </svg>
  // );
};
