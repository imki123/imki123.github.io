import React from 'react'
import './Body.css'

function Body(props) {
	return(
        <div id="body">
            {props.children}
        </div>
    ) 
}
export default React.memo(Body)
