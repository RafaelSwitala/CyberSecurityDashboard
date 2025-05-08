import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

const AccessTrendChartFirewall = ({ data }) => (
  <ResponsiveContainer width="100%" height={280}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" tick={{ fontSize: 12 }} padding={{ left: 10, right: 10 }} />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="allowed" stroke="#28a745" strokeWidth={2} />
      <Line type="monotone" dataKey="blocked" stroke="#dc3545" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

export default AccessTrendChartFirewall;
