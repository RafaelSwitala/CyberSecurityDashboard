import React from 'react';

const Select = ({ label, value, onChange, options }) => (
  <label className="filterOptions">
    {label} {/* Beschriftung über dem Dropdown-Menü */}

    {/* Das Dropdown-Menü selbst */}
    <select className="filterOptionsSelect" value={value} onChange={onChange}>
      {/* Standardoption zum Anzeigen aller Einträge */}
      <option value="ALL">Alle {label}</option>

      {/* Erstellen der einzelnen Optionen aus dem übergebenen Array.
          Wenn options nicht vorhanden ist (null/undefined), wird ein leeres Array verwendet */}
      {(options || []).map(opt => (
        <option key={opt} value={opt}>
            {opt} {/* Anzeigen der jeweiligen Option im Dropdown */}
        </option>
      ))}
    </select>
  </label>
);

const FilterButtonWindows = ({
  // Zustand der Filterwerte und zugehörige Änderungsfunktionen
  showFilters,
  filterHost,
  filterUser,
  filterEventID,
  filterLevel,
  filterMessage,
  handleHostChange,
  handleUserChange,
  handleEventIDChange,
  handleLevelChange,
  handleMessageChange,
  hostOptions,
  userOptions,
  eventIDOptions,
  levelOptions,
  messageOptions,
}) => (
  <div>
    {/* Nur anzeigen, wenn showFilters aktiv ist */}
    {showFilters && (
      <div className="filterDropdowns">
        {/* Dropdown für Host-Namen */}
        <Select
          label="Host"
          value={filterHost}
          onChange={handleHostChange}
          options={hostOptions}
        />
        {/* Dropdown für Benutzer */}
        <Select
          label="User"
          value={filterUser}
          onChange={handleUserChange}
          options={userOptions}
        />
        {/* Dropdown für Event IDs */}
        <Select
          label="EventID"
          value={filterEventID}
          onChange={handleEventIDChange}
          options={eventIDOptions}
        />
        {/* Dropdown für Log-Level (z. B. Info, Warning, Error) */}
        <Select
          label="Level"
          value={filterLevel}
          onChange={handleLevelChange}
          options={levelOptions}
        />
        {/* Dropdown für Nachrichteninhalte (z. B. bestimmte Textmuster) */}
        <Select
          label="Message"
          value={filterMessage}
          onChange={handleMessageChange}
          options={messageOptions}
        />
      </div>
    )}
  </div>
);

export default FilterButtonWindows;
