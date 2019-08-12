import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';

export default function Head() {
  return (
    <div className="header">
      <div id="language">
        <span>繁</span>
        <span>简</span>
        <span>Eng</span>
        | 
        <span>
          <a href="https://www.facebook.com/Yanchimkee/">
            <img className="social" alt="facebook" src="/api/images/main/facebook.png"/></a>
          <a href="https://www.instagram.com/yanchimkee/">
            <img className="social" alt="instragram" src="/api/images/main/instagram.png"/></a>
        </span>
      </div>

      <Navbar bg="light" expand="md">
        <Navbar.Brand href="/">            
          <img 
            className="mr-sm-5 ml-sm-5"
            src="/api/images/main/logo.png" 
            alt="logo" 
            style={{ width: 110, display: 'block', margin: 'auto' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{fontSize: '16px'}}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="aboutUs">About Us</Nav.Link>
            <Nav.Link href="products">Products</Nav.Link>
            <Nav.Link href="latestNews">Latest News</Nav.Link>
            <Nav.Link href="salesLocation">Sales Locations</Nav.Link>
            <Nav.Link href="upcomingEvent">Upcoming Events</Nav.Link>
            <Nav.Link href="contactus">Contact US</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
