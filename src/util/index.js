/* const { RouteWithRoutes, routerPathTrans } = routerUtil
export { RouteWithRoutes, routerPathTrans } */
// export const abc = '123'

export const localStore = () => {}

function addZero(n) {
  return n < 10 ? '0' + n : n
}
export const formatDate = (d, spts = ':') => {
  const date = new Date(d)
  const ymd = [
    date.getFullYear(),
    addZero(date.getMonth() + 1),
    addZero(date.getDate()),
  ].join('-')
  const hms = [
    addZero(date.getHours()),
    addZero(date.getMinutes()),
    addZero(date.getSeconds()),
  ].join(spts)
  return ymd + ' ' + hms
}

export const dateForNow = (date) => {
  date = new Date(date)
  // 相差的秒数
  const xs = (new Date().getTime() - date.getTime()) / 1000
  const xm = xs / 60
  const xh = xm / 60
  const xd = xh / 24
  if (xd >= 1) {
    return Math.floor(xd) + '天前'
  } else if (xh >= 1) {
    return Math.floor(xh) + '小时前'
  } else if (xm >= 1) {
    return Math.floor(xm) + '分钟前'
  } else if (xs >= 10) {
    return Math.ceil(xs) + '秒前'
  } else {
    return '刚刚'
  }
}

export const isInCheck = (status) => status != 0 && status != 1 && status != 3
export const isInPass = (status) => status == 1
export const getNumber = function (num, def) {
  let total = parseInt(num)
  total = isNaN(total) ? def : total
  return total
}
