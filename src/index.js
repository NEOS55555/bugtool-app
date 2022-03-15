import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'
import { Provider } from '@/reducer'
import { BrowserRouter as Router, HashRouter } from 'react-router-dom'
// console.log(process.env)
ReactDOM.render(
  <Provider>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)
