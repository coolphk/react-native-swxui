import React, {Component} from 'react';
import {TouchableWithoutFeedback, Image} from 'react-native'

class ToggleButton extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <Image style={{width: 20, height: 20}} source={this.props.expended ? require('./img/subtraction.png') : require('./img/plus.png')} />
      </TouchableWithoutFeedback>
    );
  }
}

export default ToggleButton;
