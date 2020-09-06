import React, { useEffect, useState } from 'react'
import './PostList.css'
import { useLocation, Link } from 'react-router-dom'

function PostList(props){
    const {post, no} = props
    let date = post.publishedDate.substring(0,10)

    const [body, setBody] = useState([])
    const location = useLocation()

    useEffect(() => {
        if(post){
            if(post.body.length > 100){
                setBody(post.body.replace('\n',' ').slice(0,100)+'...') //텍스트 길이 자르기
            }else{
                setBody(post.body)
            }
        }
    },[post])

    return(
        <Link to={location.pathname+location.search+'#post_'+no}>
            <div className="postList">
                <div className="postListHeader">
                    <div>
                        <span className="postId">{no}.</span>
                        <span className="postTitle">{post.title}</span>
                    </div>
                    <span className="postDate">{date}</span>
                </div>
                <div className="postBody">{body}</div>
            </div>
        </Link>
    )
}
export default React.memo(PostList)