import React, { useEffect, useState } from 'react'
import './PostList.css'
import { useLocation, Link } from 'react-router-dom'
import { useQuill } from 'react-quilljs';

function PostList(props){
    const {post, no} = props
    const [body, setBody] = useState([])
    const location = useLocation()
    const {quill, quillRef} = useQuill({readOnly: true})
    let date = post.publishedDate.substring(0,16).replace('T',' ')


    useEffect(() => {
        if(post){
            if(typeof(post.body) === 'string'){
                if(post.body.length > 100){
                    setBody(post.body.replace('\n',' ').slice(0,100)+'...') //텍스트 길이 자르기
                }else{
                    setBody(post.body)
                }
            }else{
                if(quill){ //quill Delta를 텍스트로 변경하기
                    quill.setContents(post.body)
                    setBody(quill.getText().replace(/\n/g,' '))
                    quill.setText(body)
                }
            }
        }
    },[post, quill, body])

    return(
        <Link to={location.pathname+location.search+'#post_'+no}>
            <div className="postList no-drag">
                <div className="postListHeader">
                    <div>
                        <span className="postId">{no}.</span>
                        <span className="postTitle">{post.title}</span>
                    </div>
                    <span className="postDate">{date}</span>
                </div>
                {typeof(post.body) === 'string' ? 
                    <div className="postBody">{body}</div> :
                    <div id="editor">
                        <div ref={quillRef} />
                    </div>
                }
            </div>
        </Link>
    )
}
export default React.memo(PostList)