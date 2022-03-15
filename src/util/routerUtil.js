import React from 'react'
import {
  // Link,
  Redirect,
  Route,
  // BrowserRouter as Router,
  // HashRouter,
  Switch,
} from 'react-router-dom'
function getIdByLastItem(str = '') {
  let id = str.split('/').filter((it) => it)
  // console.log(id)
  if (id.length == 0) {
    return 'id'
  }
  id = id[id.length - 1].trim()
  return id
}
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => {
        let mprops = {
          // ...route,
          routePath: route.path,
          ...route.extendRrops,
        }
        if (route.auth && route.auth(mprops)) {
          return route.auth(mprops)
        }
        // pass the sub-routes down to keep nesting
        return <route.component {...mprops} routes={route.routes} />
      }}
    />
  )
}

function RouteWithRoutes({ routes = [], comProps = {}, ...props }) {
  console.log(routes)

  return (
    <Switch>
      {routes.map((route, i) => {
        let par = getIdByLastItem(route.path)
        let extendRrops = {
          ...comProps,
        }
        if (par) {
          extendRrops = {
            ...extendRrops,
            ...props[par + 'Props'],
          }
        }
        return (
          <RouteWithSubRoutes key={i} {...route} extendRrops={extendRrops} />
        )
      })}
    </Switch>
  )
}

const beforeEach = (props) => {
  return (
    <Redirect
      to={{
        pathname: '/login',
      }}
    />
  )
}

function routerPathTrans(data, path = '') {
  data.forEach((it) => {
    it.path = path + it.path
    it.routes && routerPathTrans(it.routes, it.path)
  })
}

export { RouteWithSubRoutes, beforeEach, RouteWithRoutes, routerPathTrans }
