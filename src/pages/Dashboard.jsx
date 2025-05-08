import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import ProtocolChart from "../charts/ProtocolChart";
import AccessTrendChart from "../charts/AccessTrendChart";
import TaskOverview from "./TaskOverview";
import "./allPages.css";

const Dashboard = () => {
  const [reasonData, setReasonData] = useState([]);
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    const fetchAndProcessData = () => {
      fetch("/generated_logs.ndjson")
        .then(res => res.text())
        .then(text => text.trim().split("\n").map(JSON.parse))
        .then(logs => {
          // Auswertung nach reason
          const reasonObj = logs.reduce((acc, { reason }) => {
            acc[reason] = (acc[reason] || 0) + 1;
            return acc;
          }, {});
          setReasonData(
            Object.entries(reasonObj).map(([reason, count]) => ({ reason, count }))
          );

          // Auswertung der Access Trends (allowed vs. blocked pro Stunde)
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

    fetchAndProcessData();
    const intervalId = setInterval(fetchAndProcessData, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mainPageContainer">
      <div className="carouselSection">
        <Carousel>
          <Carousel.Item>
            <div className="carousel">
              <h3>Angriffsgründe (Reason)</h3>
              {reasonData.length ? <ProtocolChart data={reasonData} /> : <p>lade …</p>}
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel">
              <h3>allowed vs. blocked (1-hour-Intervall)</h3>
              {trendData.length ? <AccessTrendChart data={trendData} /> : <p>lade …</p>}
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel">
              <h3>Dritte Folie</h3>
              <p>Mehr Inhalt folgt…</p>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="taskSection">
        <TaskOverview />
      </div>
    </div>
  );
};

export default Dashboard;
