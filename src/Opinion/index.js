import React from 'react'
import {View, StyleSheet, FlatList, TouchableWithoutFeedback} from 'react-native'
import Button from '../Button/button'
import Theme from "../Theme/default";
import Modal from '../Modal'
import Textarea from './textarea'
import Cell from "../Cell";
import {scaleSizeH, scaleSizeW} from '../Common/ScreenUtils'
import PropTypes from 'prop-types'
import StaticFun from '../StaticFun/index'
import Radio from "../Radio/radio";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:Theme.paddingHorizontal
  },
  buttonStyle: {
    backgroundColor: Theme.newColor,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    height: scaleSizeH(90),
    //paddingVertical:scaleSizeH(23),
    paddingHorizontal: scaleSizeW(58.5)
  }
})

/*
* 意见类
* */
export default class Opinion extends React.Component {
  static defaultProps = {
    title:"意见/留言标题",
    ["options-title"]:"按钮名称",
    type:"opinion",
    value:"",
    onChangeText:()=>false,
    options:[]
  }
  static propTypes = {
    title:PropTypes.string,
    ["options-title"]:PropTypes.string,
    type:PropTypes.string,
    value:PropTypes.string,
    onChangeText:PropTypes.func,
    options:PropTypes.arrayOf(PropTypes.string)
  }
  /*
  * 添加列表数组
  * */
  _renderItem = (item) => {
    return (
      <Radio
        text={item.item}
        setValue={() => this.setCheck(item.item)}
        checked={this.props.value === item.item}
      />
    )
  }
  /*
  * 添加选中事件赋值
  * */
  setCheck = (value) => {
    this.props.onChangeText(value);
    this.pickers.hiden();
  }

  render() {
    return (
      <View style={styles.container}>
        <Cell title={this.props.title} style={{paddingHorizontal:0,borderBottomWidth:0}}>
          <Button
            text={this.props["options-title"]|| ''}
            underlayColor="#fff"
            onPress={()=>StaticFun.openModal(this.props.options,this.pickers,this.props.value.split(','))}
            style={styles.buttonStyle}
            fontSize={Theme.fontSize}
            textStyle={{color: "#ffffff"}}
          />
        </Cell>

        <Textarea
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChangeText={text => this.props.onChangeText(text)}
        />

        <Modal
          type={this.props.type}
          onRef={ref=>this.pickers = ref}
          backgrounds={
            <TouchableWithoutFeedback onPress={()=>StaticFun.closeModal(this.pickers)}>
              <View style={Theme.modalBackground}/>
            </TouchableWithoutFeedback>
          }
        >
          <FlatList
            keyExtractor={(item, index) => (index + 1).toString()}
            extraData={this.props.value}
            data={this.props.options}
            renderItem={this._renderItem}
          />
        </Modal>
      </View>
    )
  }
}
