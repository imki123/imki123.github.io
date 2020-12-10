import { Button } from '@material-ui/core'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import './CommentLists.scss'
import Meta from './Meta'

function CommentLists(props) {
  const store = React.useContext(AppContext)
  const { list, location } = props
  const [comments, setComments] = useState()
  const [commentCnt, setCommentCnt] = useState(10)
  const [recentAll, setRecentAll] = useState('')

  useEffect(() => {
    if (list) setComments(list) //props로 받은 list가 있으면 comments에 저장

    if (location && (location.pathname === '/comments' || location.pathname === '/comments/')) {
      //전체리스트면 Axios로 comments 가져옴
      setRecentAll('recentAll')
      let url = process.env.REACT_APP_URL + '/comments/recentAll'
      //url = process.env.REACT_APP_LOCAL_URL + '/comments/recentAll'
      Axios.get(url)
        .then((res) => {
          //console.log('comments:', res.data)
          setComments(res.data)
          setCommentCnt(20)
          if (!res.data) {
            setComments('')
          }
        })
        .catch((res) => {
          setComments('')
          //console.log(res)
        })
    }
  }, [location, list])

  useEffect(() => {
    if (store) store.setReady(false)
    if (comments) {
      store.setReady(true)
    } else if (comments === '') {
      store.setReady(true)
    }
  })

  //댓글 10개 더보기
  const more = (e) => {
    setCommentCnt(commentCnt + 10)
  }

  return (
    <div className={`post recents recentComment ${recentAll}`}>
      {location && (location.pathname === '/comments' || location.pathname === '/comments/') && (
        <Meta
          data={{
            title: '최근 댓글 목록',
            description: comments && comments.reduce((a, b) => a + ' / ' + b.content, ''),
            canonical: `comments`,
          }}
        />
      )}
      <div className="postListTitle">최신 댓글 {list && <Link to="/comments">더보기</Link>}</div>
      {comments &&
        comments.map((i, idx) => (
          <div key={i.title + idx}>
            {idx < commentCnt && (
              <Link to={`/posts/${i.postId}/#comments`}>
                <Button className="postList no-drag">
                  <div className="postListHeader">
                    <div>
                      <span className="postId">{idx + 1}.</span>
                      <span className="username">{i.username}</span>
                    </div>
                    <span className="postDate">{i.publishedDate && i.publishedDate.substring(0, 19).replace('T', ' ')}</span>
                  </div>
                  <div className="postBody">{i.content}</div>
                  <div className="postTitle">{i.title}</div>
                </Button>
              </Link>
            )}
          </div>
        ))}
      {comments && comments.length > commentCnt && (
        <div className="more">
          <span className="moreButton" onClick={more}>
            댓글 더보기
          </span>
        </div>
      )}
    </div>
  )
}
export default React.memo(CommentLists)
