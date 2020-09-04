/* 
    //텍스트에어리어를 찾아서 크기를 글자 높이에 맞게 변경해주는 스크립트
	const resizeTextarea = () => {
		//textarea 높이 조정
		const textareas = document.querySelectorAll('textarea')
		const fake = document.querySelector('#fakeTextarea')
		if (textareas) {
			for (let i = 1; i < textareas.length; i++) {
				fake.style.height = '1px'
				textareas[i].style.height = 12 + fake.scrollHeight + 'px'
			}
		}
	}
const {posts, resizeTextarea} = props
    
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
        <div id="content" className="slideMenu" onClick={slideMenuMobile}>
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