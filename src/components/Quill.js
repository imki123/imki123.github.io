import React, { useEffect } from 'react'
import './Quill.css'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'

function Quill(props) {
    const { quill, quillRef } = useQuill()
    const clickContent = () => {
        console.log(quill.getContents())
    }
    const clickText = () => {
        console.log(quill.getText())
    }
    useEffect(() => {
        const editor = document.querySelector('#editor')
        const toolbar = document.querySelector('.ql-toolbar')
        console.log(editor)
        console.log(toolbar)
        if(editor && toolbar){
            editor.style.marginBottom = toolbar.clientHeight+ 10 + 'px'
        }
    })

	return(
        <>
            <div id="editor">
                <div ref={quillRef} />
            </div>
            <button onClick={clickContent}>content</button> <button onClick={clickText}>text</button>
        </>
    ) 
}
export default React.memo(Quill)
