import React, { useEffect } from 'react'
import './Paging.css'
import {Link, useLocation } from 'react-router-dom'
import queryString from 'query-string';

function Paging(props){
    const {paging} = props //page, lastPage, totalPost, startPost
    const location = useLocation()
    const search = queryString.parse(location.search)
    const pages = []

    for(let i=0; i<paging.lastPage; i++){
        pages.push(i+1)
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
    }, [location, search])

    
    return(
        <div className="paging">
            {pages.map((p, idx) =>  
                <Link to={`/article?page=${p}`} className="inactivePage" key={idx}>{p}</Link>)}
        </div>
    )
}
export default React.memo(Paging)