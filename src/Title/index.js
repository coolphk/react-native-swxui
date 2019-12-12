import React from 'react';
import {View,Text,StyleSheet} from 'react-native'
import Theme from '../Theme/default'
import {setSpText} from '../Common/ScreenUtils'
import PropTypes from 'prop-types'
import StaticFun from '../StaticFun'
const styles = StyleSheet.create({
  container:{
    flex:1,
    //backgroundColor:'#fff',
    alignContent:"center",
    justifyContent:"center",
    paddingHorizontal:Theme.paddingHorizontal,
    paddingVertical:Theme.paddingVertical
  },
  text:{
    textAlign: "center",
    fontSize:setSpText(65),
    color:Theme.newColor,
    //fontFamily:"王羲之书法字体",
    //fontWeight:"500"
  },
  line:{
    height:1,
    backgroundColor:Theme.newColor,
    marginTop:10
  }
})

export default class Index extends React.Component {
  static defaultProps = {
    value:""
  };
  static propTypes = {
    value:PropTypes.string.isRequired
  };



  render() {
    let fontFamily = StaticFun.setFontFamily()
    return (
      <View style={styles.container}>

        <Text style={[styles.text,fontFamily]}>{this.props.value}</Text>

        <View style={styles.line} />

      </View>
    );
  }
}

