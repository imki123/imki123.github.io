import React, { useEffect } from 'react'
import './Content.css'
import Post from './Post';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import Paging from './Paging';
import PostList from './PostList'

function Content(props) {
    let {posts, headers} = props
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
    const slideMenu = () => {
        const body = document.querySelector('#body')
        const guideWrapper = document.querySelector('#guideWrapper')
        const content = document.querySelector('#content')

        if(guideWrapper.clientWidth > 10){
            guideWrapper.style.width = '0px'
            content.style.width = '100%'
        }else{
            let width = '312px'
            if(body.clientWidth < 500){
                width = '230px'
            }
            guideWrapper.style.width = width
            content.style.width = `calc(100% - ${width})`
        }
    }

    //hash가 있으면 해당 엘리먼트로 스크롤
    useEffect(() => {
        if(location.hash){
            const elem = document.querySelector(location.hash)
            if(elem){
                const content = document.querySelector('#content')
                let contentScroll = content.scrollTop
                let elemScroll = elem.offsetTop
                let dif = (elemScroll - contentScroll) / 50
                const frame = setInterval(function(){
                    if(content.scrollTop + dif <= elemScroll){
                        content.scrollTop += dif
                    }else{
                        clearInterval(frame)
                    }
                },10)
            }
        }
    })
    

	return(
        <div id="content" className="slideMenu" onClick={slideMenuMobile}>
            <div id="menuFAB" className="hover" onClick={slideMenu}>
                <img alt="MENU" src={process.env.PUBLIC_URL+'/images/guide_icon.png'}/>
            </div>
            {(startPost > 1 && paging) && posts && posts.map((post, idx) => <PostList no={startPost-idx} key={post.postId} post={post}/>)}
            {(startPost > 1 && paging) && <Paging paging={paging}/>}
            {
                posts && posts.map((post, idx) => <Post no={startPost-idx} key={post.postId} post={post}/>)
            }
            {(startPost > 1 && paging) && posts && posts.map((post, idx) => <PostList no={startPost-idx} key={post.postId} post={post}/>)}
            {(startPost > 1 && paging) && <Paging paging={paging}/>}
            {props.children}
        </div>
    ) 
}
export default React.memo(Content)
