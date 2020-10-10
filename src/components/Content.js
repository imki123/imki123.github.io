import React, { useEffect } from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import './Content.css'
import { Link, Route, useLocation, Switch } from 'react-router-dom'
import { AppContext } from '../App'

import Post from './Post'
import NotFoundPage from './NotFoundPage'
import Login from './Login'
import Quill from './Quill'
import Tags from './Tags'
import CommentLists from './CommentLists'

function Content(props) {
	const store = React.useContext(AppContext)
	const location = useLocation() //hash 사용

	useEffect(() => {
		const resize = () => {
			store.resizeTextarea()
		}

		window.addEventListener('resize', resize)
		const loading = document.querySelector('#loading')
		const views = document.querySelectorAll('.post')
		if (store.ready) {
			if (loading) loading.style.display = 'none'
			if (views) {
				for(let i of views){
					i.style.display = 'block'
				}
			}
			setTimeout(function () {
				store.resizeTextarea()
			}, 10)
		} else {
			if (loading) loading.style.display = 'flex'
			if (views) {
				for(let i of views){
					i.style.display = 'none'
				}
			}
		}
		return window.removeEventListener('resize', resize)
	}, [location.hash, store])

	const scrollUp = (e) => {
		// content의 스크롤을 가장 위로
		const content = document.querySelector('#content')
		let contentScroll = content.scrollTop
		let dif = contentScroll / 50
		const frame = setInterval(function () {
			if (content.scrollTop <= 0) {
				clearInterval(frame)
			} else {
				content.scrollTop -= dif
			}
		}, 10)
	}

	return (
		<div id="content" className="slideMenu">
			{/* FAB */}
			{store.login && store.login.username === 'imki123' && (
				<Link id="postFAB" className="hover" to="/quill">
					<AddCircleOutlineIcon />
				</Link>
			)}
			<div id="scrollFAB" className="hover" onClick={scrollUp}>
				<ArrowUpwardIcon />
			</div>
			<div id="menuFAB" className="hover" onClick={store.slideMenu}>
				<img alt="MENU" src={process.env.PUBLIC_URL + '/images/guide_icon.png'} />
			</div>

			{/* 로딩 */}
			<div id="loading">
				<img alt="Loading" src={process.env.PUBLIC_URL + '/images/loading.gif'} />
			</div>

			<Switch>
				<Route path={['/login', '/register', '/loginStatus', '/withdraw']} component={Login} />
				<Route path="/quill/:postId?" component={Quill} />
				<Route path="/tags/:tag" component={Tags} />
				<Route path="/comments" component={CommentLists} />
				<Route path="/" exact component={Post} />
				<Route path="/posts/:postId" component={Post} />
				<Route path="/NotFoundPage" component={NotFoundPage} />
				<Route path="*" component={NotFoundPage} />
			</Switch>

			{/* 텍스트 에어리어 높이 조정을 위한 안보이는 가짜 텍스트에어리어 */}
			<textarea disabled id="fakeTextarea" />
		</div>
	)
}
export default React.memo(Content)
