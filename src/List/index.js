import React, {Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Dimensions} from 'react-native'

import PropTypes from 'prop-types'
import ListView from '../ListView'
import Theme from '../Theme/default'
import {isIphoneX_XS, isIphoneXR_XSMAX} from "../Common/ScreenUtils";

const {height} =  Dimensions.get('window');

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  listButton:{
    flex:1,
    paddingVertical:Theme.paddingVertical,
    paddingHorizontal:Theme.paddingHorizontal
  },
  listRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingVertical: Theme.paddingVertical/2
  },
  text:{
    fontSize:Theme.fontSize,
    color:Theme.fontColor,

  },
  title:{
    fontSize:16,
    color:Theme.titleColor
  },
  line:{
    height:1,
    backgroundColor:"#eee"
  }
})

class Index extends Component {
  static defaultProps = {
    listData:[]
  };

  static propTypes = {
    listData:PropTypes.array
  };
  onItemClick = (item) => {

  };



  setChild = (value) => {

    let {title,steps,serial_number,user_name,date} = value.item

    return (
      <TouchableOpacity style={styles.listButton} onPress={()=>this.onItemClick(value.item)}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.listRow}>
          <Text style={[styles.text,{color:Theme.newColor}]}>{steps}</Text>
          <Text style={[styles.text]}>{serial_number}</Text>
        </View>
        <View style={styles.listRow}>
          <Text style={[styles.text]}>{user_name}</Text>
          <Text style={[styles.text]}>{date}</Text>
        </View>
        <View style={styles.line} />
      </TouchableOpacity>
    )
  }


  render() {
    //console.log(this.props.listData)

    return (
      <View style={styles.container}>
        <ListView flatListHeight={{height:height - 20 - (isIphoneX_XS() || isIphoneXR_XSMAX()  ? 88 : 67)}} list={this.props.listData} setChild={this.setChild}  />
      </View>
    );
  }
}

export default Index;
