import React from 'react'
import './Header.css'

function Header() {
	return(
        <div id="headerWrapper">
            <div id="header">
                <div>MENU</div>
                <div id="title">
                    <img id="logo" alt="logo" src={process.env.PUBLIC_URL+"/images/GitHub-Mark-32px.png"}/> 
                    행복한 세상 블로그 :D
                </div>
                <div>PROFILE</div>
            </div>
        </div>
    ) 
}
export default Header
