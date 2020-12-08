import React, { useState, useEffect } from 'react'
import './Login.scss'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Meta from './Meta'
import { Button } from '@material-ui/core'

function Login({ history, match, location }) {
  const store = React.useContext(AppContext)
  let browser = ''
  const agent = navigator.userAgent.toLowerCase()
  if (agent.indexOf('chrome') > -1) browser = 'chrome'
  else if (agent.indexOf('safari') > -1) browser = 'safari'

  const [checkUsername, setCheckUsername] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [checkPasswordConfirm, setCheckPasswordConfirm] = useState('')
  const [buttonName, setButtonName] = useState('로그인')
  const [userinfo, setUserinfo] = useState()

  useEffect(() => {
    //로그인화면에서 로그인은 안되어있는데 유저정보가 있으면 로그인 처리
    let frame
    const userinfoElem = document.querySelector('#userinfo')
    if (location.pathname === '/login' || location.pathname === '/login/' || location.pathname === '/register' || location.pathname === '/register/') {
      if (!store.login) {
        frame = setInterval(function () {
          console.log('유저정보 체크')
          if (userinfoElem && userinfoElem.value) {
            //userinfo가 있으면 로그인 처리
            //새로고침되거나, 로그인 버튼을 누르면 userinfo를 가져옴
            clearInterval(frame) //userinfo 있으면 로그인 체크 중지
            let user = JSON.parse(userinfoElem.value)

            if (user.host === 'naver') {
              let email = user.email
              let username
              if (email) {
                username = email.substring(0, email.indexOf('@')) + '_n'
                if (username === 'popping2606_n') username = 'imki123' //내아이디
                console.log('네이버 로그인 성공:', username)
                user = {
                  username: username,
                  email: email,
                  imageUrl: user.profile_image,
                  host: user.host,
                }
              } else {
                console.log('이메일 정보 없음. 로그아웃.')
                alert('이메일이 없으면 로그인이 불가해요. 이메일 동의 부탁드려요 😄')
                //네이버 로그아웃
                const naverLogout = document.querySelector('#naverLogout')
                if (naverLogout) naverLogout.click()
                userinfoElem.value = ''
                history.replace()
                return
              }
            } else if (user.host === 'kakao') {
              let email = user.email
              let username
              if (email) {
                username = email.substring(0, email.indexOf('@')) + '_k'
                if (username === 'popping2606_k') username = 'imki123' //내아이디
                console.log('카카오 로그인 성공:', username)
                user = {
                  username: username,
                  email: email,
                  imageUrl: user.profile.thumbnail_image_url,
                  host: user.host,
                }
              } else {
                console.log('이메일 정보 없음. 로그아웃.')
                alert('이메일이 없으면 로그인이 불가해요. 이메일 동의 부탁드려요 😄')
                //카카오 로그아웃
                const kakaoLogout = document.querySelector('#kakaoLogout')
                if (kakaoLogout) kakaoLogout.click()
                userinfoElem.value = ''
                history.replace()
                return
              }
            } else {
              let email = user.email
              let username = email.substring(0, email.indexOf('@')) + '_g'
              if (username === 'popping2606_g') username = 'imki123' //내아이디
              console.log('구글 로그인 성공:', username)
              user = {
                username: username,
                email: email,
                name: user.name,
                imageUrl: user.imageUrl,
                host: user.host,
              }
            }
            //console.log(user)

            let url = process.env.REACT_APP_URL + '/auth/oauth'
            //url = process.env.REACT_APP_LOCAL_URL + '/auth/oauth'
            //로그인 성공시 토큰에 name, email, imageUrl 저장
            fetch(url, {
              mode: 'cors',
              method: 'POST',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(user),
            })
              .then((res) => {
                if (res.status === 200 || res.status === 201) {
                  //성공하면 아래 then 작동
                  res.json().then((res) => {
                    alert(res.username + '님 환영합니다 😄')
                    setUserinfo(res)
                    //로그인 시 홈으로 이동
                    history.replace('/')
                    //history.go(-1) //뒤로가기
                  })
                } else {
                  let message = '로그인에 실패했습니다 :('
                  if (res.status === 401) {
                    message += '\n로그인 정보를 확인해주세요.'
                  }
                  console.log(message)
                }
              })
              .catch((e) => console.error(e))
          }
        }, 1000)
      }
    } else if (location.pathname === '/loginStatus' || location.pathname === '/loginStatus/') {
      if (userinfoElem && !userinfoElem.value) {
        setUserinfo(false)
      }
    }
    return () => clearInterval(frame)
  }, [store.login, location, history])

  useEffect(() => {
    //유저인포가 있으면 로그인처리
    if (store) {
      store.setReady(true)
      if (userinfo) {
        store.setLogin(userinfo)
      }
    }
  })

  useEffect(() => {
    //이미 로그인이 되어있다면 스테이터스로 이동
    if (location.pathname === '/login' || location.pathname === '/login/') {
      if (store.login) {
        history.replace('/loginStatus')
      }
    }

    //로그인이 안되어있으면 로그인으로 이동
    if (location.pathname === '/loginStatus' || location.pathname === '/loginStatus/') {
      //console.log(store.login)
      if (!store.login) {
        setTimeout(function () {
          if (!store.login) {
            history.replace('/login')
          }
        }, 1000)
      }
    }
    if (location.pathname.indexOf('register') > -1) {
      setButtonName('회원가입')
    } else if (location.pathname.indexOf('withdraw') > -1) {
      setButtonName('회원탈퇴')
    } else {
      setButtonName('로그인')
    }
  }, [location, store.login, history])

  const changeUsername = (e) => {
    const pattern = /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]/g
    const value = (e.target.value = e.target.value.replace(/\s/g, '_').replace(pattern, ''))
    if (value.length < 3) {
      //3글자 이상
      setCheckUsername('- 3자 이상 입력해주세요')
    } else if (value.length > 20) {
      //20글자 이하
      setCheckUsername('- 20자 이하로 입력해주세요')
    } else {
      setCheckUsername('')
    }
  }
  const changePassword = (e) => {
    const { value } = e.target
    const passwordConfirm = document.querySelector('[name=passwordConfirm]')

    //비밀번호가 변경되면 비밀번호 확인은 초기화
    if (passwordConfirm) {
      passwordConfirm.value = ''
      setCheckPasswordConfirm('')
    }

    if (value.length < 6) {
      //6글자 이상
      setCheckPassword('- 6자 이상 입력해주세요')
    } else if (value.length > 20) {
      //20글자 이하
      setCheckPassword('- 20자 이하로 입력해주세요')
    } else {
      setCheckPassword('')
    }
  }
  const changePasswordConfirm = (e) => {
    const { value } = e.target
    const password = document.querySelector('[name=password]')

    if (value !== password.value && value.length >= 1) {
      //password와 같으면
      setCheckPasswordConfirm('- 비밀번호가 일치하지 않습니다')
    } else {
      setCheckPasswordConfirm('')
    }
  }
  const clickButton = (e) => {
    e.preventDefault()
    let url = process.env.REACT_APP_URL + '/auth'
    //url = process.env.REACT_APP_LOCAL_URL+'/auth'

    const pattern = /[^a-zA-Z0-9가-힣_]/g
    let username = document.querySelector('[name=username]')
    if (username) username = username.value = username.value.replace(pattern, '')
    let password = document.querySelector('[name=password]')
    if (password) password = password.value

    if (checkUsername === '' && password.length >= 1 && checkPassword === '' && checkPasswordConfirm === '') {
      //입력폼에 이상이 없으면 fetch submit
      if (buttonName === '회원가입') {
        url += '/register'
        fetch(url, {
          mode: 'cors',
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        })
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              //성공하면 아래 then 작동
              res.json().then((res) => {
                alert(res.username + '님의 회원가입에 성공했습니다 😄')
                history.go(-1)
              })
            } else {
              let message = '회원가입에 실패했습니다 :('
              if (res.status === 409) {
                message += '\n이미 존재하는 아이디입니다.'
              }
              if (res.status === 400) {
                message += '\n아이디나 비밀번호를 확인해주세요.'
              }
              alert(message)
            }
          })
          .catch((e) => console.error(e))
      } else if (buttonName === '회원탈퇴') {
        if (window.confirm('계정 탈퇴시 복구할 수 없습니다. 정말로 탈퇴하시겠습니까?')) {
          url += '/withdraw'
          fetch(url, {
            mode: 'cors',
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: store.login.username,
              password: password,
            }),
          })
            .then((res) => {
              if (res.status === 200) {
                //삭제하면 Ok
                alert('계정이 탈퇴되었습니다. 또 들러 주세요 😄')
                history.push('/')
              } else {
                let message = '탈퇴에 실패했습니다 :('
                if (res.status === 204) {
                  message += '\n존재하지 않는 아이디입니다.'
                }
                if (res.status === 401) {
                  message += '\n비밀번호를 확인해주세요.'
                }
                alert(message)
              }
            })
            .catch((e) => console.error(e))
        }
      } else {
        //로그인
        url += '/login'
        fetch(url, {
          mode: 'cors',
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        })
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              //성공하면 아래 then 작동
              res.json().then((res) => {
                store.setLogin(res)
                alert(res.username + '님 환영합니다 😄')
                history.go(-1)
              })
            } else {
              let message = '로그인에 실패했습니다 :('
              if (res.status === 401) {
                message += '\n로그인 정보를 확인해주세요.'
              }
              alert(message)
            }
          })
          .catch((e) => console.error(e))
      }
    } else {
      alert('입력 정보를 확인해주세요.')
    }
  }

  const naverLogin = (e) => {
    const naverIdLogin = document.querySelector('#naverIdLogin')
    if (naverIdLogin) {
      console.log('네이버 로그인 요청')
      naverIdLogin.firstChild.click()
    }
  }
  const kakaoLogin = (e) => {
    const kakaoLogin = document.querySelector('#kakaoLogin')
    if (kakaoLogin) {
      console.log('카카오 로그인 요청')
      kakaoLogin.click()
    }
  }
  const googleLogin = (e) => {
    const googleLogin = document.querySelector('#googleLogin')
    if (googleLogin) {
      console.log('구글 로그인 요청')
      googleLogin.firstChild.firstChild.click()
    }
  }

  return (
    <div id="background">
      <div id="loginWrapper">
        <Meta
          data={{
            title: '임기의 코딩 블로그',
            description: '네이버, 카카오, 구글 계정으로 로그인 해보세요!',
            canonical: `login`,
          }}
        />
        {location.pathname.indexOf('/loginStatus') > -1 ? (
          <>
            {store.login ? (
              <div className="center">
                {store.login.username}님은 현재 <span style={{ color: 'green' }}>로그인</span> 되어있습니다 😄
                <br />
                <span style={{ fontSize: '0.8rem' }}>(로그인은 최대 일주일간 유지됩니다.)</span>
              </div>
            ) : (
              <div className="login center">
                재 로그인이 필요합니다
                <Link to="/login" className="loginLink">
                  로그인
                </Link>
              </div>
            )}
          </>
        ) : (
          <>
            {(buttonName === '로그인' || buttonName === '회원가입') && (
              <div className="oAuth">
                <div className="login">
                  {/* 네이버 로그인 */}
                  <div className="naverLogin no-drag" onClick={naverLogin}>
                    <img alt="" src={process.env.PUBLIC_URL + '/images/naver.png'} />
                    Log in with Naver
                  </div>
                  {/* 카카오 로그인 */}
                  <div className="naverLogin kakaoLogin no-drag" onClick={kakaoLogin}>
                    <img alt="" src={process.env.PUBLIC_URL + '/images/kakao.png'} />
                    Log in with Kakao
                  </div>
                  {/* 구글 로그인 */}
                  <div className="naverLogin googleLogin no-drag" onClick={googleLogin}>
                    <img alt="" src={process.env.PUBLIC_URL + '/images/google.png'} />
                    Log in with Google
                  </div>
                  <div className="googleWarning">
                    구글 로그인은 <span style={{ color: 'red' }}>인앱 브라우저(카카오톡 등)</span>에서 지원되지 않습니다. 오류 발생 시 더보기(
                    <MoreVertIcon />, <img alt="" src={process.env.PUBLIC_URL + '/images/share.png'} />
                    )를 눌러서 <span>다른 브라우저(Chrome, Safari 등)</span>에서 실행해주세요.
                  </div>
                </div>
              </div>
            )}
            <form className="login">
              <div className="text">아이디</div>
              {buttonName === '회원탈퇴' ? <div>{store.login.username}</div> : <input name="username" onChange={changeUsername} />}

              <div className="check">{checkUsername}</div>

              <div className="text">비밀번호</div>
              <input name="password" type="password" onChange={changePassword} autoComplete="currnet-password" />
              <div className="check">{checkPassword}</div>

              {buttonName === '회원가입' && (
                <>
                  <div className="text">비밀번호 확인</div>
                  <input name="passwordConfirm" type="password" onChange={changePasswordConfirm} autoComplete="currnet-password" />
                  <div className="check" id="checkPasswordConfirm">
                    {checkPasswordConfirm}
                  </div>
                </>
              )}

              {/* 버튼 */}
              {buttonName === '회원탈퇴' ? (
                <Button variant="contained" color="primary" style={{ backgroundColor: 'red' }} onClick={clickButton}>
                  {buttonName}
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={clickButton}>
                  {buttonName}
                </Button>
              )}

              {/* 로그인 or 회원가입 */}
              {buttonName === '로그인' && (
                <div className="loginLink">
                  <Link to="/register">회원가입</Link>
                </div>
              )}
              {buttonName === '회원가입' && (
                <div className="loginLink">
                  <Link to="/login" className="loginLink">
                    로그인
                  </Link>
                </div>
              )}

              {browser === 'safari' && (
                <div className="text" style={{ fontSize: '0.8rem', textAlign: 'center' }}>
                  (Safari의 설정을 변경해야 로그인이 가능합니다.)
                  <br />
                  설정 → Safari → 개인 정보 보호 및 보안 → <br />
                  크로스 사이트 추적방지 OFF, 모든 쿠키 차단 OFF)
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
export default React.memo(Login)
