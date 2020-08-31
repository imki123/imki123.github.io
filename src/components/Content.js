import React, { useEffect } from 'react'
import './Content.css'

function Content(props) {
    const {text} = props
    
    useEffect(() => {
        //텍스트를 문단으로 쪼개서 그려주는 스크립트
        const psDiv = document.querySelector('#ps')
        console.log(psDiv, text)
        if(psDiv){
            psDiv.innerHTML = '' //내용 지우고
            if(text){
                const ps = text.split('\n') //바뀐 내용을 다시 렌더링
                for(let i=0; i<ps.length; i++){
                    let p = document.createElement('p') //p태그를 만들고
                    p.innerHTML = ps[i] //ps의 내용을 넣고
                    psDiv.append(p) //ps_div에 어펜드
                }
            }
        }
    })

	return(
        <div id="content" className="contentSlide">
            <div id="ps"></div>
            <div>{props.children}</div>
        </div>
    ) 
}
export default Content
