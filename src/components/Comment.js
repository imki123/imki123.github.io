import React from 'react'
import './Comment.css'

function Comment(props) {
    const comment = {props}
	return(
         <div className="comment">
         <div className="commentProfile">
             {comment ? 
             <img alt="PROFILE" src={process.env.PUBLIC_URL+'/images/avatar.png'}/> :
             <img alt="PROFILE" src={process.env.PUBLIC_URL+'/images/noavatar.png'}/>}
             {comment ? comment.username : ''}
         </div>
         <textarea className="commentContent"/>
         <div className="commentButton">
             <button>수정</button>
             <button>삭제</button>
         </div>
     </div>
    ) 
}
export default React.memo(Comment)
