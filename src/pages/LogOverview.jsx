import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import FirewallOverview from './FirewallOverview';
import WindowsOverview from './WindowsOverview';
import "./allPages.css"

const LogOverview = () => {
  return (
    <div className="mainPageContainer">
      <Tabs defaultActiveKey="firewall" id="log-tabs" className="mb-3">
      <Tab className="tabs" eventKey="firewall" title="Firewall-Logs">
        <FirewallOverview />
      </Tab>
      <Tab className="tabs" eventKey="windows" title="Windows-Logs">
        <WindowsOverview />
      </Tab>

      </Tabs>
    </div>
  );
};

export default LogOverview;


