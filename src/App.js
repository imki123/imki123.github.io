import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Switch, Route, useLocation} from 'react-router-dom'
import Body from './components/Body'
import Guide from './components/Guide'
import Content from './components/Content'
import NotFoundPage from './components/NotFoundPage'
import axios from 'axios'
import Setting from './components/Setting'

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
		const path = location.pathname

		if(path === '/'){ //홈
			url += '/home' + location.search
		}else if(path.indexOf('/about') > -1){
			url += '/about' + location.search
		}else if(path.indexOf('/article') > -1){
			url += '/article' + location.search
		}else if(path.indexOf('/programming') > -1){
			url += '/programming' + location.search
		}
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
			<Header/>
			<Body>
				<Setting login={login}/>
				<Guide posts={posts}/>
				<Content posts={posts} headers={headers} ready={ready}>
					<Switch>
						<Route path='/' exact/>
						<Route path={['/about','/article']}/>
						<Route path='*'>
							<NotFoundPage/>
						</Route>
					</Switch>
				</Content>
			</Body>
		</div>
	)
}

export default React.memo(App)
