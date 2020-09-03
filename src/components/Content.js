import React from 'react'
import './Content.css'
import Post from './Post';

function Content(props) {
    let {posts} = props

	return(
        <div id="content" className="menuSlide">
            {
                posts && posts.map((post, idx) => <Post no={posts.length-idx} key={post.postId} post={post}/>)
            }
            {props.children}
        </div>
    ) 
}
export default Content
