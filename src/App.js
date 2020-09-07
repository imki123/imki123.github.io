import React, { useEffect, useState } from 'react'
import './App.css'
import { Switch, Route, useLocation} from 'react-router-dom'
import Axios from 'axios'

import Header from './components/Header'
import Body from './components/Body'
import Guide from './components/Guide'
import Content from './components/Content'
import NotFoundPage from './components/NotFoundPage'
import Setting from './components/Setting'
import Login from './components/Login'

function App() {
	const [ready, setReady] = useState(false)
	const [posts, setPosts] = useState([])
	const [headers, setHeaders] = useState({})
	const [login, setLogin] = useState(false)
	const location = useLocation() //페이지 경로 변경 감지

	const checkToken = func => {
		let url = 'https://blog-imki123-backend.herokuapp.com/auth/check'
		Axios.get(url)
		.then(res => {
			console.log('토큰 체크 성공')
			console.log(res)
			setLogin(res.data)
			if(func) func()
		})
		.catch(e => {
			console.log('토큰 없음')
			setLogin(false)
			if(func) func()
		})
	}

	//주소 변경될 때, 토큰 체크하고 포스트 조회하기
	useEffect(() => {
		setReady(false)
		checkToken(function(){
			let url = 'https://blog-imki123-backend.herokuapp.com/posts'
			if(location.pathname === '/'){
				url = url + '/home' + location.pathname + location.search
			}else{
				url = url + location.pathname + location.search
			}

			Axios.get(url)
			.then(res => {
				setPosts(res.data)
				setHeaders(res.headers)
				setReady(true)
			})
		}) 

		

		//주소 변경 시 해쉬 위치로 scroll. 해쉬는 리렌더링 하지 않음.
		const content = document.querySelector('#content')
		if(content){
			let scroll = content.scrollTop
			const frame = setInterval(function(){
				let dif = scroll/50
				content.scrollTop -= dif
				if(content.scrollTop <= 0) 
					clearInterval(frame) 
			},10)
		}
	},[location.pathname, location.search])


	return (
		<div id="app">
			<Header login={login}/>
			<Setting login={login} setLogin={setLogin}/>
			<Body>
				<Guide/>
				<Content posts={posts} headers={headers} ready={ready}>
					<Switch>
						<Route path='/' exact/>
						<Route path={['/about','/article']}/>
						<Route path={['/login','/register']}>
							<Login setLogin={setLogin} checkToken={checkToken}/>
						</Route>
						<Route path='*' component={NotFoundPage}/>
					</Switch>
				</Content>
			</Body>
		</div>
	)
}

export default React.memo(App)
