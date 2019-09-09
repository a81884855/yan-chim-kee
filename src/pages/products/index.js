import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

export class Products extends Component {
  constructor() {
    super();
    this.state = {
      productsList: []
    };
  }
  componentDidMount() {
    axios.get(`/api/products/list`).then(res =>
      this.setState({
        productsList: res.data
      })
    );
  }

  head() {
    return (
      <Helmet bodyAttributes={{ class: "products" }}>
        <title>Products - Yan Chim Kee</title>
      </Helmet>
    );
  }
  render() {
    const { productsList } = this.state;
    return (
      <div className="products">
        {this.head()}
        <Container>
          <h1>Products</h1>
          <Row className="productsContainer">
            <Col xs={12} sm={3} className="filter">
              <p>Filter</p>
            </Col>
            <Col xs={12} sm={9}>
              <Row>
                {productsList.map((product, index) => (
                  <ProductContainer key={index} product={product} />
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

class ProductContainer extends Component {
  constructor() {
    super();
    this.state = {
      hover: false
    };
  }

  render() {
    const { hover } = this.state;
    return (
      <Col xs={6} sm={3}>
        <Card id="product_desc">
          <Card.Img
            variant="top"
            className="productImage"
            onMouseEnter={() => this.setState({ hover: true })}
            onMouseLeave={() => this.setState({ hover: false })}
            src={
              hover
                ? `/images/products/${this.props.product.images[1]}`
                : `/images/products/${this.props.product.images[0]}`
            }
          />
          <Card.Body>
            <Card.Text>{this.props.product.name}</Card.Text>
            <Card.Text>${this.props.product.price}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Products;
