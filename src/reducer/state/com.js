// import { menuList } from '@/constant'

import { UPDATE_COM_DATA } from '@/constant'

const initState = {
  // 查看的是哪个列表
  // menuType: menuList[0].key,
  pluginList: [],
}
const comState = (state = initState, { type, data }) => {
  switch (type) {
    case UPDATE_COM_DATA:
      return {
        ...state,
        ...data,
      }
    default:
      return state
  }
}

export default comState
