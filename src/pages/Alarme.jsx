import React, { useEffect, useState } from "react";
import "./allPages.css";
import { jwtDecode } from "jwt-decode";

const Alarme = () => {
  const [alerts, setAlerts] = useState([]);
  const [reviewHistory, setReviewHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [currentUser, setCurrentUser] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUser({ id: decoded.id, username: decoded.username, role: decoded.role });
    }

    fetch("http://localhost:9555/api/alerts")
      .then((res) => res.json())
      .then(setAlerts)
      .catch((err) => console.error("Fehler beim Laden der Alerts:", err));

    fetch("http://localhost:9555/api/alerts/review-history")
      .then((res) => res.json())
      .then(setReviewHistory)
      .catch((err) => console.error("Fehler beim Laden der History:", err));
  }, [confirmed]);

  const filteredAlerts = alerts.filter((alert) => {
    if (activeTab === "all") return true;
    if (activeTab === "firewall") return alert.hasOwnProperty("reason");
    if (activeTab === "windows") return alert.hasOwnProperty("eventID");
    return true;
  });

  const handleReviewConfirmation = () => {
    fetch("http://localhost:9555/api/alerts/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id, username: currentUser.username }),
    })
      .then(() => {
        setConfirmed(true);
        setTimeout(() => setConfirmed(false), 1000);
  
        // 🚨 Seite neuladen, damit AlertIcon den neuen Status abruft
        setTimeout(() => {
          window.location.reload();  // funktioniert sofort, aber etwas brachial
        }, 300);
      })
      .catch((err) => console.error("Fehler beim Senden der Review:", err));
  };

  return (
    <div className="mainPageContainer">
      <div className="mainPageContainerAlarme">
        <h2>Kritische Sicherheitsalarme</h2>

        <div className="tabContainer">
          <button className={activeTab === "all" ? "tab active" : "tab"} onClick={() => setActiveTab("all")}>Alle</button>
          <button className={activeTab === "firewall" ? "tab active" : "tab"} onClick={() => setActiveTab("firewall")}>Firewall</button>
          <button className={activeTab === "windows" ? "tab active" : "tab"} onClick={() => setActiveTab("windows")}>Windows</button>
        </div>

        <button className="reviewButton" onClick={handleReviewConfirmation}>
          Alerts als überprüft markieren
        </button>

        <div className="alertsTableWrapper">
          {filteredAlerts.length === 0 ? (
            <p>Keine Alarme gefunden.</p>
          ) : (
            <table className="alertsTable">
              <thead>
                <tr>
                  <th>Zeit</th>
                  <th>Typ</th>
                  <th>Quelle</th>
                  <th>Ziel / Host</th>
                  <th>Port / EventID</th>
                  <th>Protokoll / Level</th>
                  <th>Nachricht</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlerts.map((alert, index) => (
                  <tr key={index}>
                    <td>{new Date(alert.timestamp).toLocaleString()}</td>
                    <td>{alert.reason ? "Firewall" : "Windows"}</td>
                    <td>{alert.sourceIP || alert.user}</td>
                    <td>{alert.destinationIP || alert.host}</td>
                    <td>{alert.port || alert.eventID}</td>
                    <td>{alert.protocol || alert.level}</td>
                    <td>{alert.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {currentUser?.role === "ADMIN" && (
          <div className="reviewHistory">
            <h4>Verlauf: Wer hat wann Alerts bestätigt?</h4>
            <ul>
              {reviewHistory.map((entry, idx) => (
                <li key={idx}>
                  {entry.username} – {new Date(entry.reviewedAt).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alarme;