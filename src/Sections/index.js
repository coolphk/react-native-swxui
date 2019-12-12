import React, {Component} from 'react';
import {Animated, StyleSheet, Text, TouchableWithoutFeedback, View, Easing, Image} from "react-native";
import Theme from "../Theme/default";
import {scaleSizeH, scaleSizeW} from '../Common/ScreenUtils'
import PropTypes from 'prop-types'

const leftLogo = require('.//img/titleImg.png')
const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colorWhite
  },
  font: {
    color: Theme.tabColor,
    fontSize: Theme.fontSize,
    lineHeight: 30
  },
  label: {
    flexDirection: "row",
    textAlign: "left",
    paddingVertical: Theme.paddingVertical,
    paddingHorizontal: Theme.paddingHorizontal,
    height: scaleSizeH(140),
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderStyle: "solid",
  },
  image: {
    width: scaleSizeW(18),
    height: scaleSizeH(36),
    transform: [{rotate: "0deg"}],
    position: "absolute",
    right: scaleSizeW(66) + scaleSizeW(9)
  },
  TouchableOpacity: {
    position: "absolute",
    right: 0
  },
  leftTitle: {
    width: 4,
    height: 10,
    backgroundColor: Theme.buttonActionColor,
    borderRadius: 10,
    marginRight: 5
  },
  leftLogoImg: {
    width: scaleSizeW(14),
    height: scaleSizeH(31),
    marginLeft: -scaleSizeW(19),
    marginRight: scaleSizeW(5)
  }
})


export default class Index extends Component {

  static defaultProps  = {
    collapsed : false,
    collapsible : false,
    title:"",
    hide : true,
    marginTop:0
  };

  static propTypes = {
    title:PropTypes.string,
    hide:PropTypes.bool,
    marginTop:PropTypes.number
  };

  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }

  /*
  * section选项卡展开隐藏
  * */
  setTransform = () => {
    this.spin();
    if (this.props.change) {
      this.props.change(this.props.collapsible,this.props.collapsed,this.props.title)
    }
  }
  /*
  * 动画效果
  * */
  spin = () => {
    Animated.timing(this.spinValue, {
      toValue: this.props.collapsed ? 0 : 1,
      duration: 200,
      easing: Easing.linear
    }).start()
  }

  /*
  * 旋转图片
  * */
  setSpin = (collapsible, spin) => {
    if (collapsible)
      return (
        <Animated.Image style={[styles.image, {transform: [{rotate: spin}]}]} source={require('./img/right.png')}/>
      )
  }


  render() {
    this.props.collapsed ? this.spinValue.setValue(1) : this.spinValue.setValue(0);

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],//输入值
      outputRange: ["0deg", "90deg"] //输出值
    })

    let style = () => {
      if(!this.props.showCard){
        return {
          marginTop:this.props.firstSection ? 0 : scaleSizeH(16)
        }
      }else{
        return {
          marginHorizontal: scaleSizeW(22),
          marginVertical:scaleSizeH(16),
          borderRadius: scaleSizeH(20),
          marginTop:this.props.marginTop
        }
      }
    }
    return (
       <View style={[styles.container,style()]}>
         {
           !this.props.hide && <TouchableWithoutFeedback onPress={this.setTransform}>
             <View style={styles.label}>

               <Image resizeMode="contain" source={leftLogo} style={styles.leftLogoImg}/>

               <Text style={styles.font}>{this.props.title}</Text>

               {
                 this.setSpin(this.props.collapsible, spin)
               }
             </View>
           </TouchableWithoutFeedback>
         }
        {
          this.props.children
        }
      </View>
    )
  }
}


