import React from 'react'
import './Guide.css'
import { NavLink } from 'react-router-dom';

function Guide() {
	return(
        <div id="guideWrapper" className="menuSlide">
            <div id="avatar">
                <img alt="avatar" src={process.env.PUBLIC_URL+'/images/avatar.png'}/>
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
            </div>
        </div>
    ) 
}
export default React.memo(Guide)
