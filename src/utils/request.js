import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'
import router from '@/router'
import {
  Notification
} from 'element-ui';
// create an axios instance
const service = axios.create({
  baseURL: '', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log(response.data)
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.

    if (response.status !== 200 || res.status !== 0) {
      Notification({
        title: '系统异常',
        message: res.message,
        type: 'error'
      });

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    const notify = Notification
    switch (error.response.status) {
      case 403:
        notify({
          title: '警告',
          message: '你没有权限访问',
          type: 'warning'
        });
        router.push('/error/401')
        break;
      case 404:
        router.push('/error/404')
        break;
      case 401:
        notify({
          title: '警告',
          message: '你还没登录,请重新登录',
          type: 'warning'
        });
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
        break;
      default:
        notify({
          title: '错误(debug)',
          message: error,
          type: 'error'
        });
    }

    return Promise.reject(error)
  }
)

export default service
