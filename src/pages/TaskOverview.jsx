import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import "./allPages.css";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).replace(":", ":");
};

const TaskOverview = () => {
  const [logGenStats, setLogGenStats] = useState({
    lastAttack: "-",
    lastSync: "-",
    logCount: 0,
    attackCount: 0,
  });

  const [attackStats, setAttackStats] = useState({
    lastAttack: "-",
    lastSync: "-",
    logCount: 0,
    attackCount: 0,
  });

  useEffect(() => {
    const fetchLogGeneratorData = async () => {
      try {
        const res = await fetch("/generated_logs.ndjson");
        const text = await res.text();
        const lines = text.trim().split("\n");
        const logs = lines.map(line => JSON.parse(line));

        const logCount = logs.length;
        const attackLogs = logs.filter(log => log.action === "blocked");
        const attackCount = attackLogs.length;

        const lastAttack = attackLogs.length > 0
          ? formatDate(attackLogs[attackLogs.length - 1].timestamp)
          : "-";

        const lastSync = logs.length > 0
          ? formatDate(logs[logs.length - 1].timestamp)
          : "-";

        setLogGenStats({
          lastAttack,
          lastSync,
          logCount,
          attackCount,
        });
      } catch (error) {
        console.error("Fehler beim Laden der generated_logs.ndjson:", error);
      }
    };

    const fetchAttackData = async () => {
      try {
        const res = await fetch("/tools/attackLogs.ndjson");
        const text = await res.text();
        const lines = text.trim().split("\n");
        const logs = lines.map(line => JSON.parse(line));

        const logCount = logs.length;
        const attackCount = logCount;

        const lastAttack = logCount > 0
          ? formatDate(logs[logCount - 1].timestamp)
          : "-";

        const lastSync = logCount > 0
          ? formatDate(logs[logCount - 1].timestamp)
          : "-";

        setAttackStats({
          lastAttack,
          lastSync,
          logCount,
          attackCount,
        });
      } catch (error) {
        console.error("Fehler beim Laden der attackLogs.ndjson:", error);
      }
    };

    fetchLogGeneratorData();
    fetchAttackData();
  }, []);

  return (
    <div className="task-overview">
      <h3>Task Übersicht</h3>

      <Table className="logOverviewTable" striped bordered hover>
        <thead>
          <tr>
            <th>System</th>
            <th>Last Attack (TimeStamp)</th>
            <th>Last Sync (TimeStamp?)</th>
            <th>Anzahl Logs</th>
            <th>Anzahl Attacken</th>
            <th>Checked? (boolean)</th>
            <th>Last Checked</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Log-Generator</strong></td>
            <td>{logGenStats.lastAttack}</td>
            <td>{logGenStats.lastSync}</td>
            <td>{logGenStats.logCount}</td>
            <td>{logGenStats.attackCount}</td>
            <td>-</td>
            <td>-</td>
          </tr>

          <tr>
            <td><strong>Windows-Logs</strong></td>
            <td>abcd</td>
            <td>abcd</td>
            <td>abcd</td>
            <td>abcd</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td><strong>Attacks</strong></td>
            <td>{attackStats.lastAttack}</td>
            <td>{attackStats.lastSync}</td>
            <td>{attackStats.logCount}</td>
            <td>{attackStats.attackCount}</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TaskOverview;
