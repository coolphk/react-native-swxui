import React, {Component} from 'react';
import {Image, ImageBackground, TouchableOpacity, View,StyleSheet} from "react-native";
import Theme from "../Theme/default";

const styles = StyleSheet.create({
  ImageBackground: {
    alignItems: "center",
    justifyContent: 'center',
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 5,
    paddingRight: 5,
    opacity: 0.3,
    height:Theme.CellHeight
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    top: 0,
    zIndex: 9999,
    flex: 1
  },
  left:{
    left: 0
  },
  right:{
    right:0
  },
  Image:{
    width:20,
    height:20
  }
})

/*
* right 又定位
* source 箭头图片
* backgroundImage 背景图片
* clickToScroll 滚轮事件
* */

class TabScrollButton extends Component {
  render() {
    return (
      <View style={[styles.scrollView,this.props.right ? styles.right : styles.left]}>
        <TouchableOpacity onPress={()=>this.props.clickToScroll()} activeOpacity={1}>
          <ImageBackground source={this.props.backgroundImage} style={styles.ImageBackground}>
            <Image source={this.props.source} style={styles.Image}/>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}

export default TabScrollButton;
