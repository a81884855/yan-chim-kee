import React, { Component } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

export class AboutUs extends Component {
  constructor(props){
    super(props)
    this.state={
      timelines: [],
    }
  }

  componentDidMount(){
    axios.get(`/api/timeline/list`)
      .then(res => this.setState({
        timelines: res.data
      }))
  }

  render(){
    const { timelines } = this.state;
    return (
      <Container id="aboutUs">
        <Row className="justify-content-md-center">
          <h1>About Us / History</h1>
          <p>
            甄沾記始創人甄倫立在1915年開始,在香港以獨特方法製作椰子糖及椰子雪糕, 
            初時沿街叫賣,逐漸廣受歡迎, 人皆以 {"亞沾"} 呼之.其後便以甄沾記之名,在港粵開設店鋪售賣其出品.
            行銷南中國及東南亞及歐美有華人社區之城市. .三十年代由其子甄彩源接手，並於一九五八年在香港黃竹坑開設
            大量生產的工場，產品桀椰子糖，椰子芒果雪糕，椰子芋頭雪糕批，椰汁年糕等等。
            早年曾經停產數年，在2011年從開始從新包裝產品。2018年榮獲香港食品委員會頒發百年食品品牌獎項。
            2019年將產品重新帶到中國，日本，美國，及加拿大令更多海外顧客品嘗到香港的百年味道！
          </p>
          <p>
            Yan Chim Kee was founded by Mr. Yan Lun Lap in 1915 after learning how to make coconut candies in Malaysia. Started selling candies as a hawker,  
          </p>
          <h1>Brand Timeline</h1>    
          <Container style={{margin: '30px 0 120px 0'}}>
            {timelines.map((timeline, index)=>
              <Row className="justify-content-md-center" key={index} >
                <Col className={index%2? "float-right text-left": "float-left text-right"} 
                  md={{ order: index%2 ? 2 : 1, span:6}}
                  style={{ 
                    borderRight: index%2 ? null : "6px #891a14 solid" ,
                  }}
                >
                  <Col md={12} style={{float: index%2 ? "left" : "right",
                    marginBottom: index===timelines.length-1 ? "120px": null
                  }}>
                    <Row md={12} style={{marginTop: '20px'}}>
                      <Col md={{ order: index%2 ? 2 : 1, span:8}}
                        sm={12}>
                        <Image 
                          className={index%2? "float-right": "float-left"} 
                          src={`/images/timeline/${timeline.image}`} thumbnail />
                      </Col>
                      <Col md={{ order: index%2 ? 1 : 2, span:4}} sm={12}>
                        <p className={index%2? "text-right": "text-left"}
                          id="year"
                          style={{right: index%2 ? null : 15}}>
                          {timeline.year}</p>
                      </Col>
                    </Row>
                    <p className="content">{timeline.chineseContent}</p>
                  </Col>
                </Col>
                <Col 
                  md={{ order: index%2 ? 1 : 2, span:6}}
                  style={{borderRight: index%2 ? "6px #891a14 solid" : null,
                    marginBottom: index===timelines.length-1 ? "120px": null}}
                />
              </Row>
            )}    
            <Row className="justify-content-md-center">
              <div id="more">More</div>
            </Row>
          </Container>
        </Row>
      </Container>
    )
  }
}

export default AboutUs
