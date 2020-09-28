import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AppContext } from '../App'
import Paging from './Paging'
import PostList from './PostList'

import './Tags.css'

function Tags({ match, location, history }) {
	const store = React.useContext(AppContext)
	const { tag } = match.params
	const [lists, setLists] = useState([])
	useEffect(() => {
		store.setReady(false)
		let url = process.env.REACT_APP_URL + '/posts/tag/' + tag + location.search
		//url = process.env.REACT_APP_LOCAL_URL + '/posts/tag/' + tag + location.search

		Axios.get(url, {
			withCredentials: true,
		})
			.then((res) => {
				if(res.data.list.length < 1){
					alert('찾으시는 페이지가 없습니다.')
					history.go(-1)
				}else{
					setLists(res.data.list)
				store.setReady(true)
				}
			})
			.catch((e) => alert(e)) //실패
	},[tag, location])

	return (
		<div className="postListWrapper">
			<div className="postListTitle">{tag.substring(0,1).toUpperCase() + tag.substring(1)}</div>
			{lists && lists.map((i, idx) => <PostList no={lists.length - idx} list={i} key={i.postId} />)}
			{<Paging postCount={lists.length} />}
		</div>
	)
}
export default React.memo(Tags)
