import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import FirewallOverview from './FirewallOverview';
import WindowsOverview from './WindowsOverview';

const LogOverview = () => {
  return (
    <div className="mainPageContainer">
      <Tabs defaultActiveKey="firewall" id="log-tabs" className="mb-3">
        <Tab eventKey="firewall" title="Firewall-Logs">
          <FirewallOverview />
        </Tab>
        <Tab eventKey="windows" title="Windows-Logs">
          <WindowsOverview />
        </Tab>
      </Tabs>
    </div>
  );
};

export default LogOverview;


