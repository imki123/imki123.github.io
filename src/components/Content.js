import React, { useEffect} from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './Content.css'
import queryString from 'query-string'
import { Link, Route, useLocation, Switch } from 'react-router-dom'
import { AppContext } from '../App'

import Post from './Post';
import Paging from './Paging';
import PostList from './PostList'
import NotFoundPage from './NotFoundPage'
import Login from './Login'
import Quill from './Quill'

function Content(props) {
    const store = React.useContext(AppContext)
    const location = useLocation()
    const search = queryString.parse(location.search)
    let startPost = 1
    let paging = null
    if(store.headers){
        const page = Number(search.page) || 1
        const lastPage = Number(store.headers['last-page'])
        const totalPost = Number(store.headers['total-post'])
        startPost = totalPost - (page-1)*5
        paging = {
            page: page,
            lastPage: lastPage,
            totalPost: totalPost,
            startPost: startPost
        }
    }
    const slideMenu = () => { //메뉴FAB버튼 클릭 시 메뉴 보이기 & 숨기기
        const body = document.querySelector('#body')
        const guideWrapper = document.querySelector('#guideWrapper')
        const content = document.querySelector('#content')

        if(guideWrapper.clientWidth > 100){ //메뉴 닫기
            guideWrapper.parentNode.style.width = '0' // 회색 0
            guideWrapper.style.width = '0px' // 메뉴 0
            content.style.width = 'calc(100% - 16px)'
        }else{ //메뉴 열기
            if(body.clientWidth < 500){ //모바일
                guideWrapper.parentNode.style.width = '100%' // 회색 100%
                guideWrapper.style.width = '230px' // 메뉴 230
            }else{ //PC
                guideWrapper.style.width = '312px' // 메뉴 312
                content.style.width = `calc(100% - 312px - 16px)`
            }
        }
    }

    useEffect(() => {
        window.addEventListener('resize',function(){
            store.resizeTextarea()
        })
        const loading = document.querySelector('#loading')
        if(store.ready){
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
            setTimeout(function(){
                store.resizeTextarea()
            }, 10)
        }else{
            if(loading) loading.style.display = 'flex'
        }
    })
    
	return(
        <div id="content" className="slideMenu">
            {/* FAB */}
            {store.login && store.login.username === 'imki123' && 
            <Link id="postFAB" className="hover" to="/quill">
                <AddCircleOutlineIcon />
            </Link>}
            <div id="menuFAB" className="hover" onClick={slideMenu}>
                <img alt="MENU" src={process.env.PUBLIC_URL+'/images/guide_icon.png'}/>
            </div>
            {/* 로딩 */}
            <div id="loading">
                <img alt="Loading" src={process.env.PUBLIC_URL+'/images/loading.gif'}/>
            </div>

            {/* Quill, Login일 경우 칠드런 */}
            <Switch>
                <Route path={['/login', '/register', '/loginStatus', '/withdraw']}>
                    <Login/>
                </Route>
                <Route path={['/quill']}>
                    <Quill/>
                </Route>
                <Route path="*">
                    {/* 본문 내용 */}
                    {store.ready && <>
                        {(store.posts.length < 1) 
                        ? <NotFoundPage/> /* 글이 없으면 페이지 없음 */
                        : <> 
                            { //목록
                                (startPost > 1 && paging) && <div className="postListWrapper">
                                    <div className="postListTitle">목록</div>
                                    {store.posts && store.posts.map((i, idx) => 
                                        <PostList no={startPost-idx} post={i} key={i.postId}/>)}
                                    {<Paging paging={paging}/>}
                                </div>
                            }
                            { //글
                                store.posts && store.posts.map((i, idx) => 
                                    <Post no={startPost-idx} post={i} key={i.postId}/>)
                            }
                            { //목록
                                (startPost > 1 && paging) && <div className="postListWrapper">
                                    <div className="postListTitle">목록</div>
                                    {store.posts && store.posts.map((i, idx) => 
                                        <PostList no={startPost-idx} post={i} key={i.postId}/>)}
                                    {<Paging paging={paging}/>}
                                </div>
                            }
                        </>} 
                    </>}
                </Route>
            </Switch>
            
            {/* 텍스트 에어리어 높이 조정을 위한 안보이는 가짜 텍스트에어리어 */}
			<textarea disabled id="fakeTextarea"/>
        </div>
    ) 
}
export default React.memo(Content)
