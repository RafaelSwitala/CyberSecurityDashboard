const { sendMailToAdmin } = require('./mailer');

const testLog = {
  sourceIP: '192.168.0.66',
  destinationIP: '10.0.0.1',
  port: 443,
  protocol: 'HTTPS',
  message: 'XSS attempt',
  reason: 'XSS attempt',
  action: 'blocked',
  timestamp: new Date().toISOString()
};

sendMailToAdmin(testLog);
