import React, { useEffect, useState } from 'react'
import './Guide.css'
import Menu from './Menu'
import { AppContext } from '../App'

function Guide(props) {
    const store = React.useContext(AppContext)
    const [newMenu, setNewMenu] = useState([])
    useEffect(() => {
        const tempMenu = []
        for(let i in store.menus){
            if(store.menus[i].name !== 'home' && store.menus[i].name !== 'about' && store.menus[i].name !== 'programming' && store.menus[i].name !== 'article'){
                tempMenu.push(store.menus[i])
            }
        }
        setNewMenu(tempMenu)
    },[store.menus])
    

    //모바일에서 메뉴 클릭시 닫기
    const closeMenuMobile = e => {
        const body = document.querySelector('#body')
        const guideWrapper = document.querySelector('#guideWrapper')
        const content = document.querySelector('#content')

        if(body.clientWidth < 500){ //모바일
            guideWrapper.parentNode.style.width = '0' // 회색 0
            guideWrapper.style.width = '0px' // 메뉴 0
            content.style.width = 'calc(100% - 16px)'
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
                    <Menu menu={store.menus.home}/>
                    <Menu menu={store.menus.about}/>
                    <Menu menu={store.menus.programming}/>
                    <Menu menu={store.menus.article}/>
                    {newMenu.map(i => <Menu menu={i} key={i}/>)}
                </div>
            </div>
        </div>
    ) 
}
export default React.memo(Guide)
