import React from 'react'
import './PostList.css'
import { useLocation, Link } from 'react-router-dom'

function PostList(props){
    const {post, no} = props
    const location = useLocation()
    let date = post.publishedDate.substring(0,16).replace('T',' ')

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
                <div className="postBody">{post.text}</div>
            </div>
        </Link>
    )
}
export default React.memo(PostList)