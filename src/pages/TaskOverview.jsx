import React from "react";
import "./allPages.css";

const mockTasks = [
  {
    task: "Netzwerk Scan",
    status: "In Progress",
    progress: 65,
    reports: 2,
    lastScan: "2025-05-06 14:32",
    target: "192.168.0.1",
  },
  {
    task: "SQL Injection Test",
    status: "Completed",
    progress: 100,
    reports: 5,
    lastScan: "2025-05-05 18:22",
    target: "10.0.0.5",
  },
  {
    task: "Malware Beacon Monitor",
    status: "Pending",
    progress: 0,
    reports: 0,
    lastScan: "-",
    target: "192.168.1.200",
  },
];

const TaskOverview = () => {
  return (
    <div className="task-overview">
      <h3>Task Übersicht</h3>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Reports</th>
            <th>Last Scan</th>
            <th>Target</th>
          </tr>
        </thead>
        <tbody>
          {mockTasks.map((t, i) => (
            <tr key={i}>
              <td>{t.task}</td>
              <td>{t.status}</td>
              <td>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${t.progress}%` }}
                  />
                </div>
              </td>
              <td>{t.reports}</td>
              <td>{t.lastScan}</td>
              <td>{t.target}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskOverview;
