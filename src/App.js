import React, { useEffect, useState } from 'react'
import './App.css'
import { Switch, Route, useLocation} from 'react-router-dom'

import Header from './components/Header'
import Body from './components/Body'
import Guide from './components/Guide'
import Content from './components/Content'
import NotFoundPage from './components/NotFoundPage'
import Setting from './components/Setting'
import Login from './components/Login'
import Quill from './components/Quill'

function App() {
	const [ready, setReady] = useState(false)
	const [posts, setPosts] = useState([])
	const [headers, setHeaders] = useState({})
	const [login, setLogin] = useState(false)
	const [refresh, setRefresh] = useState(false)
	const location = useLocation() //페이지 경로 변경 감지

	const checkToken = (func) => {
		let url = process.env.REACT_APP_URL+'/auth/check'
		fetch(url, {
			mode: 'cors',
			method: 'GET',
			credentials: 'include',
		})
			.then((res) => {
				if (res.status === 200 || res.status === 201 || res.status === 202) {
					//성공하면 아래 then 작동
					res.json().then((res) => {
						console.log('토큰 체크 성공')
						setLogin(res)
						if (func) func()
					})
				} else {
					console.log('토큰 없음') //res.status===204(No Content)
					setLogin(false)
					if (func) func()
				}
			})
			.catch((e) => console.error(e))
	}

	//주소 변경될 때, 토큰 체크하고 포스트 조회하기
	useEffect(() => {
		setReady(false)
		checkToken(function () {
			let url = process.env.REACT_APP_URL+'/posts'
			//url = process.env.REACT_APP_LOCAL_URL+'/posts'
			if (location.pathname === '/') {
				url = url + '/home' + location.pathname + location.search
			}else if(location.pathname.indexOf('/quill') > -1) {
				setReady(true)
				setHeaders(false)
				setPosts(false)
				return ;
			}else {
				url = url + location.pathname + location.search
			}

			fetch(url,{
				mode: 'cors',
				method: 'GET',
				credentials: "include",
			})
			.then((res) => {
				if (res.status === 200 || res.status === 201) {
					//성공하면 아래 then 작동
					const h = {}
					res.headers.forEach((v, n) => (h[n] = v))
					setHeaders(h)
					res.json().then(res => {
						setPosts(res)
						setReady(true)
					})
				} else {
					console.log('posts 조회 실패')
					setReady(true)
				}
			})
			.catch((e) => console.error(e))
		})

		//주소 변경 시 해쉬 위치로 scroll. 해쉬는 리렌더링 하지 않음.
		const content = document.querySelector('#content')
		if (content) {
			let scroll = content.scrollTop
			const frame = setInterval(function () {
				let dif = scroll / 50
				content.scrollTop -= dif
				if (content.scrollTop <= 0) clearInterval(frame)
			}, 10)
		}
	}, [location.pathname, location.search, refresh])

	return (
		<div id="app">
			<Header login={login} />
			<Setting login={login} setLogin={setLogin} />
			<Body>
				<Guide />
				<Content posts={posts} headers={headers} ready={ready} login={login} refresh={refresh} setRefresh={setRefresh}>
					<Switch>
						<Route path="/" exact />
						<Route path={['/about', '/article', '/programming']} />
						<Route path={['/login', '/register', '/loginStatus', '/withdraw']}>
							<Login login={login} setLogin={setLogin} checkToken={checkToken}/>
						</Route>
						<Route path={['/quill']}>
							<Quill login={login}/>
						</Route>
						<Route path="*" component={NotFoundPage} />
					</Switch>
				</Content>
			</Body>
		</div>
	)
}

export default React.memo(App)
