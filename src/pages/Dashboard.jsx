import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import ProtocolChart from "../charts/ProtocolChart";
import "./allPages.css";

const Dashboard = () => {
  const [protocolData, setProtocolData] = useState([]);

  useEffect(() => {
    fetch("/generated_logs.ndjson")
      .then(res => res.text())
      .then(txt =>
        txt
          .trim()
          .split("\n")
          .map(JSON.parse)
          .reduce((acc, { protocol }) => {
            acc[protocol] = (acc[protocol] || 0) + 1;
            return acc;
          }, {})
      )
      .then(obj =>
        Object.entries(obj).map(([protocol, count]) => ({ protocol, count }))
      )
      .then(setProtocolData)
      .catch(console.error);
  }, []);

  return (
    <div className="mainPageContainer">
      <div className="carouselSection">
        <Carousel>
          <Carousel.Item>
            <div className="carousel">
              <h3>Verteilung der Protokolle</h3>
              {protocolData.length ? (
                <ProtocolChart data={protocolData} />
              ) : (
                <p>lade …</p>
              )}
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel">
              <h3>Zweite Folie</h3>
              <p>Hier ist etwas anderer Inhalt</p>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel">
              <h3>Dritte Folie</h3>
              <p>Mehr Text oder Komponenten gehen auch</p>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="taskSection"></div>
    </div>
  );
};

export default Dashboard;
