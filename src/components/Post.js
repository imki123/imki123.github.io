import React, { useEffect, useState } from 'react'
import './Post.css'
import { Link, useLocation } from 'react-router-dom'
import { useQuill } from 'react-quilljs';
import Comment from './Comment'

function Post(props){
    const {post, no, login, refresh, setRefresh, resizeTextarea} = props
    const [ps, setPs] = useState([])
    const location = useLocation()
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
        if(window.confirm('글 삭제 시 복구가 불가능합니다. 해당 글을 정말로 삭제하시겠습니까?')){
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
                        refresh ? setRefresh(false) : setRefresh(true)
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
        const comment = document.querySelector('.commentContent textarea') //댓글 텍스트
        if(comment && comment.value !== '' && window.confirm('댓글을 작성하시겠습니까?')){
            const postId = e.target.id
            let url = process.env.REACT_APP_URL+'/comments/'+postId
            //url = process.env.REACT_APP_LOCAL_URL+'/comments/'+postId
            
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
                        console.log(`${postId} 댓글 추가 성공`)
                        refresh ? setRefresh(false) : setRefresh(true) //포스트 다시 불러오기
                    })
                }else{
                    let message = '댓글 작성에 실패했습니다 :('
                    alert(message)
                }
            })
            .catch(e => console.error(e))
        }
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
                {login && login.username === 'imki123' && <div className="postButtons">
                    <Link to={`/quill?postId=${post.postId}`}>수정</Link>&nbsp;
                    <button onClick={deletePost} id={post.postId} style={{background: 'red'}}>삭제</button>
                </div>}
            </div>

            {!(location.pathname === '/' || location.pathname.indexOf('/about') > -1) && <>
                {/* 댓글 작성*/}
                <div className="writeComment">
                    <div className="commentProfile">
                        {!login ? 
                        <img alt="PROFILE" src={process.env.PUBLIC_URL+'/images/noavatar.png'}/> :
                        login.username === 'imki123' ?
                        <img alt="PROFILE" src={process.env.PUBLIC_URL+'/images/avatar.png'}/> :
                        <img alt="PROFILE" 
                            src={process.env.PUBLIC_URL+'/images/dog'+(Math.floor(Math.random() * (3 - 1 + 1)) + 1)+'.png'}/>}
                    </div>
                    <div className="commentContent">
                        {login ? <span className="commentUsername">{login.username}</span> : <button className="loginButton">로그인</button>}
                        {login ? 
                            <textarea onChange={resizeTextarea} placeholder=" 댓글을 남겨주세요 :D"/> : 
                            <textarea readOnly onChange={resizeTextarea} placeholder=" 로그인 후에 댓글을 남겨주세요 :D"/>}
                    </div>
                </div>
                <div className="commentButtons">
                    {login && <button id={post.postId} className="commentButton" onClick={postComment}>댓글작성</button>}
                </div>

                {/* 댓글 목록 */}
                {post.comments && 
                <div className="comments">
                    {post.comments.map(i => 
                        <Comment post={post} comment={i} login={login} key={i.commentId} refresh={refresh} setRefresh={setRefresh}/>)}
                </div>}
            </>}
            
        </div>
    )
}
export default React.memo(Post)