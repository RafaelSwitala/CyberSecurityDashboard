import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

// Definieren der Komponente, die ein Liniendiagramm anzeigt
const AccessTrendChartFirewall = ({ data }) => (
  // ResponsiveContainer sorgt dafür, dass das Diagramm sich an die verfügbare Größe anpasst
  <ResponsiveContainer width="100%" height={280}>
    {/* LineChart ist das Hauptdiagramm, dem die Daten übergeben werden */}
    <LineChart data={data}>
      {/* Fügt ein Gitter zum besseren Ablesen hinzu */}
      <CartesianGrid strokeDasharray="3 3" />
      
      {/* X-Achse mit Zeitstempel */}
      <XAxis dataKey="time" tick={{ fontSize: 12 }} padding={{ left: 10, right: 10 }} />
      
      {/* Y-Achse ohne Dezimalzahlen */}
      <YAxis allowDecimals={false} />
      
      {/* Tooltip zeigt beim Hover zusätzliche Informationen an */}
      <Tooltip />
      
      {/* Legende*/}
      <Legend />
      
      <Line type="monotone" dataKey="allowed" stroke="#28a745" strokeWidth={2} />
      
      <Line type="monotone" dataKey="blocked" stroke="#dc3545" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

export default AccessTrendChartFirewall;
