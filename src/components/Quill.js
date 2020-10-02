import React, { useEffect, useState } from 'react'
import './Quill.css'
import 'quill/dist/quill.snow.css'
import { useQuill } from 'react-quilljs'
import imageCompress from 'quill-image-compress'
import { AppContext } from '../App'
import Axios from 'axios'


function Quill({ match, location, history }) {
	const store = React.useContext(AppContext)
	let { postId } = match.params
	const [post, setPost] = useState()
	const [subMenus, setSubMenus] = useState()

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
		imageCompress: {
			quality: 0.7, // default
			maxWidth: 1000, // default 1000
			maxHeight: 1000, // default 1000
			imageType: 'image/jpeg', // default
			debug: true, // default
		  }
	}
	const formats = ['bold', 'italic', 'underline', 'strike', 'code-block', 'blockquote', 'size', 'header', 'align', 'color', 'background', 'indent', 'list', 'link', 'image', 'video', 'clean']

	const { quill, quillRef, Quill } = useQuill({ modules, formats })
	if (Quill && !quill) {
		// For execute this line only once.
		Quill.register('modules/imageCompress', imageCompress)
		console.log('imageCompress registered')
	}

	useEffect(() => {
		//포스트 불러오기 axios
		if (postId !== undefined && Number(postId) >= 1 && quill) {
			//postId가 없으면 포스트 내용 가져오지 않기
			let url = process.env.REACT_APP_URL + '/posts/' + postId
			//url = process.env.REACT_APP_LOCAL_URL+'/posts/' + postId

			Axios.get(url, {
				withCredentials: true,
			}) //포스트 불러오기
				.then((res) => {
					let title = document.querySelector('[name=title]')
					title.value = res.data.title

					const tags = document.querySelectorAll('[type=radio]')
					for (let i of tags) {
						//체크 초기화
						i.checked = false
					}
					if (res.data.tags) {
						//체크박스 체크
						const mainMenu = document.getElementById(res.data.tags[0])
						if (mainMenu) mainMenu.checked = true
						for (let i of store.menus) {
							if (i.name === res.data.tags[0]) {
								//선택된 메인메뉴의 서브메뉴를 그리기
								setSubMenus(i.subMenus)
							}
						}
					}

					//포스트바디 가져오기
					url = process.env.REACT_APP_URL + '/posts/postBody/' + postId
					//url = process.env.REACT_APP_LOCAL_URL + '/posts/postBody/' + postId
					Axios.get(url)
						.then((res2) => {
							if (typeof res2.data.body === 'string') quill.setText(res2.data.body)
							//body가 string이면 setText
							else quill.setContents(res2.data.body) //body가 string이 아니면 setContents : Delta
							setPost({
								...res.data,
								body: res2.data.body,
							})
						})
						.catch((e) => {
							alert(e)
						}) //실패
				})
				.catch((e) => {
					alert(e)
				}) //실패
		}
	}, [location, quill, postId, store.menus])

	useEffect(() => {
		if (subMenus && post) {
			const subMenu = document.getElementById(post.tags[1])
			if (subMenu) subMenu.checked = true
		}
		const newSubMenu = document.querySelector('[name=newSubMenu]')
		if (newSubMenu) newSubMenu.value = ''
	}, [subMenus, post])

	useEffect(() => {
		store.setReady(false)
		if(post){
			store.setReady(true)
		}
	})

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
		const mainMenu = document.querySelector('[name=mainMenu]:checked')
		let tags = []
		const subMenu = document.querySelector('[name=subMenu]:checked')
		const newMainMenu = document.querySelector('[name=newMainMenu]')
		const newSubMenu = document.querySelector('[name=newSubMenu]')

		if (mainMenu) {
			tags[0] = mainMenu.value
		}
		if (newMainMenu.value !== '') {
			tags[0] = newMainMenu.value
		}
		if (subMenu) {
			if (subMenu.value !== '') tags[1] = subMenu.value //체크 된 서브메뉴 추가
		}
		if (newSubMenu.value !== '') {
			tags[1] = newSubMenu.value
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
				alert(message) //성공
				postId = res.data.postId
				if (method === 'POST') {
					//글 작성시 menus 카운트 증가
					Axios()
				}
				if (postId > 1) {
					history.push(`/posts/${postId}`) //수정 성공하면 해당 글로 이동함
				} else {
					history.push(`/posts/1`) //인사말은 홈으로 이동
				}
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
		if (store.menus) {
			for (let i of store.menus) {
				if (i.name === e.target.value) {
					setSubMenus(i.subMenus)
				}
			}
		}

		if (e.target.type !== 'radio') {
			//인풋박스 입력하면 라디오 체크 해제
			e.target.value = e.target.value.replace(/\s/g, '_')
			const mainMenu = document.querySelector('[name=mainMenu]:checked')
			if (mainMenu) mainMenu.checked = false
		}
	}
	//서브메뉴 추가시 라디오박스 체크 해제, 띄어쓰기를 _로 변경
	const changeSubMenu = (e) => {
		if (e.target.type !== 'radio') {
			//인풋박스 입력하면 라디오 체크 해제
			e.target.value = e.target.value.replace(/\s/g, '_')
			const subMenu = document.querySelector('[name=subMenu]:checked')
			if (subMenu) subMenu.checked = false
		} else {
			const newSubMenu = document.querySelector('[name=newSubMenu]')
			if (newSubMenu) newSubMenu.value = ''
		}
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
						{store.menus &&
							store.menus.map((i) => (
								<label key={i.name}>
									<input type="radio" name="mainMenu" value={i.name} id={i.name} onClick={changeMainMenu} />
									{i.name}
								</label>
							))}
						<input name="newMainMenu" placeholder="메인메뉴 추가" onChange={changeMainMenu} autoComplete="off"></input>
					</div>
					<div>
						서브메뉴:
						<label>
							<input type="radio" name="subMenu" value="" onClick={changeSubMenu} /> 선택안함
						</label>
						{subMenus &&
							subMenus.map((i) => (
								<label key={i.name}>
									<input type="radio" name="subMenu" value={i.name} id={i.name} onClick={changeSubMenu} /> {i.name}
								</label>
							))}
						<input name="newSubMenu" placeholder="서브메뉴 추가" autoComplete="off" onChange={changeSubMenu}></input>
					</div>
				</div>
			</div>
		</div>
	)
}
export default React.memo(Quill)
