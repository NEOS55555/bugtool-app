import { CONFIG, HTTP } from '@/constant/api'
import { eventBus } from '@/util/eventBus'
import axiosOri from 'axios'
// const { API_URL } = comConstant
// console.log(CONFIG.BASEURL)
const axios = axiosOri.create({
  // baseURL: CONFIG.BASEURL,
  timeout: CONFIG.TIMEOUT,
  // headers: { 'X-Custom-Header': 'foobar' },
})

//请求拦截
axios.interceptors.request.use(
  (config) => {
    // loading().transShow()
    // console.log('config', config)
    config.headers = config.headers || {}
    config.headers.token = localStorage.getItem('token')
    return config
  },
  (err) => {
    // loading().close()
    return Promise.reject(err)
  }
)

function dealResCode(status) {
  switch (status) {
    case HTTP.CODE_401:
      console.log('重新登陆')
      localStorage.removeItem('token')
      eventBus.emit('pushState#history', '/login')
      return false
    case HTTP.CODE_200:
      return true
    default:
      return true
  }
}

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    const { data = {}, status } = response
    if (dealResCode(status)) {
      return data
    }
    return Promise.reject(response)
    /* if (data[CONFIG.RESPONSE_CODE] !== HTTP.CODE_200) {
      return Promise.reject(response)
    } */
    // return data
  },
  function (err, a) {
    console.log(err, a)
    console.log(err.response)
    if (err.response) {
      const { status } = err.response
      dealResCode(status)
    }

    return Promise.reject(err)
  }
)

const pstMethods = ['post', 'put', 'delete']
const methods = ['get', 'patch', ...pstMethods]

const aAxios = {}

methods.forEach((method) => {
  const isPst = pstMethods.indexOf(method) !== -1
  aAxios[method] = (url, obj = {}) => {
    let { params = {}, config = {}, lazyput } = obj
    console.log(params)
    url = url.replace(/(:[a-zA-z0-9]+)/gi, function (sep) {
      const param = params[sep.slice(1)]
      if (!lazyput) {
        delete params[sep.slice(1)]
      }
      return param || sep
    })
    console.log('--', params)
    params = isPst ? params : { params, ...config }
    console.log('url:', url, params, config)
    return axios[method](url, params, config)
  }
})

aAxios.send = function (url, obj) {
  obj.lazyput = obj.lazyput == null ? url.lazyput : obj.lazyput
  return this[url.method](url.path, obj)
}

export default aAxios
