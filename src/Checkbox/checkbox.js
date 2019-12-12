import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import React from "react";
import PropTypes from 'prop-types'
const img = {
  blur: require("./img/out.png"),
  focus: require("./img/check.png")
}
import Theme from '../Theme/default'

const styles = StyleSheet.create({

  text:{
    //paddingLeft:Theme.paddingHorizontal,
    fontSize:Theme.fontSize,
    color:"#000",
    width:"80%"
  },
  img:{
    width:20,
    height:20
  },
})




class checkbox extends React.Component {

  static propTypes = {
    style:PropTypes.object,
  }

  render(){
    let {style} = this.props
    const checked = this.props.checked ? img.focus : img.blur;
    return (
      <TouchableWithoutFeedback onPress={this.props.setValue}>
        <View style={{flex:1,paddingVertical:5}}>
          <View style={{
            flex:1,
            alignItems:"center",
            flexDirection:"row",
            ...style}}
          >
            {
              this.props.multiselect && <Image source={checked} style={styles.img}/>
            }
            <Text style={[styles.text,{paddingLeft:this.props.multiselect ? 10 : 0}]}>{this.props.text || null}</Text>
          </View>
          {
            this.props.underline
          }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default checkbox
