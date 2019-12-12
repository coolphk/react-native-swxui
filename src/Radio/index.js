import React from 'react'
import {View, StyleSheet, Alert, Text, FlatList, TouchableWithoutFeedback} from 'react-native'
import Theme from "../Theme/default";
import Modal from "../Modal";
import Cell from "../Cell";
import Button from "../Button/button";
import StaticFun from "../StaticFun/index";
import PropTypes from 'prop-types'
import Radio from "./radio";
const img = require("./img/right.png")
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  radio: {
    //backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
})



export default class Index extends React.Component {
  static defaultProps = {
    title:"单选框标题",
    options:[],
    placeholder:"单机选择"
  }
  static propTypes = {
    title:PropTypes.string,
    options:PropTypes.arrayOf(PropTypes.shape({
      text:PropTypes.string,
      value:PropTypes.string
    })),
    placeholder: PropTypes.string,
    value:PropTypes.string,
    type:PropTypes.oneOf(['radio'])
  }

  constructor(props){
    super(props)
    this.state = {
      text: this.props.defaultValue || this.props.value || ''
    }
  }

  /*
  * 添加单选列表
  * */
  _renderItem = (item) => {
    return (
      <Radio
        text={item.item.text}
        setValue={() => this.setCheck(item.item)}
        checked={this.state.text === item.item.text}
      />
    )
  }
  /*
  * 选中事件、赋值
  * */
  setCheck = (item) => {
    this.props.onChangeText(item.value, item)
    this.setState({text: item.text})
    this.pickers.hiden()
  }

  render(){
    return (
      <View style={styles.container}>
        <Cell title={this.props.title}>
          <Button
            text={this.state.text === '' ? this.props['text'] || this.props.placeholder : this.state.text}
            onPress={()=>StaticFun.openModal(this.props.options,this.pickers,this.state.text.split(','))}
            opacitys={1}
            source={img}
            underlayColor="#fff"
            style={styles.radio}
            fontSize={Theme.fontSize}
            showImg={this.state.text !== ''}
            textStyle={{color: this.state.text !== '' ? Theme.colorBlack : Theme.colorLightGray2,}}
          />
        </Cell>

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
            extraData={this.state}
            data={this.props.options}
            renderItem={this._renderItem}
          />
        </Modal>
      </View>
    )
  }
}
