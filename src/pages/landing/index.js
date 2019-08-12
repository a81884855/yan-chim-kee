import React from 'react'
import Location from './Location';
import Slideshow from './Slideshow';

export default function Home() {
  return (
    <div>
      <div id="info">
        <div id="home">
          <Slideshow/>
          <Location/>
        </div>
      </div>
    </div>
  )
}
