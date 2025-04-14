import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Carousel from 'react-bootstrap/Carousel';
import './allPages.css';

const initialLogs = [
  {
    timestamp: '2025-04-10 23:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 7052,
    protocol: 'HTTPS',
    action: 'WARNING',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'WARNING',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'WARNING',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'WARNING',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'WARNING',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTP',
    action: 'WARNING',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTP',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTP',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
    sourceIP: '192.168.2.1',
    destinationIP: '127.0.0.0',
    port: 5050,
    protocol: 'HTTPS',
    action: 'INFO',
    message: 'Eine Nachricht',
  },
  {
    timestamp: '2025-04-10 22:51',
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
  const toggleFilters = () => setShowFilters(!showFilters);

  const handleSourceIPChange = (e) => {
    setFilterSourceIP(e.target.value);
  };
  
  const handleDestinationIPChange = (e) => {
    setFilterDestinationIP(e.target.value);
  };
  
  const handlePortChange = (e) => {
    setFilterPort(e.target.value);
  };
  
  const handleProtocolChange = (e) => {
    setFilterProtocol(e.target.value);
  };
  
  const handleActionChange = (e) => {
    setFilterAction(e.target.value);
  };
  

  const filteredLogs = logs.filter((log) => {
    const sourceIPMatches = filterSourceIP === 'ALL' || log.sourceIP === filterSourceIP;
    const destinationIPMatches = filterDestinationIP === 'ALL' || log.destinationIP === filterDestinationIP;
    const portMatches = filterPort === 'ALL' || log.port === filterPort;
    const protocolMatches = filterProtocol === 'ALL' || log.protocol === filterProtocol;
    const actionMatches = filterAction === 'ALL' || log.action === filterAction;
    return sourceIPMatches && destinationIPMatches && portMatches && protocolMatches && actionMatches;
  });

  return (
    <div className='mainPageContainer'>
      <div className='logRepresentation'>
      <Carousel>
  <Carousel.Item>
    <div style={{ height: '300px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <h3>Erste Folie</h3>
        <p>Beschreibung der ersten Folie</p>
      </div>
    </div>
  </Carousel.Item>
  <Carousel.Item>
    <div style={{ height: '300px', backgroundColor: '#dee2e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <h3>Zweite Folie</h3>
        <p>Hier ist etwas anderer Inhalt</p>
      </div>
    </div>
  </Carousel.Item>
  <Carousel.Item>
    <div style={{ height: '300px', backgroundColor: '#ced4da', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <h3>Dritte Folie</h3>
        <p>Mehr Text oder Komponenten gehen auch</p>
      </div>
    </div>
  </Carousel.Item>
</Carousel>

      </div>
      <div className='logOverview'>
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
