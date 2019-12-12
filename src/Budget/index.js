import React, {Component} from 'react';
import Radio from '../Radio'
import RowComponent from "../RowComponent";
import Section from '../Sections/index'
import {scaleSizeH} from "../Common/ScreenUtils";
import PropTypes from 'prop-types'



class Budget extends Component {

  static propTypes = {
    item:PropTypes.shape({
      userDefaultParams:PropTypes.shape({
        key:PropTypes.string.isRequired
      }).isRequired,
      userList:PropTypes.arrayOf(PropTypes.shape({
        text:PropTypes.string.isRequired,
        key:PropTypes.string.isRequired,
        value:PropTypes.string||PropTypes.number,
        rows:PropTypes.array.isRequired
      }))
    })
  }


  constructor(props) {
    super(props)
    this.changeText(false, this.props.item.userDefaultParams)
  }

  /*
  * 添加section
  * item 要渲染的page数组
  * text 判定是否需要刷新
  * */
  setSectionList = (item, text) => {
    let newarr = [], arr = [], rows = JSON.parse(JSON.stringify(item));
    //深拷贝下item数组进行数组分割重组
    rows.map((v, i, a) => {
      //判断是否为标题
      if (v.titleFlag) {
        newarr.push(i)
      }
    })
    if (newarr.length > 0) {
      newarr.map((v, i, a) => {
        //截取数组添加至arr
        arr.push(rows.slice(v, a[i + 1] ? a[i + 1] : item.length))
      })
      //判断是否为新加载
      if (text) {
        this.setState({
          item: arr
        })
      } else {
        this.state = {
          item: arr
        }
      }
    }else{
      this.state = {
        item:[]
      }
    }
  }

  /*
  * 改变当前渲染数据
  * @param text
  * @param item
  * */
  changeText = (text, item) => {
    this.props.item.userList.map((v, i) => {
      if (v.key === item.key) {
        if (!v.rows) {
          v.rows = []
        }
        this.props.item.userDefaultParams = v;
      }
    })
    this.setSectionList(this.props.item.userDefaultParams.rows || [], text)
    if (text) {
      this.setState({})
    }
  }
  /*
  * 获取input值添加进params内的value
  * @param value
  * @param index
  * */
  setInputValue = (value, index) => {
    this.props.item.userDefaultParams.rows[index].value = value;
    this.setState({})
  }
  /*
  * 满足长短不一的下划线！要排除每个内置块的最后一行
  * @param val 属性值
  * @param index 下标
  * @param array val的父级
  * */
  setUnderline = (val, index, array) => {
    /*if (!val.longLine && !val.titleFlag && array[index + 1] && !array[index + 1].titleFlag) {
      return (
        <View style={style.lineView}>
          <View style={style.line}/>
        </View>
      )
    }*/
  }

  render() {
    return (
      <>
        <Section marginTop={scaleSizeH(32)} firstSection={true} showCard={this.props.showCard}>
          <Radio
            type='radio'
            title={this.props.item.title}
            options={this.props.item.userList}
            value={this.props.item.userDefaultParams.value}
            onChangeText={(text, item) => this.changeText(text, item)}
            defaultValue={this.props.item.userDefaultParams.text}
          />
        </Section>
        {
          this.state.item.map((v, i, a) => {
            let copyRows = JSON.parse(JSON.stringify(v));
            let rows = copyRows.splice(1, copyRows.length);
            return (
              <Section key={i} title={v[0].title} hide={false} marginTop={scaleSizeH(16)}
                       showCard={this.props.showCard}>
                <RowComponent rows={rows}/>
              </Section>
            )
          })
        }
      </>
    );
  }
}

export default Budget;
