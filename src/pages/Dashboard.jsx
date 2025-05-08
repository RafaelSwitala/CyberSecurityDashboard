import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import ProtocolChart from "../charts/ProtocolChart";
import AccessTrendChart from "../charts/AccessTrendChart";
import TaskOverview from "./TaskOverview";
import "./allPages.css";

const Dashboard = () => {
  const [protocolData, setProtocolData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [newAlerts, setNewAlerts] = useState(false);

  useEffect(() => {
    const fetchAndProcessData = () => {
      fetch("/generated_logs.ndjson")
        .then(res => res.text())
        .then(text => text.trim().split("\n").map(JSON.parse))
        .then(logs => {
          const protoObj = logs.reduce((acc, { protocol }) => {
            acc[protocol] = (acc[protocol] || 0) + 1;
            return acc;
          }, {});
          setProtocolData(
            Object.entries(protoObj).map(([protocol, count]) => ({ protocol, count }))
          );

          const trendObj = {};
          logs.forEach(({ timestamp, action }) => {
            const logTime = new Date(timestamp);
            const hourBucket = new Date(logTime);
            hourBucket.setMinutes(0, 0, 0);

            const label = hourBucket.toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });

            if (!trendObj[label]) {
              trendObj[label] = { time: label, allowed: 0, blocked: 0 };
            }
            trendObj[label][action]++;
          });

          const sorted = Object.values(trendObj)
            .sort((a, b) => a.time.localeCompare(b.time))
            .filter((_, idx, arr) => idx >= arr.length - 7);

          setTrendData(sorted);
        })
        .catch(console.error);
    };

    const checkAlerts = async () => {
      try {
        const res = await fetch("http://localhost:9555/api/alerts");
        const alerts = await res.json();
        if (alerts.length > 0) {
          setNewAlerts(true);
        }
      } catch (err) {
        console.error("Fehler beim Laden der Alerts:", err);
      }
    };

    fetchAndProcessData();
    checkAlerts();

    const intervalId = setInterval(() => {
      fetchAndProcessData();
      checkAlerts();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mainPageContainer">
    
      <div className="carouselSection">
        <Carousel>
          <Carousel.Item>
            <div className="carousel">
              <h3>Verteilung der Protokolle</h3>
              {protocolData.length ? <ProtocolChart data={protocolData} /> : <p>lade …</p>}
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel">
              <h3>Angriffsgründe (Reason)</h3>
              {reasonData.length ? <ReasonChartFirewall data={reasonData} /> : <p>lade …</p>}
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel">
              <h3>allowed vs. blocked (1-hour-Intervall)</h3>
              {trendData.length ? <AccessTrendChartFirewall data={trendData} /> : <p>lade …</p>}
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

      <div className="taskSection">
        <TaskOverview newAlerts={newAlerts} />
      </div>
    </div>
  );
};

export default Dashboard;
