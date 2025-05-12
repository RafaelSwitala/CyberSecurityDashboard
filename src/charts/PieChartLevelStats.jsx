import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Farbzuordnung für die verschiedenen Level (Information, Warning, Error)
const COLORS = {
  Information: "#0d8000",
  Warning: "#FFBB28",
  Error: "#f70000",
};

// Komponente für das Kreisdiagramm zur Anzeige von Level-Statistiken
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
          dataKey="value"   // Zugriff auf den Wert (Anzahl)
          nameKey="name"    // Zugriff auf den Namen (Level)
          outerRadius={100} // Größe des Kreisdiagramms
          label             // Aktiviert die Beschriftung der Segmente
        >
          {/* Cell-Komponenten geben jedem Segment eine eigene Farbe basierend auf dem Level */}
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#8884d8"} />
          ))}
        </Pie>
        <Tooltip />
        {/* Legende*/}
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartLevelStats;
