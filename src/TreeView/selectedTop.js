import React, {Component} from 'react';
import TextView from "../ListView/textView";
import Theme from "../Theme/default";
import Buttons from "../Button/button";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Theme.buttonActionColor,
    borderRadius: 25,
    width: 60,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    padding:0
  },
  textStyle:{
    color: Theme.colorBlack,
    fontSize: Theme.fontSize,
  }
})




class SelectedTop extends Component {
  render() {
    if(this.props.list.length > 0){
      if(this.props.multiselect){
        return (
          <Buttons
            text={'清 空'}
            onPress={() => this.props.setAllDelete()}
            style={styles.buttonStyle}
            textStyle={{color: "#ffffff"}}
          />
        )
      }else{
        return (
          <TextView text={this.props.list[0].text}
                    textStyle={styles.textStyle}
                    del={this.props.list[0].text}
                    setDelete={() => this.props.setDelete(this.props.list[0])}

          />
        )
      }
    }else{
      return (
        <TextView
          placeholder={this.props.placeholder || '添加已选人员'}
          textStyle={{color: "#B8B8B8", fontSize: Theme.fontSize}}
          AlertTitle={this.props.AlertTitle}
        />
      )
    }
  }
}

export default SelectedTop;
