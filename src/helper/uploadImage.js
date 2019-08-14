import React, { Component } from 'react'

class UploadImage extends Component {
  render() {
    return (
      <div className="form-group files">
        <input type="file" className="form-control" multiple="" onChange={this.props.onChangeHandler}/>
      </div>
    )
  }
}

export default UploadImage