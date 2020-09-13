import React, { useEffect, useState } from 'react'
import './Guide.css'
import { NavLink, useLocation } from 'react-router-dom';

function Guide(props) {
    const location = useLocation()
    const [homes, setHomes] = useState(0)
    const [abouts, setAbouts] = useState(0)
    const [articles, setArticles] = useState(0)
    const [programmings, setProgrammings] = useState(0)

    // 가이드에 글이 몇개인지 표시함
    useEffect(() => {
        let url = process.env.REACT_APP_URL+'/posts'
        fetch(url,{
            mode: 'cors',
            method: 'GET',
            credentials: "include",
        })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                //성공하면 아래 then 작동
                res.json().then(res => {
                    let ho=0, ab=0, ar=0, pr=0
                    for(let post of res){
                        if(post.tags.indexOf('home') > -1) ho++
                        if(post.tags.indexOf('about') > -1) ab++
                        if(post.tags.indexOf('article') > -1) ar++
                        if(post.tags.indexOf('programming') > -1) pr++
                    }
                    setHomes(ho)
                    setAbouts(ab)
                    setArticles(ar)
                    setProgrammings(pr)
                })
            } else {
            }
        })
        .catch((e) => console.error(e))
    },[location.pathname])

    //모바일에서 메뉴 클릭시 닫기
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
                    <NavLink exact to="/" className="list" activeClassName="activeList">
                        <span>Home</span><span>{homes}</span></NavLink>
                    <NavLink to="/about" className="list" activeClassName="activeList">
                        <span>About</span><span>{abouts}</span></NavLink>
                    <NavLink to="/article" className="list" activeClassName="activeList">
                        <span>Article</span><span>{articles}</span></NavLink>
                    <NavLink to="/programming" className="list" activeClassName="activeList">
                        <span>Programming</span><span>{programmings}</span></NavLink>
                </div>
            </div>
        </div>
    ) 
}
export default React.memo(Guide)
