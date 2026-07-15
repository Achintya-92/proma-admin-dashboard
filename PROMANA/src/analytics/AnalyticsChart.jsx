import { useState } from "react";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
];

export default function AnalyticsChart({ data }) {
  const [chartType, setChartType] = useState("bar");

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
     <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Category Distribution
          </h2>

          <p className="text-sm text-slate-500">
            Products across different categories
          </p>
        </div>

        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
           className="w-full rounded-lg border border-slate-200 px-3 py-2 sm:w-auto"
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="line">Line Chart</option>
        </select>
      </div>

      <div className="w-full overflow-x-auto">
  <div className="h-[400px] min-w-[800px]">

        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="count"
                fill="#2563EB"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          ) : chartType === "pie" ? (
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="category"
                outerRadius={130}
                label
              >
                {data.map((item, index) => (
                  <Cell
                    key={item.category}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#2563EB"
                strokeWidth={3}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
}