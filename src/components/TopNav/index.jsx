import { eventBus } from '@/util/eventBus'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PhoneIcon from './imgs/phoneIcon'
import SoftwareIcon from './imgs/softwareIcon'

import './index.scss'

const bottomList = [
  {
    key: 'connect',
    name: '链接软件',
    // icon: <SoftwareIcon />,
  },
  {
    key: 'software',
    name: '漫画列表',
    icon: <SoftwareIcon />,
  },
  {
    key: 'phone',
    name: '本地下载列表',
    icon: <PhoneIcon />,
  },
]

function TopNav(props) {
  const [value, setValue] = useState(bottomList[0].key)
  useEffect(() => {
    eventBus.on('pushState#history', (url, query) => {
      if (bottomList.findIndex((it) => '/' + it.key === url) > -1) {
        setValue(url.slice(1))
      }
      props.history.push({
        pathname: url,
        query,
      })
    })
    eventBus.on('goBack#back', () => {
      props.history.goBack()
    })
  }, [props])
  return (
    <div className="bottom-nav">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
          props.history.push('/' + newValue)
        }}
      >
        {bottomList.map((it) => (
          <BottomNavigationAction
            key={it.key}
            value={it.key}
            label={it.name}
            icon={it.icon}
          />
        ))}
      </BottomNavigation>
    </div>
  )
}

export default withRouter(TopNav)
