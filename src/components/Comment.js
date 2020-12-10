import React, { useEffect, useState } from 'react'
import './Comment.scss'
import { AppContext } from '../App'
import Axios from 'axios'
import { resizeTextarea } from '../utils/util'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

function Comment(props) {
  const store = React.useContext(AppContext)
  const { comment, post, refreshComment } = props
  const [imageUrl, setImageUrl] = useState('noimage')
  let update = false
  let date = comment.publishedDate.substring(0, 16).replace('T', ' ')
  useEffect(() => {
    const textarea = document.querySelector(`#comment_${post.postId}_${comment.commentId} textarea`)
    textarea.value = comment.content

    //댓글 프로필 이미지 가져오기
    if (comment.username) {
      let url = process.env.REACT_APP_URL + '/auth/user'
      //url = process.env.REACT_APP_LOCAL_URL + '/auth/user'
      Axios.post(url, {
        withCredentials: true, //CORS
        data: {
          username: comment.username,
        },
      })
        .then((res) => {
          console.log(res.data.imageUrl)
          if (!res.data.imageUrl) setImageUrl('noimage' + Math.floor(Math.random() * 100))
          else setImageUrl(res.data.imageUrl)
        })
        .catch((e) => {
          setImageUrl('noimage' + Math.floor(Math.random() * 100))
        })
    }
  }, [comment, post.postId, setImageUrl])

  const updateComment = (e) => {
    //댓글 수정
    const textarea = document.querySelector(`#comment_${post.postId}_${comment.commentId} textarea`)
    if (!update) {
      update = true
      textarea.classList.add('updateMode')
      textarea.readOnly = false
      textarea.focus()
    } else if (window.confirm('댓글을 수정하시겠습니까?')) {
      update = false
      textarea.classList.remove('updateMode')
      textarea.readOnly = true

      let url = process.env.REACT_APP_URL + `/comments/${post.postId}/${comment.commentId}`
      //url = process.env.REACT_APP_LOCAL_URL+`/comments/${post.postId}/${comment.commentId}`

      Axios.patch(url, {
        //댓글 수정
        withCredentials: true, //CORS
        data: {
          content: textarea.value,
        },
      })
        .then((res) => {
          console.log(`${comment.commentId}번 댓글 수정 성공`)
          refreshComment() //포스트 다시 불러오기
        })
        .catch((e) => alert(e)) //실패
    }
  }

  const deleteComment = (e) => {
    if (window.confirm('삭제 후에는 복구가 불가합니다. 정말로 댓글을 삭제하시겠습니까?')) {
      let url = process.env.REACT_APP_URL + `/comments/delete/${post.postId}/${comment.commentId}`
      //url = process.env.REACT_APP_LOCAL_URL+`/comments/delete/${post.postId}/${comment.commentId}`

      Axios.patch(url, {
        //포스트 삭제
        withCredentials: true, //CORS
      })
        .then((res) => {
          console.log(`${comment.commentId}번 댓글 삭제 성공`)
          refreshComment() //포스트 다시 불러오기
        })
        .catch((e) => alert(e)) //실패
    }
  }

  return (
    <div className="commentWrapper" id={`comment_${post.postId}_${comment.commentId}`}>
      <div className="comment">
        <div className="commentProfile">
          {!comment.username ? (
            <AccountCircleIcon />
          ) : (
            <img
              alt="PROFILE"
              src={imageUrl}
              onError={(e) => {
                e.target.src = process.env.PUBLIC_URL + '/images/dog' + (Math.floor(Math.random() * (3 - 1 + 1)) + 1) + '.png'
              }}
            />
          )}
        </div>
        <div className="commentContent">
          {comment.username === store.login.username ? (
            <span className="commentUsername" style={{ fontWeight: 'bold' }}>
              {comment.username}
            </span>
          ) : (
            <span className="commentUsername">{comment.username}</span>
          )}
          <span className="commentDate">
            {' '}
            - {date} {comment.updated && '(수정됨)'}
          </span>
          <textarea readOnly onChange={resizeTextarea} />
        </div>
      </div>
      {((comment.username && comment.username === store.login.username) || store.login.username === 'imki123') && (
        <div className="commentButtons">
          <button className="commentButton" onClick={updateComment}>
            수정
          </button>
          <button className="commentButton" style={{ backgroundColor: 'red' }} onClick={deleteComment}>
            삭제
          </button>
        </div>
      )}
    </div>
  )
}
export default React.memo(Comment)
