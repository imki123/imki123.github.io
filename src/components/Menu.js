import React from 'react'
import { NavLink } from 'react-router-dom'
import './Menu.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Menu(props) {
    const {menu} = props
    const subMenu = []
    if(menu){
        const keys = Object.keys(menu)
        for(let i in keys){
            if(keys[i] !== 'cnt' && keys[i] !== 'name'){
                subMenu.push(menu[keys[i]])
            }
        }
    }

    //menu정보를 받아서 링크 메뉴 생성하기
    //menu { name: string, cnt: number, Object{ name: string, cnt: number}, Object{...}}
	return(
        <>
            {menu && 
            <NavLink exact to={menu.name === 'home' ? '/' : `/${menu.name}`} className="list" activeClassName="activeList">
                <span className="menuName">{menu.name.substring(0,1).toUpperCase()+menu.name.substring(1)}</span>
                <span className="menuOptions">
                    <span className="menuCnt">{menu.cnt}</span>
                    <span className="menuExpandIcon">{Object.keys(menu).length > 2 && <ExpandMoreIcon/>}</span>
                </span>
            </NavLink>}
            {subMenu.length > 0 && subMenu.map(i => 
                <NavLink exact to={`/${i.name}`} className="list subList" activeClassName="activeList" key={i.name}>
                    <span className="menuName">{i.name.substring(0,1).toUpperCase()+i.name.substring(1)}</span>
                    <span className="menuOptions">
                        <span className="menuCnt">{i.cnt}</span>
                    </span>
                </NavLink>
            )}
        </>
    ) 
}
export default React.memo(Menu)
