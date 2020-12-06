import React from 'react'
import './Recents.scss'

import PostList from './PostList'

function Recents(props) {
  const { title, list } = props
  return (
    <div className="post recents">
      <div className="postListTitle">{title}</div>
      {list && list.map((i, idx) => <PostList no={idx + 1} list={i} key={i.postId} />)}
    </div>
  )
}
export default React.memo(Recents)
