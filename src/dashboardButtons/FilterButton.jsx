import React from 'react';

const FilterButton = ({ 
  showFilters,
  toggleFilters,
  handleSourceIPChange,
  handleDestinationIPChange,
  handlePortChange,
  handleProtocolChange,
  handleActionChange,
  filterSourceIP,
  filterDestinationIP,
  filterPort,
  filterProtocol,
  filterAction,
}) => {
  return (
    <div className='logOverviewTableButtonField'>
      <div className='logOverviewTableButtonsContainer'>
        <button className='logOverviewTableButtons'>Letzte...</button>
        <button className='logOverviewTableButtons'>Ansicht ändern</button>
        <button className='logOverviewTableButtons'>Import</button>
        <button className='logOverviewTableButtons'>Export</button>
        <button className='logOverviewTableButtons'>Neu Laden</button>
        <button className='logOverviewTableButtons' onClick={toggleFilters}>
          Filtern nach...
        </button>
      </div>

      {showFilters && (
        <div className='filterDropdowns'>
          <label className='filterOptions'>
            Source IP:
            <select className='filterOptionsSelect' onChange={handleSourceIPChange} value={filterSourceIP}>
              <option value="ALL">Alle SourceIPs</option>
              <option value="192.168.2.1">192.168.2.1</option>
              <option value="192.168.2.549">192.168.2.549</option>
            </select>
          </label>

          <label className='filterOptions'>
            Destination IP:
            <select className='filterOptionsSelect' onChange={handleDestinationIPChange} value={filterDestinationIP}>
              <option value="ALL">Alle Destination IPs</option>
              <option value="127.0.0.0">127.0.0.0</option>
              <option value="127.0.0.555">127.0.0.555</option>
            </select>
          </label>

          <label className='filterOptions'>
            Port:
            <select className='filterOptionsSelect' onChange={handlePortChange} value={filterPort}>
              <option value="ALL">Alle Ports</option>
              <option value="5050">5050</option>
              <option value="8000">8000</option>
            </select>
          </label>

          <label className='filterOptions'>
            Protokoll:
            <select className='filterOptionsSelect' onChange={handleProtocolChange} value={filterProtocol}>
              <option value="ALL">Alle Protokolle</option>
              <option value="HTTP">HTTP</option>
              <option value="HTTPS">HTTPS</option>
            </select>
          </label>

          <label className='filterOptions'>
            Aktion:
            <select className='filterOptionsSelect' onChange={handleActionChange} value={filterAction}>
              <option value="ALL">Alle Aktionen</option>
              <option value="INFO">INFO</option>
              <option value="WARNING">WARNING</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
