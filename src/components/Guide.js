import React from 'react'
import './Guide.css'
import { AppContext } from '../App'
import Menus from './Menus'

function Guide(props) {
    const store = React.useContext(AppContext)

    //모바일에서 회색부분 클릭 시 메뉴 닫기
    const closeMenuMobile = e => {
        const body = document.querySelector('#body')
        const guideWrapper = document.querySelector('#guideWrapper')
        const content = document.querySelector('#content')

        guideWrapper.parentNode.style.width = '0' // 회색 0
        if(body.clientWidth < 500){ //모바일
            guideWrapper.style.left = '-230px' // 메뉴 0
            content.style.width = 'calc(100% - 16px)'
        }else{
            content.style.width = 'calc(100% - 312px - 16px)'
        }
    }

	return(
        <div id="guideBack" onClick={closeMenuMobile}>
            <div id="guideWrapper" className="slideMenu">
                <div id="avatar">
                    <img alt="avatar" src={process.env.PUBLIC_URL+'/images/avatar.png'} title='Hello :D'/>
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
                <div id="menus">
                    <Menus menus={store.menus}/>
                </div>
            </div>
        </div>
    ) 
}
export default React.memo(Guide)
