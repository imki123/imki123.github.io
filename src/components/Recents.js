import React, { useEffect, useState } from 'react'
import './Recents.css'

import Axios from 'axios'
import PostList from './PostList'

function Recents(props) {
	const [recents, setRecents] = useState([])
	useEffect(() => {
		let url = process.env.REACT_APP_URL + '/posts/recents'
		//url = process.env.REACT_APP_LOCAL_URL + '/posts/recents'
		Axios.get(url).then((res) => {
			setRecents(res.data)
		})
	}, [])
	return (
		<div id="recents">
            <div className="postListTitle">Recents</div>
            {recents && recents.map((i, idx) => <PostList no={recents.length - idx} list={i} key={i.postId} />)}
		</div>
	)
}
export default React.memo(Recents)
