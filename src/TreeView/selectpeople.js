import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NativeModules, ScrollView, StatusBar, StyleSheet, View} from 'react-native'
import Cell from '../Cell'
import ListView from '../ListView'
import TextView from '../ListView/textView'
import TreeView from '../TreeView'
import Utils from '../Common/Utils'
import {setMultiTreeData, setScrollEnabled} from '../State/actions'
import {HttpPost} from "../Fetch";
import Radio from "../Radio";
import SelectedTop from './selectedTop'
import {scaleSizeH, screenH, screenHeight,isAndroid} from '../Common/ScreenUtils'
import StaticFun from '../StaticFun'
/*import ExtraDimensions from 'react-native-extra-dimensions-android'*/



class SelectPeople extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      multiselect: false,
      treeWrapperHeight: 800,
      statusBarHeight: 0,
      listView: null
    }
    //清空及联树数据
    this.props.counter.multiTreeData = [];
  }

  componentDidMount() {
    if(this.props.counter.tagFlag){
      if (this.props.scrollEnabled) {
        this.props.dispatch(setScrollEnabled(false));
      }
      if (this.props.mulitselectItem) {
        this.props.onChangeText(this.props.mulitselectItem.dpamrtValue.value);
        setTimeout(() => {
          let values = this.props.mulitselectItem.dpamrtValue.value && this.props.mulitselectItem.dpamrtValue.value !== ''
          if (values) {
            this.setMultiTreeData(this.props.mulitselectItem.dpamrtValue.params)
          }
        }, 200)
      }
    }
  }

  /*
 * 获取已选项添加至已选项列表
 * */

  getCheckedList = (data) => {
    this.setState({
      list: data
    })
  }


  /*
    * 根据选择获取树
    * */
  mulitselect = (value, items) => {
    //清空及联树数据
    this.props.counter.multiTreeData = [];
    this.setMultiTreeData(items.params)

    this.props.mulitselectItem.dpamrtOptions.map((v, i, a) => {

      if (value === v.value) {
        this.props.mulitselectItem.dpamrtValue = v;
      }
    });
    this.setAllDelete();
    this.props.onChangeText(value)
  }

  /*
  * 树接口
  * */
  setMultiTreeData = (items) => {
    if(StaticFun.timeOut()){
      StaticFun.timeOutCallBack()
    }else{
      let params = []
      let form = this.props.counter.submitType
      if (form) {
        // params = Utils.ChageParamsToFormData(items)
        for (let obj in items) {
          params.push({id: obj, value: items[obj]})
        }
      } else {
        params = items
      }
      HttpPost(this.props.counter.serverRoot, params, 30000, form).then(res => {
        if (res.data.length !== 0) {
          Utils.AddPathToItem(res.data, [])
          this.props.dispatch(setMultiTreeData(res.data))
          let checkedArr = []
          Utils.InitAllChecked(res.data, checkedArr)
          this.props.mulitselectItem.dpamrtValue.required = true
          this.setState({
            multiselect: res.multiselect,
            list: checkedArr
          })
        }
        //console.log(this.props.counter.multiTreeData)
      }).catch(err => {
        console.warn(err)
      })
    }
  }

  /*
  * 清空所有已选中项
  * */
  setAllDelete = () => {
    Utils.CancleAllChecked(this.props.treeData || this.props.counter.multiTreeData)
    this.setState({
      list: []
    })
  }

  /*
  * 清空单个选中项
  * */
  setDelete = (value, index) => {
    // let list = JSON.parse(JSON.stringify(this.State.list))
    let list = this.state.list
    list.splice(index, 1)
    this.setState({
      list: [...list]
    })
    Utils.CheckAllParent(this.props.treeData || this.props.counter.multiTreeData, value)
  }
  /*
  * 添加树渲染高度
  * */
  setTreeWrapperHeight(e) {
    const {StatusBarManager} = NativeModules;
    let cardHeight = this.props.showCard ? scaleSizeH(80) : 0;
    let statusBarHeight
    //console.log(`e.nativeEvent.layout.y===${e.nativeEvent.layout.y}`);
    let wrapperY = e.nativeEvent.layout.y
    if (isAndroid()) {
      statusBarHeight = StatusBar.currentHeight; //获取状态栏高度
      if (screenHeight - screenH < statusBarHeight * 2 || screenHeight === screenH) {
        this.setState({
          treeWrapperHeight: screenH - e.nativeEvent.layout.y - scaleSizeH(120 + 140 + 140) - statusBarHeight + cardHeight
        })
      } else if (screenHeight > statusBarHeight * 2 || screenHeight - screenH === statusBarHeight) {
        this.setState({
          treeWrapperHeight: screenH - e.nativeEvent.layout.y - scaleSizeH(120 + 140 + 140)+ cardHeight
        })
      }
    } else {
      StatusBarManager.getHeight(iosStatusBarHeight => {
        this.setState({
          treeWrapperHeight: screenH - wrapperY - scaleSizeH(120 + 140 + 140) - iosStatusBarHeight.height + 15+ cardHeight
        })
      })
    }
  }

  //重新设置tree父级scrollview的高度
  layout = (e) => {
    this.setTreeWrapperHeight(e)
  }

  /*
  * 已选列表数据
  * */

  setTextView = (value,styles) => {
    return (
      <TextView
        del={true}
        text={value.item.text}
        setDelete={() => {
          this.setDelete(value.item, value.index)
        }}
        imgStyle={styles.imgStyle}
        style={styles.textView}
      />
    )
  }

  componentWillUnmount() {
    this.props.dispatch(setScrollEnabled(true))
    //clearTimeout(this.onTimes)
  }

  render() {
    return (
      <View
        onTouchStart={() => {
          if (this.props.scrollEnabled)
            this.props.dispatch(setScrollEnabled(false))
        }}
        onTouchMove={() => {
          if (this.props.scrollEnabled)
            this.props.dispatch(setScrollEnabled(false))
        }}
      >

        {
          this.props.mulitselectItem ?
            <Radio
              dpamrtValue={this.props.mulitselectItem.dpamrtValue || ''}
              defaultValue={this.props.mulitselectItem.dpamrtValue ? this.props.mulitselectItem.dpamrtValue.text : ''}
              onChangeText={(value, item) => this.mulitselect(value, item)}
              type="radio"
              options={this.props.mulitselectItem.dpamrtOptions}
              title={this.props.mulitselectItem.title}
            /> : null
        }

        <Cell title={'已选人员'}>
          <SelectedTop
            list={this.state.list}
            multiselect={this.props.multiselect || this.state.multiselect}
            setAllDelete={this.setAllDelete}
            setDelete={() => this.setDelete(this.state.list[0])}
            placeholder={this.props.mulitselectItem ? this.props.mulitselectItem.dpamrtValue.placeholder : ''}
            AlertTitle={this.props.mulitselectItem && this.props.mulitselectItem.title}
          />
        </Cell>

        {
          this.state.list.length > 0 && this.props.multiselect || this.state.multiselect  &&
          <ListView list={this.state.list} setChild={this.setTextView}/>
        }

        {
          this.state.list.length > 0 && <View style={{height: this.props.showCard ? 0 : scaleSizeH(16), backgroundColor: '#eeeeee'}}/>
        }

        <ScrollView onLayout={this.layout} style={{height: this.state.treeWrapperHeight}}>
          <TreeView
            key={this.state.list}
            getCheckedList={this.getCheckedList}
            multiselect={this.props.multiselect || this.state.multiselect}
            treeData={this.props.treeData || this.props.counter.multiTreeData}
            lazy={this.props.lazy}
          />
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    scrollEnabled: state.counter.scrollEnabled,
    counter: state.counter
  };
}

export default connect(mapStateToProps)(SelectPeople);
