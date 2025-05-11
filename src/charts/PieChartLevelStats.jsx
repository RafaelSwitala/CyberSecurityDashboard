import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = {
  Information: "#0d8000",
  Warning: "#FFBB28",
  Error: "#f70000",
};

const PieChartLevelStats = ({ data }) => {
  const chartData = Object.entries(data).map(([level, count]) => ({
    name: level,
    value: count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
    <PieChart width={500} height={500}> 

        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#8884d8"} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartLevelStats;
