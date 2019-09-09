import React, { Component } from "react";
import UploadImage from "../../helper/uploadImage";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Image
} from "react-bootstrap";
import withAuth from "../../hoc/withAuth";

export class Products extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      name: "",
      price: "",
      productsList: [],
      editMode: false
    };
    this.deleteFile = this.deleteFile.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.fileChangeHandler = this.fileChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.EditInfo = this.EditInfo.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/products/list`).then(res =>
      this.setState({
        productsList: res.data
      })
    );
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitHandler() {
    event.preventDefault();
    let { images, name, price } = this.state;
    axios
      .post("/api/products/info", {
        images,
        name,
        price
      })
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        throw err;
      });
  }

  fileUpload() {
    const { file, images } = this.state;
    const data = new FormData();
    data.append("selectedFile", file);
    axios
      .post(`/api/products/images`, data)
      .then(() => {
        images.push(file.name);
        this.setState({
          images: images
        });
        // console.log("success", this.state.images);
      })
      .catch(err => {
        // window.location.reload();
        throw err;
      });
  }

  fileChangeHandler(e) {
    const file = e.target.files[0];
    this.setState({
      file: file
    });
  }

  deleteFile(e) {
    axios
      .delete(`/api/products/product/${e.target.id}`)
      .then(() => this.componentDidMount())
      .catch(err => {
        throw err;
      });
  }

  EditInfo(e) {
    axios.get(`/api/products/info/${e.target.id}`).then(res => {
      const { name, price, images, _id } = res.data;
      this.setState({
        editMode: true,
        name,
        price,
        images,
        _id
      });
    });
  }

  updateInfo() {
    event.preventDefault();
    const { images, name, price, _id } = this.state;
    axios
      .put(`/api/products/edit/product/${_id}`, {
        images,
        name,
        price
      })
      .then(() => window.location.reload())
      .catch(err => {
        throw err;
      });
  }

  deleteImage(e) {
    const { images, _id } = this.state;
    images.splice(e.target.id, 1);
    axios
      .put(`/api/products/edit/image/${_id}/${e.target.id}`, {
        images
      })
      .then(() => this.componentDidMount())
      .catch(err => {
        throw err;
      });
  }

  render() {
    const { productsList, images, editMode, price, name } = this.state;
    return (
      <Container className="productsAdmin">
        <Row>
          <Col lg={6} md={10}>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="form.ControlImage">
                    <UploadImage
                      name="image"
                      onChangeHandler={this.fileChangeHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId="form.ControlAddImage">
                    <Button
                      variant="success"
                      size="lg"
                      onClick={this.fileUpload}
                      block
                    >
                      Add
                    </Button>
                  </Form.Group>
                  <Form.Group controlId="form.ControlImages">
                    <Row>
                      {images.map((image, index) => (
                        <Col key={image} md={3}>
                          <Image src={`/images/products/${image}`} thumbnail />
                          <Button
                            size="lg"
                            variant="danger"
                            id={index}
                            onClick={this.deleteImage}
                            block
                          >
                            Delete
                          </Button>
                        </Col>
                      ))}
                    </Row>
                  </Form.Group>
                  <Form.Group controlId="form.ControlPrice">
                    <Form.Control
                      onChange={this.onChangeHandler}
                      type="text"
                      placeholder="Product Name"
                      name="name"
                      value={name}
                    />
                  </Form.Group>
                  <Form.Group controlId="form.ControlPrice">
                    <Form.Control
                      onChange={this.onChangeHandler}
                      type="text"
                      placeholder="Price"
                      name="price"
                      value={price}
                    />
                  </Form.Group>
                  {editMode ? (
                    <Button
                      type="submit"
                      size="lg"
                      onClick={this.updateInfo}
                      block
                    >
                      Update
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="lg"
                      onClick={this.submitHandler}
                      block
                    >
                      Submit
                    </Button>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} md={10}>
            <div className="productsInfo">
              {productsList.map(product => (
                <div key={product._id} className="productInfo">
                  <div className="images">
                    {product.images.map(image => (
                      <Col key={image} md={3}>
                        <Image src={`/images/products/${image}`} thumbnail />
                      </Col>
                    ))}
                  </div>
                  <div className="info">
                    <div className="descr">
                      <p>Product: {product.name}</p>
                      <p>Price: ${product.price}</p>
                    </div>
                    <div
                      style={{
                        display: "table-footer-group",
                        verticalAlign: "bottom"
                      }}
                    >
                      <Button
                        variant="primary"
                        id={product._id}
                        onClick={this.EditInfo}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        id={product._id}
                        onClick={this.deleteFile}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(Products);
