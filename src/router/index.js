import AppPage from '@/pages/appPage'
import Connect from '@/pages/connect'
import MgDetailCtn from '@/pages/mgDetailCtn'
import preview from '@/pages/preview'
import SoftwarePage from '@/pages/softwarePage'
import { localStore } from '@/util'
import { routerPathTrans } from '@/util/routerUtil'
import { Redirect } from 'react-router-dom'

const auth = function () {
  const token = localStore.getItem('token')
  if (token) {
    return
  }
  localStore.removeItem('token')
  return (
    <Redirect
      to={{
        pathname: '/login',
      }}
    />
  )
}

const routes = [
  {
    path: '/phone',
    component: AppPage,
  },
  {
    path: '/software',
    component: SoftwarePage,
  },
  {
    path: '/mgpreview',
    component: preview,
  },
  {
    path: '/mgdetail/:bigType/:showType/:id',
    component: MgDetailCtn,
  },
  {
    path: '/',
    component: Connect,
  },

  /* {
    path: '/managePlugin',
    component: ManagePlugin,
    auth,
  }, */
]
routerPathTrans(routes)

export { routes }
