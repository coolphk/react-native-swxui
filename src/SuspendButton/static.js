import {Dimensions, Platform, StyleSheet} from 'react-native'
import Theme from "../Theme/default";
import {scaleSizeH} from "../Common/ScreenUtils";

const base = './img/'

export default class Static {

  /*
  * 头部高度
  * */
  static headerHeight = Platform === 'ios'  ? 88 : 67;

  /*
  * 悬浮圆球样式表
  * */
  static SuspendStyle = StyleSheet.create({
    container:{
      position:"absolute",
      alignItems:"center",
      justifyContent:"center",
      zIndex:100,
      backgroundColor:Theme.newColor,
      width:Theme.flyButtonSize,
      height:Theme.flyButtonSize,
      borderRadius:Theme.flyButtonSize/2,
    },
    left:{
      borderRadius:0,
      width:Theme.flyImgSizeWidth,
      height:Theme.flyImgSizeHeight,
      borderBottomRightRadius:Theme.flyImgSizeHeight/2,
      borderTopRightRadius:Theme.flyImgSizeHeight/2,
    },
    right:{
      borderRadius:0,
      width:Theme.flyImgSizeWidth,
      height:Theme.flyImgSizeHeight,
      borderBottomLeftRadius:Theme.flyImgSizeHeight/2,
      borderTopLeftRadius:Theme.flyImgSizeHeight/2,
    },
    move:{
      width:Theme.flyButtonSize,
      height:Theme.flyButtonSize,
      borderRadius:Theme.flyButtonSize/2,
    },

    transform:{
      transform: [{rotate: "0deg"}],
      width:Theme.flyImgXSize
    },
  });
  /*
  * 按钮组盒子样式表
  * */
  static boxStyle = {
    buttonBox:{
      //flexWrap: 'wrap',
      //display:'flex',
      flexDirection: 'row',
      justifyContent: "flex-start",
      //alignItems: "center",
      position:"absolute",
      overflow:"hidden",
      flexWrap:"wrap",
      //backgroundColor:"red",
      //opacity:0.2
      paddingTop:20
    },
    text:{
      color:Theme.fontColor,
      fontSize:Theme.fontSize,
      //fontWeight: "700",
      textAlign: "center",
      //marginTop:2,
    },
    buttonText:{
      alignItems:"center",
      //justifyContent:"center",
      //paddingHorizontal:4,
      //overflow:"hidden",
      //borderWidth:1
    },
    buttonImgSize:{
      width:scaleSizeH(50),
      height:scaleSizeH(50)
    }
  };
  /*
  * 获取屏幕高度
  * */
  static deviceHeight = Dimensions.get('window').height;
  /*
  * 获取屏幕宽度
  * */
  static deviceWidth = Dimensions.get('window').width;
  /*
  * 悬浮按钮定位
  * */
  static positions = {
    firstLeft : this.deviceWidth - Theme.flyImgSizeWidth,
    firstTop : this.deviceHeight * 0.8 ,
    lastLeft : this.deviceWidth - Theme.flyImgSizeWidth ,
    lastTop : this.deviceHeight * 0.8,
    left:this.deviceWidth - Theme.flyImgSizeWidth,
    top: this.deviceHeight * 0.8
  };
  /*
  * 悬浮球体 图片
  * */
  static SuspendImg = require(`${base}x.png`)
  /*
  * 按钮组图片
  * */
  static boxImg = {
    only: require(`${base}onlyOne.png`),
    two: require(`${base}two.png`),
    three: require(`${base}three.png`),
    long: require(`${base}long.png`),
    four: require(`${base}four.png`),
    buttonImg:{
      cyyj:{
        name:"意见",
        blur:require(`${base}changyong-yijian.png`),
        focus:require(`${base}changyong-yijianF.png`),
        disabled:require(`${base}changyong-yijianD.png`)
      },
      ch:{
        name:"撤回",
        blur:require(`${base}chehui.png`),
        focus:require(`${base}chehuiF.png`),
        disabled:require(`${base}chehuiD.png`)
      },
      fbgs:{
        name:"发布公示",
        blur:require(`${base}fabugongshi.png`),
        focus:require(`${base}fabugongshiF.png`),
        disabled:require(`${base}fabugongshiD.png`)
      },
      qd:{
        name:"确定",
        blur:require(`${base}queding.png`),
        focus:require(`${base}quedingF.png`),
        disabled:require(`${base}quedingD.png`)
      },
      qx:{
        name:"取消",
        blur:require(`${base}quxiao.png`),
        focus:require(`${base}quxiaoF.png`),
        disabled:require(`${base}quxiaoD.png`)
      },
      rz:{
        name:"日志",
        blur:require(`${base}rizhi.png`),
        focus:require(`${base}rizhiF.png`),
        disabled:require(`${base}rizhiD.png`)
      },
      xyb:{
        name:"下一步",
        blur:require(`${base}xiayibu.png`),
        focus:require(`${base}xiayibuF.png`),
        disabled:require(`${base}xiayibuD.png`)
      },
      gb:{
        name:"关闭",
        blur:require(`${base}guanbi.png`),
        focus:require(`${base}guanbiF.png`),
        disabled:require(`${base}guanbiD.png`)
      },
      yfb:{
        name:"已发布",
        blur:require(`${base}yifabu.png`),
        focus:require(`${base}yifabuF.png`),
        disabled:require(`${base}yifabuD.png`)
      }
    },
    defaults : {
      blur: require(`${base}default.png`),
      focus:require(`${base}defaultF.png`),
      disabled:require(`${base}defaultD.png`)
    }
  }
}
