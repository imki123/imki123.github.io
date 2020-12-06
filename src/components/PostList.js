import React from 'react'
import './PostList.scss'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

function PostList(props) {
  const { list, no } = props
  let date = list.publishedDate.substring(0, 10).replace('T', ' ')

  return (
    <Link to={`/posts/${list.postId}`}>
      <Button className="postList no-drag">
        <div className="postListTags">
          <span className="postTags">
            Tag : {list.tags[0]}
            {list.tags[1] ? `, ${list.tags[1]}` : ''}
          </span>
          <span className="postDate">
            {list.views ? list.views : 0}, {date}
          </span>
        </div>
        <div className="postListHeader">
          <div>
            <span className="postId">{no}.</span>
            <span className="postTitle">{list.title}</span>
          </div>
        </div>
        <div className="postBody">{list.text}</div>
      </Button>
    </Link>
  )
}
export default React.memo(PostList)
