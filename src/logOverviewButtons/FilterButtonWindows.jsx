import React from 'react';

const Select = ({ label, value, onChange, options }) => (
  <label className="filterOptions">
    {label}
    <select className="filterOptionsSelect" value={value} onChange={onChange}>
      <option value="ALL">Alle {label}</option>
      {(options || []).map(opt => (
        <option key={opt} value={opt}>
            {opt}
        </option>
        ))}

    </select>
  </label>
);

const FilterButtonWindows = ({
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
    {showFilters && (
      <div className="filterDropdowns">
        <Select
          label="Host"
          value={filterHost}
          onChange={handleHostChange}
          options={hostOptions}
        />
        <Select
          label="User"
          value={filterUser}
          onChange={handleUserChange}
          options={userOptions}
        />
        <Select
          label="EventID"
          value={filterEventID}
          onChange={handleEventIDChange}
          options={eventIDOptions}
        />
        <Select
          label="Level"
          value={filterLevel}
          onChange={handleLevelChange}
          options={levelOptions}
        />
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
