import apiAxios from '@/api'
import dialogMdl from '@/components/Dialog'
import ImgPreview from '@/components/ImgPreview'
import message from '@/components/message'
import { showList } from '@/constant/showList'
import { eventBus } from '@/util/eventBus'
import { downloadMangaByList } from '@/util/plus/download'
import { deleteDir } from '@/util/plus/downloadFile'
import dataStore from '@/util/plus/store'
import { setPageIndex } from '@/util/record'
import {
  Button,
  SwipeableDrawer,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import './index.scss'

function AppPage() {
  const [tabval, settabval] = useState(showList[0].key)
  const [open, setopen] = useState(false)
  const [list, setlist] = useState([])
  const [mgItem, setmgItem] = useState({})
  const [chapterItem, setchapterItem] = useState()
  const getlist = useCallback(() => {
    const magaDataMap = dataStore.getData(['manga'])
    const arr = []
    Object.keys(magaDataMap).forEach((bigType) => {
      const bgitem = magaDataMap[bigType]
      Object.keys(bgitem).forEach((showType) => {
        arr.push(bgitem[showType])
      })
    })
    arr.sort((a, b) => a.downloadTime - b.downloadTime)
    return arr
  }, [])
  useEffect(() => {
    const arr = getlist()
    setlist(arr)
    // console.log('bendi', JSON.stringify(arr))
  }, [setlist, getlist])

  return (
    <div className="app-wrapper page-wrapper softwarepage-wrapper">
      <ul className="mg-list">
        {list.map((it) => (
          <li key={it.id}>
            <div
              className="ctn"
              onClick={() => {
                setopen(true)
                // setmgItem(it)
                eventBus.emit(
                  'pushState#history',
                  `/mgdetail/${it.bigType}/${it.showType}/${it.id}`
                )
              }}
            >
              <div className="no-cover">{it.name}</div>
            </div>
            <div className="ellipsis name" title={it.name}>
              {it.name}
            </div>
            <div className="ellipsis name" title={it.showName}>
              来自:{it.showName}
            </div>
            <div>
              <Button
                onClick={() => {
                  dialogMdl.show({
                    content: '将会删除相应的图片文件，您确定要删除吗？',
                    onClose() {
                      dialogMdl.hide()
                    },
                    onOk() {
                      window.DOWNLOAD_MAP[it.id] = false
                      deleteDir('_downloads/' + it.bigType).then((res) => {
                        dataStore.delData([it.bigType, it.showType, it.id])
                        dialogMdl.hide()
                        message.show({
                          content: '删除成功',
                        })
                        setlist(getlist())
                      })
                    },
                  })
                }}
              >
                删除
              </Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  downloadMangaByList(it)
                }}
              >
                继续下载
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {/* <MgDetail
        open={open}
        mgItem={mgItem}
        onliCheck={(li, index) => {
          setPageIndex(mgItem, li.title)
          setopen(false)
          setchapterItem(li)
        }}
        closeCb={() => {
          // setchapterItem(false)
          setopen(false)
        }}
      ></MgDetail> */}
    </div>
  )
}

export default AppPage
