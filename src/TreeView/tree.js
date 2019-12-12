import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native'
import Utils from "../Common/Utils";

class tree extends Component {
  constructor(props) {
    super(props)
    Utils.AddPathToItem(this.props.treeData, [])
  }


  renderNode(data) {

    const list = data || []
    const {
      renderItem
    } = this.props

    return list.map((item, index) => {
        return (
          <View key={index}>
            {
              renderItem(item, index)
            }
            <View style={{display: item.expended ? null : 'none'}}>
              {
                item.expended && this.renderNode(item.children)
              }
            </View>
          </View>
        )
      }
    )
  }

  render() {
    return this.renderNode(this.props.treeData, [])
  }
}

export default tree

