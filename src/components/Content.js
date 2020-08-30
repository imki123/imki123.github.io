import React from 'react'
import './Content.css'

function Content(props) {
	return(
        <div id="content" className="contentSlide">
            {props.children}
        </div>
    ) 
}
export default Content
