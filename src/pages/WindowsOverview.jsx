import React, { useState, useEffect, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import FilterButtonWindows from '../logOverviewButtons/FilterButtonWindows';
import LastXButton from '../logOverviewButtons/LastXButton';
import './allPages.css';

const PAGE_SIZES = [10, 20, 50, 100];

const WindowsOverview = () => {
  const [logs, setLogs] = useState([]);
  const [filterHost, setFilterHost] = useState('ALL');
  const [filterUser, setFilterUser] = useState('ALL');
  const [filterEventID, setFilterEventID] = useState('ALL');
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [filterMessage, setFilterMessage] = useState('ALL');
  const [showFilters, setShowFilters] = useState(false);
  const [showLastX, setShowLastX] = useState(false);
  const [timeFilter, setTimeFilter] = useState('ALL');
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [currentPage, setCurrent] = useState(1);

  // Logs laden
  useEffect(() => {
    const loadLogs = async () => {
      try {
        const res = await fetch('/windows-logs.ndjson');
        const text = await res.text();
        const parsed = text
          .trim()
          .split('\n')
          .map(JSON.parse)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setLogs(parsed);
      } catch (err) {
        console.error('Fehler beim Laden der Logs:', err);
      }
    };

    loadLogs();
  }, []);

  const { hosts, users, messages, eventIDs, levels } = useMemo(() => {
    const hostsSet = new Set();
    const usersSet = new Set();
    const messagesSet = new Set();
    const eventIDSet = new Set();
    const levelSet = new Set();
    logs.forEach(l => {
      hostsSet.add(l.host);
      usersSet.add(l.user);
      messagesSet.add(l.message);
      eventIDSet.add(l.eventID);
      levelSet.add(l.level);
    });
    return {
      hosts: [...hostsSet].sort(),
      users: [...usersSet].sort(),
      messages: [...messagesSet].sort(),
      eventIDs: [...eventIDSet].sort(),
      levels: [...levelSet].sort(),
    };
  }, [logs]);
  

  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleLastX = () => setShowLastX(!showLastX);

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

  const filteredLogs = logs.filter(log => {
    const hostMatches = filterHost === 'ALL' || log.host === filterHost;
    const userMatches = filterUser === 'ALL' || log.user === filterUser;
    const eventIDMatches = filterEventID === 'ALL' || log.eventID === filterEventID;
    const levelMatches = filterLevel === 'ALL' || log.level === filterLevel;
    const messageMatches = filterMessage === 'ALL' || log.message === filterMessage;
    const threshold = getTimeThreshold(timeFilter);
    const timeMatches = !threshold || new Date(log.timestamp) >= threshold;
    return hostMatches && userMatches && eventIDMatches && levelMatches && messageMatches && timeMatches;
  });

  const resetFilters = () => {
    setFilterHost('ALL');
    setFilterUser('ALL');
    setFilterEventID('ALL');
    setFilterLevel('ALL');
    setFilterMessage('ALL');
    setTimeFilter('ALL');
    setShowFilters(false);
    setShowLastX(false);
  };

  const pageCount = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
  const pagedLogs = filteredLogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  useEffect(() => setCurrent(1), [filterHost, filterUser, filterEventID, filterLevel, filterMessage, timeFilter, pageSize]);

  const goto = p => setCurrent(Math.min(Math.max(1, p), pageCount));

  return (
    <div>
      <div className="logOverviewTableButtonField">
        <div className="logOverviewTableButtonsContainer">
          <button className="logOverviewTableButtons" onClick={toggleFilters}>
            Filtern nach...
          </button>
          <button className="logOverviewTableButtons" onClick={toggleLastX}>
            Zeitraum wählen
          </button>
          <button className="logOverviewTableButtons" onClick={resetFilters}>
            Alles zurücksetzen
          </button>
          <button className="logOverviewTableButtons importExportButton">Export</button>
        </div>
      </div>

      <div className="logOverview">
        <FilterButtonWindows
          showFilters={showFilters}
          handleHostChange={e => setFilterHost(e.target.value)}
          handleUserChange={e => setFilterUser(e.target.value)}
          handleEventIDChange={e => setFilterEventID(e.target.value)}
          handleLevelChange={e => setFilterLevel(e.target.value)}
          handleMessageChange={e => setFilterMessage(e.target.value)}
          filterHost={filterHost}
          filterUser={filterUser}
          filterEventID={filterEventID}
          filterLevel={filterLevel}
          filterMessage={filterMessage}
          hostOptions={hosts}
          userOptions={users}
          messageOptions={messages}
          eventIDOptions={eventIDs}
          levelOptions={levels}
        />

        <LastXButton
          showLastX={showLastX}
          setTimeFilter={setTimeFilter}
          currentFilter={timeFilter}
        />

        <div className="logOverviewTableWrapper">
          <Table className="logOverviewTable" striped bordered hover>
            <thead>
              <tr>
                <th className='thStandart'>Timestamp</th>
                <th className='thStandart'>Host</th>
                <th className='thStandart'>User</th>
                <th className='thStandart'>EventID</th>
                <th className='thStandart'>Level</th>
                <th className='thErweitert'>Message</th>
              </tr>
            </thead>
            <tbody>
              {pagedLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.timestamp}</td>
                  <td>{log.host}</td>
                  <td>{log.user}</td>
                  <td>{log.eventID}</td>
                  <td>{log.level}</td>
                  <td>{log.message}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="tablePagination">
          <label>
            Zeilen pro Seite:&nbsp;
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
              {PAGE_SIZES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>

          <nav className="pager">
            <button onClick={() => goto(1)} disabled={currentPage === 1}>≪</button>
            <button onClick={() => goto(currentPage - 1)} disabled={currentPage === 1}>‹</button>
            {Array.from({ length: pageCount }, (_, i) => i + 1)
              .slice(Math.max(0, currentPage - 3), currentPage + 2)
              .map(p => (
                <button key={p} onClick={() => goto(p)} className={p === currentPage ? 'active' : undefined}>
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

export default WindowsOverview;
