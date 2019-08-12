import React, { Component } from 'react'
import axios from 'axios';

class UploadImage extends Component {
  constructor(props){
    super(props);
    this.state={}
    this.fileUpload = this.fileUpload.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  fileUpload(){
    const data = new FormData();
    const { file } = this.state;
    data.append('selectedFile', file);
    axios.post(`/api/images/upload/${this.props.folderName}`, data)
      .then(() => this.props.refresh())
      .catch((err) => {throw err})
  }

  onChangeHandler(e){
    this.setState({
      file: e.target.files[0]
    })
  }

  render() {
    return (
      <div className="form-group files">
        <input type="file" className="form-control" multiple="" onChange={this.onChangeHandler}/>
        <button onClick={this.fileUpload} style={{ float: 'right'}}>Upload</button>
      </div>
    )
  }
}

export default UploadImage