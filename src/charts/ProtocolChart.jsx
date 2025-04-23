import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const ProtocolChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="protocol" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Bar dataKey="count" />
    </BarChart>
  </ResponsiveContainer>
);

export default ProtocolChart;
