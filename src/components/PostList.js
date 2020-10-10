import React from 'react'
import './PostList.css'
import { Link } from 'react-router-dom'

function PostList(props) {
	const { list, no } = props
	let date = list.publishedDate.substring(0, 10).replace('T', ' ')

	return (
		<Link to={`/posts/${list.postId}`}>
			<div className="postList no-drag">
				<div className="postListHeader">
					<div>
						<span className="postId">{no}.</span>
						<span className="postTitle">{list.title}</span>
					</div>
					<span className="postDate">
						{list.views ? list.views + 1 : 1}, {date}
					</span>
				</div>
				<div className="postBody">{list.text}</div>
			</div>
		</Link>
	)
}
export default React.memo(PostList)
