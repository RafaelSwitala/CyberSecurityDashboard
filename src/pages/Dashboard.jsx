import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import ReasonChartFirewall from "../charts/ReasonChartFirewall";
import AccessTrendChartFirewall from "../charts/AccessTrendChartFirewall";
import PieChartLevelStats from "../charts/PieChartLevelStats";
import TaskOverview from "./TaskOverview";
import "./allPages.css";

const Dashboard = () => {
  const [reasonData, setReasonData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [levelData, setLevelData] = useState([]);

  // Effekt zum Laden und Verarbeiten der Daten beim ersten Rendern und dann jede Minute
  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        // Alle Log-Dateien gleichzeitig abrufen
        const [genRes, attackRes, windowsLogsRes] = await Promise.all([
          fetch("/generated_logs.ndjson"),
          fetch("/tools/attackLogs.ndjson"),
          fetch("/windows-logs.ndjson"),
        ]);

        // Inhalte als Text auslesen
        const [genText, attackText, windowsLogsText] = await Promise.all([
          genRes.text(),
          attackRes.text(),
          windowsLogsRes.text(),
        ]);

        // Zeilenweise einlesen und parsen
        const genLogs = genText.trim().split("\n").map(JSON.parse);
        const attackLogs = attackText.trim().split("\n").map(JSON.parse);
        const windowsLogs = windowsLogsText.trim().split("\n").map(JSON.parse);

        // Alle Logs zusammenführen
        const allLogs = [...genLogs, ...attackLogs, ...windowsLogs];

        // Reason-Daten berechnen (Angriffsgründe außer "normal traffic")
        const reasonObj = allLogs.reduce((acc, { reason }) => {
          if (reason && reason.toLowerCase() !== "normal traffic") {
            acc[reason] = (acc[reason] || 0) + 1;
          }
          return acc;
        }, {});
        setReasonData(
          Object.entries(reasonObj).map(([reason, count]) => ({ reason, count }))
        );

        // Trend-Daten berechnen (nach Stunde gruppiert: allowed vs. blocked)
        const trendObj = {};
        allLogs.forEach(({ timestamp, action }) => {
          const logTime = new Date(timestamp);
          const hourBucket = new Date(logTime);
          hourBucket.setMinutes(0, 0, 0); // Auf ganze Stunde runden

          const label = hourBucket.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

          if (!trendObj[label]) {
            trendObj[label] = { time: label, allowed: 0, blocked: 0 };
          }
          if (action === "allowed" || action === "blocked") {
            trendObj[label][action]++;
          }
        });

        const sorted = Object.values(trendObj)
          .sort((a, b) => a.time.localeCompare(b.time)) // chronologisch sortieren
          .filter((_, idx, arr) => idx >= arr.length - 7); // nur die letzten 7 Intervalle anzeigen

        setTrendData(sorted);

        //Level-Daten berechnen (z. B. Error, Warning, Info aus Windows-Logs)
        const levelCount = allLogs.reduce((acc, { level }) => {
          if (level) acc[level] = (acc[level] || 0) + 1;
          return acc;
        }, {});
        setLevelData(levelCount);

      } catch (error) {
        console.error("Fehler beim Laden der NDJSON-Dateien:", error);
      }
    };

    fetchAndProcessData();

    // Regelmäßige Aktualisierung jede Minute
    const intervalId = setInterval(fetchAndProcessData, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mainPageContainer">
      {/* Carousel für Diagramme */}
      <div className="carouselSection">
        <Carousel>
          <Carousel.Item>
            <div className="carousel">
              <h3>Angriffsgründe (Reason)</h3>
              {reasonData.length ? (
                <ReasonChartFirewall data={reasonData} />
              ) : (
                <p>lade …</p>
              )}
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel">
              <h3>allowed vs. blocked (1-hour-Intervall)</h3>
              {trendData.length ? (
                <AccessTrendChartFirewall data={trendData} />
              ) : (
                <p>lade …</p>
              )}
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel">
              <h3>Fehlerlevel-Statistik</h3>
              {Object.keys(levelData).length ? (
                <PieChartLevelStats data={levelData} />
              ) : (
                <p>lade …</p>
              )}
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* TaskOverview Komponente */}
      <div className="taskSection">
        <TaskOverview />
      </div>
    </div>
  );
};

export default Dashboard;
