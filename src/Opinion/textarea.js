import React, {Component} from 'react';
import { TextInput , StyleSheet , Text} from "react-native";
import Theme from '../Theme/default'
import {scaleSizeH} from '../Common/ScreenUtils'

const styles = StyleSheet.create({
  input:{
    //padding:Theme.paddingHorizontal,
    fontSize:Theme.fontSize,
    height:scaleSizeH(310),
    lineHeight:Theme.lineHeight
    //paddingVertical: Theme.paddingVertical
  },
})



class Textarea extends Component {
  render() {
    return (
      <TextInput
        onChangeText={text=>this.props.onChangeText(text)}
        multiline
        placeholder={this.props.placeholder}
        style={styles.input}
        ref='opinions'
      >
        {this.props.value}
      </TextInput>
    )
  }
}

export default Textarea;
