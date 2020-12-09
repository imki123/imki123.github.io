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
import { checkToken } from './utils/util'

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

  //주소 변경될 때, 토큰 체크하고 스크롤을 가장 위로
  useEffect(() => {
    checkToken(setLogin)
    //최상단으로 스크롤 이동
    document.body.scrollTop = 0

    //페이지 이동할 때 activeListManual 스타일을 모두 지움
    const tags = document.querySelectorAll('.activeListManual')
    if (tags) {
      for (let i of tags) {
        i.classList.remove('activeListManual')
      }
    }
  }, [location.pathname, location.search])

  useEffect(() => {
    const editor = document.querySelector('#editor')
    const toolbar = document.querySelector('.ql-toolbar')

    if (editor && toolbar) {
      editor.style.marginBottom = toolbar.offsetHeight + 10 + 'px'
    }
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
