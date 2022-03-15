import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Transform } from '@/util/img/transform'
import { To } from '@/util/img/to'
import { Controller, Virtual } from 'swiper'
import { SwiperSlide } from 'swiper/react/swiper-slide'
import { Swiper } from 'swiper/react/swiper'
import AlloyFinger from 'alloyfinger'
// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import './index.scss'
import { getDownloadPath } from '@/util/plus/downloadFile'
import { Button, Input } from '@mui/material'
import dataStore from '@/util/plus/store'
import { getMangaIndex, getPageIndex, setMangaIndex } from '../../util/record'
import { getNumber } from '@/util'

function initImg(pinchImg) {
  function ease(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2))
  }
  Transform(pinchImg)
  var initScale = 1
  const af = new AlloyFinger(pinchImg, {
    multipointStart: function () {
      initScale = pinchImg.scaleX
    },
    pinch: function (evt) {
      pinchImg.scaleX = pinchImg.scaleY = initScale * evt.zoom
    },
    doubleTap: function () {
      if (pinchImg.scaleX < 1 || pinchImg.scaleX > 1) {
        new To(pinchImg, 'scaleX', 1, 500, ease)
        new To(pinchImg, 'scaleY', 1, 500, ease)
      } else if (pinchImg.scaleX == 1) {
        new To(pinchImg, 'scaleX', 2, 500, ease)
        new To(pinchImg, 'scaleY', 2, 500, ease)
      }
    },
    /* rotate(evt) {
          pinchImg.rotateZ = evt.angle
      } */
  })
  return {
    setSrc(src) {
      if (src) {
        pinchImg.src = src
      }
    },
    reset() {
      pinchImg.scaleX = pinchImg.scaleY = initScale = 1
    },
    destroy() {
      af.destroy()
    },
  }
}
let prevImg = null
let imgNodeList = []
function ImgPreview({ mgItem, chapterItem, onClose, onJumpChapter }) {
  const [isshow, setisshow] = useState(false)
  const [txt, settxt] = useState('')
  const [swiper, setswiper] = useState(null)
  const [currentPage, setcurrentPage] = useState(getMangaIndex(mgItem) || 0)
  // const chapterItem = (mgItem.list || [])[0]
  // console.log('chapterItem', chapterItem)

  const slides = useMemo(() => {
    if (!chapterItem || !mgItem) {
      return []
    }
    if (chapterItem.title !== getPageIndex(mgItem)) {
      setMangaIndex(mgItem, 0)
    }
    prevImg = null
    imgNodeList = []
    const { bigType, showType, bgType, name } = mgItem
    const path = getDownloadPath()
    const arr = []
    for (let i = 0; i < chapterItem.maxPageCount; i += 1) {
      arr.push(
        <SwiperSlide key={i} virtualIndex={i}>
          <img
            src={`${path}${bigType}/${showType}/${name}/${chapterItem.title}/${
              i + 1
            }.${chapterItem.bgType || bgType}`}
            // src="https://cn.bing.com/rp/gU1TnhYp8KRlyEcs6qC0ERe8GJY.png"
            alt=""
          />
        </SwiperSlide>
      )
    }
    return arr
  }, [mgItem, chapterItem])
  function init(slide, isrealinit) {
    console.log('idx', getMangaIndex(mgItem))
    if (getMangaIndex(mgItem)) {
      slide.slideTo(getMangaIndex(mgItem))
    } else if (slide.visibleSlides && slide.visibleSlides[0]) {
      prevImg = initImg(slide.visibleSlides[0].querySelector('img'))
      imgNodeList[0] = prevImg
    }
  }
  function jumpPage() {
    console.log('ff')
    // console.log('txt', txt)
    const num = getNumber(txt)
    if (num) {
      let num1 = num - 1
      swiper.slideTo(num1)
      setMangaIndex(num1)
    }
  }

  return chapterItem && mgItem ? (
    <>
      <div className={'tool-wrapper top ' + (isshow ? 'show' : 'hide')}>
        <p className="title">{chapterItem.title}</p>
      </div>
      <div
        className="mySwiper"
        onClick={() => {
          setisshow(!isshow)
          // console.log('swiper', swiper)
          // console.log()
        }}
      >
        <Swiper
          modules={[Virtual, Controller]}
          onSlideChange={(slide) => {
            setTimeout(() => {
              if (!slide.visibleSlides || !slide.visibleSlides[0]) {
                return
              }
              const img = slide.visibleSlides[0].querySelector('img')
              if (!imgNodeList[slide.activeIndex]) {
                imgNodeList[slide.activeIndex] = initImg(img)
              }
              prevImg = imgNodeList[slide.activeIndex]
              console.log('img', slide.activeIndex)
              setMangaIndex(mgItem, slide.activeIndex)
              setcurrentPage(slide.activeIndex)
            }, 100)
          }}
          onInit={(e) => {
            console.log('init', e)
            init(e, true)
          }}
          virtual
          onSwiper={(e) => {
            setswiper(e)
            init(e)
          }}
          controller={{ control: swiper }}
        >
          {slides}
        </Swiper>
      </div>
      <div className={'tool-wrapper bottom ' + (isshow ? 'show' : 'hide')}>
        <span className="pagepagation">
          <span>{currentPage + 1}</span>/<span>{chapterItem.maxPageCount}</span>
        </span>
        <Input
          id="jumpage"
          placeholder="请输入跳转的页码"
          onChange={(e) => settxt(e.target.value)}
        />
        <Button onClick={jumpPage}>确定</Button>
        {/* <a className="yued" onClick={onJumpChapter}>
          返回到章节列表
        </a> */}
        <Button variant="text" onClick={onClose}>
          返回
        </Button>
      </div>
    </>
  ) : null
}

export default ImgPreview
