import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import "./charts.css";

// Komponente zur Darstellung eines Balkendiagramms
const ReasonChartFirewall = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    {/*Stellt das Balkendiagramm dar */}
    <BarChart data={data}>
      {/* Gitterlinien zur besseren Lesbarkeit */}
      <CartesianGrid strokeDasharray="3 3" />
      
      {/* X-Achse zeigt die Gründe (z. B. "IP blockiert", "Port gesperrt") */}
      <XAxis dataKey="reason" />
      
      {/* Y-Achse zeigt die Anzahl der Vorkommen, ohne Dezimalstellen */}
      <YAxis allowDecimals={false} />
      
      {/* Tooltip zeigt beim Überfahren der Balken Details an */}
      <Tooltip />
      
      {/* Balken selbst, basierend auf dem Wert "count" */}
      <Bar dataKey="count" />
    </BarChart>
  </ResponsiveContainer>
);

export default ReasonChartFirewall;
