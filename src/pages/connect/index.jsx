import apiAxios from '@/api'
// import dialogMdl from '@/components/Dialog'
import message from '@/components/message'
import { eventBus } from '@/util/eventBus'
import { Button, Input } from '@mui/material'
import React, { useState } from 'react'

function checkaddress(val) {
  message.show({
    type: 'warning',
    content: '检测成功后，将会显示信息',
  })
  window.SERVER_ADDRESS = val
  apiAxios
    .getAddress()
    .then((res) => {
      localStorage.setItem('SERVER_ADDRESS', window.SERVER_ADDRESS)
      message.show({
        content: '成功',
      })
      eventBus.emit('pushState#history', '/software')
      // this.setState({ isok: true })
      // dialogMdl.hide()
    })
    .catch((e) => {
      console.log('ff', e)
      message.show({
        type: 'error',
        content: '报错，请检测地址是否正确',
      })
    })
}
function Connect() {
  const [val, setval] = useState(
    localStorage.getItem('SERVER_ADDRESS') || 'http://:8008'
  )
  return (
    <div>
      <p>为了不使用没必要的摄像头权限，手动输入软件上的地址</p>
      <Input
        defaultValue={val}
        onChange={(e) => {
          console.log(e.target.value)
          setval(e.target.value)
        }}
      />
      <div>
        <Button onClick={(e) => checkaddress(val)}>检测</Button>
      </div>
    </div>
  )
}

export default Connect
