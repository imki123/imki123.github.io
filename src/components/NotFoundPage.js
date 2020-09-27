import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import './NotFoundPage.css'

function NotFoundPage() {
	const store = React.useContext(AppContext)
	useEffect(() => {
		console.log(`Not found page! Go home. https://imki123.github.io${process.env.PUBLIC_URL}`)
		store.setReady(true)
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
