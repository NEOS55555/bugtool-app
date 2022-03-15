// import router from '@/router'
import apiAxios from '@/api'
import dialogMdl from '@/components/Dialog'
import message from '@/components/message'
import TopNav from '@/components/TopNav'
import { routes } from '@/router'
import { eventBus } from '@/util/eventBus'
import { RouteWithRoutes } from '@/util/routerUtil'
import { Input } from '@mui/material'
import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './App.scss'

function plusReady() {
  var plus = window.plus
  // window.plus = plus
  if (!plus.key) {
    return
  }
  plus.key.addEventListener(
    'backbutton',
    function () {
      if (
        window.location.href.indexOf('software') != -1 ||
        window.location.href.indexOf('phone') != -1 ||
        window.location.href.indexOf('connect') != -1
      ) {
        console.log('out')
        'iOS' == plus.os.name
          ? plus.nativeUI.confirm(
              '确认退出？',
              function (e) {
                if (e.index > 0) {
                  plus.runtime.quit()
                }
              },
              'ComicTv',
              ['取消', '确定']
            )
          : window.confirm('确认退出？') && plus.runtime.quit()
      } else {
        console.log('back')
        eventBus.emit('goBack#back')
      }
    },
    false
  )
  plus.navigator.setStatusBarBackground('#D74B28')
}

class App extends Component {
  state = {}
  componentDidMount() {
    if (window.plus) {
      plusReady()
    } else {
      document.addEventListener('plusready', plusReady, false)
    }
    /* eventBus.on('pushState#history', (url, query) => {
      this.props.history.push({
        pathname: url,
        query,
      })
    }) */
    if (localStorage.getItem('SERVER_ADDRESS')) {
      window.SERVER_ADDRESS = localStorage.getItem('SERVER_ADDRESS')
      eventBus.emit('pushState#history', '/software')
    } else {
      eventBus.emit('pushState#history', '/connect')
    }
    /* apiAxios.getAddress().then((res) => {
      window.SERVER_ADDRESS = res
      this.setState({ isok: true })
    }) */
  }
  render() {
    return (
      <>
        <TopNav></TopNav>
        <RouteWithRoutes routes={routes} />
      </>
    )
  }
}

export default withRouter(App)
