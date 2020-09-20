import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import { AppContext } from '../App'

function Header(props) {
    const store = React.useContext(AppContext) 

    const toggleSetting = () => {
        const setting = document.querySelector('#settingWrapper')
        if(setting){
            if(setting.style.display === 'block'){
                setting.style.display = 'none'
            }else{
                setting.style.display = 'block'
            } 
        }
    }

	return(
        <div id="headerWrapper">
            <div id="header">
                <div className="hover" onClick={store.slideMenu}>
                    <img id="menu" alt="MENU" src={process.env.PUBLIC_URL+'/images/guide_icon.png'}/>
                </div>
                <Link to="/"> 
                    <div id="title" className="hover">
                        <img id="logo" alt="logo" src={process.env.PUBLIC_URL+'/images/GitHub-Mark-32px.png'}/> 
                        행복한 코딩 블로그 :D
                    </div>
                </Link>
                <div className="hover"  onClick={toggleSetting}>
                {!store.login ? 
                    <img className="profile" alt="PROFILE" src={process.env.PUBLIC_URL+'/images/noavatar.png'}/> :
                    store.login.username === 'imki123' ?
                        <img className="profile" alt="PROFILE" src={process.env.PUBLIC_URL+'/images/avatar_small.png'}/> :
                        <img className="profile" alt="PROFILE" 
                            src={process.env.PUBLIC_URL+'/images/dog'+(Math.floor(Math.random() * (3 - 1 + 1)) + 1)+'.png'}/>}
                </div>
            </div>
        </div>
    ) 
}
export default React.memo(Header)
