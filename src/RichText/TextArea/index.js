import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native'
import LineContainer from '../../BaseComponents/LineContainer'
import BaseText from '../../BaseComponents/BaseText'
import ImageText from '../../BaseComponents/ImageText'
import defaultTheme from '../../Theme/default'
import pt from 'prop-types'

/**
 * 文本-文本行组件
 * 两端均为文本，颜色由全局变量控制
 */
class TextArea extends Component {
  render() {
    const {
      title,
      value,
      bottomLine,
      row,
      maxLeftWidth,
      maxRightWidth,
      fontWeight,
      textAlign,
      lineWidth,
    } = this.props
    return (
      <LineContainer
        row={row}
        bottomLine={bottomLine}
        lineWidth={lineWidth}
        value={value}
      >
        <BaseText maxWidth={maxLeftWidth || defaultTheme.lineLeftWidth}
                  color={defaultTheme.colorLightGray}
                  fontWeight={fontWeight}
                  textAlign={textAlign}
        >
          {title}
        </BaseText>

        <View style={{
          width: '100%',
          //如果row=true，代表标题与值同一行，所以宽度采用lineRight,否则为100%
          maxWidth: row ? (maxRightWidth || defaultTheme.lineRightWidth) : '100%',
          alignItems: textAlign === 'right' ? 'flex-end' : textAlign === 'left' ? 'flex-start' : 'center',
        }}>
          <ImageText>
            {value}
          </ImageText>
        </View>
      </LineContainer>
    )
  }
}

TextArea.propTypes = {
  //左侧内容
  title: pt.string,
  //右侧内容，此处如果是数组，则转换为多行文本
  value: pt.oneOfType([pt.string, pt.array]),
  //左侧标题是否带颜色
  titleColor: pt.bool,
  //内容是否为粗体
  fontWeight: pt.bool,
  // 内容是否带颜色
  valueColor: pt.bool,
  // 是否带下划线
  bottomLine: pt.bool,
  // 左侧标题宽度
  maxLeftWidth: pt.string,
  // 右侧内容宽度
  maxRightWidth: pt.string,
  // 底部下划线宽度true为通栏，false为两侧有空白
  lineWidth: pt.bool,
  // 文本文件布局，true布局方向为row,否则为column
  row: pt.bool,
  // 文本对齐方式
  textAlign: pt.oneOf(['left', 'right', 'center'])
}

TextArea.defaultProps = {
  title: "",
  value: "",
  titleColor: false,
  fontWeight: false,
  valueColor: false,
  bottomLine: true,
  maxLeftWidth: defaultTheme.lineLeftWidth,
  maxRightWidth: defaultTheme.lineRightWidth,
  lineWidth: false,
  row: false,
  textAlign: "left"
}

export default TextArea;
