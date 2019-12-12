import React from 'react'
import {View, Text, StyleSheet, Alert, FlatList, TouchableHighlight} from 'react-native'
import Theme from '../Theme/default'
import Modal from "../Modal";
import Cell from "../Cell";
import Button from "../Button/button";
import {scaleSizeH, scaleSizeW} from "../Common/ScreenUtils";
import StaticFun from "../StaticFun/index";
import PropTypes from "prop-types";
import Checkbox from "./checkbox";


const styles = StyleSheet.create({

  container:{
    flex:1,
    paddingHorizontal: Theme.paddingHorizontal
  },
  buttonStyle: {
    backgroundColor: Theme.newColor,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    height: scaleSizeH(90),
    //paddingVertical:scaleSizeH(23),
    paddingHorizontal: scaleSizeW(58.5)
  },
  fontSize:{
    fontSize:Theme.fontSize,
    //paddingHorizontal:Theme.paddingHorizontal,
    paddingVertical:Theme.paddingVertical,
    lineHeight:Theme.lineHeight
  },
  Checkbox: {
    height: 1,
    backgroundColor: "#b8b8b8",
    marginLeft: Theme.paddingHorizontal,
    marginRight: Theme.paddingHorizontal
  },
  text: {
    fontSize: Theme.fontSize,
    color: Theme.fontColor,
    padding: 10
  },
  touchView: {
    flexDirection: "row",
    padding: 0,
    justifyContent: "space-around",
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
    borderBottomColor: Theme.colorLightGray2,
  },
})

export default class CheckboxList extends React.Component {

  static defaultProps = {
    title:"单选框标题",
    options:[],
    placeholder:"单击选择"
  }
  static propTypes = {
    title:PropTypes.string,
    options:PropTypes.arrayOf(PropTypes.shape({
      text:PropTypes.string,
      value:PropTypes.string
    })),
    placeholder: PropTypes.string,
    value:PropTypes.string,
    type:PropTypes.oneOf(['checkbox'])
  }


  constructor(props) {
    super(props);
    this.state = {
      text: this.props.defaultValue || this.props.value || '',
      checkboxText:'',
      checkboxValue: '',
      checkBoxButton: [{name: "确定",onPress:this.onSucess}, {name: "取消",onPress:this.hiden}]
    }
  }
  /*
  * 渲染选中的显示值
  * */
  getText = (text) => {
    this.setState({text: text})
  }

  hiden = () => {
    this.pickers.hiden()
  }

  onSucess = () => {
    this.props.onChangeText(this.state.checkboxValue);
    this.setState({
      text:this.state.checkboxText
    })
    this.pickers.hiden()
  }

  setCheck = (item) => {
    let textList = [], valueList = [];
    this.props.options.map((v, i) => {
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
  }

  _renderItem = (item) => {
    return (
      <Checkbox
        text={item.item.text}
        multiselect={true}
        checked={item.item.checked}
        setValue={() => this.setCheck(item.item)}
        underline={
          <View style={styles.Checkbox}/>
        }
        style={{
          paddingHorizontal: Theme.paddingHorizontal,
          paddingVertical: Theme.paddingVertical
        }}
      />
    )
  }


  render() {
    return (
      <View style={styles.container}>
        <Cell title={this.props.title} style={{paddingHorizontal:0,borderBottomWidth:0.5}}>
          <Button
            text={this.props['options-title'] || '多选按钮名称'}
            underlayColor="#fff"
            onPress={()=>StaticFun.openModal(this.props.options,this.pickers,this.state.text.split(','))}
            style={styles.buttonStyle}
            fontSize={Theme.fontSize}
            textStyle={{color: "#ffffff"}}
          />
        </Cell>

        <View style={{borderBottomWidth:this.state.text !=='' ?  0.5 : 0,borderColor:"#eee"}}>
          <Text style={[styles.fontSize]}>{this.state.text === '' ? this.props.value : this.state.text}</Text>
        </View>

        <Modal
          type={this.props.type}
          onRef={ref=>this.pickers = ref}
          backgrounds={<View style={Theme.modalBackground}/>}
          showButton={
            <View style={styles.touchView}>
              {
                this.state.checkBoxButton.map((v,i)=>{
                  return (
                    <TouchableHighlight key={i} onPress={v.onPress} underlayColor={Theme.newColor} style={{borderRadius: 25}}>
                      <Text style={[styles.text]}>{v.name}</Text>
                    </TouchableHighlight>
                  )
                })
              }
            </View>
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




