import React, { useEffect } from 'react'
import './Guide.css'
import { NavLink, useLocation } from 'react-router-dom';

function Guide() {
    const location = useLocation()
    console.log(process.env.REACT_APP_URL)
    
    // 가이드에 글이 몇개인지 표시함
    useEffect(() => {
        
        /*let url = 
        fetch(url,{
            mode: 'cors',
            method: 'GET',
            credentials: "include",
        })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                //성공하면 아래 then 작동
                const h = {}
                res.headers.forEach((v, n) => (h[n] = v))
                setHeaders(h)
                res.json().then(res => {
                    setPosts(res)
                    setReady(true)
                })
            } else {
                console.log('posts 조회 실패')
                setReady(true)
            }
        })
        .catch((e) => console.error(e)) */
    },[location.pathname])

    const closeMenuMobile = e => {
        const body = document.querySelector('#body')
        const guideWrapper = document.querySelector('#guideWrapper')
        const content = document.querySelector('#content')

        if(body.clientWidth < 500){ //모바일
            guideWrapper.parentNode.style.width = '0' // 회색 0
            guideWrapper.style.width = '0px' // 메뉴 0
            content.style.width = '100%'
        }
    }

	return(
        <div id="guideBack" onClick={closeMenuMobile}>
            <div id="guideWrapper" className="slideMenu">
                <div id="avatar">
                    <img alt="avatar" src={process.env.PUBLIC_URL+'/images/avatar.png'} title='Hello :D'/>
                    <div id="name">Im kiyoung</div>
                    <div id="nickName">imki123</div>
                    <div id="github">
                        <a href="https://github.com/imki123">
                            <img alt="github" src={process.env.PUBLIC_URL+'/images/GitHub-Mark-32px.png'}
                            /> <span>https://github.com/imki123</span>
                        </a>
                    </div>
                    <div id="introduction">
                        A web programmer who dreams of being a wise developer.
                    </div>
                </div>
                <div id="guide">
                    <NavLink exact to="/" className="list" activeClassName="activeList">Home</NavLink>
                    <NavLink to="/about" className="list" activeClassName="activeList">About</NavLink>
                    <NavLink to="/article" className="list" activeClassName="activeList">Article</NavLink>
                    <NavLink to="/programming" className="list" activeClassName="activeList">Programming</NavLink>
                    {/* <NavLink to="/quill" className="list" activeClassName="activeList">Quill</NavLink> */}
                </div>
            </div>
        </div>
    ) 
}
export default React.memo(Guide)
