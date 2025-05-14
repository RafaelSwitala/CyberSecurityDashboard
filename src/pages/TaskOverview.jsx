import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import "./allPages.css";

// Funktion zur Umwandlung eines ISO-Zeitstempels in ein lesbares Datumsformat
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Hauptkomponente zur Übersicht aller Tasks
const TaskOverview = () => {
  const [logGenStats, setLogGenStats] = useState({
    lastAttack: "-",
    lastSync: "-",
    logCount: 0,
    attackCount: 0,
  });

  // Zustand für Angriffsdaten
  const [attackStats, setAttackStats] = useState({
    lastAttack: "-",
    lastSync: "-",
    logCount: 0,
    attackCount: 0,
  });

  // Zustand für Windows-Logdaten
  const [windowsStats, setWindowsStats] = useState({
    lastAttack: "-",
    lastSync: "-",
    logCount: 0,
    attackCount: 0,
  });

  // useEffect wird beim ersten Rendern ausgeführt, um Daten zu laden
  useEffect(() => {
    const fetchLogGeneratorData = async () => {
      try {
        const res = await fetch("/generated_logs.ndjson");
        const text = await res.text();
        const lines = text.trim().split("\n");
        const logs = lines.map(line => JSON.parse(line)); // jede Zeile ist ein JSON-Objekt

        const logCount = logs.length;
        const attackLogs = logs.filter(log => log.action === "blocked"); // nur geblockte Angriffe
        const attackCount = attackLogs.length;

        const lastAttack = attackLogs.length > 0
          ? formatDate(attackLogs[attackLogs.length - 1].timestamp) // letzter Angriff
          : "-";

        const lastSync = logs.length > 0
          ? formatDate(logs[logs.length - 1].timestamp) // letzter Log-Eintrag
          : "-";

        setLogGenStats({ lastAttack, lastSync, logCount, attackCount });
      } catch (error) {
        console.error("Fehler beim Laden der generated_logs.ndjson:", error);
      }
    };

    // Funktion zum Laden und Verarbeiten der Angriffsdaten
    const fetchAttackData = async () => {
      try {
        const res = await fetch("/tools/attackLogs.ndjson");
        const text = await res.text();
        const lines = text.trim().split("\n");
        const logs = lines.map(line => JSON.parse(line));

        const logCount = logs.length;
        const lastTimestamp = logs[logCount - 1]?.timestamp || "-";

        setAttackStats({
          lastAttack: formatDate(lastTimestamp),
          lastSync: formatDate(lastTimestamp),
          logCount,
          attackCount: logCount,
        });
      } catch (error) {
        console.error("Fehler beim Laden der attackLogs.ndjson:", error);
      }
    };

    // Funktion zum Laden und Verarbeiten der Windows-Logs
    const fetchWindowsData = async () => {
      try {
        const res = await fetch("/windows-logs.ndjson");
        const text = await res.text();
        const lines = text.trim().split("\n");
        const logs = lines.map(line => JSON.parse(line));

        const logCount = logs.length;
        const attackLogs = logs.filter(log => log.level === "error" || log.level === "critical");
        const attackCount = attackLogs.length;

        const lastAttack = attackLogs.length > 0
          ? formatDate(attackLogs[attackLogs.length - 1].timestamp)
          : "-";

        const lastSync = logs.length > 0
          ? formatDate(logs[logs.length - 1].timestamp)
          : "-";

        setWindowsStats({ lastAttack, lastSync, logCount, attackCount });
      } catch (error) {
        console.error("Fehler beim Laden der Windows-Logs:", error);
      }
    };

    // Alle Datenquellen abrufen
    fetchLogGeneratorData();
    fetchAttackData();
    fetchWindowsData();
  }, []);

  return (
    // Darstellung der Übersicht als Tabelle
    <div className="task-overview">
      <h3>Task Übersicht</h3>
      <Table className="logOverviewTable" striped bordered hover>
        <thead>
          <tr>
            <th>System</th>
            <th>Last Attack (TimeStamp)</th>
            <th>Last Sync (TimeStamp)</th>
            <th>Anzahl Logs</th>
            <th>Anzahl Attacken</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Log-Generator</strong></td>
            <td>{logGenStats.lastAttack}</td>
            <td>{logGenStats.lastSync}</td>
            <td>{logGenStats.logCount}</td>
            <td>{logGenStats.attackCount}</td>
          </tr>
          <tr>
            <td><strong>Windows-Logs</strong></td>
            <td>{windowsStats.lastAttack}</td>
            <td>{windowsStats.lastSync}</td>
            <td>{windowsStats.logCount}</td>
            <td>{windowsStats.attackCount}</td>
          </tr>
          <tr>
            <td><strong>Attacks</strong></td>
            <td>{attackStats.lastAttack}</td>
            <td>{attackStats.lastSync}</td>
            <td>{attackStats.logCount}</td>
            <td>{attackStats.attackCount}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TaskOverview;