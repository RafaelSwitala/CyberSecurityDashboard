import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
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
  const [filterProtocol, setFilterProtocol] = useState('ALL');
  const [filterAction, setFilterAction] = useState('ALL');

  const handleProtocolChange = (e) => {
    setFilterProtocol(e.target.value);
  };

  const handleActionChange = (e) => {
    setFilterAction(e.target.value);
  };

  const filteredLogs = logs.filter((log) => {
    const protocolMatches = filterProtocol === 'ALL' || log.protocol === filterProtocol;
    const actionMatches = filterAction === 'ALL' || log.action === filterAction;
    return protocolMatches && actionMatches;
  });

  return (
    <div className='mainPageContainer'>
      <div className='logRepresentation'></div>
      <div className='logOverview'>
        <div className='logOverviewTableButtonField'>
          <label>
            <select onChange={handleProtocolChange} className='logOverviewTableButtons' value={filterProtocol}>
              <option value="ALL">Alle Protokolle</option>
              <option value="HTTP">HTTP</option>
              <option value="HTTPS">HTTPS</option>
            </select>
          </label>

          <label>
            <select onChange={handleActionChange} className='logOverviewTableButtons' value={filterAction}>
              <option value="ALL">Alle Aktionen</option>
              <option value="INFO">INFO</option>
              <option value="WARNING">WARNING</option>
            </select>
          </label>

          <button className='logOverviewTableButtons'>Letzte...</button>
          <button className='logOverviewTableButtons'>Ansicht ändern</button>
          <button className='logOverviewTableButtons'>Import</button>
          <button className='logOverviewTableButtons'>Export</button>
          <button className='logOverviewTableButtons'>Neu Laden</button>
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
