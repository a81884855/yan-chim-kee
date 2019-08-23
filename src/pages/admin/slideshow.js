import React, { Component } from 'react'
import UploadImage from '../../helper/uploadImage';
import axios from 'axios';
import { Container, Row, Col, Button, Image, Carousel } from 'react-bootstrap';
import withAuth from '../../hoc/withAuth';

export class SlideShow extends Component {
  constructor(){
    super()
    this.state={
      fileList: [],
    }
    this.deleteFile = this.deleteFile.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  componentDidMount(){
    axios.get(`/api/slideshow/list`)
      .then(res => this.setState({
        fileList: res.data
      }))
  }

  fileUpload(){
    const data = new FormData();
    const { file } = this.state;
    data.append('selectedFile', file);
    axios.post(`/api/slideshow/upload`, data)
      .then(() => this.componentDidMount())
      .catch((err) => {throw err})
  }

  onChangeHandler(e){
    this.setState({
      file: e.target.files[0]
    })
  }

  deleteFile(e){
    axios.delete(`/api/slideshow/slideshow/${e.target.name}`)
      .then(() => this.componentDidMount())
      .catch(err => { throw err })
  }

  render() {
    const { fileList } = this.state;
    return (
      <Container>
        <h3>Add new slideshow!</h3>
        <Row>
          <Col >
            <UploadImage 
              folderName="slideshow"
              refresh={this.onChangeHandler}
              onChangeHandler={this.onChangeHandler}
            />
            <button onClick={this.fileUpload} style={{ float: 'right'}}>Upload</button>
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
                  thumbnail
                  style={{ width: '100%', height: '100vh', maxHeight: '450px'}}
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

export default withAuth(session => session && session.getCurrentUser)(SlideShow);