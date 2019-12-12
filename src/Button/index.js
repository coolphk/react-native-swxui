import React from 'react'
import {StyleSheet, View} from 'react-native'
import Buttons from './button'
import PropTypes from 'prop-types'
import {scaleSizeH, screenW, setSpText} from '../Common/ScreenUtils'
import Theme from '../Theme/default'


const buttonStyle = StyleSheet.create({
  container:{
    flexDirection:"row",
    flex:1,
    justifyContent:'space-around',
    alignItems:'flex-start',
    textAlign:"center",
    paddingTop:5
  },
  buttons:{
    borderColor:Theme.newColor,
  },
})

class ButtonList extends React.Component{

  static defaultProps = {
    buttonList:[]
  }
  static propTypes = {
    buttonList:PropTypes.arrayOf(PropTypes.shape({
      name:PropTypes.string.isRequired
    })),
    buttonClick:PropTypes.func.isRequired
  }


  constructor(props){
    super(props);
    this.setButtons = this.setButtons.bind(this);
  }

  /*
  * 渲染按钮组
  * */
  setButtons(){
    try {
      return this.props.buttonList.map((value,index,array)=>{
        const styles = {
          borderWidth:1,
          borderColor:value.disabled ? "#c9c9c9" : Theme.newColor,
          borderRadius:25,
          width:screenW / (array.length + 1),
          height:scaleSizeH(90),
          alignItems:"center",
          justifyContent:"center",
          padding:4.5
        }
        return (
          <Buttons
            text={value.name}
            onPress={()=>this.props.buttonClick(value)}
            key={index + 1}
            fontSize={value.name && value.name.length >= 4 ? setSpText(40) : Theme.fontSize}
            showUnderlay
            style={styles}
            disabled={value.disabled || false}
          />
        )
      })
    }catch (e) {
      return console.warn(e)
    }
  }

  render(){
    return (
      <View style={buttonStyle.container}>
        { this.setButtons() }
      </View>
    )
  }
}

export default ButtonList
