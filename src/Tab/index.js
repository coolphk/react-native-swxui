import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import Tab from './tab'
import TabScrollButton from "./tabScrollButton";
import Theme from '../Theme/default'
const LeftImg = require("./img/left.png")
const BackgroundL = require("./img/opacitys.png")
const rightImg = require("./img/right.png")
const BackgroundR = require("./img/opacitys_right.png")



const tabBarStyle = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F5',
    alignItems: 'center',
    height:Theme.CellHeight
  }
});

class Tabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollX: 0,  //滚动X轴距离
      scrollEnd: false, //是否滚动到底
      scrollStart: true //是否在起始滚动位置
    }
  }

  /*
  * tab切换
  * 提供一个回调方法、参数为当前的tabItem 和 tabIndex
  * */
  setIndex(item, index) {
    try {
      return this.props.onItemPress(item, index) //回调方法 如果有的话
    }catch (e) {
      return console.warn(e)
    }
  }

  /*
  * 导航滑动
  * flag:true 右 false 左
  *
  * */
  clickToScroll = (flag) => {
    if (flag) {
      this.scroll.scrollTo({x: this.state.scrollX - 80, y: 0, animated: true}) //向右滑动
    } else {
      this.scroll.scrollTo({x: this.state.scrollX + 80, y: 0, animated: true}) //向左滑动
    }
  };
  /*
  * 获取scroll值
  * */
  getScroll = (e) => {
    let offsetX = e.nativeEvent.contentOffset.x;  //获取当前X轴距离
    let oriageScrollWidth = e.nativeEvent.layoutMeasurement.width; //获取view宽度
    let contentSizeWidth = e.nativeEvent.contentSize.width; //获取view高度
    this.setState({
      scrollX: e.nativeEvent.contentOffset.x
    })
    // 判断是否滚动到底
    if (offsetX + oriageScrollWidth >= contentSizeWidth - 10) {
      this.setState({
        scrollEnd: true,
      })
    } else {
      this.setState({
        scrollEnd: false
      })
    }
    //判断是否为起始位置
    if (offsetX <= 0) {
      this.setState({
        scrollStart: true
      })
    } else {
      this.setState({
        scrollStart: false
      })
    }
  };

  setTabList = (list) => {
    try {
      if(Array.isArray(list) && list.length > 1){
        return (
          <View style={tabBarStyle.container}>
            {
              list.length > 4 && !this.state.scrollStart && (
                <TabScrollButton
                  clickToScroll={() => this.clickToScroll(true)}
                  backgroundImage={BackgroundL}
                  source={LeftImg}
                />
              )
            }
            {
              list.length > 4 && !this.state.scrollEnd && (
                <TabScrollButton
                  clickToScroll={() => this.clickToScroll(false)}
                  backgroundImage={BackgroundR}
                  source={rightImg}
                  right={true}
                />
              )
            }
            <ScrollView
              horizontal
              directionalLockEnabled
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              ref={(e) => this.scroll = e}
              onScroll={(event) => this.getScroll(event)}
              scrollEventThrottle={200}
              alwaysBounceHorizontal={false}
            >
              {
                list.map((item, index, array) => {
                  if(item.title && item.title !== ''){
                    return (
                      <Tab
                        text={item.title}
                        width={item.title.length > 4 ? 88 : (item.title.length + 1) * 13}
                        checked={this.props.checked === index}
                        key={index}
                        setIndex={() => this.setIndex(item, index)}
                        touchWidth={array.length < 4 ? array.length : 4}
                      />
                    )
                  }
                })
              }
            </ScrollView>
          </View>
        )
      }else{
        return false
      }
    }catch (e) {
      return false
    }
  };

  render() {
    return this.setTabList(this.props.list)
  }
}


export default Tabs;
