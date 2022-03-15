export function isLegal(str = '') {
  if (typeof str === 'number') {
    return !isNaN(str)
  }
  /*if (str === '' || str === null) {
			return false;
		}*/
  const reg = /[\s\@\#\$\%\^\&\*\{\}\:\.\"\'\<\>\?\|]/gi
  return !reg.test(str)
}
// 不包含空格
export function isLegalExps(str = '') {
  if (typeof str === 'number') {
    return !isNaN(str)
  }
  /*if (str === '' || str === null) {
			return false;
		}*/
  const reg = /[\@\#\$\%\^\&\*\{\}\:\.\"\'\<\>\?\|]/gi
  return !reg.test(str)
}
export function Validator() {
  this.list = []
  this.add = (method, errCb) => {
    // console.log(val)
    this.list.push({
      run: (val) => method(val),
      errCb,
    })
  }
  this.check = (val) =>
    this.list.every(({ run, errCb }) =>
      run(val) ? true : errCb && errCb() && false
    )
}
/* 
  var a = emitByOrder('open>week>strong>close','>')
  a.set('open', () => {
    console.log('open')
  })
  a.set('week', () => {
    console.log('week')
  })
  a.set('strong', () => {
    console.log('strong')
  })
  a.set('close', () => {
    console.log('close')
  })
  a.next()
  */
export function emitByOrder(ruleList, type) {
  const map = {}
  const rightMove = '>'
  const slideMove = '-'
  let isSlideRight = true
  ruleList = Array.isArray(ruleList)
    ? ruleList
    : ruleList.split('>').map((it) => it.trim())
  let currentKeyIndex = -1
  return {
    setRunList(rlist) {
      ruleList = rlist
    },
    set(key, val) {
      map[key] = val
    },
    change(index) {
      currentKeyIndex = index
      this.run()
    },
    run() {
      const currentKey = ruleList[currentKeyIndex]
      map[currentKey] && map[currentKey]()
    },
    next(val) {
      if (val) {
        this.change(val)
        return
      }
      switch (type) {
        case rightMove:
          {
            let index = currentKeyIndex + 1
            if (index >= ruleList.length) {
              index = 0
            }
            currentKeyIndex = index
          }
          break
        case slideMove:
          if (isSlideRight) {
            let index = currentKeyIndex + 1
            if (index >= ruleList.length) {
              index = currentKeyIndex - 1
              isSlideRight = false
            }
            currentKeyIndex = index
          } else {
            let index = currentKeyIndex - 1
            if (index < 0) {
              index = currentKeyIndex + 1
              isSlideRight = true
            }
            currentKeyIndex = index
          }
          break
        default: {
          let index = currentKeyIndex + 1
          if (index >= ruleList.length) {
            return
          }
          currentKeyIndex = index
        }
      }

      this.run()
    },
  }
}
