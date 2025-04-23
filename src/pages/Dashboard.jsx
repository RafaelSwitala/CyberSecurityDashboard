import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './allPages.css';


const Dashboard = () => {
  return (
    <div className='mainPageContainer'>
      <div className='carouselSection'>
        <Carousel>
          <Carousel.Item>
            <div className='carousel'>
              <div>
                <h3>Erste Folie</h3>
                <p>Beschreibung der ersten Folie</p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className='carousel'>
              <div>
                <h3>Zweite Folie</h3>
                <p>Hier ist etwas anderer Inhalt</p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className='carousel'>
              <div>
                <h3>Dritte Folie</h3>
                <p>Mehr Text oder Komponenten gehen auch</p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className='taskSection'>

      </div>
      </div>
  );
};

export default Dashboard;
