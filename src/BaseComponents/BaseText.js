import React, {Component} from 'react';
import {StyleSheet, Text,Platform} from 'react-native';
import defaultTheme from '../Theme/default';
import pt from "prop-types";

/**
 * 基础文本组件
 **/
class BaseText extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      color,
      maxWidth,
      fontWeight,
      textAlign,
      children
    } = this.props
    return (
      <Text
        style={
          [
            styles.text,
            {color: color},
            {textAlign: textAlign},
            {maxWidth: maxWidth},
            {fontWeight: fontWeight ? '900' : "normal"},
            //{fontFamily:'fzssjw' }
          ]
        }
      >
        {children}
      </Text>
    )
  }
}


const styles = StyleSheet.create({
  text: {
    fontSize: defaultTheme.fontSize,
    lineHeight: defaultTheme.lineHeight,
  }
})

BaseText.propTypes = {
  //字体颜色
  color: pt.string,
  // 文本对齐方式
  textAlign: pt.oneOf(['left', 'right', 'center']),
  //内容是否为粗体
  fontWeight: pt.bool,
  //最大宽度 百分比字符串
  maxWidth: pt.string
}

BaseText.defaultProps = {
  color: defaultTheme.colorBlack,
  textAlign: 'right',
  fontWight: false,
  maxWidth: '100%'
}

export default BaseText;
