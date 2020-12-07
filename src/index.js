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