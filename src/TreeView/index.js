import React, {Component} from 'react';
import {StyleSheet} from 'react-native'
import Tree from './tree'
import CheckBox from "../Checkbox/checkbox";
import Utils from "../Common/Utils";
import LineContainer from "../BaseComponents/LineContainer";
import ToggleButton from "./ToggleButton";
import {setScrollEnabled} from "../State/actions";
import {connect} from "react-redux";
import {HttpPost} from "../Fetch";

class index extends Component {

  constructor(props) {
    super(props)
  }

  setValue(item) {

    this.props.dispatch(setScrollEnabled(false))
    const data = this.props.treeData || []
    let checkedArr = [];
    // 如果是多选
    if (this.props.multiselect) {
      // 判断节点是否有子节点,并且子节点长度大于0
      if (item.children && item.children.length > 0) {
        //选择所有子节点
        Utils.CheckAllChildren(item, 'checked', (!item.checked), item.path)
        if (item.pid !== "") {
          // 通过子节点选中状态修改父节点选中状态
          Utils.CheckAllParent(data, item)
        }
      } else if (!item.children) {
        Utils.CheckAllParent(data, item)
      }
      Utils.GetAllChecked(data, checkedArr)
      //单选
    } else {
      //取消所有选中项
      Utils.CancleAllChecked(data)
      if (!item.children) {
        //选中当前选项及其父级
        Utils.CheckAllParent(data, item)
        Utils.GetAllChecked(data, checkedArr)
      }
    }
    this.props.getCheckedList && this.props.getCheckedList(checkedArr)
    this.forceUpdate()
  }

  async toggle(item) {
    // let sectionTitle = this.props.counter.navigationData[this.props.counter.navigationData.length - 1].page.body.tabs[this.props.counter.tabIndex].Sections[this.props.counter.sectionIndex].title;
    item.expended = !(item.expended)
    if (this.props?.lazy === "true" && item.expended) {
      const params = [
        {id: 'umap-event', value: 'action'},
        {id: 'umap-template-path', value: '/react/foreign/foreignLazy.vtl'},
        {id: 'id', value: item.id},
        {id: 'deptid', value: item.deptid},
        {id: 'umap-version', value: '3.00'},
      ]
      let result = await HttpPost(this.props.counter.serverRoot, params, 5000, FormData)
      Array.isArray(item.children) ? item.children.push(...result) : item['children'] = result
    }
    this.forceUpdate()
  }


  renderItem = (item, index) => {
    return (
      <LineContainer row bottomLine alignItems={'center'}>
        <CheckBox style={{paddingLeft: (item.path && item.path.length - 1) * 15}}
                  multiselect={this.props.multiselect}
                  text={item.text || item.name}
                  setValue={() => this.setValue(item)}
                  isParent={item.isParent === 'true'}
                  checked={item.checked}/>
        {
          item.isParent === "true" ?
            <ToggleButton onPress={() => this.toggle(item)} expended={item.expended}/> : null
        }
      </LineContainer>
    )
  }

  render() {
    return (
      <Tree treeData={this.props.treeData} renderItem={this.renderItem.bind(this)}/>
    );
  }
}

const styles = StyleSheet.create({})

function mapStateToProps(state) {
  return {
    counter: state.counter,
    scrollEnabled: state.counter.scrollEnabled,
  };
}

export default connect(
  mapStateToProps,
)(index);

