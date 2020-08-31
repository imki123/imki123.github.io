import React, { useState, useEffect } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';

function Header(props) {
    const {resizeTextarea} = props

    const menuSlide = () => {
        const guideWrapper = document.querySelector('#guideWrapper')
        const content = document.querySelector('#content')
        setTimeout(function(){
            resizeTextarea()
        }, 1000)

        if(guideWrapper.clientWidth > 10){
            guideWrapper.style.width = '0px'
            content.style.width = '100%'
        }else{
            guideWrapper.style.width = '180px'
            content.style.width = 'calc(100% - 180px)'
        }
        
    }

	return(
        <div id="headerWrapper">
            <div id="header">
                <div className="hover" onClick={menuSlide}>
                    <img alt="MENU" src={'images/guide_icon.png'}/>
                </div>
                <Link to="/"> 
                    <div id="title" className="hover">
                        <img id="logo" alt="logo" src="images/GitHub-Mark-32px.png"/> 
                        행복한 세상 블로그 :D
                    </div>
                </Link>
                <div className="hover">
                    <img alt="PROFILE" src={'images/profile_icon.png'}/>
                </div>
            </div>
        </div>
    ) 
}
export default Header
