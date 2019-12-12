import store from '../State/store'
import {setMaskFlag} from '../State/actions'
import {Alert, NativeModules} from 'react-native'


const {NativeInteraction} = NativeModules;
let baseUrl = '', baseFormData = '', baseForm, baseShowMask, baseTimeout, baseResponse;
//先定义延时函数
const delay = (timeOut = 200 * 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!baseResponse) {
        store.dispatch(setMaskFlag(false))
        Alert.alert(
          '网络请求超时，是否重新请求',
          '',
          [
            {text: '重新登录', onPress: () => NativeInteraction.BackToLogin()},
            {text: '确定', onPress: () => HttpPost(baseUrl, baseFormData, baseTimeout, baseForm, baseShowMask)},
          ],
          {cancelable: false}
        )
      }
    }, timeOut);
  })
};


//fetch网络请求
const fetchPromise = (method, url, formData, form, showMask) => {
  baseUrl = url;
  baseFormData = formData;
  baseForm = form;
  baseShowMask = showMask;
  showMask && store.dispatch(setMaskFlag(true))
  let newFormData = new FormData()
  let headers = {"Cookie": store.getState().counter.cookies};
  let body;
  if (form) {
    formData.map((v, i) => {
      newFormData.append(v.id, v.value)
    })
    headers["Content-Type"] = "multipart/form-data";
    body = newFormData
  } else {
    headers["Accept"] = "application/json";
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(formData)
  }

  let obj = {
    method: method,
    headers: headers,
    // credentials: 'omit',
    body: body
  }
  if(store.getState().counter.cookies === ''){
    obj.credentials = "include"
  }

  // Alert.alert("发送前的cookie__1.1.7", headers.Cookie)
  return new Promise((resolve, reject) => {
    fetch(url, obj).then((response) => {
      if (response.ok) {
        baseResponse = response.ok
        return response.json();
      } else {
        reject(new Error('服务器异常'));
      }
    }).then((responseJson) => {
      store.dispatch(setMaskFlag(false))
      resolve(responseJson);
    }).catch((err) => {
      store.dispatch(setMaskFlag(false))
      reject(new Error(err));
    }).finally(() => {
      // debugger
      store.dispatch(setMaskFlag(false))
    })
  })
};


//race任务
const _fetch = (fetchPromise, timeout) => {
  return Promise.race([fetchPromise, delay(timeout)])
};

//post
const HttpPost = (url, formData, timeout = 30 * 1000, form, showMask = true) => {
  baseTimeout = timeout;
  return _fetch(fetchPromise('POST', url, formData, form, showMask), timeout);
};

//get
const HttpGet = (url, timeout = 30 * 1000, showMask = true) => {
  return _fetch(fetchPromise('Get', url, showMask), timeout);
};

export {HttpPost, HttpGet}
