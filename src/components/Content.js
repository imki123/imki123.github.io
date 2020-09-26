import React, { useEffect } from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import './Content.css'
import queryString from 'query-string'
import { Link, Route, useLocation, Switch } from 'react-router-dom'
import { AppContext } from '../App'

import Post from './Post'
import Paging from './Paging'
import PostList from './PostList'
import NotFoundPage from './NotFoundPage'
import Login from './Login'
import Quill from './Quill'

function Content(props) {
	const store = React.useContext(AppContext)
	const location = useLocation()
	const search = queryString.parse(location.search)
	let startPost = 1
	let paging = null
	if (store.headers) {
		const page = Number(search.page) || 1
		const lastPage = Number(store.headers['last-page'])
		const totalPost = Number(store.headers['total-post'])
		startPost = totalPost - (page - 1) * 5
		paging = {
			page: page,
			lastPage: lastPage,
			totalPost: totalPost,
			startPost: startPost,
		}
	}

	useEffect(() => {
		const resize = () => {
			store.resizeTextarea()
		}

		window.addEventListener('resize', resize)
		const loading = document.querySelector('#loading')
		if (store.ready) {
			if (loading) loading.style.display = 'none'
			if (location.hash) {
				//hash가 있으면 해당 엘리먼트로 스크롤
				setTimeout(function () {
					//elem이 로드된 이후에 스크롤이 되야해서 0.1초 타임아웃 추가..
					const content = document.querySelector('#content')
					const elem = document.querySelector(location.hash)
					if (elem) {
						let contentScroll = content.scrollTop
						let elemTop = elem.offsetTop
						let dif = (elemTop - contentScroll) / 50
						if (elemTop > contentScroll) {
							const frame = setInterval(function () {
								if (content.scrollTop + dif >= elemTop || content.scrollTop >= content.scrollHeight - content.clientHeight) {
									clearInterval(frame)
								} else {
									content.scrollTop += dif
								}
							}, 10)
						} else {
							const frame = setInterval(function () {
								if (content.scrollTop <= elemTop) {
									clearInterval(frame)
								} else {
									content.scrollTop += dif
								}
							}, 10)
						}
					}
				}, 10)
			}
			setTimeout(function () {
				store.resizeTextarea()
			}, 10)
		} else {
			if (loading) loading.style.display = 'flex'
		}
		return window.removeEventListener('resize', resize)
	}, [location.hash, store])


	const scrollUp = (e) => { // content의 스크롤을 가장 위로
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
				<Route path={['/login', '/register', '/loginStatus', '/withdraw']}>
					<Login />
				</Route>
				<Route path={['/quill']}>
					<Quill />
				</Route>
				<Route path="*">
					{/* 본문 내용 */}
					{store.ready && (
						<>
							{store.posts.length < 1 ? (
								<NotFoundPage /> /* 글이 없으면 페이지 없음 */
							) : (
								<>
									{
										//태그별 목록
										startPost > 1 && paging && (
											<div className="postListWrapper">
												<div className="postListTitle">목록</div>
												{store.posts && store.posts.map((i, idx) => <PostList no={startPost - idx} post={i} key={i.postId} />)}
												{<Paging paging={paging} />}
											</div>
										)
									}
									{
										//글
										store.posts && store.posts.map((i, idx) => <Post no={startPost - idx} post={i} key={i.postId} />)
									}
								</>
							)}
						</>
					)}
				</Route>
			</Switch>

			{/* 텍스트 에어리어 높이 조정을 위한 안보이는 가짜 텍스트에어리어 */}
			<textarea disabled id="fakeTextarea" />
		</div>
	)
}
export default React.memo(Content)
