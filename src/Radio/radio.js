import React, {Component} from 'react';
import {Image, Text, TouchableWithoutFeedback, View,StyleSheet} from 'react-native';
import Theme from '../Theme/default'


const img = {
  blur:require("./img/blur.png"),
  focus:require("./img/focus.png")
}

const styles = StyleSheet.create({
  container:{
    flex:1,

    paddingHorizontal:Theme.paddingHorizontal
  },
  inner:{
    borderBottomWidth:0.5,
    borderStyle:"solid",
    borderBottomColor:"#B8B8B8",
    flexDirection:"row",
    justifyContent:"flex-start",
    flex:1,
    alignItems: "center",
    paddingVertical:Theme.paddingVertical
  },
  text:{
    paddingLeft:10,
    fontSize:Theme.fontSize,
    color:"#000",
    lineHeight:Theme.lineHeight
  },
  img:{
    width:20,
    height:20
  },
})


class Radio extends Component {



  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.setValue}>
        <View style={styles.container}>
          <View style={styles.inner}>
            <Image source={this.props.checked ? img.focus : img.blur} style={styles.img}  />
            <Text style={styles.text}>{this.props.text || null}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Radio;
