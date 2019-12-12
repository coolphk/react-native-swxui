import React from 'react'
import {View, Picker, StyleSheet} from 'react-native'
import {screenH, screenW} from "../Common/ScreenUtils";
import {connect} from "react-redux";


const styles = StyleSheet.create({
  picker:{
    justifyContent:'center',
    // screenH: 216,//Picker 默认高度
    width:aWidth/2,
  },
  itempicker:{
    color:'#e6454a',
    fontSize:19,
    height:161
  },
  containers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});




class Dates extends React.Component{
  render(){
    return (
      <View style={styles.containers}>
        <Picker
          style={styles.picker}
          mode={Picker.MODE_DIALOG}
          itemStyle={styles.itempicker}
          selectedValue={this.state.choice}
          onValueChange={choice => this.setState({choice: choice})}>
          {
            this.options.map((aOption) => <Picker.Item color='#b5b9be' label={aOption} value={aOption} key={aOption} /> )
          }
        </Picker>
        <Picker
          style={styles.picker}
          mode={Picker.MODE_DIALOG}
          itemStyle={styles.itempicker}
          selectedValue={this.state.choice}
          onValueChange={choice => this.setState({choice: choice})}>
          {
            this.options.map((aOption) =>  {
              return <Picker.Item color='#b5b9be' label={aOption} value={aOption} key={aOption} />
            } )
          }
        </Picker>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  counter: state.counter
})

export default connect(mapStateToProps)(Pickers)
