import React from 'react'
import './Setting.scss'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import { Button } from '@material-ui/core'

function Setting(props) {
  const store = React.useContext(AppContext)

  const closeSetting = (e) => {
    const settingWrapper = document.querySelector('#settingWrapper')
    e.stopPropagation()
    setTimeout(function () {
      settingWrapper.style.display = 'none'
    }, 200)
  }

  const logout = (e) => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      let url = process.env.REACT_APP_URL + '/auth/logout'
      //url = process.env.REACT_APP_LOCAL_URL + '/auth/logout'

      fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
      })
        .then((res) => {
          if (res.status === 204) {
            //로그아웃 하면 204
            console.log('로그아웃 성공')
            store.setLogin(false)

            //유저정보 지우기
            const userinfo = document.querySelector('#userinfo')
            if (userinfo) userinfo.value = ''

            //네이버 로그아웃
            const naverIdLogout = document.querySelector('#naverIdLogout')
            if (naverIdLogout) naverIdLogout.click()

            //카카오 로그아웃
            const kakaoLogout = document.querySelector('#kakaoLogout')
            if (kakaoLogout) kakaoLogout.click()

            //구글 로그아웃
            const googleLogout = document.querySelector('#googleLogout')
            if (googleLogout) googleLogout.click()
          } else {
            console.log('로그아웃 실패')
          }
        })
        .catch((e) => console.error(e))
    }
  }

  return (
    <div id="settingWrapper" onClick={closeSetting}>
      <div id="setting">
        {store.login ? (
          <Link to="/loginStatus">
            <Button className="settingList">{store.login.username}</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button className="settingList">로그인</Button>
          </Link>
        )}
        {store.login && (
          <Button onClick={logout} className="settingList">
            로그아웃
          </Button>
        )}
        {!store.login && (
          <Link to="/register">
            <Button className="settingList">회원가입</Button>
          </Link>
        )}
        {store.login && !store.login.oAuth && (
          <Link to="/withdraw">
            <Button className="settingList">회원탈퇴</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
export default React.memo(Setting)
