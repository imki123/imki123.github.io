import React from 'react'
import './Body.scss'

function Body(props) {
  return <div id="body">{props.children}</div>
}
export default React.memo(Body)
