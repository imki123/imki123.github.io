import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import { AppContext } from '../App'

function Header(props) {
    const store = React.useContext(AppContext)

    const slideMenu = () => { //메뉴버튼 클릭 시 메뉴 보이기 & 숨기기
        const body = document.querySelector('#body')
        const guideWrapper = document.querySelector('#guideWrapper')
        const content = document.querySelector('#content')

        if(guideWrapper.clientWidth > 100){ //메뉴 닫기
            guideWrapper.parentNode.style.width = '0' // 회색 0
            guideWrapper.style.width = '0px' // 메뉴 0
            content.style.width = 'calc(100% - 16px)'
        }else{ //메뉴 열기
            if(body.clientWidth < 500){ //모바일
                guideWrapper.parentNode.style.width = '100%' // 회색 100%
                guideWrapper.style.width = '230px' // 메뉴 230
            }else{ //PC
                guideWrapper.style.width = '312px' // 메뉴 312
                content.style.width = `calc(100% - 312px - 16px)`
            }
        }
    }

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
                <div className="hover" onClick={slideMenu}>
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
                        <img className="profile" alt="PROFILE" src={process.env.PUBLIC_URL+'/images/avatar.png'}/> :
                        <img className="profile" alt="PROFILE" 
                            src={process.env.PUBLIC_URL+'/images/dog'+(Math.floor(Math.random() * (3 - 1 + 1)) + 1)+'.png'}/>}
                </div>
            </div>
        </div>
    ) 
}
export default React.memo(Header)
