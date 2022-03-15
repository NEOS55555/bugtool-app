import apiAxios from '@/api'
import { showList } from '@/constant/showList'
import {
  Button,
  SwipeableDrawer,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import './index.scss'
import MgContent from './MgContent'

function SoftwarePage() {
  const [tabval, settabval] = useState(showList[0].key)
  const [open, setopen] = useState(false)
  const [list, setlist] = useState([])
  const [mgItem, setmgItem] = useState({})
  useEffect(() => {
    apiAxios
      .getAllList({
        params: {
          bigType: tabval,
          from: 'app',
        },
      })
      .then((res) => {
        setlist(
          res.data.map((it) => ({
            ...it,
            cover: window.SERVER_ADDRESS + '/file?path=' + it.cover,
          }))
        )
      })
  }, [tabval])
  function changeval(e) {
    settabval(e.target.value)
  }
  console.log('software')

  return (
    <div className="softwarepage-wrapper page-wrapper">
      {/* <div className="toggle-ctn">
        <ToggleButtonGroup
          color="primary"
          value={tabval}
          exclusive
          onChange={changeval}
        >
          {showList.map((it) => (
            <ToggleButton key={it.key} value={it.key}>
              {it.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div> */}
      <ul className="mg-list">
        {list.map((it) => (
          <li key={it.id}>
            <div
              className="ctn"
              onClick={() => {
                setopen(true)
                setmgItem(it)
              }}
            >
              {it.cover ? (
                <img
                  className="cover"
                  src={it.cover}
                  onError={() => {
                    setlist(
                      list.map((itm) => {
                        if (it.id === itm.id) {
                          return {
                            ...itm,
                            cover: '',
                          }
                        }
                        return itm
                      })
                    )
                  }}
                  alt=""
                />
              ) : (
                <div className="no-cover">{it.name}</div>
              )}
            </div>
            <div className="ellipsis name" title={it.name}>
              {it.name}
            </div>
            <div className="ellipsis name" title={it.showName}>
              来自:{it.showName}
            </div>
            {/* <div>
              <Button variant="text">下载到手机</Button>
            </div> */}
          </li>
        ))}
      </ul>

      <MgContent
        open={open}
        mgItem={mgItem}
        closeCb={() => setopen(false)}
      ></MgContent>
    </div>
  )
}

export default SoftwarePage
