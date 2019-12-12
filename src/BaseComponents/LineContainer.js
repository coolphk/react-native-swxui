import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import defaultTheme from '../Theme/default'
import {scaleSizeH} from "../Common/ScreenUtils";
import pt from "prop-types";


class LineContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      row,
      bottomLine,
      lineWidth,
      children,
      alignItems
    } = this.props
    return (
      <View
        style={{
          width: '100%',
          paddingHorizontal: defaultTheme.paddingHorizontal,
          // marginTop: titleFlag ? scaleSizeH(20) : 0,
        }}>
        <View style={
          [
            row ? {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: alignItems
              } :
              {
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: alignItems
              },
            {
              width: '100%',
              paddingVertical: defaultTheme.paddingVertical
            },
            //如果有图标，则把高度设定为140,
            /*titleFlag ? {
              height: scaleSizeH(140),
              alignItems: 'flex-start'
            } : null,*/
          ]
        }>
          {children}
        </View>
        {/*分割线*/}
        <View style={{
          display: bottomLine ? 'flex' : 'none',
          backgroundColor: '#eee',
          height: 1,
          alignSelf: 'center',
          // width: (titleFlag || !lineWidth) ? '140%' : '100%',
          width: !lineWidth ? '140%' : '100%',
        }}/>

      </View>
    )
  }
}

LineContainer.propTypes = {
  //布局方式 true为行方向，false为列方向
  row: pt.bool,
  //是否带有标题图标
  // titleFlag: pt.bool,
  bottomLine: pt.bool,
  //底部横线长度，true:有间隔 false:通栏
  lineWidth: pt.bool,
  alignItems: pt.string
}

LineContainer.defaultProps = {
  row: true,
  // titleFlag: false,
  bottomLine: false,
  lineWidth: false,
  alignItems: 'flex-start'
}
export default LineContainer;
