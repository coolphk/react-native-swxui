
import {Alert} from "react-native";

export default class StaticFun {


  /*
  * 字符串插入
  * soure 字符串
  * start 起始位置
  * newStr 要插入的字符串
  * */
  static insertstr(soure, start, newStr) {
    try {
      if (typeof soure == 'string' && typeof start == 'number' && typeof newStr == 'string') {
        return soure.slice(0, start) + newStr + soure.slice(start);
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }

  /*
  * jsonString 验证
  * @str
  * */
  static isJson(str) {
    if (typeof str == 'string') {
      try {
        let obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
  }

  /*
  * 数组筛选合并
  * */
  static ArrayFilterMerge = (array, key) => {
    try {
      if (Array.isArray(array) && typeof key == 'string') {
        let newarr = [];
        array.map((v, i) => {
          if (v[key]) {
            newarr.push(v[key])
          }
        })
        return newarr = this.concats(newarr)
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
  /*
  * 数组合并
  * */
  static concats = (arr) => {
    try {
      return [].concat(...arr.map(x => Array.isArray(x) ? this.concats(x) : x))
    }catch (e) {
      console.warn(e);
      return false
    }
  }

  /*
  * 数组对象去重
  * @params arr key
  * */
  static deweighting(arr, key) {
    let result = [];
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      if (!obj[arr[i][key]]) {
        result.push(arr[i]);
        obj[arr[i][key]] = true;
      }
    }
    return result
  }


  /*
  * alert 提示
  * msg 内容
  * callBackArr 回调数组 详细参考react-native Alert组件
  * */
  static Alert (msg,callBackArr) {
    try {
      Alert.alert(msg, null, callBackArr, {cancelable: false});
    }catch (e) {
      return false
    }
  }


  /*
  * 数组截取
  * arr 数组
  * start 起始位置
  * end 结束位置
  * obj
  * */
  static setPageSplice(arr, start, end, obj) {
    try {
      arr.splice(start, end, obj)
    }catch (e) {
      console.warn(e);
      return false
    }
  }

  /*
  * 深拷贝object带function的对象
  * */
  static deepCopy(obj) {
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          result[key] = this.deepCopy(obj[key]);   //递归复制
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  }

}



