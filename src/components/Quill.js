import React, { useEffect } from 'react'
import './Quill.css'
import 'quill/dist/quill.snow.css'
import { useHistory, useLocation } from 'react-router-dom'
import { useQuill } from 'react-quilljs';
import queryString from 'query-string'

function Quill(props) {
    const location = useLocation()
    const history = useHistory()
    const { quill, quillRef } = useQuill()
    const postId = queryString.parse(location.search).postId
    const {login} = props

    useEffect(() => {
        //console.log(postId, Number(postId))
        if(postId !== undefined && Number(postId) >= 1 && quill){ //postId가 없으면 포스트 내용 가져오지 않기
            let url = 'https://blog-imki123-backend.herokuapp.com/posts/id/' + postId
            //url = 'http://localhost:4000/posts/id/' + postId
            fetch(url,{
                mode: 'cors',
                method: 'GET',
                credentials: "include",
            })
            .then(res => {
                if(res.status===200 || res.status===201) { //성공하면 아래 then 작동
                    res.json().then(res =>{ 
                        //console.log(res)
                        let title = document.querySelector('[name=title]') 
                        title.value = res.title
                        if(typeof(res.body) === 'string') 
                            quill.setText(res.body) //body가 string이면 setText
                        else 
                            quill.setContents(res.body) //body가 string이 아니면 setContents : Delta
                        const tags = document.querySelectorAll('[type=checkbox]')
                        for(let i of tags){ //체크 초기화
                            i.checked = false
                        }
                        if(res.tags){ //체크박스 체크
                            for(let i of res.tags){
                                const tag = document.querySelector(`[name=${i}]`)
                                if(tag){
                                    tag.checked = true;
                                }
                            }
                        }
                    })
                }else{
                    res.json().then(res =>{ 
                        console.log(res)
                    })
                }
            })
            .catch(e => console.error(e))
        }
    },[location, quill, postId])

    //글 작성 or 수정
    const clickPost = e => {
        if(!login || (login && login.username !== 'imki123')){
            alert('글 작성은 블로그 주인만 가능합니다 ^^;')
            return
        }
        if(!window.confirm('글을 게시하시겠습니까?')){
            return
        }
        //제목, 내용, 태그가 있는지 검사
        let title = document.querySelector('[name=title]') 
        const content = quill.getContents()
        const tags = document.querySelectorAll('[type=checkbox]:checked')
        const tagsName = []
        if(tags){
            for(let i of tags){tagsName.push(i.name)} //태그네임
        }

        if(title.value.length === 0) {
            alert('제목을 입력해주세요.') 
            return
        }
        else if(quill.getLength() === 1){
            alert('내용을 입력해주세요.')
            return
        } 
        else if(tagsName.length === 0){
            alert('태그를 1개 이상 선택해주세요.')
            return
        } 

        //url에 POST 또는 PATCH 요청
        let url = 'https://blog-imki123-backend.herokuapp.com/posts'
        //url = 'http://localhost:4000/posts'
        let method = 'POST', message = '글 작성 성공'
        if(e.target.id === 'PATCH'){
            if(postId !== undefined && Number(postId) >= 1){
                url += "/"+ postId
                method = 'PATCH'
                message = '글 수정 성공'
            }else{
                console.log('postId 비정상, 글 수정 불가')
                return
            }
        }
        fetch(url,{
            mode: 'cors',
            method: method,
            credentials: "include",
            headers:{'Content-Type': 'application/json',},
            body: JSON.stringify({
                title: title.value,
                body: content,
                tags: tagsName,
            }),
        })
        .then(res => {
            if(res.status===200 || res.status===201) { //성공하면 아래 then 작동
                res.json().then(res =>{ 
                    console.log(res)
                    alert(message)
                    history.push(tagsName[0])
                })
            }else{
                alert('글 작성 실패')
                res.json().then(res =>{ 
                    console.log(res)
                })
            }
        })
        .catch(e => console.error(e))
    }

    // 화면 리사이즈시 editor 아래 마진 변경
    useEffect(() => {
        const editor = document.querySelector('#editor')
        const toolbar = document.querySelector('.ql-toolbar')
        if(editor && toolbar){
            editor.style.marginBottom = toolbar.clientHeight+ 10 + 'px'
        }
        window.removeEventListener('resize', function(){})
        window.addEventListener('resize',function(){
            if(editor && toolbar){
                editor.style.marginBottom = toolbar.clientHeight+ 10 + 'px'
            }
        })
    },[location])

	return(
        <>
            <h2 id="editorTitle">글 작성</h2>
            <div><input name="title" placeholder="제목"/></div>
            <div id="editor">
                <div ref={quillRef} />
                <div id="tags" className="no-drag">
                    <span id="tagsTitle">tags</span>
                    <label><input type="checkbox" name="home"/> home</label>
                    <label><input type="checkbox" name="about"/> about</label>
                    <label><input type="checkbox" name="article"/> article</label>
                    <label><input type="checkbox" name="programming"/> programming</label>
                </div>
                <div className="editorButtons">
                    {postId !== undefined && Number(postId) >= 1 ?
                        <button onClick={clickPost} className="hover" id="PATCH">글 수정</button> :
                        <button onClick={clickPost} className="hover">새글 작성</button>}
                </div>
            </div>
        </>
    ) 
}
export default React.memo(Quill)
