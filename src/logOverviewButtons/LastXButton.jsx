import React from 'react';

const LastXFilter = ({ showLastX, setTimeFilter, currentFilter }) => {
  // Wenn showLastX false ist, wird nichts gerendert (Filter soll nicht angezeigt werden)
  if (!showLastX) return null;

  // Definition der zur Auswahl stehenden Zeiträume
  const options = [
    { label: 'Letzte Stunde', value: '1h' },
    { label: 'Letzte 6 Stunden', value: '6h' },
    { label: 'Letzter Tag', value: '1d' },
    { label: 'Letzte Woche', value: '1w' },
    { label: 'Letzter Monat', value: '1m' },
    { label: 'Letztes Jahr', value: '1y' },
    { label: 'Alles', value: 'ALL' },
  ];

  // JSX, das gerendert wird, wenn showLastX true ist
  return (
    <div className='filterDropdowns'>
      {/* Label für das Dropdown-Menü */}
      <label className='filterOptions'>
        Zeitraum:
        {/* Dropdown zur Auswahl des Zeitraums */}
        <select
          className='filterOptionsSelect'
          onChange={(e) => setTimeFilter(e.target.value)} // Aktualisiert den Zeitfilter bei Auswahländerung
          value={currentFilter} // Zeigt den aktuell ausgewählten Filter an
        >
          {/* Erzeugt die Dropdown-Optionen aus dem options-Array */}
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label} {/* Angezeigter Text im Dropdown */}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default LastXFilter;
