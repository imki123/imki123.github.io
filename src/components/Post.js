import React, { useEffect, useState } from 'react'
import './Post.css'
import { Link } from 'react-router-dom'
import { useQuill } from 'react-quilljs'
import Comment from './Comment'
import { AppContext } from '../App'
import RefreshIcon from '@material-ui/icons/Refresh'
import Axios from 'axios'
import Meta from './Meta'
import Recents from './Recents'
import CommentLists from './CommentLists'

function Post({ match, location, history }) {
	const store = React.useContext(AppContext)
	let { postId } = match.params
	const [post, setPost] = useState(false)
	const [postBody, setPostBody] = useState()
	const [comments, setComments] = useState([])
	const [commentCnt, setCommentCnt] = useState(3)

	const [recents, setRecents] = useState([])
	const [popular, setPopular] = useState([])
	const [recentComments, setRecentComments] = useState([])

	const modules = { syntax: true }
	const formats = ['bold', 'italic', 'underline', 'strike', 'code-block', 'blockquote', 'size', 'header', 'align', 'color', 'background', 'indent', 'list', 'link', 'image', 'video', 'clean']
	const { quill, quillRef } = useQuill({ modules, formats, readOnly: true })

	useEffect(() => {
		setPost(false)
		setPostBody(false)
		//포스트 가져오기
		let id = 1
		if (postId) id = postId
		let url = process.env.REACT_APP_URL + '/posts/' + id
		//url = process.env.REACT_APP_LOCAL_URL + '/posts/' + id
		Axios.get(url, {
			withCredentials: true,
		})
			.then((res) => {
				setComments(res.data.comments)
				setPost(res.data)
			})
			.catch((e) => {
				alert('찾으시는 페이지가 없습니다.\n' + e)
				history.go(-1)
			}) //실패

		//포스트바디 가져오기
		url = process.env.REACT_APP_URL + '/posts/postBody/' + id
		//url = process.env.REACT_APP_LOCAL_URL + '/posts/postBody/' + id
		Axios.get(url)
			.then((res) => {
				setPostBody(res.data.body)

				//postBody 변경 시 해쉬 있으면 해쉬 위치로 scroll.
				setTimeout(function () {
					//바로 적용하면 postBody 렌더링하는데 시간이 걸려서 0.1초 있다가 작동
					const content = document.querySelector('#content')
					let hash
					if (location.hash) hash = document.querySelector(location.hash)

					if (content && hash) {
						let scroll = hash.offsetTop
						let dif = scroll / 100
						console.log('scroll', scroll)
						const frame = setInterval(function () {
							content.scrollTop += dif
							if (content.scrollTop + dif >= scroll || content.scrollTop + content.offsetHeight >= content.scrollHeight) clearInterval(frame)
						}, 10)
					}
				}, 100)
			})
			.catch((e) => {
				console.log(e)
			}) //실패

		//홈일경우 recents, popular, recentComments 가져옴
		if (location.pathname === '/') {
			url = process.env.REACT_APP_URL + '/posts/popular'
			//url = process.env.REACT_APP_LOCAL_URL + '/posts/popular'
			Axios.get(url).then((res) => {
				setPopular(res.data)
			})

			url = process.env.REACT_APP_URL + '/posts/recents'
			//url = process.env.REACT_APP_LOCAL_URL + '/posts/recents'
			Axios.get(url).then((res) => {
				setRecents(res.data)
			})

			url = process.env.REACT_APP_URL + '/comments/recent'
			//url = process.env.REACT_APP_LOCAL_URL + '/comments/recent'
			Axios.get(url).then((res) => {
				setRecentComments(res.data)
			})
		}
	}, [location, postId, history])

	useEffect(() => {
		if (quill) {
			if (postBody) {
				quill.setContents(postBody)
			} else if (post) {
				quill.setText(post.text)
			}
		}
	}, [quill, postBody, post])

	useEffect(() => {
		store.setReady(false)
		if (post) {
			store.setReady(true)
		}
	})

	const deletePost = (e) => {
		if (window.confirm('글 삭제 시 복구가 불가합니다. 해당 글을 정말로 삭제하시겠습니까?')) {
			const postId = e.target.id
			let url = process.env.REACT_APP_URL + '/posts/' + postId
			//url = process.env.REACT_APP_LOCAL_URL+'/posts/'+postId

			Axios.delete(url, {
				//글 삭제
				withCredentials: true, //CORS
			})
				.then((res) => {
					console.log(`${postId}번 글 삭제 성공`)
					history.go(-1)
				})
				.catch((e) => alert(e)) //실패
		}
	}

	const postComment = (e) => {
		const comment = document.querySelector(`.commentContent textarea`) //댓글 텍스트
		if (comment && comment.value !== '' && window.confirm('댓글을 작성하시겠습니까?')) {
			let url = process.env.REACT_APP_URL + '/comments/' + post.postId
			//url = process.env.REACT_APP_LOCAL_URL+'/comments/'+post.postId

			Axios.patch(url, {
				//댓글 작성
				withCredentials: true, //CORS
				data: {
					username: store.login.username,
					content: comment.value,
				},
			})
				.then((res) => {
					console.log(`${post.postId} 댓글 추가 성공`)
					refreshComment(null, setCommentCnt(res.data.comments.length)) //포스트 다시 불러오고 댓글 끝까지 보이기
				})
				.catch((e) => alert(e)) //실패
		}
	}

	const refreshComment = (e, func) => {
		//댓글 가져오기
		let url = process.env.REACT_APP_URL + '/comments/' + post.postId
		//url = process.env.REACT_APP_LOCAL_URL+'/comments/'+post.postId

		let svg //refresh 아이콘
		if (e && e.target) svg = e.target.querySelector('svg')
		if (svg) svg.classList.add('refreshing') //refresh 애니메이션 시작

		Axios.get(url, {
			withCredentials: true,
		}) //댓글 새로고치기
			.then((res) => {
				console.log(`${post.postId} 댓글 새로고침`)
				setComments(res.data) //댓글 저장
				if (svg) svg.classList.remove('refreshing') //refresh 애니메이션 끝

				if (func) func() //파라미터에 함수가 있으면 함수 실행
			})
			.catch((e) => {
				//실패
				if (svg) svg.classList.remove('refreshing') //refresh 애니메이션 끝
				alert(e)
			})
	}

	//댓글 10개 더보기
	const more = (e) => {
		setCommentCnt(commentCnt + 10)
	}

	//댓글 더보기, 댓글 새로고침 하면 리사이즈
	useEffect(() => {
		store.resizeTextarea()
	}, [commentCnt, store, comments])

	return (
		<>
			<div className="post">
				{location.pathname === '/' ? (
					<Meta
						data={{
							title: '행복한 코딩 블로그 :D',
							discription: 'imki123의 행복한 코딩 블로그입니다 :D',
						}}
					/>
				) : (
					<Meta data={{ title: post.title, discription: post.text, locale: 'ko' }} />
				)}
				{/* 태그 */}
				<div className="nav">
					<div>
						<span>Tag : </span>
						{post.tags &&
							post.tags.map((i, idx) =>
								idx === 0 ? (
									<span key={i}>
										<Link to={i === 'home' ? '/' : `/tags/${i}`}>{i}</Link>
									</span>
								) : (
									<span key={i}>
										, <Link to={`/tags/${i}`}>{i}</Link>
									</span>
								),
							)}
					</div>
					{post && post.publishedDate.substring(0, 16).replace('T', ' ')}
				</div>
				<h2 className="postTitle">{post.title}</h2>
				<div className="postContent">
					{/* 본문 */}
					<div id="editor">
						<div ref={quillRef} />
					</div>

					{/* 글 수정 삭제 버튼 */}
					{store.login && store.login.username === 'imki123' && (
						<div className="postButtons">
							<Link to={`/quill/${post.postId}`} className="hover no-drag">
								수정
							</Link>
							&nbsp;
							<button onClick={deletePost} id={post.postId} style={{ background: 'red' }}>
								삭제
							</button>
						</div>
					)}
				</div>

				{/* 댓글 작성*/}
				{location.pathname !== '/' && (
					<>
						<div className="writeComment">
							<div className="commentProfile">
								{!store.login ? (
									<img alt="PROFILE" src={process.env.PUBLIC_URL + '/images/noavatar.png'} />
								) : store.login.username === 'imki123' ? (
									<img alt="PROFILE" src={process.env.PUBLIC_URL + '/images/avatar.png'} />
								) : (
									<img alt="PROFILE" src={process.env.PUBLIC_URL + '/images/dog' + (Math.floor(Math.random() * (3 - 1 + 1)) + 1) + '.png'} />
								)}
							</div>
							<div className="commentContent">
								{store.login ? (
									<span className="commentUsername">{store.login.username}</span>
								) : (
									<button
										className="loginButton"
										onClick={() => {
											history.push('/login')
										}}
									>
										로그인
									</button>
								)}
								{store.login ? <textarea onChange={store.resizeTextarea} placeholder=" 댓글을 남겨주세요 :D" /> : <textarea readOnly placeholder=" 로그인 후에 댓글을 남겨주세요 :D" />}
							</div>
						</div>
						<div className="commentButtons">
							{store.login && (
								<button className="commentButton" onClick={postComment}>
									댓글작성
								</button>
							)}
						</div>
					</>
				)}

				{/* 댓글 목록 */}
				{comments && comments.length > 0 && (
					<div id="comments">
						<div className="commentTitle">
							<div className="commentCnt">댓글 {comments.length}개</div>
							<span className="commentRefresh" onClick={refreshComment}>
								댓글 새로고침 <RefreshIcon />
							</span>
						</div>
						{comments.map((i, idx) => idx < commentCnt && <Comment post={post} comment={i} key={i.commentId} refreshComment={refreshComment} />)}
						{comments.length > commentCnt && (
							<div className="more">
								<span className="moreButton" onClick={more}>
									댓글 더보기
								</span>
							</div>
						)}
					</div>
				)}
			</div>
			{location.pathname === '/' && (
				<div className="homeLists">
					<Recents title="최신글" list={recents} />
					<Recents title="인기글" list={popular} />
					<CommentLists title="최근 댓글" list={recentComments} />
				</div>
			)}
		</>
	)
}
export default React.memo(Post)
