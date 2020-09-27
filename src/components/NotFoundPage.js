import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../App'
import './NotFoundPage.css'

function NotFoundPage() {
	const store = React.useContext(AppContext)
	const history = useHistory()
	useEffect(() => {
		//console.log(`Not found page! https://imki123.github.io${process.env.PUBLIC_URL}`)
		store.setReady(true)
	})

	const goBack = e => {
		history.go(-1)
	}

	return (
		<div className="notFound">
			<div className="title">Not Found Page</div>
			<div className="goHome">
				<span onClick={goBack}>Go back</span>
			</div>
		</div>
	)
}
export default React.memo(NotFoundPage)
