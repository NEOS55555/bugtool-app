// 数据存储
// const sotrg = localStorage
// const sotrg = plus.storage
// plus.storage
/* if (!window.plus) {
  window.plus = {}
  window.plus.storage = localStorage
} */
export class PlusStorage {
  constructor(name) {
    this.name = ''
  }
  getItem(key) {
    let data = null
    try {
      data = JSON.parse(window.plus.storage.getItem(key))
    } catch (e) {
      console.log('转换失败')
    }
    return data
  }
  getstr(val) {
    return JSON.stringify(val)
  }
  setItem(key, val) {
    if (val === undefined) {
      return
    }
    window.plus.storage.setItem(key, this.getstr(val))
  }
  //设置缓存
  setData(keyarr, val) {
    if (keyarr.length == 0) {
      // return
      throw Error('请输入key值')
    }
    // console.log('keyarr', keyarr)
    var data = this.getItem(keyarr[0]) || {}
    let prevData = data
    const len = keyarr.length
    for (let i = 1; i < len; i++) {
      const key = keyarr[i]
      // debugger
      if (i == len - 1) {
        // console.log('prevData', prevData)
        prevData[key] = val
      } else {
        if (!prevData[key]) {
          prevData[key] = {}
        }
        prevData = prevData[key]
      }
    }
    // console.log(data)
    this.setItem(keyarr[0], data)
  }
  //拿到缓存
  getData(keyarr) {
    if (keyarr.length == 0) {
      // return
      throw Error('请输入key值')
    }
    var data = this.getItem(keyarr[0]) || {}
    for (let i = 1, len = keyarr.length; i < len; i++) {
      data = data[keyarr[i]]
      if (data === undefined) {
        return data
      }
    }
    return data
  }
  delData(keyarr) {
    const len = keyarr.length
    if (len == 0) {
      // return
      throw Error('请输入key值')
    }
    if (len === 1) {
      this.removeItem(keyarr[0])
      return
    }
    try {
      var data = this.getItem(keyarr[0]) || {}
      let prevData = data
      for (let i = 1; i < len - 1; i++) {
        const key = keyarr[i]
        prevData = data[key]
      }
      delete prevData[keyarr[len - 1]]
    } catch (e) {}

    this.setItem(keyarr[0], data)
  }
  //移出缓存
  removeItem(key) {
    window.plus.storage.removeItem(key)
  }
  //移出全部缓存
  clear() {
    window.plus.storage.clear()
  }
}

/* var a = new window.plusStorage()
a.setData(['a', 'b', 'list'], [{}]) */
