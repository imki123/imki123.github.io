import React, { useEffect, useState } from 'react'
import './Popular.css'

import Axios from 'axios'
import PostList from './PostList'

function Popular(props) {
	const [popular, setPopular] = useState([])
	useEffect(() => {
		let url = process.env.REACT_APP_URL + '/posts/popular'
		//url = process.env.REACT_APP_LOCAL_URL + '/posts/popular'
		Axios.get(url).then((res) => {
			setPopular(res.data)
		})
	}, [])
	return (
		<div id="popular">
            <div className="postListTitle">Popular</div>
            {popular && popular.map((i, idx) => <PostList no={popular.length - idx} list={i} key={i.postId} />)}
		</div>
	)
}
export default React.memo(Popular)
