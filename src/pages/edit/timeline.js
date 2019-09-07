import React, { Component } from "react";
import withAuth from "../../hoc/withAuth";
import axios from "axios";
import {
  Container,
  Image,
  Form,
  Button,
  Row,
  Col,
  Card
} from "react-bootstrap";
import UploadImage from "../../helper/uploadImage";

export class TimelineEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      year: "",
      chineseContent: "",
      englishContent: "",
      imageChanged: false
    };
    this.fileUpload = this.fileUpload.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.fileChangeHandler = this.fileChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/timeline/info/${this.props.match.params.id}`).then(res => {
      const { image, year, chineseContent } = res.data;
      this.setState({
        image,
        year,
        chineseContent
      });
    });
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitHandler() {
    event.preventDefault();
    let { image, year, chineseContent, imageChanged } = this.state;
    axios
      .put(`/api/timeline/edit/${this.props.match.params.id}`, {
        image,
        year,
        chineseContent
      })
      .then(() => {
        if (imageChanged) {
          this.fileUpload();
        } else {
          this.props.history.push("/timeline");
        }
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
        this.props.history.push("/timeline");
      })
      .catch(() => {
        window.location.reload();
      });
  }

  fileChangeHandler(e) {
    const file = e.target.files[0];
    this.setState({
      file: file,
      image: file.name,
      imageChanged: true
    });
  }
  render() {
    const { image, year, chineseContent } = this.state;
    return (
      <Container>
        <Button onClick={() => this.props.history.push("/admin/timeline")}>
          Back
        </Button>
        <Row className="justify-content-md-center">
          <Col md={10} lg={6}>
            <Card>
              <Card.Body>
                <Form>
                  <Image
                    src={`/images/timeline/${image}`}
                    style={{
                      width: "200px",
                      display: "block",
                      margin: "0 auto 20px"
                    }}
                  />
                  <Form.Group controlId="form.ControlImage">
                    <UploadImage onChangeHandler={this.fileChangeHandler} />
                  </Form.Group>
                  <Form.Group controlId="form.ControlYear">
                    <Form.Control
                      value={year}
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
                      value={chineseContent}
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
        </Row>
      </Container>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  TimelineEdit
);
