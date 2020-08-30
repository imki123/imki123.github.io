import React from 'react'
import './Guide.css'
import { NavLink } from 'react-router-dom';

function Guide() {
	return(
        <div id="guide">
            <NavLink exact to="/" className="list" activeClassName="activeList">Home</NavLink>
            <NavLink to="/about" className="list" activeClassName="activeList">About</NavLink>
            <NavLink to="/article" className="list" activeClassName="activeList">Article</NavLink>
            <NavLink to="/programming" className="list" activeClassName="activeList">Programming</NavLink>
        </div>
    ) 
}
export default Guide
