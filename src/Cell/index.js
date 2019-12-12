import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native";
import Theme from "../Theme/default";
import {screenW} from "../Common/ScreenUtils";
import PropTypes from 'prop-types'
const styles = StyleSheet.create({
  View:{
    flexDirection:"row",
    justifyContent:"space-between",
    textAlign: "center",
    //paddingLeft:10,
    borderStyle:"solid",
    borderBottomWidth:0.5,
    borderBottomColor:Theme.colorLightGray3,
    //paddingBottom:10,
    alignItems:"center",
    paddingHorizontal:Theme.paddingHorizontal,
    //paddingVertical:Theme.paddingVertical,
    height:Theme.CellHeight,

  },
  text: {
    fontSize: Theme.fontSize,
    //lineHeight: 30,
    color:Theme.colorLightGray,
    maxWidth:screenW/2
  }
})
class Cell extends Component {

  static propTypes = {
    style:PropTypes.object,
    title:PropTypes.string
  };
  static defaultProps = {
    title:'',
    style:{}
  }

  render() {
    return (
      <View style={[styles.View,{...this.props.style}]}>
        <Text style={styles.text}>{this.props.title}</Text>
        {this.props.children}
      </View>
    );
  }
}

export default Cell;
