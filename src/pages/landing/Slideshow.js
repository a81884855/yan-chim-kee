import React, { Component } from 'react'
import axios from 'axios';
import { Image, Carousel } from 'react-bootstrap';

export class Slideshow extends Component {
  constructor(){
    super()
    this.state={
      slideImages: []
    }
  }

  componentDidMount(){
    axios.get(`/api/images/imagesList/slideshow`)
      .then(res => this.setState({
        slideImages: res.data
      }))
      .then((res)=> console.log(res))
  }

  render() {
    const { slideImages } = this.state;
    return (
      <Carousel>
        {slideImages.map((slide)=>
          <Carousel.Item key={slide._id}>
            <Image 
              src={`/api/images/slideshow/${slide.image}`}
              alt="First slide"
              name={slide._id}
              style={{ width: '100%', height: '90vh' }}
              thumbnail
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        )}
      </Carousel>
    )
  }
}

export default Slideshow
