

function _getChildrenCheckedStatus(children) {
  let flag = false
  children.forEach((item, index) => {
    flag = flag || item.checked
  })
  return flag
}

function _travelData(data) {
  if (data.children && data.children.length > 0) {
    data.children.forEach(item => {
      _travelData(item)
    })
    data.checked = _getChildrenCheckedStatus(data.children)
  }
}

function _travelObject(obj) {
  const array = []
  if (Object.prototype.toString.call(obj) === "[object Object]") {
    for (let key in obj) {
      array.push({id: key, value: obj[key]})
    }
  }
  return array
}

class Utils {
  /**
   * 遍历对象，并根据ID将旧数据替换为新数据
   * @param data
   * @param id
   * @param key
   * @param newValue
   */
  static ChangeObjectValueById(data = [], id, key, newValue) {
    for (let i = 0, length = data.length; i < length; i++) {
      let item = data[i];
      if (item.id === id) {
        item[key] = newValue
        break
      } else {
        this.ChangeObjectValueById(item.children, id, key, newValue)
      }
    }
  }

  /**
   * 选择全部子节点
   * @param data 数据
   * @param key 对象key
   * @param newValue 需要改成的值
   * @returns {Utils.CheckAllChildren.props|{children}|*}
   * @constructor
   */
  static CheckAllChildren(data, key, newValue, path) {
    data[key] = newValue
    if (data.children && data.children.length > 0) {
      data.children.forEach((item, index) => {
        // (!item['path']) && (item['path'] = path.concat(item.id))
        this.CheckAllChildren(item, key, newValue, item.path)
      })
    }
    return data
  }

  /**
   * 根据每级子节点的状态判断当前节点是否需要选中
   * @param data
   * @constructor
   */

  static CheckAllParent(data = [], item) {
    item.checked = !item.checked
    for (let i = 0, length = data.length; i < length; i++) {
      if (item['path'] && item.path.indexOf(data[i].id) != -1) {
        _travelData(data[i])
        break;
      }
    }
  }

  /**
   * 获取全部选中节点的text及id
   * @param data
   * @param checkedArr
   * @constructor
   */
  static GetAllChecked(data = [], checkedArr) {
    data.forEach(item => {
      if (item.checked) {
        //判断isParent属性，然后将该节点添加至数组中
        (!item.isParent || item.isParent === 'false') && checkedArr.push(item)
      }
      this.GetAllChecked(item.children, checkedArr)
    })
  }

  /**
   * 初始化时将默认选中人员添加到选中列表中
   * @param data
   * @param checkedArr
   * @constructor
   */
  static InitAllChecked(data = [], checkedArr) {
    data.forEach(item => {
      if (item.checked) {
        // this.CheckAllParent(initData, item)
        //没有children属性的节点才是最后一级节点，然后将该节点添加至数组中
        !item.children && checkedArr.push(item)
      }
      this.InitAllChecked(item.children, checkedArr)
    })
  }

  static CancleAllChecked(data = []) {
    data.forEach(item => {
      if (item.checked) {
        item.checked = false
        this.CancleAllChecked(item.children)
      }
    })
  }

  static getRawType(value) {
    return Object.prototype.toString.call(value).slice(8, -1)
  }

  static ChageParamsToFormData(params) {
    let array = []
    if (Array.isArray(params)) {
      params.forEach(param => {
        array.concat(_travelObject(param))
      })
    } else {
      array = _travelObject(params)
    }
    return array
  }

  //给原始数据添加path属性，用来判断节点层级和
  static AddPathToItem(data, path) {
    const list = data || []
    list.map((item, index) => {
      item["path"] = path.concat(item.id)
      this.AddPathToItem(item.children, item["path"])
    })
  }
}


export default Utils


