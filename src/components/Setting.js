import React from 'react'
import './Setting.css'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import { GoogleLogout } from 'react-google-login'

function Setting(props) {
	const store = React.useContext(AppContext)
	const href = window.location.href
	let clientId
	if (href.indexOf('localhost') > -1) {
		//로컬
		clientId = '605411712139-7nr29rfs5ihfu9uoev3igr5hpf4ubkle.apps.googleusercontent.com'
	} else {
		//서버
		clientId = '605411712139-eb3qqicskmkal2i9u26ppdhoq2jt0bd8.apps.googleusercontent.com'
	}

	/* const { signOut } = useGoogleLogout({
		clientId: clientId,
		onFailure: (res) => console.log(res),
		onLogoutSuccess: (res, e) => console.log('success:', res, e),
	}) */

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
						//구글 로그아웃
						//signOut()
						store.setLogin(false)
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
						<div onClick={logout}>
							<GoogleLogout
								buttonText="로그아웃"
								className="settingList googleLogout"
								clientId={clientId}
								onSuccess={(res) => {
									console.log('logout')
								}}
								onFailure={(res) => {
									console.log(res)
								}}
								cookiePolicy={'single_host_origin'}
							/>
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
