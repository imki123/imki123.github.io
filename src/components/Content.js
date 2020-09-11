import React, { useEffect } from 'react'
import './Content.css'
import Post from './Post';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import Paging from './Paging';
import PostList from './PostList'

function Content(props) {
    let {posts, headers, ready, login} = props
    useEffect(() => {
        
    })
    const location = useLocation()
    const search = queryString.parse(location.search)
    let startPost = 1
    let paging = null
    if(headers){
        const page = Number(search.page) || 1
        const lastPage = Number(headers['last-page'])
        const totalPost = Number(headers['total-post'])
        startPost = totalPost - (page-1)*5
        paging = {
            page: page,
            lastPage: lastPage,
            totalPost: totalPost,
            startPost: startPost
        }
    }
    const slideMenuMobile = e => { //모바일에서 컨텐트 클릭시 메뉴 닫히는 스크립트
        const body = document.querySelector('#body')
        const guideWrapper = document.querySelector('#guideWrapper')
        const content = document.querySelector('#content')
        
        if(body.clientWidth <= 500 && guideWrapper.clientWidth > 10){
            guideWrapper.style.width = '0px'
            content.style.width = '100%'
        }
    }
    const slideMenu = () => { //메뉴버튼 클릭 시 메뉴 보이기 & 숨기기
        const body = document.querySelector('#body')
        const guideWrapper = document.querySelector('#guideWrapper')
        const content = document.querySelector('#content')

        if(guideWrapper.clientWidth > 10){ //메뉴가 열려있으면
            guideWrapper.style.width = '0px'
            content.style.width = '100%'
        }else{ //메뉴가 닫혀있으면
            let width = '312px'
            if(body.clientWidth < 500){
                width = '230px'
            }
            guideWrapper.style.width = width
            content.style.width = `calc(100% - ${width})`
        }
    }

    useEffect(() => {
        const loading = document.querySelector('#loading')
        if(ready){
            if(loading) loading.style.display = 'none'
            if(location.hash){ //hash가 있으면 해당 엘리먼트로 스크롤
                setTimeout(function(){ //elem이 로드된 이후에 스크롤이 되야해서 0.1초 타임아웃 추가..
                    const content = document.querySelector('#content')
                    const elem = document.querySelector(location.hash)
                    if(elem){
                        let contentScroll = content.scrollTop
                        let elemTop = elem.offsetTop
                        let dif = (elemTop - contentScroll) / 50    
                        if(elemTop > contentScroll){
                            const frame = setInterval(function(){
                                if(content.scrollTop + dif >= elemTop 
                                    || content.scrollTop >= content.scrollHeight - content.clientHeight){
                                    clearInterval(frame)
                                }else{
                                    content.scrollTop += dif
                                }
                            }, 10)
                        }else{
                            const frame = setInterval(function(){
                                if(content.scrollTop <= elemTop ){
                                    clearInterval(frame)
                                }else{
                                    content.scrollTop += dif
                                }
                            }, 10)
                        }
                    }
                },100)
            }
        }else{
            if(loading) loading.style.display = 'flex'
        }
    })
    

	return(
        <div id="content" className="slideMenu" onClick={slideMenuMobile}>
            <div id="menuFAB" className="hover" onClick={slideMenu}>
                <img alt="MENU" src={process.env.PUBLIC_URL+'/images/guide_icon.png'}/>
            </div>
            <div id="loading">
                <img alt="Loading" src={process.env.PUBLIC_URL+'/images/loading.gif'}/>
            </div>
            {props.children}
            
            {ready && <>
                
                {!props.children && posts && posts.length === 0 && <div>작성된 글이 없네요. ^^;</div>}
                { //목록
                    (startPost > 1 && paging) && <div className="postListWrapper">
                        <div className="postListTitle">목록</div>
                        {posts && posts.map((post, idx) => <PostList no={startPost-idx} key={post.postId} post={post} paging={paging}/>)}
                        {<Paging paging={paging}/>}
                    </div>
                }
                { //글
                    posts && posts.map((post, idx) => <Post no={startPost-idx} key={post.postId} post={post} login={login}/>)
                }
                { //목록
                    (startPost > 1 && paging) && <div className="postListWrapper">
                        <div className="postListTitle">목록</div>
                        {posts && posts.map((post, idx) => <PostList no={startPost-idx} key={post.postId} post={post} paging={paging}/>)}
                        {<Paging paging={paging}/>}
                    </div>
                }
            </>}
        </div>
    ) 
}
export default React.memo(Content)
