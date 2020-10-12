import React from 'react'
import './Setting.css'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import { GoogleLogout } from 'react-google-login'

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

            //구르 로그아웃
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
        <div id="settingListWrapper">
          {store.login ? (
            <Link className="settingList" to="/loginStatus">
              {store.login.username}
            </Link>
          ) : (
            <Link className="settingList" to="/login">
              로그인
            </Link>
          )}
          {store.login && (
            <div onClick={logout} className="settingList">
              로그아웃
              {/* <GoogleLogout
                icon={false}
                buttonText="로그아웃"
                className="settingList googleLogout"
                clientId="605411712139-eb3qqicskmkal2i9u26ppdhoq2jt0bd8.apps.googleusercontent.com"
                onSuccess={(res) => {
                  console.log('logout')
                }}
                onFailure={(res) => {
                  console.log(res)
                }}
                cookiePolicy={'single_host_origin'}
              /> */}
            </div>
          )}
          {!store.login && (
            <Link className="settingList" to="/register">
              회원가입
            </Link>
          )}
          {store.login && !store.login.oAuth && (
            <Link className="settingList" to="/withdraw">
              회원탈퇴
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
export default React.memo(Setting)
