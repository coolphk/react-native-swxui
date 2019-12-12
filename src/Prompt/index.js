import React, {Component} from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native'
const {width} =  Dimensions.get('window');
import Theme from '../Theme/default'
import {setSpText} from '../Common/ScreenUtils'

const styles = StyleSheet.create({
  container:{
    flex:1,
    //backgroundColor:'#fff',
    alignContent:"center",
    justifyContent:"center",
    paddingHorizontal:Theme.paddingHorizontal,
    paddingVertical:Theme.paddingVertical
  },
  text:{
    textAlign: "center",
    fontSize:setSpText(60),
  },
  line:{
    fontSize: 15,
    fontWeight:"900",
    color:"#737373"
  }
})

class Prompt extends Component {

  setDottedLine =(flag)=>{
    let line = (width / 2);
    let lineArr = []
    if(flag){
      for(let i = 0; i < line ; i++){
        lineArr.push(i)
      }
      return (
        <View style={{flexDirection:"row",width:width - (Theme.paddingHorizontal * 2),overflow:"hidden"}}>
          {
            lineArr.map((v,i)=>{
              return (
                <Text style={styles.line} key={i}>-</Text>
              )
            })
          }
        </View>
      )
    }
  }

  render() {
    const {valueColor,fontWeight} = this.props;
    const textStyle = {
      color:valueColor ? Theme.colorRed : Theme.colorBlack,
      fontWeight:fontWeight ? '900' :'normal'
    }
    return (
      <View style={styles.container}>

        <Text style={[styles.text,textStyle]}>{this.props.value}</Text>

        {
          this.setDottedLine(this.props.line && this.props.text !== '')
        }
      </View>
    );
  }
}

export default Prompt;
