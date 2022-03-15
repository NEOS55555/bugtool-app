import message from '@/components/message'
import { execFnloop } from '../lib'
import { downloadChapterItem } from './downloadFile'
import dataStore from './store'

function downloadManga(mgdata, cb, execCount = 0) {
  const { bigType, showType, id, list } = mgdata
  if (execCount > 3) {
    cb({
      success: false,
      info: '超过最大次数',
    })
  }

  // return
  execFnloop((next, count) => {
    if (count > list.length) {
      if (list.filter((it) => !it.isOver).length === 0) {
        // 全部下载完成
        console.log('全部下载完成了')
        cb({
          success: true,
        })
      } else {
        console.log('还有剩的')
        downloadManga(mgdata, cb, execCount + 1)
      }
      return
    }
    var pageIndex = count - 1
    const mgcptItem = list[pageIndex]
    if (mgcptItem.isOver) {
      next()
      return
    }
    downloadChapterItem({ ...mgdata, mgcptItem }).then((res) => {
      if (res.success && res.code === 200) {
      } else {
        // 有缺页，那也没法啊
      }
      mgdata.list[pageIndex].isOver = true
      dataStore.setData(
        [bigType, showType, id, 'list', pageIndex, 'isOver'],
        true
      )
      next()
    })
  })
}
window.DOWNLOAD_MAP = {}
export function downloadMangaByList(mgdata) {
  const { bigType, showType, id } = mgdata

  return new Promise((resolve) => {
    if (window.DOWNLOAD_MAP[id]) {
      return resolve({
        success: false,
        info: '正在下载，请不要重复点击',
      })
    }
    window.DOWNLOAD_MAP[id] = true
    dataStore.setData([bigType, showType, id], {
      ...mgdata,
      downloadTime: Date.now(),
    })
    message.show({
      type: 'success',
      content: '添加成功即将下载',
    })
    downloadManga(mgdata, (res) => {
      window.DOWNLOAD_MAP[id] = false
      resolve(res)
    })
  })
}
