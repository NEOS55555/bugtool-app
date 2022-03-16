import React, { useState, useEffect } from 'react'
import { Button, SwipeableDrawer } from '@mui/material'
import { getPageIndex, setPageIndex } from '@/util/record'
import apiAxios from '@/api'
import { withRouter } from 'react-router-dom'
import dataStore from '@/util/plus/store'

function MgDetailCtn(props) {
  const [open, setopen] = useState(false)
  const [list, setlist] = useState([])
  const [mgItem, setmgItem] = useState({})
  const { bigType, showType, id } = props.match.params
  useEffect(() => {
    // console.log('rr', dataStore.getData([bigType, showType, id, 'list']))
    if (bigType && showType && id) {
      apiAxios
        .getOneDetail({
          params: {
            bigType,
            showType,
            id,
          },
        })
        .then((res) => {
          setopen(true)
          setmgItem({
            ...res,
            bigType,
            showType,
            id,
          })
          setlist(dataStore.getData([bigType, showType, id, 'list']))
          // setlist(res.list.filter((it) => !it.disabled && it.isAppOver))
        })
    }
  }, [bigType, showType, id])
  function onliCheck(chapterItem) {
    setPageIndex({ bigType, showType, id }, chapterItem.title)
    props.history.push({
      pathname: `/mgpreview`,
      query: {
        data: {
          mgItem,
          chapterItem,
        },
      },
    })
    // setopen(false)
    // name
    // setchapterItem(li)
  }

  return (
    <SwipeableDrawer
      anchor={'right'}
      open={open}
      onOpen={() => {}}
      onClose={() => {}}
    >
      <Button
        variant="text"
        onClick={() => {
          props.history.goBack()
        }}
      >
        返回
      </Button>
      <div className="content-list detail-list" style={{ width: '100vw' }}>
        <ul className="content-ul">
          {list.map((it) => {
            return (
              <li
                className={
                  'content-li ' +
                  (it.title === getPageIndex({ bigType, showType, id })
                    ? 'active'
                    : '')
                }
                key={it.title}
                onClick={() => onliCheck(it)}
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
    </SwipeableDrawer>
  )
}

export default withRouter(MgDetailCtn)
