import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import React, { Component } from 'react'
// import { Modal } from 'antd'
import ReactDOM from 'react-dom'

class Dialog1 extends Component {
  state = {
    confirmLoading: false,
    open: false,
    title: '',
    content: '',
  }
  show = (config = {}) => {
    this.setState({
      open: true,
      ...config,
    })
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
    const { content, open } = this.state
    return (
      <Dialog
        onCancel={this.hide}
        // maskClosable={false}
        open={open}
        // title={title}
        // footer={footer}
        // visible={visible}
        // onOk={onOk}
        // confirmLoading={confirmLoading}
        okText="确定"
        cancelText="取消"
      >
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={this.state.onClose}>
            {this.state.cancelText || '取消'}
          </Button>
          <Button onClick={this.state.onOk} autoFocus>
            {this.state.okText || '确定'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

let div = document.createElement('div')
let props = {}
document.body.appendChild(div)

let dialogMdl = ReactDOM.render(React.createElement(Dialog1, props), div)

export default dialogMdl
