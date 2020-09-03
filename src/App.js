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

	//posts 조회
	useEffect(() => {
		axios({
			method: 'get',
			url: 'https://blog-imki123-backend.herokuapp.com/posts',
		}).then((res) => {
			setPosts(res.data)
		})
	}, [])

	//textarea나 주소 변경시 텍스트 높이 조정
	useEffect(() => {
		resizeTextarea()
	}, [articleText, location])

	return (
		<div id="app">
			<Header resizeTextarea={resizeTextarea} />
			<Body>
				<Guide />
				<Switch>
					<Route path="/" exact>
						{posts[0] && <Content text={posts[0].body} />}
					</Route>
					<Route path="/about">
						{posts[1] && <Content text={posts[1].body} />}
					</Route>
					<Route path="/article">
						{posts[2] && (
							<Content text={posts[2].body} resizeTextarea={resizeTextarea}>
								<textarea
									disabled
									id="fakeTextarea"
									value={posts[2].body}
									onChange={(e) => {
										setArticleText(e.target.value)
									}}
								/>
								<textarea
									value={posts[2].body}
									onChange={(e) => {
										setArticleText(e.target.value)
										resizeTextarea()
									}}
								/>
							</Content>
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
