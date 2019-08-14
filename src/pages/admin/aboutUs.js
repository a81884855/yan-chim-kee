import React, { Component } from 'react'
import UploadImage from '../../helper/uploadImage';
import axios from 'axios';
import { Container, Row, Col, Button, Image, Carousel } from 'react-bootstrap';
import withAuth from '../../hoc/withAuth';

export class AboutUs extends Component {
  constructor(){
    super()
    this.state={
      image: "",
      year: "",
  
    }
    this.refresh = this.refresh.bind(this)
    this.deleteFile = this.deleteFile.bind(this)
  }

  componentDidMount(){
    axios.get(`/api/images/imagesList/slideshow`)
      .then(res => this.setState({
        fileList: res.data
      }))
  }

  refresh(){
    this.componentDidMount()
  }

  deleteFile(e){
    axios.delete(`/api/images/slideshow/${e.target.name}`)
      .then(() => this.componentDidMount())
      .catch(err => { throw err })
  }

  render() {
    const { fileList } = this.state;
    return (
      <Container>
        <Row>
          <Col >
            <UploadImage 
              folderName="slideshow"
              refresh={this.refresh}
            />
          </Col>
          <Col className="imagesConatiner">
            {fileList.map((file)=>
              <div key={file._id}>
                <Image src={`/images/slideshow/${file.image}`} thumbnail />
                <Button variant="danger" name={file.image} style={{ float: 'right', marginTop: '5px' }} onClick={this.deleteFile}>Delete</Button>
              </div>
            )}
          </Col>
        </Row>
        <div className="mt-4">
          <Carousel>
            {fileList.map((file)=>
              <Carousel.Item key={file._id}>
                <Image 
                  src={`/images/slideshow/${file.image}`}
                  alt="First slide"
                  name={file._id}
                  style={{ width: '100%', height: '100vh', maxHeight: '450px' }}
                  thumbnail
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
            )}
          </Carousel>
        </div>
      </Container>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(AboutUs);