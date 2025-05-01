import React, { useState, useEffect, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import FilterButton from '../logOverviewButtons/FilterButton';
import LastXButton from '../logOverviewButtons/LastXButton';
import config from '../../log-generator/config.json';
import './allPages.css';

const PAGE_SIZES = [10, 20, 50, 100];

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
  const [pageSize, setPageSize]   = useState(PAGE_SIZES[0]);
  const [currentPage, setCurrent] = useState(1);

  useEffect(() => {
    fetch('http://localhost:3000/api/logs')
      .then(res => res.json())
      .then(data => {
        setLogs(data); // echte Daten direkt übernehmen
      })
      .catch(error => {
        console.error('❌ Fehler beim Laden der Logs:', error);
      });
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

  const pageCount = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
  const pagedLogs = filteredLogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  useEffect(() => setCurrent(1), [filterSourceIP, filterDestinationIP,
    filterPort, filterProtocol, filterAction,
    timeFilter, pageSize]);

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
          if (log.action === 'ALLOW') {
            hourlyData[hourLabel].allowed += 1;
          } else if (log.action === 'BLOCK') {
            hourlyData[hourLabel].blocked += 1;
          }
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
              {pagedLogs.map((log, index) => (
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


        <div className="tablePagination">
        <label>
          Zeilen pro Seite:&nbsp;
          <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
          >
            {PAGE_SIZES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>

        <nav className="pager">
          <button onClick={() => goto(1)}      disabled={currentPage===1}>≪</button>
          <button onClick={() => goto(currentPage-1)} disabled={currentPage===1}>‹</button>

          {Array.from({length: pageCount}, (_, i) => i + 1)
                .slice(Math.max(0, currentPage-3), currentPage+2)
                .map(p => (
            <button
              key={p}
              onClick={() => goto(p)}
              className={p===currentPage ? 'active' : undefined}
            >
              {p}
            </button>
          ))}

          <button onClick={() => goto(currentPage+1)} disabled={currentPage===pageCount}>›</button>
          <button onClick={() => goto(pageCount)}     disabled={currentPage===pageCount}>≫</button>
        </nav>

        <span className="totalCount">Gesamt: {logs.length}</span>
      </div>


      </div>
    </div>
  );
};

export default LogOverview;
