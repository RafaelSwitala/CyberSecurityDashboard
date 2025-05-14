import React, { useState, useEffect, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import FilterButton from '../logOverviewButtons/FilterButton';
import LastXButton from '../logOverviewButtons/LastXButton';
import config from '../tools/log-generator/config.json';
import LogExportButton from "../components/LogExportButton";
import './allPages.css';

// Mögliche Seitenanzahlen für die Paginierung
const PAGE_SIZES = [10, 20, 50, 100];

const FirewallOverview = () => {
  // State-Variablen für Logs und Filter
  const [logs, setLogs] = useState([]);
  const [filterSourceIP, setFilterSourceIP] = useState('ALL');
  const [filterDestinationIP, setFilterDestinationIP] = useState('ALL');
  const [filterPort, setFilterPort] = useState('ALL');
  const [filterProtocol, setFilterProtocol] = useState('ALL');
  const [filterAction, setFilterAction] = useState('ALL');
  const [filterReason, setFilterReason] = useState('ALL');
  const [showFilters, setShowFilters] = useState(false);
  const [showLastX, setShowLastX] = useState(false);
  const [timeFilter, setTimeFilter] = useState('ALL');
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [currentPage, setCurrent] = useState(1);
  const [logView, setLogView] = useState('ALL');
  const DATA_SOURCE = 'file';

  // Effekt zum Laden der Logs bei Änderung des gewählten Log-Typs
  useEffect(() => {
    const loadLogs = async () => {
      try {
        const allLogs = [];

        // Logs aus dem Log-Generator laden
        if (logView === 'ALL' || logView === 'LOG_GENERATOR') {
          const res = await fetch('/generated_logs.ndjson');
          const text = await res.text();
          const parsed = text.trim().split('\n').map(JSON.parse).map(obj => ({
            ...obj,
            sourceIP: obj.source_ip,
            destinationIP: obj.destination_ip,
            system: 'Log-Generator',
          }));
          allLogs.push(...parsed);
        }

        // Logs aus den AngriffsSimulator laden
        if (logView === 'ALL' || logView === 'ATTACK_LOGS') {
          const res = await fetch('/tools/attackLogs.ndjson');
          const text = await res.text();
          const parsed = text.trim().split('\n').map(JSON.parse).map(obj => ({
            ...obj,
            sourceIP: obj.source_ip,
            destinationIP: obj.destination_ip,
            system: 'AttackLogs',
          }));
          allLogs.push(...parsed);
        }

        // Nach Datum absteigend sortieren
        allLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setLogs(allLogs);

      } catch (err) {
        console.error('Fehler beim Laden der Logs:', err);
      }
    };

    loadLogs();
  }, [logView]);

  const { protocols: protocolCfg = [], ports: portCfg = [] } = config;

  const { sourceIps, destinationIps, actions, reasons } = useMemo(() => {
    const ipsSrc = new Set();
    const ipsDst = new Set();
    const acts = new Set();
    const reas = new Set();
    logs.forEach(l => {
      ipsSrc.add(l.sourceIP);
      ipsDst.add(l.destinationIP);
      acts.add(l.action);
      if (l.reason) reas.add(l.reason);
    });
    return {
      sourceIps: [...ipsSrc].sort(),
      destinationIps: [...ipsDst].sort(),
      actions: [...acts].sort(),
      reasons: [...reas].sort(),
    };
  }, [logs]);

  // Sichtbarkeit der Filter toggeln
  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleLastX = () => setShowLastX(!showLastX);

  // Berechnung des Zeitfensters für zeitliche Filter
  const getTimeThreshold = filter => {
    const now = new Date();
    switch (filter) {
      case '1h': return new Date(now.getTime() - 1 * 60 * 60 * 1000);
      case '6h': return new Date(now.getTime() - 6 * 60 * 60 * 1000);
      case '1d': return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '1w': return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '1m': return new Date(now.setMonth(now.getMonth() - 1));
      case '1y': return new Date(now.setFullYear(now.getFullYear() - 1));
      default: return null;
    }
  };

  // Filterlogik für Logs
  const filteredLogs = logs.filter(log => {
    const sourceIPMatches = filterSourceIP === 'ALL' || log.sourceIP === filterSourceIP;
    const destinationIPMatches = filterDestinationIP === 'ALL' || log.destinationIP === filterDestinationIP;
    const portMatches = filterPort === 'ALL' || log.port.toString() === filterPort.toString();
    const protocolMatches = filterProtocol === 'ALL' || log.protocol === filterProtocol;
    const actionMatches = filterAction === 'ALL' || log.action === filterAction;
    const logTime = new Date(log.timestamp);
    const threshold = getTimeThreshold(timeFilter);
    const timeMatches = !threshold || logTime >= threshold;
    const reasonMatches = filterReason === 'ALL' || log.reason === filterReason;

    return sourceIPMatches && destinationIPMatches && portMatches && protocolMatches && actionMatches && timeMatches && reasonMatches;
  });

  // Filter zurücksetzen
  const resetFilters = () => {
    setFilterSourceIP('ALL');
    setFilterDestinationIP('ALL');
    setFilterPort('ALL');
    setFilterProtocol('ALL');
    setFilterAction('ALL');
    setFilterReason('ALL');
    setTimeFilter('ALL');
    setLogView('ALL');
    setShowFilters(false);
    setShowLastX(false);
  };

  // Berechnung der Seitenanzahl & Pagination
  const pageCount = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
  const pagedLogs = filteredLogs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Bei Filteränderung zur ersten Seite springen
  useEffect(() => setCurrent(1), [
    filterSourceIP, filterDestinationIP, filterPort,
    filterProtocol, filterAction, timeFilter, pageSize
  ]);

  // Seitenwechsel
  const goto = p => setCurrent(Math.min(Math.max(1, p), pageCount));
  const getHourlyAccessData = (logs) => {
    const now = new Date();
    const end = new Date(now);
    end.setMinutes(0, 0, 0);
    const start = new Date(end.getTime() - 60 * 60 * 1000);
    const hourlyData = {};

    logs.forEach(log => {
      const logTime = new Date(log.timestamp);
      if (logTime >= start && logTime <= new Date(end.getTime() + 60 * 60 * 1000)) {
        const hourLabel = `${logTime.getHours().toString().padStart(2, '0')}:00`;
        if (!hourlyData[hourLabel]) {
          hourlyData[hourLabel] = { time: hourLabel, allowed: 0, blocked: 0 };
        }
        if (log.action === 'ALLOW') hourlyData[hourLabel].allowed += 1;
        else if (log.action === 'BLOCK') hourlyData[hourLabel].blocked += 1;
      }
    });

    const formattedData = [];
    for (let i = 0; i <= 1; i++) {
      const d = new Date(start.getTime() + i * 60 * 60 * 1000);
      const label = `${d.getHours().toString().padStart(2, '0')}:00`;
      if (!hourlyData[label]) {
        hourlyData[label] = { time: label, allowed: 0, blocked: 0 };
      }
      formattedData.push(hourlyData[label]);
    }

    return formattedData;
  };

  // CSV-Exportfunktion
  const exportToCSV = () => {
    const headers = ['Timestamp', 'System', 'Source IP', 'Destination IP', 'Port', 'Protocol', 'Action', 'Reason'];
    const rows = filteredLogs.map(log => [
      log.timestamp,
      log.system,
      log.sourceIP,
      log.destinationIP,
      log.port,
      log.protocol,
      log.action,
      log.reason ?? ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'logs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // JSX-Rückgabe der UI
  return (
    <div>
      <div className="logOverviewTableButtonField">
        <div className="logOverviewTableButtonsContainer">
          <select className="logOverviewTableButtons" value={logView} onChange={e => setLogView(e.target.value)}>
            <option value="ALL">Alle Systeme</option>
            <option value="LOG_GENERATOR">Log-Generator</option>
            <option value="ATTACK_LOGS">Attack-Logs</option>
          </select>
          <button className="logOverviewTableButtons" onClick={toggleFilters}>Filtern nach...</button>
          <button className="logOverviewTableButtons" onClick={toggleLastX}>Zeitraum wählen</button>
          <button className="logOverviewTableButtons" onClick={resetFilters}>Alles zurücksetzen</button>
          <LogExportButton logs={logs} timeFilter={timeFilter} />
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
          handleReasonChange={e => setFilterReason(e.target.value)}
          filterSourceIP={filterSourceIP}
          filterDestinationIP={filterDestinationIP}
          filterPort={filterPort}
          filterProtocol={filterProtocol}
          filterAction={filterAction}
          filterReason={filterReason}
          sourceIpOptions={sourceIps}
          destinationIpOptions={destinationIps}
          portOptions={portCfg.map(String)}
          protocolOptions={protocolCfg}
          actionOptions={actions}
          reasonOptions={reasons}
        />

        <LastXButton showLastX={showLastX} setTimeFilter={setTimeFilter} currentFilter={timeFilter} />

        <div className="logOverviewTableWrapper">
          <Table className="logOverviewTable" striped bordered hover>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>System</th>
                <th>Source IP</th>
                <th>Destination IP</th>
                <th>Port</th>
                <th>Protocol</th>
                <th>Action</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {pagedLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.timestamp}</td>
                  <td>{log.system}</td>
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

        <div className="tablePagination">
          <label>
            Zeilen pro Seite:&nbsp;
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
              {PAGE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>

          <nav className="pager">
            <button onClick={() => goto(1)} disabled={currentPage === 1}>≪</button>
            <button onClick={() => goto(currentPage - 1)} disabled={currentPage === 1}>‹</button>
            {Array.from({ length: pageCount }, (_, i) => i + 1)
              .slice(Math.max(0, currentPage - 3), currentPage + 2)
              .map(p => (
                <button
                  key={p}
                  onClick={() => goto(p)}
                  className={p === currentPage ? 'active' : undefined}
                >
                  {p}
                </button>
              ))}
            <button onClick={() => goto(currentPage + 1)} disabled={currentPage === pageCount}>›</button>
            <button onClick={() => goto(pageCount)} disabled={currentPage === pageCount}>≫</button>
          </nav>

          <span className="totalCount">Gefilterte Logs: {filteredLogs.length}</span>
        </div>
      </div>
    </div>
  );
};

export default FirewallOverview;