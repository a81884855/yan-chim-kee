import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { MdLocationOn, MdMailOutline, MdPhone, MdPrint } from "react-icons/md";
import Map from './Map';
import { googleMapURL } from './key';

export default function Location() {
  return (
    <Container className="location">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <p className="title">Location</p>
          <span className="icon">
            <MdLocationOn/>
          </span>
          <p>Unit A2, 5/FL, North Point Industrial Building,</p>
          <p>499 King’s Road, North PointHong Kong</p>
          <p>Hours of Operations: M-F 10am - 6pm (Expept Public Holidays)</p>
          <br></br>
          <p className="title">Contacts Us</p>
          <span className="icon">
            <MdMailOutline/>
          </span>
          <p>info@yanchimkee.com</p>
          <span className="icon">
            <MdPhone/>
          </span>
          <p>852-2522-5306</p>
          <p>852-9180-3177</p>
          <span className="icon">
            <MdPrint/>
          </span>
          <p>852 2522-5466</p>
        </Col>
        <Col md={6}>
          <Map 
            isMarkerShown 
            loadingElement={<div style={{ height: `100%` }} />}
            googleMapURL={googleMapURL}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </Col>
      </Row>
    </Container>
  )
}
