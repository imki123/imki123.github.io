import React, { useEffect, useState } from 'react'
import './Quill.css'
import 'quill/dist/quill.snow.css'
import { useHistory, useLocation } from 'react-router-dom'
import { useQuill } from 'react-quilljs'
import queryString from 'query-string'
import { AppContext } from '../App'
import Axios from 'axios'

function Quill(props) {
	const store = React.useContext(AppContext)
	const location = useLocation()
	const postId = queryString.parse(location.search).postId
	const history = useHistory()
	const [newMenu, setNewMenu] = useState([])

	const modules = {
		toolbar: [
			['bold', 'italic', 'underline', 'strike'],
			[{ size: ['small', false, 'large', 'huge'] }, { header: 1 }, { header: 2 }],
			[{ align: [] }],
			[{ color: [] }, { background: [] }],
			[{ indent: '-1' }, { indent: '+1' }],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['code-block', 'blockquote'],
			['link', 'image', 'video'],
			['clean'],
		],
		syntax: true,
	}
	const formats = ['bold', 'italic', 'underline', 'strike', 'code-block', 'blockquote', 'size', 'header', 'align', 'color', 'background', 'indent', 'list', 'link', 'image', 'video', 'clean']

	const { quill, quillRef } = useQuill({ modules, formats })

	useEffect(() => {
		const tempMenu = []
		for (let i in store.mainMenus) {
			if (store.mainMenus[i].name !== 'home' && store.mainMenus[i].name !== 'about' && store.mainMenus[i].name !== 'programming' && store.mainMenus[i].name !== 'article') {
				tempMenu.push(store.mainMenus[i])
			}
		}
		setNewMenu(tempMenu)
	}, [store.mainMenus])

	useEffect(() => {
		//포스트 불러오기 axios
		if (postId !== undefined && Number(postId) >= 1 && quill) {
			//postId가 없으면 포스트 내용 가져오지 않기
			let url = process.env.REACT_APP_URL + '/posts/id/' + postId
			//url = process.env.REACT_APP_LOCAL_URL+'/posts/id/' + postId

			Axios.get(url, {
				withCredentials: true,
			}) //포스트 작성, 수정
				.then((res) => {
					let title = document.querySelector('[name=title]')
					title.value = res.data.title
					if (typeof res.data.body === 'string') quill.setText(res.data.body)
					//body가 string이면 setText
					else quill.setContents(res.data.body) //body가 string이 아니면 setContents : Delta

					const tags = document.querySelectorAll('[type=radio]')
					for (let i of tags) {
						//체크 초기화
						i.checked = false
					}
					if (res.data.tags) {
						//체크박스 체크
						const mainMenu = document.querySelector(`[value=${res.data.tags[0]}]`)
						if (mainMenu) mainMenu.checked = true
						for (let i of res.data.tags) {
							const tag = document.querySelector(`[name=${i}]`)
							if (tag) tag.checked = true
						}
					}
				})
				.catch((e) => alert(e)) //실패
		}
	}, [location, quill, postId])

	//글 작성 or 수정
	const clickPost = (e) => {
		if (!store.login || (store.login && store.login.username !== 'imki123')) {
			alert('글 작성은 블로그 주인만 가능합니다 ^^;')
			return
		}
		if (!window.confirm('글을 게시하시겠습니까?')) {
			return
		}
		//제목, 내용, 태그가 있는지 검사
		let title = document.querySelector('[name=title]')
		const content = quill.getContents()
		const text = quill.getText()
		const mainMenu = document.querySelector('[type=radio]:checked')
		let tags = []
		const checkBoxs = document.querySelectorAll('[type=checkbox]:checked')
		const newMainMenu = document.querySelector('[name=newMainMenu]')
		const newMenu = document.querySelector('[name=newMenu]')

		if (mainMenu) {
			tags = [mainMenu.value]
		}
		if (newMainMenu.value !== '') {
			tags = [newMainMenu.value]
		}
		if (checkBoxs) {
			for (let i of checkBoxs) {
				tags.push(i.name)
			} //체크 된 서브메뉴 추가
		}
		if (newMenu.value !== '') {
			tags.push(newMenu.value)
		}

		if (title.value.length === 0) {
			alert('제목을 입력해주세요.')
			return
		} else if (quill.getLength() === 1) {
			alert('내용을 입력해주세요.')
			return
		} else if (tags.length < 1 && newMainMenu.value === '') {
			alert('메인메뉴를 1개 선택해주세요.')
			return
		}

		//url에 POST 또는 PATCH 요청
		let url = process.env.REACT_APP_URL + '/posts'
		//url = process.env.REACT_APP_LOCAL_URL + '/posts'
		let method = 'POST',
			message = '글 작성 성공'
		if (e.target.id === 'PATCH') {
			if (postId !== undefined && Number(postId) >= 1) {
				url += '/' + postId
				method = 'PATCH'
				message = '글 수정 성공'
			} else {
				console.log('postId 비정상, 글 수정 실패')
				return
			}
		}

		Axios(url, {
			//포스트 작성, 수정 (최대 10mb. koa-bodyparser에서 설정.)
			method: method,
			withCredentials: true, //CORS
			data: {
				title: title.value,
				body: content,
				text: text,
				tags: tags,
			},
		})
			.then((res) => {
				console.log(res.data)
				alert(message) //성공
				history.push(tags[0]) //수정 성공하면 해당 글의 태그로 이동함
			})
			.catch((e) => alert(e)) //실패
	}

	// 화면 리사이즈시 editor 아래 마진 변경
	useEffect(() => {
		const editor = document.querySelector('#editor')
		const toolbar = document.querySelector('.ql-toolbar')
		if (editor && toolbar) {
			editor.style.marginBottom = toolbar.clientHeight + 10 + 'px'
		}
		window.removeEventListener('resize', function () {})
		window.addEventListener('resize', function () {
			if (editor && toolbar) {
				editor.style.marginBottom = toolbar.clientHeight + 10 + 'px'
			}
		})
	}, [location])

	//메인메뉴 추가시 라디오박스 체크 해제, 띄어쓰기를 _로 변경
	const changeMainMenu = (e) => {
		e.target.value = e.target.value.replace(/\s/g, '_')
		const mainMenu = document.querySelector('[type=radio]:checked')
		if (mainMenu) mainMenu.checked = false
	}

	return (
		<div className="quill">
			<div className="quillTitle">
				<input name="title" placeholder="제목" />
			</div>
			<div id="editor">
				<div ref={quillRef} />
				<div id="tags" className="no-drag">
					<div id="tagsTitle">
						tags
						{postId !== undefined && Number(postId) >= 1 ? (
							<button className="editorButton" onClick={clickPost} id="PATCH">
								글 수정
							</button>
						) : (
							<button className="editorButton" onClick={clickPost}>
								새글 작성
							</button>
						)}
					</div>
					<div>
						메인메뉴:
						<label>
							<input type="radio" name="mainMenu" value="home" />
							home
						</label>
						<label>
							<input type="radio" name="mainMenu" value="about" />
							about
						</label>
						<label>
							<input type="radio" name="mainMenu" value="programming" />
							programming
						</label>
						<label>
							<input type="radio" name="mainMenu" value="article" />
							article
						</label>
						{newMenu &&
							newMenu.map((i) => (
								<label key={i.name}>
									<input type="radio" name="mainMenu" value={i.name} />
									{i.name}
								</label>
							))}
						<input name="newMainMenu" placeholder="메인메뉴 추가" onChange={changeMainMenu} autoComplete="off"></input>
					</div>
					<div>
						서브메뉴:
						{store.subMenus &&
							store.subMenus.map((i) => (
								<label key={i}>
									<input type="checkbox" name={i} />
									{i}
								</label>
							))}
						<input name="newMenu" placeholder="서브메뉴 추가" autoComplete="off"></input>
					</div>
				</div>
			</div>
		</div>
	)
}
export default React.memo(Quill)
