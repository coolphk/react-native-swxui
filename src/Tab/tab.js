import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {screenW} from "../Common/ScreenUtils";
import Theme from "../Theme/default";
import {scaleSizeH,setSpText} from '../Common/ScreenUtils'

const tabStyle = StyleSheet.create({
  text: {
    color: Theme.tabColor,
    fontSize: Theme.fontSize,
    textAlign: "center",
  },
  line: {
    height: scaleSizeH(2.7),
    width: 40,
    // borderRadius: scaleSizeH(10),
  },
  activeLine:{
    backgroundColor: Theme.newColor,
    borderRadius: scaleSizeH(10),
  },
  active: {
    color: "#000000"
  },
  button: {
    alignItems:"center",
    justifyContent:"center",
    width: screenW / 4
  }
});

class Tab extends React.Component{

  render(){
    return (
      <TouchableOpacity style={[tabStyle.button,{width:screenW / this.props.touchWidth}]} activeOpacity={1} onPress={this.props.setIndex}>
        <Text style={[
          tabStyle.text,
          this.props.checked ? tabStyle.active : null ,
          this.props.text.length > 5 ? {fontSize:setSpText(40)} :null
        ]}>
          {this.props.text}
        </Text>
        <View style={[tabStyle.line,this.props.checked ? tabStyle.activeLine : null, {width: this.props.width || 100}]}/>
      </TouchableOpacity>
    )
  }
}

export default Tab
