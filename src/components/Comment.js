import React from 'react'
import './Comment.css'

function Comment(props) {
    const {comment, login, post, refresh, setRefresh} = props
    let date = comment.publishedDate.substring(0,16).replace('T',' ')

    const deleteComment = e => {
        if(window.confirm('삭제 후에는 복구가 불가능 합니다. 정말로 댓글을 삭제하시겠습니까?')){
            const commentId = e.target.parentNode.id.replace('comment_','')
            console.log(commentId)
            let url = process.env.REACT_APP_URL+`/comments/delete/${post.postId}/${commentId}`
            //url = process.env.REACT_APP_LOCAL_URL+`/comments/delete/${post.postId}/${commentId}`
            fetch(url, {
                mode: 'cors',
                method: 'PATCH',
                credentials: "include",
            })
            .then(res => {
               if(res.status===200) { //성공하면 아래 then 작동
                    res.json().then(res =>{ 
                        console.log(`${commentId}번 댓글 삭제 성공`)
                        refresh ? setRefresh(false) : setRefresh(true) //포스트 다시 불러오기
                    })
                }else{
                    let message = '댓글 삭제에 실패했습니다 :('
                    alert(message)
                }
            })
            .catch(e => console.error(e))
        }
    }

	return(
    <>
        <div className="comment">
            <div className="commentProfile">
                {comment.username ? 
                <img alt="PROFILE" src={process.env.PUBLIC_URL+'/images/avatar.png'}/> :
                <img alt="PROFILE" src={process.env.PUBLIC_URL+'/images/noavatar.png'}/>}
            </div>
            <div className="commentContent">
                <span className="commentUsername">{comment.username}</span>
                <span className="commentDate"> - {date}</span>
                <textarea readOnly value={comment.content}/>
            </div>
        </div>
        {(comment.username === login.username || login.username === 'imki123')&&
        <div className="commentButtons" id={'comment_'+comment.commentId}>
            <button className="commentButton" >수정</button>
            <button className="commentButton" style={{background:'red'}} onClick={deleteComment}>삭제</button>
        </div>}
    </>
    ) 
}
export default React.memo(Comment)
