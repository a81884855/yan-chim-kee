import { Slide } from 'react-slideshow-image';
import React, { Component } from 'react'
import axios from 'axios';

export class Slideshow extends Component {
  constructor(){
    super()
    this.state={
      slideImages: []
    }
  }

  componentDidMount(){
    axios.get(`/api/images/upload/slideshow`)
      .then((data)=>{
        this.setState({
          slideImages: data.data
        })
      })
  }

  render() {
    const { slideImages } = this.state;
    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      scale: 0.4,
      arrows: true,
    }
    return (
      <Slide {...properties}>
        {
          slideImages.map((each) => 
            <a href="JavaScript:Void(0)" key={each._id}>
              <img alt="" key={each._id} style={{ height:"100vh", width: "100%"}} src={`/images/slideshow/${each.image}`} />
            </a>)
        }
      </Slide>
    )
  }
}

export default Slideshow
