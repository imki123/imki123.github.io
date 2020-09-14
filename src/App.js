import React, { useEffect, useState } from 'react'
import './App.css'
import { Switch, Route, useLocation} from 'react-router-dom'

import Header from './components/Header'
import Body from './components/Body'
import Guide from './components/Guide'
import Content from './components/Content'
import Setting from './components/Setting'
import Login from './components/Login'
import Quill from './components/Quill'

function App() {
	const location = useLocation() //페이지 경로 변경 감지
	const [ready, setReady] = useState(false)
	const [posts, setPosts] = useState([])
	const [headers, setHeaders] = useState({})
	const [login, setLogin] = useState(false)
	const [refresh, setRefresh] = useState(false)
	const [menus, setMenus] = useState({})
	const [subMenus, setSubMenus] = useState([])
	

	const checkToken = (func) => {
		let url = process.env.REACT_APP_URL+'/auth/check'
		fetch(url, {
			mode: 'cors',
			method: 'GET',
			credentials: 'include',
		})
			.then((res) => {
				if (res.status === 200 || res.status === 201 || res.status === 202) {
					//성공하면 아래 then 작동
					res.json().then((res) => {
						console.log('토큰 체크 성공')
						setLogin(res)
						if (func) func()
					})
				} else {
					console.log('토큰 없음') //res.status===204(No Content)
					setLogin(false)
					if (func) func()
				}
			})
			.catch((e) => console.error(e))
	}

	// 포스트에서 태그 정보를 가져와서 메뉴에 표시함, Quill의 태그목록에 표시
    useEffect(() => {
        let url = process.env.REACT_APP_URL+'/posts'
        fetch(url,{
            mode: 'cors',
            method: 'GET',
            credentials: "include",
        })
        .then((res) => {//성공하면 아래 then 작동
            if (res.status === 200 || res.status === 201) {
                res.json().then(res => {
					const tempMenu = {}
					const tempTags = []
                    for(let post of res){ //포스트의 태그정보를 menus에 저장
						let i=0
						for(let tag of post.tags){
							if(i===0){ //첫번째 태그는 대메뉴로 사용
								if(!tempMenu[tag]){ 
									tempMenu[tag] = {'cnt': 1, 'name': tag}
								}else{
									tempMenu[tag]['cnt']++
								}
							}else{
								//서브메뉴 추가
								if(!tempMenu[post.tags[0]][tag]){ 
									tempMenu[post.tags[0]][tag] = {'cnt': 1, 'name': tag}
								}else{
									tempMenu[post.tags[0]][tag]['cnt']++
								}
								//Quill 태그 추가
								if(tempTags.indexOf(tag) === -1){
									tempTags.push(tag)
								}
							}
							i++
						}
					}
					setMenus(tempMenu)
					setSubMenus(tempTags)
                })
            } else {
            }
        })
        .catch((e) => console.error(e))
    },[location.pathname])

	//주소 변경될 때, 토큰 체크하고 포스트 조회하기
	useEffect(() => {
		setReady(false)
		checkToken(function () {
			let url = process.env.REACT_APP_URL+'/posts'
			//url = process.env.REACT_APP_LOCAL_URL+'/posts'
			let path = location.pathname.split('/')
			path = '/'+path[1]
			if (location.pathname === '/') {
				url = url + '/home' + location.pathname + location.search
			}else if(location.pathname.indexOf('/quill') > -1) {
				setReady(true)
				setHeaders(false)
				setPosts(false)
				return ;
			}else {
				url = url + path + location.search
			}

			fetch(url,{
				mode: 'cors',
				method: 'GET',
				credentials: "include",
			})
			.then((res) => {
				if (res.status === 200 || res.status === 201) {
					//성공하면 아래 then 작동
					const h = {}
					res.headers.forEach((v, n) => (h[n] = v))
					setHeaders(h)
					res.json().then(res => {
						setPosts(res)
						setReady(true)
					})
				} else {
					console.log('posts 조회 실패')
					setReady(true)
				}
			})
			.catch((e) => console.error(e))
		})

		//주소 변경 시 해쉬 위치로 scroll. 해쉬는 리렌더링 하지 않음.
		const content = document.querySelector('#content')
		if (content) {
			let scroll = content.scrollTop
			const frame = setInterval(function () {
				let dif = scroll / 50
				content.scrollTop -= dif
				if (content.scrollTop <= 0) clearInterval(frame)
			}, 10)
		}
	}, [location.pathname, location.search, refresh])

	return (
		<div id="app">
			<Header login={login} />
			<Setting login={login} setLogin={setLogin} />
			<Body>
				<Guide menus={menus}/>
				<Content posts={posts} headers={headers} ready={ready} login={login} refresh={refresh} setRefresh={setRefresh}>
					<Switch>
						<Route path={['/login', '/register', '/loginStatus', '/withdraw']}>
							<Login login={login} setLogin={setLogin} checkToken={checkToken}/>
						</Route>
						<Route path={['/quill']}>
							<Quill login={login} menus={menus} subMenus={subMenus}/>
						</Route>
						{/* <Route path="*" component={NotFoundPage} /> */}
					</Switch>
				</Content>
			</Body>
		</div>
	)
}

export default React.memo(App)
