import React, { useEffect } from 'react'
import './Paging.css'
import {NavLink, useLocation } from 'react-router-dom'
import queryString from 'query-string';

function Paging(props){
    const {postCount} = props
	const location = useLocation()
	const search = queryString.parse(location.search)
    let paging = null
    const pages = []
	if (postCount) {
		const page = Number(search.page) || 1
		const startPost = postCount - (page - 1) * 10
		paging = {
			page: page,
			lastPage: Math.ceil(postCount / 10),
			postCount: postCount,
			startPost: startPost,
        }
        
        for(let i=0; i<paging.lastPage; i++){
            pages.push(i+1)
        }
	}

    

    

    useEffect(() => {
        const links = document.querySelectorAll('.paging a')
        for(let i=0; i<links.length; i++){
            if(links[i].innerHTML === search.page){
                links[i].className = 'activePage'
            }else{
                links[i].className = 'inactivePage'
            }
            if(search.page === undefined){ //search에 page가 없으면 1을 activePage로 설정
                if(links[i].innerHTML === '1'){
                    links[i].className = 'activePage'
                }
            }
        }
    }, [search, postCount])

    
    return(
        <div className="paging">
            {pages.map((p, idx) =>  
                <NavLink path={location.pathname} to={`${location.pathname}?page=${p}`} 
                    className="inactivePage" key={idx}>{p}</NavLink>)}
        </div>
    )
}
export default React.memo(Paging)