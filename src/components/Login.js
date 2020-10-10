import React, { useState, useEffect } from 'react'
import './Login.css'
import { Switch, Route, Link } from 'react-router-dom'
import { AppContext } from '../App'
import GoogleLogin from 'react-google-login'
import NaverLogin from 'react-naver-login'
import MoreVertIcon from '@material-ui/icons/MoreVert'

function Login({ history, match, location }) {
	const href = window.location.href
	let clientId
	let naverId, naverUrl
	if (href.indexOf('localhost') > -1) {
		//로컬
		clientId = '605411712139-7nr29rfs5ihfu9uoev3igr5hpf4ubkle.apps.googleusercontent.com'
		naverId = '1GCn3_4FurDb9SXHyzlw'
		naverUrl = 'http://localhost:3000/login'
	} else {
		//서버
		clientId = '605411712139-eb3qqicskmkal2i9u26ppdhoq2jt0bd8.apps.googleusercontent.com'
		naverId = 'kjVk1u480gzQO_XLX_hp'
		naverUrl = 'https://imki123.github.io/login'
	}
	const store = React.useContext(AppContext)
	let browser = ''
	const agent = navigator.userAgent.toLowerCase()
	if (agent.indexOf('chrome') > -1) browser = 'chrome'
	else if (agent.indexOf('safari') > -1) browser = 'safari'

	const [checkUsername, setCheckUsername] = useState('')
	const [checkPassword, setCheckPassword] = useState('')
	const [checkPasswordConfirm, setCheckPasswordConfirm] = useState('')
	const [buttonName, setButtonName] = useState('로그인')

	useEffect(() => {
		store.setReady(true)
	})
	useEffect(() => {
		//이미 로그인이 되어있다면 스테이터스로 이동
		if (store.login && location.pathname === '/login') {
			history.replace('/loginStatus')
		}
		//로그인이 안되어있으면 로그인으로 이동
		if (!store.login && location.pathname === '/loginStatus') {
			history.replace('/login')
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
								alert(res.username + '님의 회원가입에 성공했습니다 :D')
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
								alert('계정이 탈퇴되었습니다. 또 들러 주세요 :D')
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
								alert(res.username + '님 환영합니다 :D')
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

	//user정보를 받아서 서버에 토큰을 요청하기
	const sendOAuth = (user) => {
		let url = process.env.REACT_APP_URL + '/auth/oauth'
		//url = process.env.REACT_APP_LOCAL_URL + '/auth/oauth'
		//로그인 성공시 토큰에 name, email, imageUrl 저장
		fetch(url, {
			mode: 'cors',
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: user.username,
				email: user.email,
				imageUrl: user.imageUrl,
			}),
		})
			.then((res) => {
				if (res.status === 200 || res.status === 201) {
					//성공하면 아래 then 작동
					res.json().then((res) => {
						alert(res.username + '님 환영합니다 :D')
						history.go(-1)
						store.setLogin(res)
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

	const successGoogle = (res) => {
		console.log('구글로그인 성공')
		//console.log(res)
		let email = res.profileObj.email
		let username = email.substring(0, email.indexOf('@')) + '_g'
		if (username === 'popping2606_g') username = 'imki123' //내아이디

		let user = {
			username: username,
			email: email,
			imageUrl: res.profileObj.imageUrl
		}
		sendOAuth(user)
	}
	const failureGoogle = (res) => {
		console.log('구글로그인 실패', res)
	}
	const successNaver = (res) => {
		console.log('네이버로그인 성공')
		console.log(res)
		let email = res.email
		let username = email.substring(0, email.indexOf('@')) + '_n'
		if (username === 'popping2606_n') username = 'imki123' //내아이디
		
		let user = {
			username: username,
			email: email,
			imageUrl: res.profile_image
		}
		sendOAuth(user)
	}
	const failureNaver = (res) => {
		console.log('네이버로그인 실패', res)
	}

	return (
		<div id="background">
			<div id="loginWrapper">
				<Switch>
					<Route path={['/login', '/register', '/withdraw']}>
						{(buttonName === '로그인' || buttonName === '회원가입') && (
							<div className="oAuth">
								<div className="login">
									{/* 구글로그인 */}
									<GoogleLogin
										buttonText="Login with Google"
										className="googleLogin"
										clientId={clientId}
										onSuccess={successGoogle}
										onFailure={failureGoogle}
										cookiePolicy={'single_host_origin'}
										isSignedIn={true}
									/>
									<div className="googleWarning">
										<span style={{ color: 'red' }}>인앱 브라우저(카카오톡 등)</span>
										는 <span>구글 로그인</span>을 지원하지 않습니다. 오류 발생 시 더보기(
										<MoreVertIcon />, <img alt="" src={process.env.PUBLIC_URL + '/images/share.png'} />
										)를 눌러서 <span>다른 브라우저(Chrome, Safari 등)</span>에서 실행해주세요.
									</div>
									<br/><br/>
									<div style={{fontWeight: 'bold'}}>*** 네이버 로그인 테스트 중 ***</div>
									<NaverLogin
										clientId={naverId}
										callbackUrl={naverUrl}
										render={(props) => (
											<div className="naverLogin" onClick={props.onClick}>
												<img alt="" src={process.env.PUBLIC_URL + '/images/naver.png'} />
												Login with Naver
											</div>
										)}
										onSuccess={successNaver}
										onFailure={failureNaver}
									/>
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
								<button style={{ background: 'red' }} onClick={clickButton}>
									{buttonName}
								</button>
							) : (
								<button onClick={clickButton}>{buttonName}</button>
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
					</Route>
					<Route path={['/loginStatus']}>
						{store.login ? (
							<div className="center">
								{store.login.username}님은 현재 <span style={{ color: 'green' }}>로그인</span> 되어있습니다 :D
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
					</Route>
				</Switch>
			</div>
		</div>
	)
}
export default React.memo(Login)
