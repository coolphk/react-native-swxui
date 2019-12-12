import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native'
import Theme from '../Theme/default'
import {scaleSizeH} from "../Common/ScreenUtils";
import pt from 'prop-types'

const styles = StyleSheet.create({
  flatListHeight: {
    maxHeight: scaleSizeH((360))
  },
  textView:{
    borderStyle: "solid",
    borderBottomWidth: 0.5,
    borderBottomColor: Theme.colorLightGray3,
    paddingHorizontal:Theme.paddingHorizontal
  },
  imgStyle:{
    position: "absolute",
    right:Theme.paddingHorizontal
  }
})


export default class Index extends Component {
  componentWillUpdate(nextProps, nextState){
    this.scroll && this.scroll.flashScrollIndicators()
  }
  static defaultProps = {
    setChild:new Function()
  }

  static propTypes = {
    setChild:pt.func
  }

  render() {
    return (
      <View style={{flex:1}}>
        <FlatList
          ref={(e) => this.scroll = e}
          showsVerticalScrollIndicator={true}
          persistentScrollbar={true}
          keyExtractor={(item, index) => (index + 1).toString()}
          data={this.props.list}
          style={this.props.flatListHeight || styles.flatListHeight}
          renderItem={(value) => {
            return this.props.setChild(value,styles)
          }}
        />
      </View>

    )
  }
}

