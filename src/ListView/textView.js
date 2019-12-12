import React, {Component} from 'react';
import {Image, Text, TouchableWithoutFeedback, View, StyleSheet, Alert} from "react-native";
import Theme from '../Theme/default'
import PropTypes from 'prop-types'


const styles = StyleSheet.create({
  container:{
    //justifyContent:"space-around",
    flexDirection:"row",
    alignItems:"center",
    height:Theme.CellHeight,
    //paddingHorizontal:Theme.paddingHorizontal
  },
  img:{
    width:20,
    height:20,
    marginLeft:5
  },
  imgView:{

  },
  text:{
    color:Theme.colorBlack,
    fontSize:Theme.fontSize,
  }
})
const img = require('./img/delete.png')

class TextView extends Component {

  static propTypes = {
    style:PropTypes.object,
    textStyle:PropTypes.object,
    imgStyle:PropTypes.object
  }

  setAlert = () => {
    if(!this.props.text){
      Alert.alert(
        '请先选择'+this.props.AlertTitle|| + '上一项'
      )
    }
  }


  render() {
    let {style,textStyle,imgStyle} = this.props
    return (
      <View style={[styles.container,{...style}]}>
        <TouchableWithoutFeedback onPress={this.setAlert}>
          <Text style={[styles.text,{...textStyle}]}>{this.props.text || this.props.placeholder}</Text>
        </TouchableWithoutFeedback>
        {
          this.props.del ?
            <TouchableWithoutFeedback onPress={this.props.setDelete}>
              <View style={[styles.imgView,{...imgStyle}]}>
                <Image source={img} style={styles.img} />
              </View>
            </TouchableWithoutFeedback> :null
        }
      </View>
    );
  }
}

export default TextView;
