import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function AttackMonthlyChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9555/api/attack-stats/monthly')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Angriffsverlauf (Monatlich)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="monat" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="anzahl" fill="#f87171" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
