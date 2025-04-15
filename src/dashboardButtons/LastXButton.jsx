import React from 'react';

const LastXFilter = ({ showLastX, setTimeFilter, currentFilter }) => {
  if (!showLastX) return null;

  const options = [
    { label: 'Letzte Stunde', value: '1h' },
    { label: 'Letzte 6 Stunden', value: '6h' },
    { label: 'Letzter Tag', value: '1d' },
    { label: 'Letzte Woche', value: '1w' },
    { label: 'Letzter Monat', value: '1m' },
    { label: 'Letztes Jahr', value: '1y' },
    { label: 'Alles', value: 'ALL' },
  ];

  return (
    <div className='filterDropdowns'>
      <label className='filterOptions'>
        Zeitraum:
        <select
          className='filterOptionsSelect'
          onChange={(e) => setTimeFilter(e.target.value)}
          value={currentFilter}
        >
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default LastXFilter;
