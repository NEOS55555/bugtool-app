import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { downloadChapterItem } from '@/util/plus/downloadFile'
import dataStore from '@/util/plus/store'
import message from '@/components/message'
import { execFnloop } from '@/util/lib'
import { downloadMangaByList } from '@/util/plus/download'
import apiAxios from '@/api'
// import Content from '@/components/commonComp/Content'

let isClick = false
let prevClick = {}
let listResObj = {}
function MgDetail({ mgItem, closeCb }) {
  const [isSearching, setIsSearching] = useState(false)
  const [list, setList] = useState([])
  const { bigType, showType, id } = mgItem
  useEffect(() => {
    const list = dataStore.getData([bigType, showType, mgItem.id, 'list']) || []
    const map = {}
    list.forEach((it) => {
      map[it.url] = it
    })
    mgItem.list.forEach((it) => {
      it.isInDownload = !!map[it.url]
      it.isOver = (map[it.url] || {}).isOver
    })
    // console.log('list', mgItem.list)

    setList(mgItem.list.filter((it) => !it.disabled))
  }, [mgItem, setList])

  // li点击
  function liCheck(itm) {
    if (itm.isInDownload) {
      return
    }
    if (itm.active) {
      setList(
        list.map((it) => {
          if (it.title == itm.title) {
            return {
              ...it,
              active: false,
            }
          }
          return it
        })
      )
      if (itm.title == prevClick.title) {
        prevClick = {}
        isClick = false
      }
      return
    }
    if (isClick) {
      let prevIdx = list.findIndex((it) => it.title == prevClick.title)
      let currentIdx = list.findIndex((it) => it.title == itm.title)
      if (prevIdx > currentIdx) {
        ;[currentIdx, prevIdx] = [prevIdx, currentIdx]
      }
      setList(
        list.map((it, idx) => {
          if (idx >= prevIdx && idx <= currentIdx && !it.isInDownload) {
            return {
              ...it,
              active: true,
            }
          }
          return it
        })
      )
      prevClick = {}
      console.log('fffff')
    } else {
      prevClick = itm
      setList(
        list.map((it) => {
          if (it.title == itm.title) {
            return {
              ...it,
              active: true,
            }
          }
          return it
        })
      )
    }
    // console.log('asdbc')
    isClick = !isClick

    // return it;

    //
  }

  function downloadClick() {
    /* const downloadItems = list.filter(it => it.active);

    if (downloadItems.length == 0) {
      message.error('请选择下载的章节！')
      return;
    } */
    apiAxios
      .app2package({
        /* params: {
          showType: 'manga',
          type: 'package',
        }, */
      })
      .then((res) => {
        console.log('res', res)
        // return
        if (res.success) {
          const qdata = mgItem
          let { cover, name } = qdata
          const { extend1, extend2, extend3, unclearTotal } = listResObj
          console.log(listResObj, qdata)
          // return
          const uplist = []
          list.forEach((it) => {
            if (it.active || it.isInDownload) {
              uplist.push({
                ...it,
                active: undefined,
              })
            }
          })

          let mgdata = {
            ...mgItem,
            list: uplist,
          }
          console.log('mgdata', mgdata)
          closeCb()
          downloadMangaByList(mgdata).then((res) => {
            console.log('downloadMangaByList', JSON.stringify(res))
            if (res.success) {
              message.show({
                type: 'success',
                content: '下载成功',
              })
            } else {
              message.show({
                type: 'error',
                content: res.info,
              })
            }
          })
        } else {
          message.show({
            type: 'error',
            content: res.info,
          })
        }
      })
  }
  // const { list } = mgItem

  return (
    <>
      <div>
        <Button
          variant="contained"
          onClick={downloadClick}
          disabled={list.filter((it) => it.active).length == 0}
        >
          下载选中
        </Button>
      </div>

      <div className="content-list detail-list">
        <ul className="content-ul">
          {list.map((it) => {
            return (
              <li
                className={
                  'content-li ' +
                  (it.isInDownload ? 'grey' : it.active ? 'active' : '')
                }
                key={it.title}
                onClick={() => liCheck(it)}
              >
                <p className="name" title={it.title}>
                  {it.showTitle || it.title}
                </p>
                {/* <div className="download-btn">
                    <span className="download-over-text">不确定</span>
                  </div> */}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default MgDetail
