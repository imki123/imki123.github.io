import React from 'react'
import ReactDOM, { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { resize } from './utils/util'

const rootElement = document.getElementById('root')

if (rootElement.hasChildNodes()) {
  hydrate(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>,
    rootElement,
  )
} else {
  ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>,
    document.getElementById('root'),
  )
}

//리사이즈 이벤트 등록
let timer = null
window.addEventListener('resize', function () {
  //스로틀링 구현
  if (!timer) {
    timer = setTimeout(() => {
      timer = null
      resize()
    }, 100)
  }
})

//윈도우 로드 이벤트 등록.
let scroll = 0
window.addEventListener('load', function () {
  resize()
  const $header = document.querySelector('#headerWrapper')
  $header.style.top = '0px'

  //스크롤 이벤트 등록. 스크롤이 위로 올라가면 헤더 보이고 내려가면 숨김.
  document.body.addEventListener('scroll', function (event) {
    //스로틀링 구현
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        //여기에 스로틀링 내부에서 할일 작성
        if (document.body.scrollTop >= scroll) {
          $header.style.top = '-48px'
        } else {
          $header.style.top = '0px'
        }
        scroll = document.body.scrollTop
      }, 100)
    }
  })
})
