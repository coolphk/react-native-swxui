import React, {Component} from 'react';
import {Text, View, StyleSheet, NativeModules, Platform} from 'react-native'
import Theme from '../Theme/default'
import File from './file'
import PropTypes from 'prop-types'

const imgArr = [
  {name: 'excel,xlsx,xls,xlsm,xltx,xltm,xlsb,xlam', img: require('./img/excel.png')},
  {name: 'ppt,pptx,pptm,ppsx,potx,potm,ppam,ppsm', img: require('./img/ppt.png')},
  {name: 'word,docx,doc,dotm,dotx', img: require('./img/word.png')},
  {name: 'jpg,jpeg,png', img: require('./img/image.png')},
  {name: 'image', img: require('./img/image.png')},
  {name: 'zip', img: require('./img/zip.png')},
  {name: 'txt', img: require('./img/txt.png')},
  {name: 'rar', img: require('./img/rar.png')},
  {name: 'pdf', img: require('./img/pdf.png')}
]


const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: Theme.paddingHorizontal,

  },
  inner: {
    borderBottomColor: Theme.colorLightGray3,
    paddingVertical : Theme.paddingVertical
  },
  text: {
    fontSize: Theme.fontSize,
    color: Theme.colorLightGray,
    paddingVertical: Theme.paddingVertical
  }
})


class Index extends Component {

  static defaultProps = {
    title:""
  };

  static propTypes = {
    items:PropTypes.arrayOf(PropTypes.shape({
      text:PropTypes.string.isRequired,
      type:PropTypes.string,
      path:PropTypes.string.isRequired
    })),
    title:PropTypes.string,
    onFilePress:PropTypes.func.isRequired
  };


  constructor(props) {
    super(props);
    this.state = {
      items: this.setImg(this.props.items)
    }
  }
  /*
  * 添加图片
  * items 附件数组
  * */
  setImg = (items) => {
    try {
      if(Array.isArray(items) && items.length > 0){
        items.map((v, i, a) => {
          let exp = v.type !== '' ? new RegExp(v.type) : new RegExp(v.text.slice(v.text.lastIndexOf('.') + 1, v.text.length));
          imgArr.map((val, index) => {
            if (exp.test(val.name))
              v.img = val.img
          })
        })
        return items
      }else{
        return []
      }
    }catch (e) {
      return []
    }
  };

  render() {
    return (
      <View style={styles.view}>
        <View style={[styles.inner, {borderBottomWidth: this.props.bottomLine ? 0.5 : 0}]}>
          {this.props.title !== '' && <Text style={styles.text}>{this.props.title}</Text>}
          {
            this.state.items.map((v, i, a) => {
              return (
                <File key={i + '1'} text={v.text} img={v.img} onPress={() => this.props.onFilePress(v, i)}/>
              )
            })
          }
        </View>
      </View>
    );
  }
}

export default Index;
