import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Switch, Route, useLocation } from 'react-router-dom'
import Body from './components/Body'
import Guide from './components/Guide'
import Content from './components/Content'
import NotFoundPage from './components/NotFoundPage'
import axios from 'axios'

function App() {
	const [posts, setPosts] = useState([])
	const [articleText, setArticleText] = useState(``)
	const location = useLocation() //페이지 경로 변경 감지

	//텍스트에어리어를 찾아서 크기를 글자 높이에 맞게 변경해주는 스크립트
	const resizeTextarea = () => {
		//textarea 높이 조정
		const textareas = document.querySelectorAll('textarea')
		const fake = document.querySelector('#fakeTextarea')
		if (textareas) {
			for (let i = 1; i < textareas.length; i++) {
				fake.style.height = '1px'
				textareas[i].style.height = 12 + fake.scrollHeight + 'px'
			}
		}
	}

	//태그별 posts 조회
	useEffect(() => {
		let url = 'https://blog-imki123-backend.herokuapp.com/posts'
		const path = location.pathname

		if(path === '/'){ //홈
			url += '/home'
		}else if(path.indexOf('/about') > -1){
			url += '/about'
		}else if(path.indexOf('/article') > -1){
			url += '/article'
		}else if(path.indexOf('/programming') > -1){
			url += '/programming'
		}
		axios({
			method: 'get',
			url: url,
		}).then(res => {
			setPosts(res.data)
			if(path.indexOf('/article') > -1){
				setArticleText(res.data[0].body)
				resizeTextarea()
			}
		})
	}, [location])

	//textarea나 주소 변경시 텍스트 높이 조정
	useEffect(() => {
		resizeTextarea()
	}, [articleText])

	return (
		<div id="app">
			<Header resizeTextarea={resizeTextarea} />
			<Body>
				<Guide />
				<Switch>
					<Route path="/" exact>
						{posts && <Content posts={posts} />}
					</Route>
					<Route path="/about">
						{posts && <Content posts={posts} />}
					</Route>
					<Route path="/article">
						{posts && (
							<Content posts={posts}/>
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

export default App
