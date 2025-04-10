import React from 'react';
import Table from 'react-bootstrap/Table';
import './allPages.css';

const HomePage = () => {
 
  return (
    <div className='mainPageContainer'>
      <div className='logRepresentation'></div>
      <div className='logOverview'>
        <div className='logOverviewTableButtonField'>
          <button className='logOverviewTableButtons'>1</button>
          <button className='logOverviewTableButtons'>2</button>
          <button className='logOverviewTableButtons'>3</button>
          <button className='logOverviewTableButtons'>4</button>
          <button className='logOverviewTableButtons'>5</button>
        </div>
        <div className='logOverviewTableWrapper'>
      <Table 
      className='logOverviewTable'
      striped bordered hover
      >
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Source IP</th>
          <th>Destination IP</th>
          <th>Port</th>
          <th>Protocol</th>
          <th>action</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2025-04-10 23:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>7052</td>
          <td>HTTPS</td>
          <td>WARNING</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 22:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTPS</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 21:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 20:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>8080</td>
          <td>HTTP</td>
          <td>WARNING</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 19:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>8000</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 18:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>7052</td>
          <td>HTTPS</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 17:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 16:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>9000</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 15:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 14:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTPS</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 13:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>9000</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 12:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 11:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 10:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>7052</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-09 23:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>7052</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-08 23:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-07 23:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-06 23:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>7052</td>
          <td>HTTPS</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-05 23:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>WARNING</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-04 23:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-03 23:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-03-10 23:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>7052</td>
          <td>HTTP</td>
          <td>WARNING</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-02-10 23:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTPS</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-01-10 23:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>8080</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:50</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>9000</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:49</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:48</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:47</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>WARNING</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:46</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:45</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:44</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>8000</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:43</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTPS</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:42</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:41</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:40</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:39</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:38</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>8080</td>
          <td>HTTP</td>
          <td>WARNING</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:37</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>8080</td>
          <td>HTTP</td>
          <td>WARNING</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>8000</td>
          <td>HTTPS</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:51</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:38</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>9000</td>
          <td>HTTP</td>
          <td>WARNING</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:35</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:52</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5050</td>
          <td>HTTP</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:53</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5052</td>
          <td>HTTPS</td>
          <td>INFO</td>
          <td>Eine Nachricht</td>
        </tr>
        <tr>
        <td>2025-04-10 23:54</td>
          <td>192.168.2.1</td>
          <td>127.0.0.0</td>
          <td>5051</td>
          <td>HTTPS</td>
          <td>WARNING</td>
          <td>Eine Nachricht</td>
        </tr>
      </tbody>
    </Table>
    </div>
      </div>
    </div>
  );
};

export default HomePage;
