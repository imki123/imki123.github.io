import React from 'react'
import { Link } from 'react-router-dom';
import './NotFoundPage.css'

function NotFoundPage(){
    console.log(`Not found page! Go home. https://imki123.github.io${process.env.PUBLIC_URL}`)
    return(
        <div className="notFound">
            <div className="title">Not Found Page</div>
            <div className="goHome">
                <Link to="/">Go Home</Link>
            </div>
        </div>
    )
}
export default NotFoundPage