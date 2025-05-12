import React, { useEffect, useState } from "react";
import "./allPages.css";
import "./Alarme.css";
import { jwtDecode } from "jwt-decode";

const Alarme = () => {
  // State-Variablen zur Verwaltung von Alarmen, Review-Historie, aktivem Tab usw.
  const [alerts, setAlerts] = useState([]);
  const [reviewHistory, setReviewHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [currentUser, setCurrentUser] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    // Token aus dem LocalStorage holen
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUser({
        id: decoded.id,
        username: decoded.username,
        role: decoded.role,
      });
    }

    // Alerts von der API laden
    fetch("http://localhost:9555/api/alerts")
      .then((res) => res.json())
      .then((data) => {
        console.log("ALERTS:", data);
        setAlerts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Alerts:", err);
        setAlerts([]);
      });

    // Review-Historie laden
    fetch("http://localhost:9555/api/alerts/review-history")
      .then((res) => res.json())
      .then((data) => {
        console.log("REVIEW HISTORY:", data);
        setReviewHistory(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der History:", err);
        setReviewHistory([]);
      });
  }, [confirmed]); // Neu laden, wenn eine Review bestätigt wurde

  // Filterung der angezeigten Alerts basierend auf dem aktiven Tab
  const filteredAlerts = Array.isArray(alerts)
    ? alerts.filter((alert) => {
        if (activeTab === "all") return true;
        if (activeTab === "firewall") return alert.hasOwnProperty("reason");
        if (activeTab === "windows") return alert.hasOwnProperty("eventID");
        return true;
      })
    : [];

  // Funktion zum Absenden der "Review-Bestätigung"
  const handleReviewConfirmation = () => {
    if (!currentUser) return;

    fetch("http://localhost:9555/api/alerts/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: currentUser.id,
        username: currentUser.username,
      }),
    })
      .then(() => {
        setConfirmed(true);
        setTimeout(() => setConfirmed(false), 1000);
        setTimeout(() => window.location.reload(), 300);
      })
      .catch((err) =>
        console.error("Fehler beim Senden der Review:", err)
      );
  };

  return (
    <div className="mainPageContainer">
      <div className="mainPageContainerAlarme">
        <h2>Kritische Sicherheitsalarme</h2>

        {/* Tabs zur Auswahl der Alarm-Kategorie */}
        <div className="tabContainer">
          <button
            className={activeTab === "all" ? "tab active" : "tab"}
            onClick={() => setActiveTab("all")}
          >
            Alle
          </button>
          <button
            className={activeTab === "firewall" ? "tab active" : "tab"}
            onClick={() => setActiveTab("firewall")}
          >
            Firewall
          </button>
          <button
            className={activeTab === "windows" ? "tab active" : "tab"}
            onClick={() => setActiveTab("windows")}
          >
            Windows
          </button>
        </div>

        {/* Button zur Markierung der Alerts als "überprüft" */}
        <button className="reviewButton" onClick={handleReviewConfirmation}>
          Alerts als überprüft markieren
        </button>

        {/* Anzeige der gefilterten Alarme in Tabellenform */}
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
                {/* Darstellung jeder Alarmzeile */}
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

        {/* Nur Administratoren sehen die Review-Historie */}
        {currentUser?.role === "ADMIN" && (
          <div className="reviewHistory">
            <h4>Verlauf: Wer hat wann Alerts bestätigt?</h4>
            {Array.isArray(reviewHistory) && reviewHistory.length > 0 ? (
              <ul>
                {reviewHistory.map((entry, idx) => (
                  <li key={idx}>
                    {entry.username} {" "}
                    {new Date(entry.reviewedAt).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Verlauf konnte nicht geladen werden oder ist leer.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alarme;
