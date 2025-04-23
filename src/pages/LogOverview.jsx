import React, { useState, useEffect, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import FilterButton from '../logOverviewButtons/FilterButton';
import LastXButton from '../logOverviewButtons/LastXButton';
import config from '../../log-generator/config.json';
import './allPages.css';

const LogOverview = () => {
  const [logs, setLogs] = useState([]);
  const [filterSourceIP, setFilterSourceIP] = useState('ALL');
  const [filterDestinationIP, setFilterDestinationIP] = useState('ALL');
  const [filterPort, setFilterPort] = useState('ALL');
  const [filterProtocol, setFilterProtocol] = useState('ALL');
  const [filterAction, setFilterAction] = useState('ALL');
  const [showFilters, setShowFilters] = useState(false);
  const [showLastX, setShowLastX] = useState(false);
  const [timeFilter, setTimeFilter] = useState('ALL');

  useEffect(() => {
    fetch('/generated_logs.ndjson')
      .then(res => res.text())
      .then(text =>
        text
          .trim()
          .split('\n')
          .map(JSON.parse)
          .map(obj => ({
            ...obj,
            sourceIP: obj.source_ip,
            destinationIP: obj.destination_ip,
          })),
      )
      .then(setLogs)
      .catch(console.error);
  }, []);

  const { protocols: protocolCfg = [], ports: portCfg = [] } = config;

  const { sourceIps, destinationIps, actions } = useMemo(() => {
    const ipsSrc = new Set();
    const ipsDst = new Set();
    const acts = new Set();
    logs.forEach(l => {
      ipsSrc.add(l.sourceIP);
      ipsDst.add(l.destinationIP);
      acts.add(l.action);
    });
    return {
      sourceIps: [...ipsSrc].sort(),
      destinationIps: [...ipsDst].sort(),
      actions: [...acts].sort(),
    };
  }, [logs]);

  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleLastX = () => setShowLastX(!showLastX);

  const getTimeThreshold = filter => {
    const now = new Date();
    switch (filter) {
      case '1h':
        return new Date(now.getTime() - 1 * 60 * 60 * 1000);
      case '6h':
        return new Date(now.getTime() - 6 * 60 * 60 * 1000);
      case '1d':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '1w':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '1m':
        return new Date(now.setMonth(now.getMonth() - 1));
      case '1y':
        return new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        return null;
    }
  };

  const filteredLogs = logs.filter(log => {
    const sourceIPMatches = filterSourceIP === 'ALL' || log.sourceIP === filterSourceIP;
    const destinationIPMatches = filterDestinationIP === 'ALL' || log.destinationIP === filterDestinationIP;
    const portMatches = filterPort === 'ALL' || log.port.toString() === filterPort.toString();
    const protocolMatches = filterProtocol === 'ALL' || log.protocol === filterProtocol;
    const actionMatches = filterAction === 'ALL' || log.action === filterAction;
    const logTime = new Date(log.timestamp);
    const threshold = getTimeThreshold(timeFilter);
    const timeMatches = !threshold || logTime >= threshold;
    return sourceIPMatches && destinationIPMatches && portMatches && protocolMatches && actionMatches && timeMatches;
  });

  const resetFilters = () => {
    setFilterSourceIP('ALL');
    setFilterDestinationIP('ALL');
    setFilterPort('ALL');
    setFilterProtocol('ALL');
    setFilterAction('ALL');
    setTimeFilter('ALL');
    setShowFilters(false);
    setShowLastX(false);
  };

  return (
    <div className="mainPageContainer">
      <div className="logOverviewTableButtonField">
        <div className="logOverviewTableButtonsContainer">
          <button className="logOverviewTableButtons" onClick={toggleFilters}>
            Filtern nach...
          </button>
          <button className="logOverviewTableButtons" onClick={toggleLastX}>
            Letzte...
          </button>
          <button className="logOverviewTableButtons" onClick={resetFilters}>
            Filter zurücksetzen
          </button>
          <button className="logOverviewTableButtons">Ansicht ändern</button>
          <button className="logOverviewTableButtons">Daten neuladen</button>
          <button className="logOverviewTableButtons importExportButton">Import</button>
          <button className="logOverviewTableButtons importExportButton">Export</button>
        </div>
      </div>

      <div className="logOverview">
        <FilterButton
          showFilters={showFilters}
          handleSourceIPChange={e => setFilterSourceIP(e.target.value)}
          handleDestinationIPChange={e => setFilterDestinationIP(e.target.value)}
          handlePortChange={e => setFilterPort(e.target.value)}
          handleProtocolChange={e => setFilterProtocol(e.target.value)}
          handleActionChange={e => setFilterAction(e.target.value)}
          filterSourceIP={filterSourceIP}
          filterDestinationIP={filterDestinationIP}
          filterPort={filterPort}
          filterProtocol={filterProtocol}
          filterAction={filterAction}
          sourceIpOptions={sourceIps}
          destinationIpOptions={destinationIps}
          portOptions={portCfg.map(String)}
          protocolOptions={protocolCfg}
          actionOptions={actions}
        />

        <LastXButton showLastX={showLastX} setTimeFilter={setTimeFilter} currentFilter={timeFilter} />

        <div className="logOverviewTableWrapper">
          <Table className="logOverviewTable" striped bordered hover>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Source IP</th>
                <th>Destination IP</th>
                <th>Port</th>
                <th>Protocol</th>
                <th>Action</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.timestamp}</td>
                  <td>{log.sourceIP}</td>
                  <td>{log.destinationIP}</td>
                  <td>{log.port}</td>
                  <td>{log.protocol}</td>
                  <td>{log.action}</td>
                  <td>{log.reason}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default LogOverview;
