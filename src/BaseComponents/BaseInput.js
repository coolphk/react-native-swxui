import React, {Component} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import defaultTheme from '../Theme/default';
import pt from "prop-types";

export default class BaseInput extends Component {
  constructor(props) {
    super(props)
    let keyboardType
    switch (this.props.check) {
      case "number":
        keyboardType = 'numeric'
        break;
      case "phone":
        keyboardType = 'phone-pad'
        break;
      case "email":
        keyboardType = 'email-address'
        break;
      default:
        keyboardType = 'default'
        break;
    }

    this.state = {
      placeholder: this.props.placeholder,
      required: this.props.required,
      numberOfLines: this.props.numberOfLines,
      id: this.props.id,
      textAlign: this.props.textAlign
    }
  }


  render() {
    return (
      <TextInput
        style={[
          styles.input,
          {width: this.props.width},
        ]}
        {...this.state}
        multiline={this.props.multiline}
        onChangeText={(text) => this.props.onChangeText(text)}
      >
        {this.props.value}
      </TextInput>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: defaultTheme.fontSize,
    padding: 0,
    textAlignVertical: 'top',
    marginTop: 5
  }
});

BaseInput.propTypes = {
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
  //文本对齐方式
  textAlign: pt.oneOf(['right', 'left']),
}

BaseInput.defaultProps = {
  check: 'all',
  placeholder: '',
  required: true,
  numberOfLines: 1,
  id: "",
  textAlign: 'right'
}
