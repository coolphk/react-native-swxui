import React, {Component} from 'react';
import {Animated, Easing, PanResponder,  StatusBar, Platform} from "react-native";
import {scaleSizeH} from "../Common/ScreenUtils";
import Theme from '../Theme/default'
import Static from './static'

class Suspend extends Component {

  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0)
    this.state = {
      left: Static.positions.left,
      top: Static.positions.top,
      spinFlag: false,
      footHeight: scaleSizeH(140),
      move: false
    }
  }

  /*
  * 移动开始
  * @params 综合事件
  * */
  onResponderMove = (event, gestureState) => {
    //关闭被展开的按钮组
    this.props.setWidth(true);

    //定义准备移动的定位
    Static.positions.firstLeft = Static.positions.lastLeft + gestureState.dx;
    Static.positions.firstTop = Static.positions.lastTop + gestureState.dy;
    let buttonHeight = -20;
    if (Platform.OS !== 'ios') {
      buttonHeight = StatusBar.currentHeight
    }
    //左侧超出判断
    if (Static.positions.firstLeft <= 0) {
      Static.positions.firstLeft = 0;
    }
    //上侧超出判断
    if (Static.positions.firstTop - 20 <= Static.headerHeight) {
      Static.positions.firstTop = Static.headerHeight + 20;
    }
    //右侧超出判断
    if (Static.positions.firstLeft >= Static.deviceWidth - Theme.flyButtonSize) {
      Static.positions.firstLeft = Static.deviceWidth - Theme.flyButtonSize
    }
    //下侧超出判断
    if (Static.positions.firstTop >= Static.deviceHeight - Theme.flyButtonSize + buttonHeight) {
      Static.positions.firstTop = Static.deviceHeight - Theme.flyButtonSize + buttonHeight
    }

    this.spinValue = new Animated.Value(0)
    this.setState({
      left: Static.positions.firstLeft,
      top: Static.positions.firstTop,
      spinFlag: false,
      move: true
    })
  }
  /*
  * 移动结束
  * @params 综合事件
  * */
  onResponderRelease = (event, gestureState) => {
    this.setState({
      move: false
    })
    //存储手指离开屏幕的定位
    Static.positions.lastTop = Static.positions.firstTop;
    Static.positions.lastLeft = Static.positions.firstLeft;
    //处理当前移动按钮的位置
    this.setPosition(Static.positions.lastLeft);
    //向外层传递位置以定位按钮组位置
    this.props.setLeftAndTop(Static.positions.lastLeft, Static.positions.lastTop)
    Static.positions.left = Static.positions.lastLeft
    Static.positions.top = Static.positions.lastTop

  };
  /*
  * 定位
  * */
  setPosition = (left) => {
    if (left <= Static.deviceWidth / 2 - Theme.flyButtonSize / 2) {
      Static.positions.firstLeft = Static.positions.lastLeft = 0;
    } else {
      Static.positions.firstLeft = Static.positions.lastLeft = Static.deviceWidth - Theme.flyImgSizeWidth
    }
    this.setState({
      left: Static.positions.firstLeft
    })
  }

  /*
  * 旋转动画开始
  * */
  spinStart = () => {
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }).start(() => {
      this.setState({
        spinFlag: true,
      })
    });
  }
  /*
  * 旋转动画 关闭
  * */
  spinEnd = () => {
    Animated.timing(this.spinValue, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear
    }).start(() => {
      this.setState({
        spinFlag: false,
      })
    });
  }


  componentWillMount() {
    //注册touch
    this._panResponder = PanResponder.create({
      // 在用户开始触摸的时候（手指刚刚接触屏幕的瞬间），是否愿意成为响应者
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      //捕获询问
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      //如果View不是响应者，那么在每一个触摸点开始移动（没有停下也没有离开屏幕）时再询问一次：是否愿意响应触摸交互呢
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
      },
      //用户正在屏幕上移动手指时（没有停下也没有离开屏幕
      onPanResponderMove: (evt, gestureState) => {
        if (evt.nativeEvent.pageX !== gestureState.x0 && evt.nativeEvent.pageY !== gestureState.y0) {
          this.onResponderMove(evt, gestureState)
        }
      },
      //有其他组件请求接替响应者，当前的View是否“放权”？返回true的话则释放响应者权力
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      //触摸操作结束时触发，比如"touchUp"（手指抬起离开屏幕
      onPanResponderRelease: (evt, gestureState) => {
        if (evt.nativeEvent.pageX === gestureState.x0 && evt.nativeEvent.pageY === gestureState.y0) {
          this.props.setWidth && this.props.setWidth();
          this.state.spinFlag ? this.spinEnd() : this.spinStart()
        }
        this.onResponderRelease(evt)
      },
      //响应者权力已经交出。这可能是由于其他View通过onResponderTerminationRequest请求的，也可能是由操作系统强制夺权（比如iOS上的控制中心或是通知中心）。
      onPanResponderTerminate: (evt, gestureState) => {
      },
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    })
  };

  render() {
    let {left, top, move} = this.state;
    left = Static.positions.firstLeft;
    top = Static.positions.firstTop;
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", left > Static.deviceWidth / 2 ? "-135deg" : "135deg"]
    })
    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        style={[Static.SuspendStyle.container, left > Static.deviceWidth / 2 && !move ? Static.SuspendStyle.right : move ? Static.SuspendStyle.move : Static.SuspendStyle.left, {
          left: left,
          top: top
        }]}
      >
        <Animated.Image resizeMode="contain" source={Static.SuspendImg}
                        style={[Static.SuspendStyle.transform, {transform: [{rotate: spin}]}]}/>
      </Animated.View>
    );
  }
}

export default Suspend;
