import React, {Component} from 'react';
import {View, Image, Dimensions} from 'react-native'
import store from "../State/store";
import {screenW} from "../Common/ScreenUtils";

const header = {"Cookie": store.getState().cookies}

class MImage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      width: 50,
      height: 50
    }
    // Image.getSize(this.props.imgUri)
    Image.getSize(this.props.imgUri, (width, height) => {
      let windowWidth = screenW;
      if (width > windowWidth) {
        let scale = width / windowWidth;
        this.setState({
          width: width / scale,
          height: height / scale
        })
      } else {
        this.setState({
          width: width,
          height: height
        })
      }
    }, (error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <Image style={{maxWidth: '100%', width: this.state.width, height: this.state.height}}
             source={{uri: this.props.imgUri, headers: header}}
      ></Image>
    );
  }
}

export default MImage;
