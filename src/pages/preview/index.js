import ImgPreview from '@/components/ImgPreview'
import React from 'react'
import { withRouter } from 'react-router-dom'

function Preview(props) {
  const { mgItem, chapterItem } = (props.location.query || {}).data
  return (
    mgItem && (
      <ImgPreview
        mgItem={mgItem}
        onClose={() => props.history.goBack()}
        chapterItem={chapterItem}
        // onClose={() => setchapterItem(false)}
      ></ImgPreview>
    )
  )
}

export default withRouter(Preview)
