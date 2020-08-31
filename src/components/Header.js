import React, { useState, useEffect } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';

function Header(props) {
    const [menu, setMenu] = useState(true) //메뉴보임
    const {resizeTextarea} = props

    useEffect(() => { //처음 로드될때 한번만 메뉴 보일지 안보일지 선택
        const guideWrapper = document.querySelector('#guideWrapper')
        if(guideWrapper.clientWidth < 10){
            setMenu(false) //메뉴안보임
        }
    },[])

    const menuSlide = () => {
        const guideWrapper = document.querySelector('#guideWrapper')
        const content = document.querySelector('#content')
        const textareas = document.querySelectorAll('textarea')
        if(textareas){
            setTimeout(function(){
                for(let i of textareas){
                    resizeTextarea(i)
                }
            }, 1000)
        }
        if(menu){
            guideWrapper.style.width = '0px'
            content.style.width = '100%'
            content.style.margin = '0px'
            setMenu(false)
        }else{
            guideWrapper.style.width = '200px'
            content.style.width = 'calc(100% - 200px)'
            content.style.margin = '0px'
            setMenu(true)
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
