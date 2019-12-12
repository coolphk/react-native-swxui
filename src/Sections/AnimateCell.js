import React, {Component} from 'react';
import {Animated, StyleSheet, Text, TouchableWithoutFeedback, View, Easing, Image} from "react-native";
import Theme from "../Theme/default";
import {scaleSizeH, scaleSizeW} from '../Common/ScreenUtils'

const leftLogo = require('.//img/titleImg.png')
const styles = StyleSheet.create({
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


class Cell extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  /*
  * section选项卡展开隐藏
  * */
  setTransform = () => {
    this.spin();
    if (this.props.setIndex) {
      this.props.setIndex()
    }
  }
  /*
  * 动画效果
  * */
  spin = () => {
    //val.collapsed ? this.spinValue.setValue(0) : this.spinValue.setValue(1);
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

    if (this.props.title) {
      return (
        <TouchableWithoutFeedback onPress={this.setTransform}>
          <View style={styles.label}>

            <Image source={leftLogo} style={styles.leftLogoImg}/>

            <Text style={styles.font}>{this.props.title}</Text>

            {this.setSpin(this.props.collapsible, spin)}

          </View>
        </TouchableWithoutFeedback>
      )
    } else {
      return (
        null
      )
    }
  }
}

export default Cell;
