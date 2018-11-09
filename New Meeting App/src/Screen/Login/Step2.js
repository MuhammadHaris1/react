import React, { Component } from 'react';
import ReactDropzone from "react-dropzone";
import Button from '@material-ui/core/Button/Button';
import firebase from '../../Config/Firebase'
import { FusionTablesLayer } from 'react-google-maps';
import { CircularProgress } from "@material-ui/core";

class LoginStep2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image1: [],
      image2: [],
      image3: [],
      file1: {},
      file2: {},
      file3: {},
      url1: '',
      url2: '',
      url3: '',
    }
    this.onImg1 = this.onImg1.bind(this)
    this.onImg2 = this.onImg2.bind(this)
    this.onImg3 = this.onImg3.bind(this)
  }

  componentWillUnmount() {
    const { url1, url2, url3 } = this.state  
    const { imagesUrl } = this.props
    imagesUrl(url1, url2, url3)
  }

  onImg2(files) {
    // POST to a test endpoint for demo purposes
    const task = firebase.storage().ref(`/images/${firebase.auth().currentUser.uid}/${files[0].name}`).put(files[0])
    task.on('state_changed',
      (snap) => {

      },
      (error) => {
        console.log(error)
      },
      () => {
        firebase.storage().ref(`images/${firebase.auth().currentUser.uid}/`).child(files[0].name).getDownloadURL().then((url) => {
          console.log(url)
          this.setState({ url2: url})
        })
        .catch((err) => console.log(err))
      }
    )
    const image2 = files
    this.setState({ image2, file2: files[0] })
  }

  onImg3(files) {
    // POST to a test endpoint for demo purposes
    const task = firebase.storage().ref(`/images/${firebase.auth().currentUser.uid}/${files[0].name}`).put(files[0])
    task.on('state_changed',
      (snap) => {

      },
      (error) => {
        console.log(error)
      },
      () => {
        firebase.storage().ref(`images/${firebase.auth().currentUser.uid}/`).child(files[0].name).getDownloadURL().then((url) => {
          console.log(url)
          this.setState({ url3: url})
        })
        .catch((err) => console.log(err))
      }
    )
    const image3 = files
    this.setState({ image3, file3: files[0] })
  }

  onImg1(files) {
    // const {file1} = this.state
    // POST to a test endpoint for demo purposes
    const task = firebase.storage().ref(`/images/${firebase.auth().currentUser.uid}/${files[0].name}`).put(files[0])
    task.on('state_changed',
      (snap) => {

      },
      (error) => {
        console.log(error)
      },
      () => {
        firebase.storage().ref(`images/${firebase.auth().currentUser.uid}/`).child(files[0].name).getDownloadURL().then((url) => {
          console.log(url);
          this.setState({ url1: url})
        })
        .catch((err) => console.log(err))
      }
    )

    const image1 = files
    this.setState({ image1, file1: files[0] })
  }

  render() {
    const { renderStep3 } = this.props
    const { image1, image2, image3, url1, url2, url3 } = this.state;
    const previewStyle = {
      display: 'inline',
      width: 200,
      height: 200,
    };
    return (
      <div>
        <center>
          <ReactDropzone
            onDrop={this.onImg1}
            multiple={false}
            accept={['.jpg', '.png', 'jpeg']}
          >
            {image1.map((value) => {
              return <img
                alt="Preview"
                key={value.preview}
                src={value.preview}
                style={previewStyle}
              />
            })}
            { !image1 && <p>Drop your image here!</p>}
          </ReactDropzone>
          <ReactDropzone
            onDrop={this.onImg2}
            multiple={false}
            accept={['.jpg', '.png', 'jpeg']}
          >
            {image2.map((value) => {
              return <img
                alt="Preview"
                key={value.preview}
                src={value.preview}
                style={previewStyle}
              />
            })}
            { !image2 && <p>Drop your image here!</p>}
          </ReactDropzone>
          <ReactDropzone
            onDrop={this.onImg3}
            multiple={false}
            accept={['.jpg', '.png', 'jpeg']}
          >
            {image3.map((value) => {
              return <img
                alt="Preview"
                key={value.preview}
                src={value.preview}
                style={previewStyle}
              />
            })}
           { !image3 && <p>Drop your image here!</p>}
          </ReactDropzone>
          { (url1 && url2 && url3) ? <Button onClick={renderStep3} >Next</Button>: <div><CircularProgress /><Button disabled>Next</Button></div>}
        </center>
      </div>
    );
  }
}

export default LoginStep2
