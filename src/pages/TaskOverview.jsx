import React from "react";
import Table from 'react-bootstrap/Table';
import "./allPages.css";

const mockTasks = [
  {
    task: "Log-Generator",
    status: "In Progress",
    progress: 65,
    reports: 2,
    lastScan: "2025-05-06 14:32",
    target: "192.168.0.1",
  },
  {
    task: "Windows-Logs",
    status: "Completed",
    progress: 100,
    reports: 5,
    lastScan: "2025-05-05 18:22",
    target: "10.0.0.5",
  },
  {
    task: "Attacks",
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
                  <td>Log-Generator</td>
                  <td>abcd</td>
                  <td>abcd</td>
                  <td>abcd</td>
                  <td>abcd</td>
                  <td>abcd</td>
                  <td>abcd</td>
                </tr>
                <tr>
                  <td>Windows-Logs</td>
                  <td>abcd</td>
                  <td>abcd</td>
                  <td>abcd</td>
                  <td>abcd</td>
                  <td>abcd</td>
                  <td>abcd</td>
                </tr>
                <tr>
                  <td>Attacks</td>
                  <td>abcd</td>
                  <td>abcd</td>
                  <td>abcd</td>
                  <td>abcd</td>
                  <td>abcd</td>
                  <td>abcd</td>
                </tr>
              
            </tbody>

          </Table>


    </div>
  );
};

export default TaskOverview;
