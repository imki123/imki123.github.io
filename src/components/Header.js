import React from 'react'
import './Header.css'

function Header() {
	return(
        <div id="header">
            <div>Menu</div>
            <div id="title">
                <img id="logo" alt="logo" src={process.env.PUBLIC_URL+"/images/GitHub-Mark-32px.png"}/> 
                행복한 세상 블로그 :D
            </div>
            <div>profile</div>
        </div>
    ) 
}
export default Header
