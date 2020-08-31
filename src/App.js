import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Switch, Route, useLocation } from 'react-router-dom'
import Body from './components/Body'
import Guide from './components/Guide'
import Content from './components/Content';
import NotFoundPage from './components/NotFoundPage';

function App() {
  const homeText = `안녕하세요. 행복한 세상을 만들고 싶은 블로그입니다 :D`
  const aboutText = `블로그를 제작중입니다.
  서둘러 블로그를 이쁘게 꾸미고 싶네요.
  조금만 기다려주세요 :D`
  const [articleText, setArticleText] = useState(`끓는 새가 가치를 이상의 기쁘며, 심장의 귀는 위하여 내는 것이다. 청춘의 넣는 돋고, 그들에게 피어나는 얼마나 무엇을 피다. 때까지 들어 행복스럽고 황금시대의 봄바람이다. 눈이 꽃이 하는 피어나는 그들에게 인생에 넣는 안고, 것이다. 석가는 위하여, 붙잡아 우리의 황금시대다. 설산에서 그것을 있음으로써 심장은 부패를 귀는 것이다. 긴지라 현저하게 물방아 노래하며 보이는 뜨고, 위하여서. 미묘한 청춘은 평화스러운 커다란 있는 긴지라 소리다.이것은 봄바람이다. 살 때까지 찾아 그들의 고행을 위하여 봄바람이다.

있는 이는 사랑의 석가는 피가 가치를 위하여 것이다. 아니한 남는 무엇을 간에 이상은 그러므로 찾아 보라. 할지라도 얼음과 청춘의 이상이 눈이 소리다.이것은 바이며, 것이다. 있으며, 꽃이 청춘에서만 뜨거운지라, 끓는 우리 있다. 하여도 풀이 그들을 사막이다. 보는 모래뿐일 같은 이것을 소금이라 행복스럽고 싸인 얼음이 무한한 봄바람이다. 무엇을 얼마나 동력은 얼음과 것이다. 위하여 꾸며 열락의 이 황금시대의 웅대한 발휘하기 인생을 보라. 무한한 위하여, 따뜻한 보배를 새가 끓는다. 같이 희망의 앞이 동력은 위하여 청춘의 인간에 쓸쓸하랴?

만물은 평화스러운 밝은 같지 바이며, 위하여 위하여서, 두기 그들은 있는가? 풀밭에 꽃 것이 온갖 열락의 말이다. 가지에 공자는 새가 이상의 뜨거운지라, 피가 오아이스도 아니다. 더운지라 인간은 때까지 그들에게 방황하였으며, 사막이다. 주는 미묘한 남는 가치를 피고, 구하기 길지 부패뿐이다. 청춘의 같이 우리의 그들은 있으랴? 그와 끓는 그들의 풍부하게 교향악이다. 꽃 능히 위하여서 동력은 이는 두기 따뜻한 대고, 가는 있다. 아니더면, 보는 때에, 뼈 인생을 대중을 사막이다. 풍부하게 놀이 앞이 역사를 가치를 이상을 같이, 이것이다.`)
  const location = useLocation(); //페이지 경로 변경 감지

  //텍스트에어리어를 찾아서 크기를 글자 높이에 맞게 변경해주는 스크립트  
  const resizeTextarea = event => { //이벤트가 있으면 event.target, 없으면 textarea 높이 조정
    if(event){
      let obj = event.target ? event.target : event
      obj.style.height = '1px'
      obj.style.height = (12+obj.scrollHeight)+"px"
      if(event.target){ //온체인지 이벤트 발생시에는 text변경
        setArticleText(event.target.value) 
      }
    }else { //온체인지 이벤트가 아니면 모든 textarea를 찾아서 높이 변경
      const textareas = document.querySelectorAll('textarea')
      if(textareas){
        for(let i of textareas){
          i.style.height = '1px'
          i.style.height = (12+i.scrollHeight)+"px"
        }
      }
    }
  }

  //textarea나 주소 변경시 텍스트 높이 조정
  useEffect(() => { 
    resizeTextarea()
  },[articleText, location])
  
	return (
		<div id="app">
			<Header resizeTextarea={resizeTextarea}/>
			<Body>
				<Guide/>
        <Switch>
          <Route path="/" exact>
            <Content text={homeText}/>
          </Route>
          <Route path="/about">
            <Content text={aboutText}/>
          </Route>
          <Route path="/article">
            <Content text={articleText} resizeTextarea={resizeTextarea}>
              <textarea value={articleText} onChange={resizeTextarea}/> 
            </Content>
          </Route>
          <Route path="*">
            <Content>
              <NotFoundPage/>
            </Content>
          </Route>
        </Switch>
			</Body>
		</div>
	)
}

export default App
