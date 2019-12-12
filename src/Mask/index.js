import React from 'react'
import {View, StyleSheet, Animated, Easing} from 'react-native'
import {connect} from 'react-redux'
import { screenH,screenW} from '../Common/ScreenUtils'


const circle = require('./img/loading.png');
const box = require('./img/box.png')

const mapToProps = state => ({
  maskFlag: state.counter.maskFlag
})

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "120%",
    position: "absolute",
    top: 0,
    zIndex: 8888,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    position: 'absolute',
    top: (screenH/2) - 24,
    left: (screenW / 2) - 24,
    width: 48,
    height: 48
  },
  box: {
    top: (screenH/2) - 41.35,
    left: (screenW / 2) - 41.35,
    width: 82.7,
    height: 82.7
  }
})


class Mask extends React.Component {

  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0)
    this.state = {};
  }

  componentDidMount() {
    this.spin();
  }

  //旋转方法
  spin = () => {
    this.spinValue.setValue(0)
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    }).start(() => this.spin())
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.circle,{width:80,height:80,borderRadius:10,backgroundColor:"#f8f8f8",top: (screenH/2) - 40,
          left: (screenW / 2) - 40,}]} />

        {/*<Animated.Image style={[styles.circle,styles.box]} source={box}/>*/}
        <Animated.Image style={[styles.circle, {transform: [{rotate: spin}]}]} source={circle}/>
      </View>
    )
  }
}

export default connect(mapToProps)(Mask)
