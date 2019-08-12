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
    console.log(`${window.location.host}:5000/api/images/upload/slideshow`)
    axios.get(`/api/images/upload/slideshow`)
      .then((data)=>{
        console.log(data);
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
      onChange: (oldIndex, newIndex) => {
        // console.log(`slide transition from ${oldIndex} to ${newIndex}`);
      }
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
