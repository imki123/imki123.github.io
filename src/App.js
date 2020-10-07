import React, { createContext, useEffect, useState } from 'react'
import './App.css'
import { useLocation } from 'react-router-dom'

import Header from './components/Header'
import Body from './components/Body'
import Guide from './components/Guide'
import Content from './components/Content'
import Setting from './components/Setting'
import Axios from 'axios'
import Meta from './components/Meta'

const AppContext = createContext()

function App() {
	const location = useLocation() //페이지 경로 변경 감지
	const [ready, setReady] = useState(false)
	const [posts, setPosts] = useState([])
	const [headers, setHeaders] = useState({})
	const [login, setLogin] = useState(false)
	const [refresh, setRefresh] = useState(false)
	const [menus, setMenus] = useState([
		{ name: 'home', count: 1, order: 1 },
		{ name: 'programming', order: 2 },
		{ name: 'article', order: 3 },
	])

	const resizeTextarea = (e) => {
		//텍스트에어리어를 찾아서 크기를 글자 높이에 맞게 변경하기
		//textarea 높이 조정
		const fake = document.querySelector('#fakeTextarea')
		let textareas = []
		if (e && e.target) {
			textareas.push(e.target)
		} else {
			textareas = document.querySelectorAll('textarea')
		}

		if (textareas && fake) {
			for (let i = 0; i < textareas.length; i++) {
				fake.style.height = '1px'
				fake.style.width = textareas[i].clientWidth + 'px'
				fake.value = textareas[i].value
				textareas[i].style.height = 5 + fake.scrollHeight + 'px'
			}
			fake.value = ''
			fake.style.height = '0px'
		}
	}

	const slideMenu = () => {
		//메뉴버튼 클릭 시 메뉴 보이기 & 숨기기
		const body = document.querySelector('#body')
		const guideWrapper = document.querySelector('#guideWrapper')
		const content = document.querySelector('#content')

		if (!guideWrapper.style.left) {
			//스타일 속성이 없으면 초기값 지정
			if (body.clientWidth < 500) {
				guideWrapper.style.left = '-312px' //모바일
			} else {
				guideWrapper.style.left = '0px' //PC
			}
		}

		if (guideWrapper.style.left && guideWrapper.style.left.replace('px', '') > -100) {
			console.log(guideWrapper.style.left)
			console.log('close')
			//메뉴 닫기
			guideWrapper.parentNode.style.width = '0' // 회색 0
			content.style.width = 'calc(100% - 16px)' //콘텐트 100% - 16px
			guideWrapper.style.left = '-312px' // 메뉴 왼쪽으로
		} else {
			console.log(guideWrapper.style.left)
			console.log('open')
			//메뉴 열기
			guideWrapper.style.left = '0px' // 메뉴 0
			if (body.clientWidth < 500) {
				//모바일
				guideWrapper.parentNode.style.width = '100%' // 회색 100%
			} else {
				//PC
				content.style.width = `calc(100% - 312px - 16px)`
			}
		}
	}
	//모바일에서 회색부분 클릭 시 메뉴 닫기
	const closeMenuMobile = (e) => {
		const body = document.querySelector('#body')
		const guideWrapper = document.querySelector('#guideWrapper')
		const content = document.querySelector('#content')

		guideWrapper.parentNode.style.width = '0' // 회색 0
		if (body.clientWidth < 500) {
			//모바일
			guideWrapper.style.left = '-312px' // 메뉴 0
			content.style.width = 'calc(100% - 16px)'
		} else {
			content.style.width = 'calc(100% - 312px - 16px)'
		}
	}
	const checkToken = (func) => {
		//로그인 되어있는지 토큰 체크하기
		let url = process.env.REACT_APP_URL + '/auth/check'
		//url = process.env.REACT_APP_LOCAL_URL+'/auth/check'
		Axios.get(url, { withCredentials: true })
			.then((res) => {
				if (res.data) {
					console.log('토큰 체크 성공')
					setLogin(res.data)
				} else {
					console.log('토큰 없음') //res.status===204(No Content)
					setLogin(false)
				}
				if (func) func()
			})
			.catch((e) => {
				//실패
				if (func) func()
			})
	}

	//useContext 이용하여 하위 컴포넌트에 상태 전달
	const store = {
		ready,
		setReady,
		posts,
		setPosts,
		headers,
		setHeaders,
		login,
		setLogin,
		refresh,
		setRefresh,
		menus,
		setMenus,
		resizeTextarea,
		slideMenu,
		closeMenuMobile,
		checkToken,
	}

	// 포스트에서 태그 정보를 가져와서 메뉴에 표시함, Quill의 태그목록에 표시
	useEffect(() => {
		let url = process.env.REACT_APP_URL + '/menus'
		//url = process.env.REACT_APP_LOCAL_URL+'/menus'

		Axios.get(url, {
			withCredentials: true,
		}) //메뉴 태그 가져오기
			.then((res) => {
				setMenus(res.data)
			})
			.catch((e) => alert(e)) //실패
	}, [location.pathname, refresh])

	//주소 변경될 때, 토큰 체크하고 포스트 조회하기
	useEffect(() => {
		checkToken()
	}, [location.pathname, location.search, refresh])

	return (
		<AppContext.Provider value={store}>
			<div id="app">
				<Meta
					data={{
						title: '임기의 코딩 블로그 :D',
						discription: 'imki123의 임기의 코딩 블로그입니다 :D',
						image: process.env.PUBLIC_URL + '/images/imcat_800x400.png',
					}}
				/>
				<Header />
				<Setting />
				<Body>
					<Guide />
					<Content />
				</Body>
			</div>
		</AppContext.Provider>
	)
}
export { AppContext }
export default React.memo(App)
