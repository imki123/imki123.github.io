/* const {posts, resizeTextarea} = props
    
    useEffect(() => {
        //텍스트를 문단으로 쪼개서 그려주는 스크립트
        const psDiv = document.querySelector('#ps')
        if(psDiv){
            psDiv.innerHTML = '' //내용 지우고
            if(posts){
                const ps = posts[0].body.split('\n') //바뀐 내용을 다시 렌더링
                for(let i=0; i<ps.length; i++){
                    let p = document.createElement('p') //p태그를 만들고
                    p.innerHTML = ps[i] //ps의 내용을 넣고
                    psDiv.append(p) //ps_div에 어펜드
                }
            }
        }
    })

    const slideMenuMobile = e => {
        const body = document.querySelector('#body')
        const guideWrapper = document.querySelector('#guideWrapper')
        const content = document.querySelector('#content')
        
        if(body.clientWidth <= 500 && guideWrapper.clientWidth > 10){
            guideWrapper.style.width = '0px'
            content.style.width = '100%'

            setTimeout(function(){
                resizeTextarea()
            }, 1000)
        }
    }

	return(
        <div id="content" className="menuSlide" onClick={slideMenuMobile}>
            <textarea
                disabled
                id="fakeTextarea"
                value={articleText}
                onChange={(e) => {
                    setArticleText(e.target.value)
                }}
            />
            <textarea
                value={articleText}
                onChange={(e) => {
                    setArticleText(e.target.value)
                    resizeTextarea()
                }}
            <div>{props.children}</div>
        </div>
    )  */