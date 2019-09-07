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

export class TimeLine extends Component {
  constructor() {
    super();
    this.state = {
      image: "",
      year: "",
      chineseContent: "",
      englishContent: "",
      fileList: [],
      editMode: false
    };
    this.deleteFile = this.deleteFile.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.fileChangeHandler = this.fileChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/timeline/list`).then(res =>
      this.setState({
        fileList: res.data
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
    let { image, year, chineseContent, englishContent } = this.state;
    axios
      .post("/api/timeline/info", {
        image,
        year,
        chineseContent,
        englishContent
      })
      .then(() => {
        this.fileUpload();
      })
      .catch(err => {
        throw err;
      });
  }

  fileUpload() {
    const data = new FormData();
    const { file } = this.state;
    data.append("selectedFile", file);
    axios
      .post(`/api/timeline/images`, data)
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        window.location.reload();
      });
  }

  fileChangeHandler(e) {
    const file = e.target.files[0];
    this.setState({
      file: file,
      image: file.name
    });
  }

  deleteFile(e) {
    axios
      .delete(`/api/timeline/${e.target.name}`)
      .then(() => this.componentDidMount())
      .catch(err => {
        throw err;
      });
  }

  render() {
    const { fileList } = this.state;
    return (
      <Container>
        <Row>
          <Col lg={5} xs={5}>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="form.ControlImage">
                    <UploadImage onChangeHandler={this.fileChangeHandler} />
                  </Form.Group>
                  <Form.Group controlId="form.ControlYear">
                    <Form.Control
                      onChange={this.onChangeHandler}
                      type="text"
                      placeholder="Year"
                      name="year"
                    />
                  </Form.Group>
                  <Form.Group controlId="form.ControlTextarea1">
                    <Form.Label>Chinese Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      onChange={this.onChangeHandler}
                      rows="5"
                      name="chineseContent"
                    />
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Col sm={{ span: 12, offset: 5 }}>
                      <Button
                        type="submit"
                        size="lg"
                        onClick={this.submitHandler}
                      >
                        Submit
                      </Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={7} xs={7}>
            <div style={{ height: "490px", overflow: "scroll" }}>
              {fileList.map((file, index) => (
                <div key={index} style={{ display: "flex" }}>
                  <Image
                    src={`/images/timeline/${file.image}`}
                    style={{ width: "200px" }}
                    thumbnail
                  />
                  <div
                    style={{
                      height: "192px",
                      display: "table",
                      margin: "10px 0 0 10px"
                    }}
                  >
                    <h4>Year: {file.year}</h4>
                    <h4>Chinese: </h4>
                    <p>{file.chineseContent}</p>
                    <div
                      style={{
                        display: "table",
                        marginTop: "20px"
                      }}
                    >
                      <Button
                        variant="primary"
                        onClick={() => {
                          this.props.history.push(
                            `/admin/timeline/edit/${file._id}`
                          );
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        name={file.image}
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

export default withAuth(session => session && session.getCurrentUser)(TimeLine);
