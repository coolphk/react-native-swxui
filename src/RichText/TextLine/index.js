import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native'
import LineContainer from '../../BaseComponents/LineContainer'
import BaseText from '../../BaseComponents/BaseText'
import defaultTheme from '../../Theme/default'
import pt from "prop-types";
import {scaleSizeH, scaleSizeW} from "../../Common/ScreenUtils";

const leftLogo = require('../../Sections/img/titleImg.png')


/**
 * 文本-文本行组件
 * 两端均为文本，颜色由全局变量控制
 */
class TextLine extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <LineContainer
        row={true}
        bottomLine={this.props.bottomLine}
        titleFlag={this.props.titleFlag}
        lineWidth={this.props.lineWidth}
      >
        <View style={{
          flexDirection: 'row',
          flex: 1,
          maxWidth: this.props.maxLeftWidth || defaultTheme.lineLeftWidth
        }}>
          {/* {
            this.props.titleFlag && <Image source={leftLogo} style={{
              width: scaleSizeW(14),
              height: scaleSizeH(31),
              marginRight: scaleSizeW(5),
              marginLeft: -scaleSizeW(14)
            }}/>
          }*/}
          <BaseText
            color={this.props.titleColor ? defaultTheme.colorRed : defaultTheme.colorLightGray}
            fontWeight={this.props.fontWeight}
            textAlign={'left'}
            maxWidth={'100%'}
          >
            {this.props.title}
          </BaseText>
        </View>
        <BaseText
          color={this.props.valueColor ? defaultTheme.colorRed : defaultTheme.colorBlack}
          maxWidth={this.props.maxRightWidth || defaultTheme.lineRightWidth}
          fontWeight={this.props.fontWeight}
        >
          {this.props['value']}
        </BaseText>
      </LineContainer>
    )
  }
}

TextLine.propTypes = {
  //左侧小图标
  // titleFlag: pt.bool,
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
  // 底部下划线宽度true:为两侧有空白，false:通栏
  lineWidth: pt.bool,
  textAlign: pt.oneOf(['right', 'left'])
}

TextLine.defaultProps = {
  // titleFlag: false,
  title: "",
  value: "",
  titleColor: false,
  fontWeight: false,
  valueColor: false,
  bottomLine: true,
  maxLeftWidth: defaultTheme.lineLeftWidth,
  maxRightWidth: defaultTheme.lineRightWidth,
  lineWidth: false,
  textAlign: 'right'
}


export default TextLine;
