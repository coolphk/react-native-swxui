import React, {Component} from 'react';
import {BaseInput, BaseText, LineContainer} from '../BaseComponents'
import defaultTheme from '../Theme/default'
import pt from 'prop-types'

/**
 * 文本-文本行组件
 * 两端均为文本，颜色由全局变量控制
 */
class InputLine extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      title,
      value,
      check,
      placeholder,
      required,
      id,
      textAlign,
      onChangeText
    } = this.props
    return (
      <LineContainer row bottomLine={this.props.bottomLine}>
        <BaseText color={defaultTheme.colorLightGray}>
          {title}
        </BaseText>
        <BaseInput
          onChangeText={onChangeText}
          textAlign={textAlign}
          check={check}
          placeholder={placeholder}
          required={required}
          value={value}
          id={id}
          width={defaultTheme.lineRightWidth}
        />
      </LineContainer>
    );
  }
}

InputLine.propTypes = {
  //输入框标题
  title: pt.string,
  //默认值
  value: pt.string,
  //校验、键盘类型
  check: pt.oneOf(['number', 'phone', 'email', 'all']),
  //文本框默认提示
  placeholder: pt.string,
  //是否必填
  required: pt.bool,
  //ID,如果ID为空，提交时需要忽略
  id: pt.string,
  //输入时触发函数
  onChangeText: pt.func,
  numberOfLines: pt.number,
  textAlign: pt.oneOf(['right', 'left'])
}

InputLine.defaultProps = {
  check: 'all',
  required: true,
  numberOfLines: 1,
  textAlign: 'right'
}

export default InputLine
