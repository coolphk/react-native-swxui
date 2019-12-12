import React, {Component} from 'react';
import TextLine from "./TextLine";
import TextArea from "./TextArea";
import pt from "prop-types";

class RichText extends Component {

  static propTypes = {
    //左侧小图标
    titleFlag: pt.bool,
    //控件类型
    // type: pt.string,
    //左侧内容
    title: pt.string,
    //右侧内容，此处如果是数组，则转换为多行文本
    value: pt.oneOfType([pt.string, pt.array]),
    //左侧标题是否带颜色
    titleColor: pt.bool,
    //内容是否为粗体
    fontWeight: pt.bool,
    // 内容是否带颜色
    valueColor: pt.bool,
    // 是否带下划线
    bottomLine: pt.bool,
    // 左侧标题宽度
    maxLeftWidth: pt.string,
    // 右侧内容宽度
    maxRightWidth: pt.string,
    // 底部下划线宽度true:为两侧有空白，false:通栏
    lineWidth: pt.bool,
    // 布局方式
    row: pt.bool,
    // 文本对齐方式
    textAlign: pt.oneOf(['left', 'right', 'center'])
  }


  static defaultProps = {
    titleFlag: false,
    // type: "text",
    title: "",
    value: "",
    titleColor: false,
    fontWeight: false,
    valueColor: false,
    bottomLine: true,
    maxLeftWidth: "",
    maxRightWidth: "",
    lineWidth: false
  }

  render() {
    const {
      titleFlag,
      // type,
      title,
      value,
      titleColor,
      fontWeight,
      valueColor,
      bottomLine,
      textAlign,
      maxLeftWidth,
      maxRightWidth,
      lineWidth,
      row
    } = this.props

    if (!Array.isArray(value)) {
      return (
        <TextLine
          titleFlag={titleFlag}
          // type={type}
          title={title}
          value={value}
          titleColor={titleColor}
          fontWeight={fontWeight}
          valueColor={valueColor}
          bottomLine={bottomLine}
          maxLeftWidth={maxLeftWidth}
          maxRightWidth={maxRightWidth}
          lineWidth={lineWidth}
        />
      )
    } else {
      return (
        <TextArea
          row={row}
          // type={type}
          title={title}
          value={value}
          textAlign={textAlign}
          maxLeftWidth={maxLeftWidth}
          maxRightWidth={maxRightWidth}
          bottomLine={bottomLine}
          fontWeight={fontWeight}
          lineWidth={lineWidth}
        />
      )
    }
  }
}

export default RichText;
