import React, {Component} from 'react'
import {Image, Text, TouchableHighlight, View} from 'react-native'
import PropTypes from 'prop-types'
import defaltTheme from '../Theme/default'



/*
* 自定义buttons
*
* */


export default class Buttons extends Component {
  static defaultProps = {
    disabled:false,
    showUnderlay:false,
    showImg:false,
    text:"按钮名称"
  };
  static propTypes = {
    style: PropTypes.object,
    text: PropTypes.string.isRequired,
    //用于给残障人士显示的文本
    accessibilityLabel: PropTypes.string,
    disabled:PropTypes.bool,
    showUnderlay:PropTypes.bool,
    onPress:PropTypes.func.isRequired,
    underlayColor:PropTypes.string,
    fontSize:PropTypes.number,
    showImg:PropTypes.bool
  }


  render() {
    let {style, text, accessibilityLabel,textStyle} = this.props

    return (
      <TouchableHighlight
        activeOpacity={this.props.showUnderlay ? 0.85 : 1}
        onPress={this.props.onPress}
        underlayColor={this.props.underlayColor || defaltTheme.newColor}
        number={0}
        style={{borderRadius: 25,overflow:"scroll"}}
        disabled={this.props.disabled}
      >
        <View style={{...style}}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={2}
            style={{textAlign: "center", color: this.props.disabled ? "#a3a9a5" : "#8D8D8D" , fontSize: this.props.fontSize || defaltTheme.fontSize, ...textStyle}}
            accessibilityLabel={accessibilityLabel}
          >
            {text}
          </Text>

          {
            this.props.showImg && <Image source={this.props.source} style={{width: 20, height: 20}}/>
          }
        </View>

      </TouchableHighlight>
    )
  }
}
