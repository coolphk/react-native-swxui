import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Theme from "../Theme/default";
import {scaleSizeH} from '../Common/ScreenUtils'
import PropTypes from 'prop-types'
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"row",
    alignItems:"flex-start",
    paddingVertical:scaleSizeH(15),
    paddingRight:Theme.paddingHorizontal
  },
  img:{
    width:20,
    height:20,
    marginTop:5
  },
  text:{
    color:"#fd694d",
    fontSize:Theme.fontSize,
    lineHeight:30,
    marginLeft:-20
  }
})


class File extends Component {

  static propTypes = {
    onPress:PropTypes.func.isRequired,
    text:PropTypes.string.isRequired,
    img:PropTypes.number
  }


  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.container}>
          <Image source={this.props.img || require('./img/default.png')} style={styles.img} />
          <Text style={styles.text}>&emsp;  {this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default File;
