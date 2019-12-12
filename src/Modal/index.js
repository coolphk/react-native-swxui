import React from 'react'
import {
  Modal,
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
  Text,
  FlatList, StatusBar
} from 'react-native'
import {screenW, screenH} from '../Common/ScreenUtils'
import Theme from "../Theme/default";
//import Radio from "../Radio/radio";
//import Checkbox from "../Checkbox/checkbox";

const styles = StyleSheet.create({
  /*container: {
    flex: 1,
    backgroundColor: "#000000",
    opacity: 0.2
  },*/
  /*innerBox: {
    backgroundColor: "#ffffff",
    maxHeight: screenH / 2,
    position: "absolute",
    bottom: 0,
    width: screenW,
  },*/
  Animated: {
    position: "absolute",
    backgroundColor: '#fff',
    flex: 1,
    maxHeight: screenH / 2,
    width: "100%",
    paddingVertical: Theme.paddingVertical
  },
  /*touchView: {
    flexDirection: "row",
    padding: 0,
    justifyContent: "space-around",
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
    borderBottomColor: Theme.colorLightGray2,
  },*/
  /*text: {
    fontSize: Theme.fontSize,
    color: Theme.fontColor,
    padding: 10
  },*/
  /*Checkbox: {
    height: 1,
    backgroundColor: "#b8b8b8",
    marginLeft: Theme.paddingHorizontal,
    marginRight: Theme.paddingHorizontal
  }*/
})

const initHeight = screenH / 2
const duration = 400


class Popup extends React.Component {

  constructor(props) {
    super(props)
    this.hiden = this.hiden.bind(this);
    this.show = this.show.bind(this);
    this.state = {
      flag: false,
      securetyTipViewY: new Animated.Value(-initHeight)
    };
  }

  /*
  * 绑定this给父组件
  * */
  componentDidMount() {
    this.props.onRef(this)
  }

  /*
  * 获取选中值
  * */
  /*getChecked = () => {
    let texts = this.props.opinionText && this.props.opinionText !== '' ? this.props.opinionText.split(',') : [];
    this.props.options.map((v) => {
      v.checked = texts.indexOf(v.text) > -1
    })
  }*/

  /*
  * 打开modal
  * */
  show() {
    this.setState({flag: true});
    this._showTipView()
  }

  /*
  * 关闭
  * */
  hiden() {
    this._hiddenTipView()
    setTimeout(() => {
      this.setState({flag: false})
    }, 500)
  }

  /*
  * 空方法
  * */
  defaults = () => {

  }


  //展示View
  _showTipView = () => {
    setTimeout(res => {
      Animated.timing(
        this.state.securetyTipViewY,
        {
          toValue: 0,   //(screenH - 254 - 64) ,
          duration: duration,
        }
      ).start();
    }, 200)
  }

  //隐藏view
  _hiddenTipView = () => {
    Animated.timing(
      this.state.securetyTipViewY,
      {
        toValue: -initHeight,
        duration: duration,
      }).start();
  }

  //checkbox确定
  /*onSucess () {
    this.props.onChangeText(this.state.checkboxValue);
    this.props.getText(this.state.checkboxText);
    this.hiden();
  }*/
  //多选列表选中事件
  /*setChecked = (item) => {
    let list = this.props.options
    let textList = [], valueList = [];
    list.map((v, i) => {
      if (v.value === item.value) {
        v.checked = !v.checked
      }
      if (v.checked) {
        textList.push(v.text);
        valueList.push(v.value)
      }
    })

    this.setState({
      checkboxText: textList.join(','),
      checkboxValue: valueList.join(',')
    })
  }*/

  /*
  * 意见列表选中事件
  * */
  /*setSelect = (item) => {
    this.props.onChangeText(item)
    this.setState({})
    this.hiden()
  }*/
  /*
  * 单选列表选中事件
  * */
  /*setRadio = (item) => {
    this.props.onChangeText(item.value, item)
    this.props.getText(item.text)
    this.setState({})
    this.hiden()
  }*/


  /*
  * 渲染列表
  * */
  /*_renderItem = (item) => {
    switch (this.props.type) {
      case 'checkbox' :
        return (
          <Checkbox
            text={item.item.text}
            multiselect={true}
            checked={item.item.checked}
            setValue={() => this.setChecked(item.item)}
            underline={
              <View style={styles.Checkbox}/>
            }
            style={{
              paddingHorizontal: Theme.paddingHorizontal,
              paddingVertical: Theme.paddingVertical
            }}
          />
        );
      case 'opinion' :
        return (
          <Radio
            text={item.item}
            setValue={() => this.setSelect(item.item)}
            checked={this.props.value === item.item}
          />
        );
      case 'radio':
        return (
          <Radio
            text={item.item.text}
            setValue={() => this.setRadio(item.item)}
            checked={this.props.opinionText === item.item.text}
          />
        )
    }
  }*/

  /*showCheckBox = (checkbox,structure) => {
    switch (structure) {
      case "top":
        if(checkbox){
          return <View style={styles.container}/>
        }else{
          return (
            <TouchableWithoutFeedback onPress={this.hiden}>
              <View style={styles.container}/>
            </TouchableWithoutFeedback>
          )
        }
      case "bottom":
        if(checkbox){
          return (
            <View style={styles.touchView}>
              {
                this.state.checkBoxButton.map((v,i)=>{
                  return (
                    <TouchableHighlight key={i} onPress={v.onPress} underlayColor={Theme.newColor}
                                        style={{borderRadius: 25}}>
                      <Text style={[styles.text]}>{v.name}</Text>
                    </TouchableHighlight>
                  )
                })
              }
            </View>
          )
        }else{
          return null
        }
    }
  }*/

  render() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.flag}
        onRequestClose={this.defaults}
      >
        { this.props.backgrounds }

        <Animated.View style={[styles.Animated, {bottom: this.state.securetyTipViewY}]}>

          { this.props.showButton }

          { this.props.children }


          {/*<FlatList
            keyExtractor={(item, index) => (index + 1).toString()}
            extraData={this.state}
            data={this.props.options}
            renderItem={this._copyRenderItem}
          />*/}

        </Animated.View>
      </Modal>
    )
  }
}

export default Popup
