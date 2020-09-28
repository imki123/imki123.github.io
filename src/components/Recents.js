import React from 'react'
import './Recents.css'

import PostList from './PostList'

function Recents(props) {
	const {title, list} = props
	return (
		<div id="recents">
            <div className="postListTitle">{title}</div>
            {list && list.map((i, idx) => <PostList no={list.length - idx} list={i} key={i.postId} />)}
		</div>
	)
}
export default React.memo(Recents)
