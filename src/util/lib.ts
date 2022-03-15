  export function mapping() {
    const map = {}
    function set(args: Array<string>, val: any) {
      // args = args.slice()
      if (args.length === 0) {
        return
      }
      let data = map
      args.slice(0, args.length - 1).forEach((key:string) => {
        data[key] = data[key] || {}
        data = data[key]
      })
      data[args[args.length - 1]] = val
    }
    function get(args: Array<string>) {
      let data = map
      try { 
        for (let i = 0, len = args.length; i < len; i++) {
          data = data[args[i]]
        }
      } catch (e) {
        data = {}
      }
      // console.log('获取到的downloadmg', data, startDownloadMap)
      return data
    }
    function del(args: Array<string>) {
      let data = map
      args.slice(0, args.length - 1).forEach((key:string) => {
        data[key] = data[key] || {}
        data = data[key]
      })
      delete data[args[args.length - 1]]
    }
    return {
      set,
      get,
      del,
    }
  }

  export function addHttp(url:string, ref:string = 'http:', isAbs:boolean) {
    if (!url) {
      return ''
    }
    const idx = url.indexOf('http')
    if (idx < 0 || (isAbs && idx > 0)) {
      return ref + url
    }
    return url
  }
  export function execFnloop(fn: Function, count:number = 0) {
    ;(function intor(icount) {
      fn &&
        fn(
          () => intor(icount + 1),
          icount + 1,
          () => intor(icount)
        )
    })(count)
  }
  export function getBase64(file:File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      if (!file) {
        return resolve(null)
      }
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }
  export function throttle(func=Function, wait:number=500) {
    var timeout:any = null, context:any = null, args:any = null
    var previous = 0

    var later = function () {
      previous = +new Date()
      timeout = null
      func.apply(context, args)
    }

    function throttled() {
      var now = +new Date()
      //下次触发 func 剩余的时间
      var remaining = wait - (now - previous)
      // context = this
      args = arguments
      // 如果没有剩余的时间了或者你改了系统时间
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        previous = now
        func.apply(context, args)
      } else if (!timeout) {
        timeout = setTimeout(later, remaining)
      }
    }
    throttled.clear = function () {
      clearTimeout(timeout)
      timeout = null
    }
    return throttled
  }
  // 防抖
  export function debounce(lastCb:Function, timeout = 500, firstCb:Function) {
    let isFristEval = false
    let timmer:any = null
    function gomov() {
      if (!isFristEval) {
        firstCb && firstCb()
        isFristEval = true
      }
      clearTimeout(timmer)
      timmer = setTimeout(() => {
        isFristEval = false
        lastCb && lastCb()
      }, timeout)
    }
    gomov.clear = function () {
      clearTimeout(timmer)
    }

    return gomov
  }
  export function getRand(a:number, b:number) {
    return Math.floor(Math.random() * (b - a) + a)
  }
  export function isBlankObj(obj = {}) {
    return Object.keys(obj).length === 0
  }

