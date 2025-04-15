import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Carousel from 'react-bootstrap/Carousel';
import './allPages.css';
import FilterButton from '../dashboardButtons/FilterButton';
import LastXButton from '../dashboardButtons/LastXButton';

const initialLogs = [
  {
    timestamp: '2025-04-15T10:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 7052,
    protocol: 'HTTPS',
    action: 'WARNING',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-15T15:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'WARNING',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-15T14:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-15T10:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2020-01-15T14:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2020-01-15T14:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2024-05-25T14:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-12T14:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2024-05-25T14:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2024-05-25T14:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2024-05-25T14:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'WARNING',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-03-19T14:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'WARNING',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-03-19T14:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'WARNING',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-03-19T14:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTP',
    action: 'WARNING',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-03-19T14:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTP',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-03-15T14:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTP',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-03-15T14:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-03-15T14:30:45+02:00',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTP',
    action: 'INFO',
    message: 'Eine Nachricht',
  } // Der Import wird über JSON oder Datenbank gehen
];

const Dashboard = () => {
  const [logs] = useState(initialLogs);
  const [filterSourceIP, setFilterSourceIP] = useState('ALL');
  const [filterDestinationIP, setFilterDestinationIP] = useState('ALL');
  const [filterPort, setFilterPort] = useState('ALL');
  const [filterProtocol, setFilterProtocol] = useState('ALL');
  const [filterAction, setFilterAction] = useState('ALL');
  const [showFilters, setShowFilters] = useState(false);
  const [showLastX, setShowLastX] = useState(false);
  const [timeFilter, setTimeFilter] = useState('ALL');

  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleLastX = () => setShowLastX(!showLastX);

  const getTimeThreshold = (filter) => {
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

  const filteredLogs = logs.filter((log) => {
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
    <div className='mainPageContainer'>
      <div className='logRepresentation'>
        <Carousel>
          <Carousel.Item>
            <div className='carousel'>
              <div>
                <h3>Erste Folie</h3>
                <p>Beschreibung der ersten Folie</p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className='carousel'>
              <div>
                <h3>Zweite Folie</h3>
                <p>Hier ist etwas anderer Inhalt</p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className='carousel'>
              <div>
                <h3>Dritte Folie</h3>
                <p>Mehr Text oder Komponenten gehen auch</p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className='logOverviewTableButtonField'>
        <div className='logOverviewTableButtonsContainer'>
          <button className='logOverviewTableButtons' onClick={toggleLastX}>
            Letzte...
          </button>
          <button className='logOverviewTableButtons'>Ansicht ändern</button>
          <button className='logOverviewTableButtons'>Import</button>
          <button className='logOverviewTableButtons'>Export</button>
          <button className='logOverviewTableButtons' onClick={resetFilters}>Zurücksetzen</button>
          <button className='logOverviewTableButtons' onClick={toggleFilters}>
            Filtern nach...
          </button>
</div>


      </div>

      <div className='logOverview'>
        <FilterButton
          showFilters={showFilters}
          toggleFilters={toggleFilters}
          handleSourceIPChange={(e) => setFilterSourceIP(e.target.value)}
          handleDestinationIPChange={(e) => setFilterDestinationIP(e.target.value)}
          handlePortChange={(e) => setFilterPort(e.target.value)}
          handleProtocolChange={(e) => setFilterProtocol(e.target.value)}
          handleActionChange={(e) => setFilterAction(e.target.value)}
          filterSourceIP={filterSourceIP}
          filterDestinationIP={filterDestinationIP}
          filterPort={filterPort}
          filterProtocol={filterProtocol}
          filterAction={filterAction}
        />

        <LastXButton
        showLastX={showLastX}
        setTimeFilter={setTimeFilter}
        currentFilter={timeFilter}
        />

        <div className='logOverviewTableWrapper'>
          <Table className='logOverviewTable' striped bordered hover>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Source IP</th>
                <th>Destination IP</th>
                <th>Port</th>
                <th>Protocol</th>
                <th>Action</th>
                <th>Message</th>
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
                  <td>{log.message}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;