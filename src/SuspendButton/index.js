import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Animated,TouchableOpacity, Easing,View} from 'react-native';
import Suspend from './suspend'
import Theme from '../Theme/default'
import Static from './static'

class Index extends Component {
  static defaultProps = {
    item:[],
    closeBox:false,
    buttonClick:()=>{return false}
  }
  static propTypes = {
    item:PropTypes.array.isRequired,
    closeBox:PropTypes.bool,
    buttonClick:PropTypes.func.isRequired
  }
  constructor(props){
    super(props);
    this.boxWidth = 0;
    this.widthValue = new Animated.Value(0);
    this.props.item.map(v=>{v.flag = false})
    this.state = {
      left:Static.positions.left,
      top:Static.positions.top,
      widthFlag:false,
      width:0,
      height:this.props.item.length <= 3 ? Theme.flyBoxHeight1 : this.props.item.length > 3 && this.props.item.length <= 6 ?Theme.flyBoxHeight2 :Theme.flyBoxHeight3,
    }
  }

  /*
  * 动态宽度伸缩
  * */
  setWidth =(startMove,duration = 0)=>{
    if(startMove){
      Animated.timing(this.widthValue, {
        toValue: 0,
        duration: duration,
        easing: Easing.linear
      }).start();
      this.setState({
        widthFlag:false
      })
    }else{
      Animated.timing(this.widthValue, {
        toValue: this.state.widthFlag ? 0 : 1,
        duration: 200,
        easing: Easing.linear
      }).start()
      this.setState({
        widthFlag:!this.state.widthFlag
      })
    }
  }
  /*
  * 获取子组件X、Y值
  * */
  setLeftAndTop = (left,top) => {
    this.setState({
      left:left,
      top:top
    })
  }
  /*
  * 按钮操作
  * */
  setButton = (value,index) => {
    this.props.buttonClick(value);
    let closeTime = setInterval(()=>{
      if(this.props.closeBox){
        this.SuspendRef.spinEnd();
        this.setWidth(true,200);
        clearInterval(closeTime)
      }
    },500)

  }
  /*
  * 控制左右移动
  * */
  setPath = (left,top) => {
    let style = {
      top:top <= Static.headerHeight + this.state.height ? top - 12 :top - this.state.height + Theme.flyButtonSize + 7
    };
    if(this.state.left <= Static.deviceWidth/2 - Theme.flyImgSizeWidth/2){
      style.left = left
      style.paddingLeft = Theme.flyImgSizeWidth
      style.paddingRight = 6
    }else{
      style.right = Static.deviceWidth - left - Theme.flyImgSizeWidth
      style.paddingRight = Theme.flyImgSizeWidth
      style.paddingLeft = 6
    }
    return style
  }
  /*
  * 按钮宽高
  * */
  setButtonSize = (length) => {
    let size = {
      paddingVertical:5,
      borderRadius:15
    };
    if(length <= 3){
      let obj = {
        width:this.boxWidth / (length + 1),
        justifyContent:"center"
      };
      Object.assign(size,obj)
    }
    /*else if (length >3 && length <=6){
      size.width = this.boxWidth / 4;
      //size.height = this.state.height / 2.2;
      //size.paddingTop = 25
    }*/
    else{
      Object.assign(size,{width:this.boxWidth / 4})
    }
    return size
  }
  /*
  * 按钮按下
  * */
  onButtonIn = (index) => {
    this.props.item[index].flag = true;
    this.setState({})
  }
  /*
  * 按钮抬起
  * */
  onButtonOut = (index)=>{
    this.props.item[index].flag = false;
    this.setState({})
  }

  /*
  * 添加按钮列表
  * */
  setButtonList = (width,left,top,item) => {

    try {
      if(this.state.widthFlag){
        return (
          <Animated.View style={[
            Static.boxStyle.buttonBox,
            {width:width},
            this.setPath(left,top),
            {
              height:this.state.height - (item.length === 3 ? 10 : 15)
            }
            ]}>
            {
              item.map((value,index,array)=>{

                let source,textColor;
                if(!value.disabled){
                  //source = value.flag ? Static.boxImg.defaults.focus : Static.boxImg.defaults.blur;
                  //textColor = value.flag?Theme.newButtonFocusColor:Theme.fontColor
                  source = Static.boxImg.defaults.blur
                }else{
                  source = Static.boxImg.defaults.disabled;
                  textColor = "#8c8b8b"
                }
                for(let i in Static.boxImg.buttonImg){
                  let rest = new RegExp(Static.boxImg.buttonImg[i].name)
                  if(rest.test(value.name || value.text)){
                    if(!value.disabled){
                      //value.flag ? source = Static.boxImg.buttonImg[i].focus : source = Static.boxImg.buttonImg[i].blur
                      source = Static.boxImg.buttonImg[i].blur
                    }else{
                      source = Static.boxImg.buttonImg[i].disabled
                    }
                  }
                }
                return (
                  <TouchableOpacity
                    style={[
                      Static.boxStyle.buttonText,
                      this.setButtonSize(array.length),
                      {
                        backgroundColor:value.flag?"#efefef":null,
                        //height:value.name.length > 4 ? 92 : 92/1.5
                      },
                      ]}
                    activeOpacity={1} key={index}
                    onPress={()=>this.setButton(value,index)}
                    onPressIn={()=>this.onButtonIn(index)}
                    onPressOut={()=>this.onButtonOut(index)}
                    disabled={value.disabled}
                  >
                    <Animated.Image resizeMode="contain" source={source} style={Static.boxStyle.buttonImgSize} />
                    <Animated.Text
                      ellipsizeMode="tail"
                      numberOfLines={2}
                      style={[Static.boxStyle.text,{color:textColor}]}
                    >{value.name}
                    </Animated.Text>
                  </TouchableOpacity>
                )
              })
            }
          </Animated.View>
        )
      }else{
        return false
      }
      //console.log(this.props.item)
    }catch (e) {
      return false
    }
  }

  /*
  * 动态替换背景图
  * @param length 数组长度
  * */
  setBackgroundImage = (length) => {
    if(length === 0){
      return null
    }
    switch (parseInt(length)) {
      case 1 :
        return Static.boxImg.only;
      case 2:
        return Static.boxImg.two;
      case 3:
        return Static.boxImg.three;
      case 4:
      case 5:
      case 6:
        return Static.boxImg.long;
      default:
        return Static.boxImg.four
    }
  }

  render() {
    let {left,top,height} = this.state;
    let {item} = this.props;
    left = Static.positions.left;
    top = Static.positions.top;

    this.boxWidth = item.length ===2 ? Theme.flyBoxWidth2 : item.length ===1 ? Theme.flyBoxWidth1 : Theme.flyBoxWidth3;

    const width = this.widthValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0,this.boxWidth]
    })

    return (
      <>
        {
          item.length > 0 &&  <Suspend ref={(e)=>this.SuspendRef = e} setWidth={this.setWidth} setLeftAndTop={this.setLeftAndTop} />
        }

        <Animated.Image
          resizeMode="stretch"
          source={this.setBackgroundImage(item.length)}
          style={[Static.boxStyle.buttonBox,{width:width,height:height},this.setPath(left,top),{paddingLeft:0,paddingRight:0}]}
        />

        {
          this.setButtonList(width,left,top,item,this.setBackgroundImage(item.length))
        }
      </>
    )
  }
}

export default Index;
