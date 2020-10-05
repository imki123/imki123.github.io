import React from 'react'
import './Guide.css'
import { AppContext } from '../App'
import Menus from './Menus'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'

function Guide(props) {
	const store = React.useContext(AppContext)

	return (
		<div id="guideBack" onClick={store.closeMenuMobile}>
			<div id="guideWrapper" className="slideMenu">
				<div id="avatar">
					<img alt="avatar" src={process.env.PUBLIC_URL + '/images/avatar.png'} title="Hello :D" />
					<div id="name">Im kiyoung</div>
					<div id="nickName">imki123</div>
					<div id="github">
						<a href="https://github.com/imki123">
							<img alt="github" src={process.env.PUBLIC_URL + '/images/GitHub-Mark-32px.png'} /> <span>https://github.com/imki123</span>
						</a>
					</div>
					<div id="introduction">A web programmer who dreams of being a wise developer.</div>
				</div>
				<div className="menus">
					<Menus menus={store.menus} />
				</div>
				<div className="menus">
					<a href="https://imki123.github.io/catbook" className="list"
                        onClick={e => {e.preventDefault(); window.open("https://imki123.github.io/catbook")}}>
						<div className="menuLink">
							<div>
								<img alt="catbook" src={process.env.PUBLIC_URL + '/images/catbook_64.png'} />
								Catbook
							</div>
							<OpenInNewIcon />
						</div>
					</a>
				</div>
			</div>
		</div>
	)
}
export default React.memo(Guide)
