import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import defaultTheme from '../Theme/default';
import MImage from './MImage'
import BaseText from "./BaseText";

/**
 * 基础文本组件
 * 颜色由父级控制
 * 字体本级控制，使用全局变量设置
 **/

export default class extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {children} = this.props
    if (Array.isArray(children)) {
      return children.map((child, index) => {
        switch (child['type']) {
          case "image":
            let imgUri = child.url
            return (
              <View key={index} style={{
                alignItems: child.textAlign === 'right' ? 'flex-end' : 'flex-start',
                width: '100%'
              }}>
                <MImage imgUri={imgUri}></MImage>
              </View>
            )
          case "line":
            return (
              <View key={index} style={{
                ...styles.line
              }}>
                <Text></Text>
              </View>
            )
          case "text":
            const {
              value,
              fontWeight,
              warn,
              valueColor,
              textAlign
            } = child;
            return (
              <View key={index} style={{
                ...styles.lineWrapper,
                alignItems: textAlign === 'right' ? 'flex-end' : 'flex-start',
              }}>
                <BaseText
                  key={index}
                  fontWeight={fontWeight}
                  color={warn || valueColor ? defaultTheme.colorRed : defaultTheme.colorBlack}
                  textAlign={textAlign}
                  style={{width: '100%',}}
                >
                  {value}
                </BaseText>
              </View>
            )
          default:
            throw new Error("多行文本组件类型错误")
        }
      })
    }
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: defaultTheme.fontSize,
    lineHeight: defaultTheme.lineHeight
  },
  lineWrapper: {
    width: '100%',
    justifyContent: 'center',
  },
  line: {
    height: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: defaultTheme.colorLightGray3,
    marginVertical: defaultTheme.paddingVertical
  }
})
