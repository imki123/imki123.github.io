import React from 'react'
import './Content.css'
import Post from './Post';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import Paging from './Paging';

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
        
    

	return(
        <div id="content" className="menuSlide" onClick={slideMenuMobile}>
            {
                (startPost > 1 && paging) && <Paging paging={paging}/>
            }
            {
                posts && posts.map((post, idx) => <Post no={startPost-idx} key={post.postId} post={post}/>)
            }
            {
                (startPost > 1 && paging) && <Paging paging={paging}/>
            }
            {props.children}
        </div>
    ) 
}
export default React.memo(Content)
