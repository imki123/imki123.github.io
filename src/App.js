import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Switch, Route, useLocation, useParams } from 'react-router-dom'
import Body from './components/Body'
import Guide from './components/Guide'
import Content from './components/Content'
import NotFoundPage from './components/NotFoundPage'
import axios from 'axios'

function App() {
	const [posts, setPosts] = useState([])
	const [headers, setHeaders] = useState({})
	const location = useLocation() //페이지 경로 변경 감지

	//태그별 posts 조회
	useEffect(() => {
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
		})
	},[location])

	return (
		<div id="app">
			<Header/>
			<Body>
				<Guide />
				<Switch>
					<Route path="/" exact>
						{posts && <Content posts={posts}/>}
					</Route>
					<Route path="/about">
						{posts && <Content posts={posts}/>}
					</Route>
					<Route path="/article">
						{posts && (
							<Content posts={posts} headers={headers}/>
						)}
					</Route>
					<Route path="*">
						<Content>
							<NotFoundPage />
						</Content>
					</Route>
				</Switch>
			</Body>
		</div>
	)
}

export default React.memo(App)
