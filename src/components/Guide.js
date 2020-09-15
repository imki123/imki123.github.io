import React, { useEffect, useState } from 'react'
import './Guide.css'
import Menu from './Menu'

function Guide(props) {
    const {menus} = props
    const [newMenu, setNewMenu] = useState([])
    useEffect(() => {
        const tempMenu = []
        for(let i in menus){
            if(menus[i].name !== 'home' && menus[i].name !== 'about' && menus[i].name !== 'programming' && menus[i].name !== 'article'){
                tempMenu.push(menus[i])
            }
        }
        setNewMenu(tempMenu)
    },[menus])
    

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
                    <Menu menu={menus.home}/>
                    <Menu menu={menus.about}/>
                    <Menu menu={menus.programming}/>
                    <Menu menu={menus.article}/>
                    {newMenu.map(i => <Menu menu={i} key={i}/>)}
                </div>
            </div>
        </div>
    ) 
}
export default React.memo(Guide)
