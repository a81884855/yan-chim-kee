import React, { Component } from "react";

class UploadImage extends Component {
  render() {
    return (
      <div className="form-group files">
        <input
          name={this.props.name}
          file={this.props.file}
          type="file"
          className="form-control"
          multiple=""
          onChange={this.props.onChangeHandler}
        />
      </div>
    );
  }
}

export default UploadImage;
