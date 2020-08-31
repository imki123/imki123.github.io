import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';

function Header(props) {
    const [menu, setMenu] = useState(true)
    const {resizeTextarea} = props

    const menuSlide = () => {
        const guide = document.querySelector('#guide')
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
            guide.style.width = '0px'
            content.style.width = '100%'
            setMenu(false)
        }else{
            guide.style.width = '200px'
            content.style.width = 'calc(100% - 200px)'
            setMenu(true)
        }
        
    }

	return(
        <div id="headerWrapper">
            <div id="header">
                <div className="hover" onClick={menuSlide}>MENU</div>
                <Link to="/"> 
                    <div id="title" className="hover">
                        <img id="logo" alt="logo" src={process.env.PUBLIC_URL+"/images/GitHub-Mark-32px.png"}/> 
                        행복한 세상 블로그 :D
                    </div>
                </Link>
                <div className="hover">PROFILE</div>
            </div>
        </div>
    ) 
}
export default Header
