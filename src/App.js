import React, { createContext, useEffect, useState } from 'react'
import './App.scss'
import { useLocation } from 'react-router-dom'

import Header from './components/Header'
import Body from './components/Body'
import Guide from './components/Guide'
import Content from './components/Content'
import Setting from './components/Setting'
import Axios from 'axios'
import Meta from './components/Meta'
import {resizeTextarea, checkToken} from './utils/util'

const AppContext = createContext()

function App() {
  const location = useLocation() //페이지 경로 변경 감지
  const [ready, setReady] = useState(false)
  const [login, setLogin] = useState(false)
  const [menus, setMenus] = useState([
    { name: 'home', count: 1, order: 1 },
    { name: 'programming', order: 2 },
    { name: 'article', order: 3 },
  ])

  //useContext 이용하여 하위 컴포넌트에 상태 전달
  const store = {
    ready,
    setReady,
    login,
    setLogin,
    menus,
    setMenus,
  }

  // 포스트에서 태그 정보를 가져와서 메뉴에 표시함, Quill의 태그목록에 표시
  useEffect(() => {
    let url = process.env.REACT_APP_URL + '/menus'
    //url = process.env.REACT_APP_LOCAL_URL+'/menus'

    Axios.get(url, {
      withCredentials: true,
    }) //메뉴 태그 가져오기
      .then((res) => {
        setMenus(res.data)
      })
      .catch((e) => console.log(e)) //실패
  }, [location.pathname])

  //주소 변경될 때, 토큰 체크하고 포스트 조회하기
  useEffect(() => {
    checkToken(login, setLogin)
  }, [location.pathname, location.search, login])

  useEffect(() => {
    const content = document.querySelector('#content')
    const editor = document.querySelector('#editor')
    const toolbar = document.querySelector('.ql-toolbar')

    if (content) {
      content.style.height = window.innerHeight - 48 - 16 + 'px'
    }
    if (editor && toolbar) {
      editor.style.marginBottom = toolbar.clientHeight + 10 + 'px'
    }
    
    //리사이즈시에 동작
    const resize = () => {
      //윈도우 사이즈에 맞춰서 콘텐트 사이즈 설정해줌
      if (content) {
        content.style.height = window.innerHeight - 48 - 16 + 'px'
      }
      //댓글 textarea 사이즈 조정
      resizeTextarea()

      //화면 리사이즈 되면 모바일, PC 바꾸기
      const body = document.querySelector('#body')
      const guideBack = document.querySelector('#guideBack')
      const guideWrapper = document.querySelector('#guideWrapper')
      guideBack.style.width = '0' // 회색 0
      guideWrapper.style.width = '300px'
      if (body.clientWidth < 500) {
        //모바일
        guideWrapper.style.left = '-300px'
        content.style.width = 'calc(100% - 16px)'
      } else {
        content.style.width = 'calc(100% - 300px - 16px)'
        content.style.maxWidth = 'calc(1280px - 300px - 16px)'
      }

      // Quill editor 아래 마진 변경
      if (editor && toolbar) {
        editor.style.marginBottom = toolbar.clientHeight + 10 + 'px'
      }
    }
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  })
  return (
    <AppContext.Provider value={store}>
      <div id="app">
        <Meta
          data={{
            title: '임기의 코딩 블로그',
            description: '주로 Javascript, React, ReactNative, Node 관련 글을 포스팅합니다. 감사합니다. 😄',
            image: process.env.PUBLIC_URL + '/images/imcat_800x400.png',
          }}
        />
        <Header />
        <Setting />
        <Body>
          <Guide />
          <Content />
        </Body>
      </div>
    </AppContext.Provider>
  )
}
export { AppContext }
export default React.memo(App)