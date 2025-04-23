import React from 'react';

const Select = ({ label, value, onChange, options }) => (
  <label className="filterOptions">
    {label}
    <select className="filterOptionsSelect" value={value} onChange={onChange}>
      <option value="ALL">Alle {label}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </label>
);

const FilterButton = ({
  showFilters,
  filterSourceIP,
  filterDestinationIP,
  filterPort,
  filterProtocol,
  filterAction,
  handleSourceIPChange,
  handleDestinationIPChange,
  handlePortChange,
  handleProtocolChange,
  handleActionChange,
  sourceIpOptions,
  destinationIpOptions,
  portOptions,
  protocolOptions,
  actionOptions,
}) => (
  <div>
    {showFilters && (
      <div className="filterDropdowns">
        <Select
          label="Source IP"
          value={filterSourceIP}
          onChange={handleSourceIPChange}
          options={sourceIpOptions}
        />
        <Select
          label="Destination IP"
          value={filterDestinationIP}
          onChange={handleDestinationIPChange}
          options={destinationIpOptions}
        />
        <Select
          label="Port"
          value={filterPort}
          onChange={handlePortChange}
          options={portOptions}
        />
        <Select
          label="Protokoll"
          value={filterProtocol}
          onChange={handleProtocolChange}
          options={protocolOptions}
        />
        <Select
          label="Action"
          value={filterAction}
          onChange={handleActionChange}
          options={actionOptions}
        />
      </div>
    )}
  </div>
);

export default FilterButton;
