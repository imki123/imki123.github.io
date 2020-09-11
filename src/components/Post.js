import React, { useEffect, useState } from 'react'
import './Post.css'
import { NavLink, useLocation } from 'react-router-dom'
import { useQuill } from 'react-quilljs';

function Post(props){
    const {post, no, login} = props
    const [ps, setPs] = useState([])
    const location = useLocation()
    let date = post.publishedDate.substring(0,10)
    const {quill, quillRef} = useQuill({readOnly: true, theme: 'bubble', toolbar: false})

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
    useEffect(() => {
        const editor = document.querySelector('#editor')
        const toolbar = document.querySelector('.ql-toolbar')
        if(editor && toolbar){
            editor.style.marginBottom = toolbar.clientHeight+ 10 + 'px'
        }
        window.addEventListener('resize',function(){
            if(editor && toolbar){
                editor.style.marginBottom = toolbar.clientHeight+ 10 + 'px'
            }
        })
    },[location])

    //포스트 수정버튼 클릭시
    const editPost = () => {
        
    }
    const deletePost = () => {
        
    }

    return(
        <div className="post" id={`post_${no}`}>
            <div className="nav">
                <NavLink exact to="/" className="inActiveNav" activeClassName="activeNav" >Home</NavLink>
                <NavLink to="/about" className="inActiveNav" activeClassName="activeNav" >About</NavLink>
                <NavLink to="/article" className="inActiveNav" activeClassName="activeNav" >Article</NavLink>
                <NavLink to="/programming" className="inActiveNav" activeClassName="activeNav" >Programming</NavLink>
                - {no} - {date}
            </div>
            <h2 className="postTitle">{post.title}</h2>
            <div className="postContent">
                {typeof(post.body) === 'string' ? 
                    ps.map((p,idx) => <p key={idx}>{p}</p>) :
                    <div id="editor">
                        <div ref={quillRef} />
                    </div>
                }
            </div>

            {login && <div className="postButtons">
                <button onClick={editPost}>수정</button> <button onClick={deletePost}>삭제</button>
            </div>}
            
        </div>
    )
}
export default React.memo(Post)