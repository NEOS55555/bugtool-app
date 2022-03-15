import { Alert, Snackbar } from '@mui/material'
import React, { Component } from 'react'
// import { Modal } from 'antd'
import ReactDOM from 'react-dom'

class Dialog extends Component {
  state = {
    confirmLoading: false,
    open: false,
    title: '',
    content: '',
  }
  show = ({ content, type, time }) => {
    this.setState({
      open: true,
      content,
      type: type || 'success',
    })
    clearTimeout(this.timmer)
    if (time === 0) {
      return
    }
    this.timmer = setTimeout(() => {
      this.hide()
    }, time || 3000)
  }
  showLoading = () => {
    this.setState({
      confirmLoading: true,
    })
  }
  hideLoading = () => {
    this.setState({
      confirmLoading: false,
    })
  }
  hide = () => {
    this.setState({
      confirmLoading: false,
      open: false,
      footer: undefined,
    })
  }
  render() {
    const { content, open, type } = this.state
    return (
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={this.hide}
      >
        <Alert onClose={this.hide} severity={type} sx={{ width: '100%' }}>
          {content}
        </Alert>
      </Snackbar>
    )
  }
}

let div = document.createElement('div')
let props = {}
document.body.appendChild(div)

let message = ReactDOM.render(React.createElement(Dialog, props), div)

export default message
