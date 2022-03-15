import apiAxios from '@/api'
import { showList } from '@/constant/showList'
import { Button, SwipeableDrawer } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MgDetail from './MgDetail'

function MgContent({
  open,
  mgItem,
  onClose = function () {},
  onOpen = function () {},
  closeCb,
}) {
  useEffect(() => {
    if (open && mgItem.id) {
      console.log('mgItem', mgItem)
    }
  }, [open, mgItem])
  return (
    <SwipeableDrawer
      anchor={'right'}
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    >
      <div className="mg-content-list">
        <div className="mg-content-title">
          <Button variant="text" onClick={closeCb}>
            返回
          </Button>
          请选择章节下载到手机
        </div>
        <MgDetail mgItem={mgItem} closeCb={closeCb}></MgDetail>
      </div>
    </SwipeableDrawer>
  )
}

export default MgContent
