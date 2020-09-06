import React, { useEffect, useState } from 'react'
import './App.css'
import { Switch, Route, useLocation} from 'react-router-dom'
import axios from 'axios'

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

	//주소 변경될 때, posts 조회
	useEffect(() => {
		setReady(false)
		let url = 'https://blog-imki123-backend.herokuapp.com/posts'
		url = url + location.pathname + location.search

		axios({
			method: 'get',
			url: url,
		}).then(res => {
			setPosts(res.data)
			setHeaders(res.headers)
			setReady(true)
		})

		//주소 변경 시 scroll. 단 hash는 리렌더링 하지 않음.
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

	//세팅이나 로그인 상태가 변경되면 리로드
	useEffect(() => {

	}, [login])

	return (
		<div id="app">
			<Header login={login}/>
			<Setting login={login}/>
			<Body>
				<Guide posts={posts}/>
				<Content posts={posts} headers={headers} ready={ready}>
					<Switch>
						<Route path='/' exact/>
						<Route path={['/about','/article']}/>
						<Route path={['/login','/register']} component={Login}/>
						<Route path='*' component={NotFoundPage}/>
					</Switch>
				</Content>
			</Body>
		</div>
	)
}

export default React.memo(App)
