import React from 'react'
import {View, StyleSheet} from 'react-native'

import {connect} from 'react-redux';
import Theme from '../Theme/default'

import RowComponent from '../RowComponent'

import AnimateCell from './AnimateCell'


/*
* 组件内样式
* */
const sectionStyle = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Theme.colorWhite,
    //borderRadius:50,
    //borderWidth:1,
    //marginTop:20,
    //overflow:"hidden"
  }
})

class Sections extends React.Component {
  /*
  * section选项卡展开隐藏
  * */
  setIndex =(index) => {
    //this.props.dispatch(setCloseOn(index))
    if(index === 'bottom'){
      this.props.section.collapsed = !this.props.section.collapsed
    }else{
      this.props.section[index].collapsed = !this.props.section[index].collapsed
    }

    this.setState({})
  }

  getRef = (ref) => {
    this.AnimateCells = ref
  }
  showSections = () => {
    this.AnimateCells.setTransform()
  }

  /*
  * 底部固定块
  * value
  * */
  bottomSection = (text,index) => {
    this.props.section.rows[index].value = text;
  }

  /*
  * 添加rows
  * @param flag
  * @param item
  * @param index
  * */
  setRowComponent = (flag,item,index = 0,bottomsection) => {
    if(flag){
      return (
        <RowComponent
          rows={item.rows || []}
          baseType={this.props.baseType || ''}
          baseUrl={this.props.baseUrl || ''}
          sectionIndex={index}
          bottomSection={bottomsection}
        />
      )
    }else{
      return null
    }
  }


  render() {

    if(Array.isArray(this.props.section) && this.props.section.length > 0){
      return (
        this.props.section.map((val, index, arr) => {
          return (
            <View style={[sectionStyle.container,index !== 0 ? {marginTop:10}:null]} key={index + 1}>
              <AnimateCell
                setIndex={() => this.setIndex(index)}
                collapsible={val.collapsible}
                collapsed={val.collapsed}
                title={val.title}
                onRef={this.getRef}
              />
              {
                this.setRowComponent(val.collapsed && val.collapsible || !val.collapsible,val,index)
              }
            </View>
          )
        })
      )
    }else if (Object.keys(this.props.section).length > 0){
      return (
        <View style={[sectionStyle.container,{marginTop:10}]}>
          <AnimateCell
            setIndex={() => this.setIndex('bottom')}
            collapsible={this.props.section.collapsible}
            collapsed={this.props.section.collapsed}
            title={this.props.section.title}
            onRef={this.getRef}
          />
          {
            this.setRowComponent(
              this.props.section.collapsed && this.props.section.collapsible || !this.props.section.collapsible,
              this.props.section,
              0,
              this.bottomSection
            )
          }
        </View>
      )
    }else{
      return ( null )
    }
  }
}


const mapStateToProps = state => ({
  //tabs: State.counter.data.page.body.tabs,
  counter:state.counter,
  tabIndex : state.counter.tabIndex
})


export default connect(mapStateToProps)(Sections);
