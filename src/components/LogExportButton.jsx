import React from 'react';

const LogExportButton = ({ logs, timeFilter }) => {
  const getTimeThreshold = filter => {
    const now = new Date();
    switch (filter) {
      case '1h': return new Date(now.getTime() - 1 * 60 * 60 * 1000);
      case '6h': return new Date(now.getTime() - 6 * 60 * 60 * 1000);
      case '1d': return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '1w': return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '1m': return new Date(now.setMonth(now.getMonth() - 1));
      case '1y': return new Date(now.setFullYear(now.getFullYear() - 1));
      default: return null;
    }
  };

  const exportToJSON = () => {
    const threshold = getTimeThreshold(timeFilter);
    const filtered = threshold
      ? logs.filter(log => new Date(log.timestamp) >= threshold)
      : logs;

    const json = JSON.stringify(filtered, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `logs_${timeFilter || 'ALL'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button className="logOverviewTableButtons importExportButton" onClick={exportToJSON}>
      Export als JSON
    </button>
  );
};

export default LogExportButton;
