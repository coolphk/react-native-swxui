import React, {Component} from 'react';
import {BaseInput, BaseText, LineContainer} from '../BaseComponents'
import defaultTheme from '../Theme/default'
import pt from "prop-types";

/**
 * 文本-文本行组件
 * 两端均为文本
 */
class InputArea extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      bottomLine,
      title,
      value,
      textAlign,
      numberOfLines,
      onChangeText,
      check,
      placeholder,
      required,
      row
    } = this.props
    return (
      <LineContainer bottomLine={bottomLine} row={row}>
        {
          title ? <BaseText color={defaultTheme.colorLightGray}>
            {title}
          </BaseText> : null
        }

        <BaseInput
          textAlign={textAlign}
          width={'100%'}
          value={value}
          onChangeText={onChangeText}
          check={check}
          placeholder={placeholder}
          required={required}
          numberOfLines={numberOfLines}
          multiline={true}
        />
      </LineContainer>
    );
  }
}

InputArea.propTypes = {
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
  //多行文本行数
  numberOfLines: pt.number,
  //ID,如果ID为空，提交时需要忽略
  id: pt.string,
  //内容对齐方式
  textAlign: pt.oneOf(['left', 'right']),
  //输入时触发函数
  onChangeText: pt.func,
  // 文本文件布局，true布局方向为row,否则为column
  row: pt.bool,
}

InputArea.defaultProps = {
  check: 'all',
  required: true,
  textAlign: 'left',
  row: false
}


export default InputArea
