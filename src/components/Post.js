import React, { useEffect, useState } from 'react'
import './Post.css'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useQuill } from 'react-quilljs'
import Comment from './Comment'
import { AppContext } from '../App'
import RefreshIcon from '@material-ui/icons/Refresh'
import Axios from 'axios'

function Post({ match }) {
	const store = React.useContext(AppContext)
	const { postId } = match.params
	const [post, setPost] = useState(false)
	const [ps, setPs] = useState([])
	const [comments, setComments] = useState(post.comments)
	const [commentCnt, setCommentCnt] = useState(3)

	const location = useLocation()
	const history = useHistory()

	const modules = { syntax: true }
	const formats = ['bold', 'italic', 'underline', 'strike', 'code-block', 'blockquote', 'size', 'header', 'align', 'color', 'background', 'indent', 'list', 'link', 'image', 'video', 'clean']
	const { quill, quillRef } = useQuill({ modules, formats, readOnly: true })

	useEffect(() => {
		//포스트 가져오기
		store.setReady(false)
		let url = process.env.REACT_APP_URL + '/posts/id/' + postId
		//url = process.env.REACT_APP_LOCAL_URL + '/posts/id/' + postId

		if (location.pathname === '/') {
			url = process.env.REACT_APP_URL + '/posts/id/1'
			//url = process.env.REACT_APP_LOCAL_URL + '/posts/id/1'
		}
		Axios.get(url, {
			withCredentials: true,
		})
			.then((res) => {
				console.log(res.data)
				setPost(res.data)
				store.setReady(true)
			})
			.catch((e) => alert(e)) //실패
	}, [location, postId, store.setReady])

	useEffect(() => {
		if (post) {
			if (typeof post.body === 'string') {
				setPs(post.body.split('\n')) //텍스트일 경우 문단으로 쪼개기
			} else {
				if (quill) {
					quill.setContents(post.body)
				}
			}
		}
	}, [post, quill])

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
					store.refresh ? store.setRefresh(false) : store.setRefresh(true)
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
		<div className="post">
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
				{typeof post.body === 'string' ? (
					ps.map((p, idx) => <p key={idx}>{p}</p>)
				) : (
					<div id="editor">
						<div ref={quillRef} />
					</div>
				)}

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

			{/* 댓글 목록 */}
			{comments && comments.length > 0 && (
				<div className="comments">
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
	)
}
export default React.memo(Post)
