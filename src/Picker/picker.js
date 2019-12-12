import React from 'react'
import {StyleSheet,
  View,
  Text,
  Animated,
  Easing} from 'react-native'
import {connect} from 'react-redux'
import {screenW,screenH} from '../Common/ScreenUtils'


const navigatorH = 64; // navigator screenH
const [aWidth, aHeight] = [screenW, 214];
const [left, top] = [0, 0];




const styles = StyleSheet.create({
  container: {
    position:"absolute",
    width:screenW,
    height:screenH,
    left:left,
    top:top,
  },
  mask: {
    justifyContent:"center",
    backgroundColor:"#383838",
    opacity:0.8,
    position:"absolute",
    width:screenW,
    height:screenH,
    left:left,
    top:top,
  },
  tip: {
    width:aWidth,
    height:aHeight,
    // left:middleLeft,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"space-between",
  },
  tipTitleView: {
    height:53,
    width:aWidth,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderBottomWidth:0.5,
    borderColor:"#f0f0f0",
  },
  cancelText:{
    color:"#e6454a",
    fontSize:16,
    paddingLeft:30,
  },
  okText:{
    color:"#e6454a",
    fontSize:16,
    paddingRight:27,
    fontWeight:'bold',
  },
});

class Pickers extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      offset: new Animated.Value(0),
      opacity: new Animated.Value(0),
      choice:this.props.defaultVal,
      hide: true,
    };
    this.options = this.props.options;
    this.callback = function () {};//回调方法
    this.parent ={};
  }
  /*
  * 绑定this给父组件
  * */
  componentDidMount(){
    this.props.onRef(this)
  }
  /*
  * 停止动画
  * */
  componentWillUnMount(){
    this.timer && clearTimeout(this.timer);
  }
  /*
  * 动画开始进入
  * */
  in() {
    Animated.parallel([
      Animated.timing(
        this.state.opacity,
        {
          easing: Easing.linear,
          duration: 300,
          toValue: 0.8,
        }
      ),
      Animated.timing(
        this.state.offset,
        {
          easing: Easing.linear,
          duration: 300,
          toValue: 1,
        }
      )
    ]).start();
  }
  /*
  * 动画退出
  * */
  out(){
    Animated.parallel([
      Animated.timing(
        this.state.opacity,
        {
          easing: Easing.linear,
          duration: 300,
          toValue: 0,
        }
      ),
      Animated.timing(
        this.state.offset,
        {
          easing: Easing.linear,
          duration: 300,
          toValue: 0,
        }
      )
    ]).start();
    this.timer = setTimeout(
      () => this.setState({hide: true}),
      500
    );
  }

  //取消
  cancel(event) {
    if(!this.state.hide){
      this.out();
    }
  }

  //选择
  ok() {
    if(!this.state.hide){
      this.out();
      //this.callback.apply(this.parent,[this.State.choice]);
    }
  }
  /*
  * 打开picker
  * */
  show(obj,callback) {
    this.parent = obj;
    this.callback = callback;
    if(this.state.hide){
      this.setState({ hide: false}, this.in);
    }
  }

  render(){
    if(this.state.hide){
      return (<View />)
    } else {
      return (
        <View style={styles.container} >
          <Animated.View style={ styles.mask } />

          <Animated.View style={[styles.tip , {transform: [{
              translateY: this.state.offset.interpolate({
                inputRange: [0, 1],
                outputRange: [screenH, (screenH-aHeight)]
              }),
            }]
          }]}>
            <View style={styles.tipTitleView} >
              <Text style={styles.cancelText} onPress={this.cancel.bind(this)}>取消</Text>
              <Text style={styles.okText} onPress={this.ok.bind(this)} >确定</Text>
            </View>

          </Animated.View>
        </View>
      );
    }
  }
}




const mapStateToProps = (state, ownProps) => ({
  counter: state.counter
})

export default connect(mapStateToProps)(Pickers)
