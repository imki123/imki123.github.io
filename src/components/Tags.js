import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AppContext } from '../App'
import Paging from './Paging'
import PostList from './PostList'

import './Tags.css'
import Meta from './Meta';
import queryString from 'query-string';

function Tags({ match, location, history }) {
	const store = React.useContext(AppContext)
	const { tag } = match.params
	const [lists, setLists] = useState([])
	const [titles, setTitles] = useState('')
	const [postCount, setPostCount] = useState(0)
	const [page, setPage] = useState(1)
	useEffect(() => {
		setLists([])
		const search = queryString.parse(location.search)
		let pageNum = parseInt(search.page)  || '1' //페이지를 숫자로 변환. 없다면 1
		if (pageNum < 1) pageNum = 1
		setPage(pageNum)
		

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
					let tempTitles = ''
					for(let i of res.data.list){
						tempTitles += ' '+i.title
					}
					setTitles(tempTitles)
					setPostCount(res.data.postCount)
				}
			})
			.catch((e) => console.log(e)) //실패
	},[tag, location, history])
	
	useEffect(() => {
		store.setReady(false)
		if(lists){
			store.setReady(true)
		}
	})

	return (
		<div className="postListWrapper">
			<Meta data={{ title: tag+' 목록', description: titles}} />
			<div className="postListTitle">{tag.substring(0,1).toUpperCase() + tag.substring(1)+' 목록'}</div>
			{lists && lists.map((i, idx) => <PostList no={postCount - idx - ((page-1)*10)} list={i} key={i.postId} />)}
			{<Paging postCount={postCount} />}
		</div>
	)
}
export default React.memo(Tags)
