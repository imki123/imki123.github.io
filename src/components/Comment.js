import React from 'react'
import './Comment.css'

function Comment(props) {
    const {comment, login} = props
    let date = comment.publishedDate.substring(0,16).replace('T',' ')
	return(
    <>
        <div className="comment">
            <div className="commentProfile">
                {comment.username ? 
                <img alt="PROFILE" src={process.env.PUBLIC_URL+'/images/avatar.png'}/> :
                <img alt="PROFILE" src={process.env.PUBLIC_URL+'/images/noavatar.png'}/>}
                {comment.username}
            </div>
            <div className="commentContent">
                <span className="commentDate">{date}</span>
                <textarea readOnly value={comment.content}/>
            </div>
        </div>
        {comment.username === login.username &&
        <div className="commentButtons">
            <button className="commentButton">수정</button>
            <button className="commentButton" style={{background:'red'}}>삭제</button>
        </div>}
    </>
    ) 
}
export default React.memo(Comment)
