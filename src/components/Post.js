import React, { useEffect, useState } from 'react'
import './Post.css'
import { NavLink, useLocation } from 'react-router-dom'

function Post(props){
    const {post, no} = props
    let date = post.publishedDate.substring(0,10)

    const [ps, setPs] = useState([])
    const location = useLocation()

    useEffect(() => {
        if(post){
            setPs(post.body.split('\n')) //텍스트를 문단으로 쪼개기
        }
    },[post, location])

    return(
        <div className="post" id={`post_${no}`}>
            <div className="nav">
                <NavLink exact to="/" className="inActiveNav" activeClassName="activeNav" >Home</NavLink>
                <NavLink to="/about" className="inActiveNav" activeClassName="activeNav" >About</NavLink>
                <NavLink to="/article" className="inActiveNav" activeClassName="activeNav" >Article</NavLink>
                <NavLink to="/programming" className="inActiveNav" activeClassName="activeNav" >Programming</NavLink>
                - {no} - {date}
            </div>
            <h2 className="postTitle">{post.title}</h2>
            <div className="postContent">
                {ps.map((p,idx) => <p key={idx}>{p}</p>)}
            </div>
            
        </div>
    )
}
export default React.memo(Post)