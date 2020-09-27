import { Store } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import './NotFoundPage.css'

function NotFoundPage() {
	const store = React.useContext(AppContext)
	store.setReady(true)
	useEffect(() => {
		console.log(`Not found page! Go home. https://imki123.github.io${process.env.PUBLIC_URL}`)
	})

	return (
		<div className="notFound">
			<div className="title">Not Found Page</div>
			<div className="goHome">
				<Link to="/">Go Home</Link>
			</div>
		</div>
	)
}
export default React.memo(NotFoundPage)
