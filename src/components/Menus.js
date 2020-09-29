import React from 'react'
import { NavLink } from 'react-router-dom'
import './Menus.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

function Menus(props) {
	const { menus } = props

	//menu정보를 받아서 링크 메뉴 생성하기
	//menu { name: string, cnt: number, Object{ name: string, cnt: number}, Object{...}}
	return (
		<>
			{menus &&
				menus.map((i) => (
					<div key={i.name}>
						<NavLink exact to={i.name === 'home' ? '/' : `/tags/${i.name}`} className="list" activeClassName="activeList">
							<span className="menuName">{i.name.substring(0, 1).toUpperCase() + i.name.substring(1)}</span>
							<span className="menuOptions">
								<span className="menuCnt">{i.count}</span>
								<span className="menuExpandIcon">{i.subMenus && i.subMenus.length >= 1 && <ExpandMoreIcon />}</span>
							</span>
						</NavLink>
						{i.subMenus && i.subMenus.length > 0 && i.subMenus.map((j) => (
							<NavLink exact to={`/tags/${j.name}`} className="list subList" activeClassName="activeList" key={j.name}>
                            <span className="menuName">{j.name.substring(0, 1).toUpperCase() + j.name.substring(1)}</span>
                            <span className="menuOptions">
                                <span className="menuCnt">{j.count}</span>
                            </span>
                        </NavLink>
						))}
					</div>
				))}
		</>
	)
}
export default React.memo(Menus)
