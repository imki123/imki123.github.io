import React, { useEffect, useState } from 'react'
import './Post.css'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useQuill } from 'react-quilljs';
import Comment from './Comment'
import { AppContext } from '../App'
import RefreshIcon from '@material-ui/icons/Refresh';

function Post(props){
    const store = React.useContext(AppContext)
    const {post, no} = props
    const [comments, setComments] = useState(post.comments)
    const [ps, setPs] = useState([])
    const [commentCnt, setCommentCnt] = useState(3)
    const location = useLocation()
    const history = useHistory()

    let date = post.publishedDate.substring(0,16).replace('T',' ')
    const modules = {syntax: true}
    const formats = ['bold', 'italic', 'underline', 'strike', 'code-block', 'blockquote', 'size',
        'header', 'align', 'color', 'background', 'indent', 'list', 'link', 'image', 'video', 'clean']
	const { quill, quillRef } = useQuill({modules, formats, readOnly: true})

    useEffect(() => {
        if(post){
            if(typeof(post.body) === 'string'){ 
                setPs(post.body.split('\n')) //텍스트일 경우 문단으로 쪼개기
            }else{
                if(quill){
                    quill.setContents(post.body)
                }
            }
        }
    },[post, location, quill])

    const deletePost = e => {
        if(window.confirm('글 삭제 시 복구가 불가합니다. 해당 글을 정말로 삭제하시겠습니까?')){
            const postId = e.target.id
            let url = process.env.REACT_APP_URL+'/posts/'+postId
            //url = process.env.REACT_APP_LOCAL_URL+'/posts/'+postId
            
            fetch(url,{
                mode: 'cors',
                method: 'DELETE',
                credentials: "include",
            })
            .then(res => {
                if(res.status===200 || res.status===204) { //성공하면 아래 then 작동
                    res.json().then(res =>{ 
                        console.log(`${postId}번 글 삭제 성공`)
                        store.refresh ? store.setRefresh(false) : store.setRefresh(true)
                    })
                }else{
                    let message = '글 삭제에 실패했습니다 :('
                    alert(message)
                }
            })
            .catch(e => console.error(e))
        }
    }

    const postComment = e => {
        const comment = document.querySelector(`#post_${no} .commentContent textarea`) //댓글 텍스트
        console.log(post)
        if(comment && comment.value !== '' && window.confirm('댓글을 작성하시겠습니까?')){
            let url = process.env.REACT_APP_URL+'/comments/'+post.postId
            //url = process.env.REACT_APP_LOCAL_URL+'/comments/'+post.postId
            
            fetch(url, {
                mode: 'cors',
                method: 'PATCH',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    //username: login.username,
                    content: comment.value,
                }),
            })
            .then(res => {
                if(res.status===200) { //성공하면 아래 then 작동
                    res.json().then(res =>{ 
                        console.log(`${post.postId} 댓글 추가 성공`)
                        store.refresh ? store.setRefresh(false) : store.setRefresh(true) //포스트 다시 불러오기
                    })
                }else{
                    let message = '댓글 작성에 실패했습니다 :('
                    alert(message)
                }
            })
            .catch(e => console.error(e))
        }
    }

    const refreshComment = e => { //포스트 가져오기
        let url = process.env.REACT_APP_URL+'/posts/id/'+post.postId
        //url = process.env.REACT_APP_LOCAL_URL+'/posts/id/'+post.postId

        const svg = e.target.querySelector('svg')
        svg.classList.add('refreshing') //refresh 애니메이션 시작

        fetch(url, {
            mode: 'cors',
            method: 'GET',
            credentials: "include",
        })
        .then(res => {
            if(res.status===200) { //성공하면 아래 then 작동
                res.json().then(res =>{ 
                    console.log(`${post.postId} 댓글 새로고침`)
                    setComments(res.comments)
                    svg.classList.remove('refreshing') //refresh 애니메이션 끝
                })
            }else{
                let message = '댓글 새로고침에 실패했습니다 :('
                console.log(message)
                svg.classList.remove('refreshing') //refresh 애니메이션 끝
            }
        })
        .catch(e => {
            console.error(e)
            svg.classList.remove('refreshing') //refresh 애니메이션 끝
        })
    }

    return(
        <div className="post" id={`post_${no}`}>
            <div className="nav">{date}</div>
            <h2 className="postTitle">{no}. {post.title}</h2>
            <div className="postContent">
                {/* 본문 */}
                {typeof(post.body) === 'string' ? 
                    ps.map((p,idx) => <p key={idx}>{p}</p>) :
                    <div id="editor">
                        <div ref={quillRef} />
                    </div>
                }

                {/* 태그 */}
                <div className="tags">
                <span>태그 : </span>
                {post.tags && post.tags.map((i,idx) => 
                    idx === 0 ? 
                    <span key={i}><Link to={i === 'home' ? '/' : `/${i}`}>{i}</Link></span> : 
                    <span key={i}>, <Link to={`/${i}`}>{i}</Link></span>)}
                </div>

                {/* 글 수정 삭제 버튼 */}
                {store.login && store.login.username === 'imki123' && <div className="postButtons">
                    <Link to={`/quill?postId=${post.postId}`} className="hover">수정</Link>&nbsp;
                    <button onClick={deletePost} id={post.postId} style={{background: 'red'}}>삭제</button>
                </div>}
            </div>

            {!(location.pathname === '/' || location.pathname.indexOf('/about') > -1) && <>
                {/* 댓글 작성*/}
                <div className="writeComment">
                    <div className="commentProfile">
                        {!store.login ? 
                        <img alt="PROFILE" src={process.env.PUBLIC_URL+'/images/noavatar.png'}/> :
                        store.login.username === 'imki123' ?
                        <img alt="PROFILE" src={process.env.PUBLIC_URL+'/images/avatar.png'}/> :
                        <img alt="PROFILE" 
                            src={process.env.PUBLIC_URL+'/images/dog'+(Math.floor(Math.random() * (3 - 1 + 1)) + 1)+'.png'}/>}
                    </div>
                    <div className="commentContent">
                        {store.login 
                        ? <span className="commentUsername">{store.login.username}</span> 
                        : <button className="loginButton" onClick={() => {history.push('/login')}}>로그인</button>}
                        {store.login ? 
                            <textarea onChange={store.resizeTextarea} placeholder=" 댓글을 남겨주세요 :D"/> : 
                            <textarea readOnly placeholder=" 로그인 후에 댓글을 남겨주세요 :D"/>}
                    </div>
                </div>
                <div className="commentButtons">
                    {store.login && <button className="commentButton" onClick={postComment}>댓글작성</button>}
                </div>

                {/* 댓글 목록 */}
                {comments && comments.length > 0 &&
                <div className="comments">
                    <div className="commentTitle">
                        <div className="commentCnt">댓글 {comments.length}개</div>
                        <span className="commentRefresh" onClick={refreshComment}>댓글 새로고침 <RefreshIcon/></span>
                    </div>
                    {comments.map((i, idx) => idx < commentCnt &&
                        <Comment post={post} comment={i} key={i.commentId}/>)}
                    {comments.length > commentCnt && 
                        <div className="more">
                            <span className="moreButton" onClick={e => setCommentCnt(commentCnt + 10)}>댓글 더보기</span>
                        </div>}
                </div>}
            </>}
            
        </div>
    )
}
export default React.memo(Post)