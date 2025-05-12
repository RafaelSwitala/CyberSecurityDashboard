import React from 'react';

const Select = ({ label, value, onChange, options }) => (
  <label className="filterOptions">
    {label} {/* Beschriftung für das Dropdown-Menü */}
    
    {/* Das eigentliche Dropdown-Menü */}
    <select className="filterOptionsSelect" value={value} onChange={onChange}>
      {/* Standardoption zum Zurücksetzen auf "Alle" */}
      <option value="ALL">Alle {label}</option>

      {/* Dynamisches Erzeugen der Optionen basierend auf dem übergebenen Array */}
      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt} {/* Anzeige der Option im Dropdown */}
        </option>
      ))}
    </select>
  </label>
);

const FilterButton = ({
  // Zustand und Änderungsfunktionen für die jeweiligen Filter
  showFilters,
  filterSourceIP,
  filterDestinationIP,
  filterPort,
  filterProtocol,
  filterAction,
  filterReason, 
  handleSourceIPChange,
  handleDestinationIPChange,
  handlePortChange,
  handleProtocolChange,
  handleActionChange,
  handleReasonChange,
  sourceIpOptions,
  destinationIpOptions,
  portOptions,
  protocolOptions,
  actionOptions,
  reasonOptions,
}) => (
  // Wrapper-Div für den gesamten Filterbereich
  <div>
    {/* Filtermenüs nur anzeigen, wenn showFilters true ist */}
    {showFilters && (
      <div className="filterDropdowns">
        {/* Jedes Select-Element steht für ein bestimmtes Filterkriterium */}
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
        <Select
          label="Grund"
          value={filterReason}
          onChange={handleReasonChange}
          options={reasonOptions}
        />
      </div>
    )}
  </div>
);

export default FilterButton;
