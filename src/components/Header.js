import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import MenuIcon from '@material-ui/icons/Menu';

function Header(props) {
	const store = React.useContext(AppContext)

	const toggleSetting = () => {
		const setting = document.querySelector('#settingWrapper')
		if (setting) {
			if (setting.style.display === 'block') {
				setting.style.display = 'none'
			} else {
				setting.style.display = 'block'
			}
		}
	}

	return (
		<div id="headerWrapper">
			<div id="header">
				<div className="menu hover" onClick={store.slideMenu}>
					<MenuIcon/>
				</div>
				<Link to="/">
					<div id="title" className="hover" onClick={store.closeMenuMobile}>
						<img id="logo" alt="logo" src={process.env.PUBLIC_URL + '/images/imcat_64.png'} />
						임기의 코딩 블로그
					</div>
				</Link>
				<div className="hover" onClick={toggleSetting}>
					{!store.login ? (
						<img className="profile" alt="PROFILE" src={process.env.PUBLIC_URL + '/images/noavatar.png'} />
					) : (
						<img
							className="profile"
							alt="PROFILE"
							src={store.login.imageUrl ? store.login.imageUrl : 'noimage'+Math.floor(Math.random()*100)}
							onError={(e) => {
								e.target.src = process.env.PUBLIC_URL + '/images/dog' + (Math.floor(Math.random() * (3 - 1 + 1)) + 1) + '.png'
							}}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
export default React.memo(Header)
