import React from 'react'
import { Link } from 'react-router-dom'
import './CommentLists.css'

function CommentLists(props) {
	const { title, list } = props
	return (
		<div className="recents recentComment">
			<div className="postListTitle">{title}</div>
			{list &&
				list.map((i, idx) => (
					<div key={i.title + idx}>
						<Link to={`/posts/${i.postId}/#comments`}>
							<div className="postList no-drag">
								<div className="postListHeader">
									<div>
										<span className="postId">{idx + 1}. </span>
										<span className="username">{i.username}</span>
									</div>
									<span className="postDate">{i.publishedDate && i.publishedDate.substring(0, 19).replace('T', ' ')}</span>
								</div>
								<div className="postBody">
									{i.content}
								</div>
								<div className="postTitle">{i.title}</div>
							</div>
						</Link>
					</div>
				))}
		</div>
	)
}
export default React.memo(CommentLists)
