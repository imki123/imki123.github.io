import React, { useState, useEffect } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';

function Header(props) {
    const {resizeTextarea} = props

    const menuSlide = () => {
        const guideWrapper = document.querySelector('#guideWrapper')
        const content = document.querySelector('#content')
        const textareas = document.querySelectorAll('textarea')

        if(textareas){ //메뉴 슬라이드 후(1초)에 텍스트에어리어 높이 조정
            setTimeout(function(){
                for(let i of textareas){
                    resizeTextarea(i)
                }
            }, 1000)
        }
        if(guideWrapper.clientWidth > 10){
            guideWrapper.style.width = '0px'
            content.style.width = '100%'
        }else{
            guideWrapper.style.width = '200px'
            content.style.width = 'calc(100% - 200px)'
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
