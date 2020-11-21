import Axios from "axios"

export const resizeTextarea = (e) => {
  //텍스트에어리어를 찾아서 크기를 글자 높이에 맞게 변경하기
  //textarea 높이 조정
  const fake = document.querySelector('#fakeTextarea')
  let textareas = []
  if (e && e.target) {
    textareas.push(e.target)
  } else {
    textareas = document.querySelectorAll('textarea')
  }

  if (textareas && fake) {
    for (let i = 0; i < textareas.length; i++) {
      fake.style.height = '1px'
      fake.style.width = textareas[i].clientWidth + 'px'
      fake.value = textareas[i].value
      textareas[i].style.height = 5 + fake.scrollHeight + 'px'
    }
    fake.value = ''
    fake.style.height = '0px'
  }
}

export const slideMenu = () => {
  //메뉴버튼 클릭 시 메뉴 보이기 & 숨기기
  //guideWrapper는 PC에서 width조절, 모바일에서 absolute left조절
  const body = document.body
  const guideBack = document.querySelector('#guideBack')
  const guideWrapper = document.querySelector('#guideWrapper')
  const content = document.querySelector('#content')

  if (!guideWrapper.style.left) {
    //스타일 속성이 없으면 초기값 지정
    if (body.clientWidth < 500) {
      guideWrapper.style.left = '-300px' //모바일
    } else {
      guideWrapper.style.left = body.clientWidth - 1280 + 'px' //PC
    }
  }
  guideBack.style.width = '0' // 회색 0

  //모바일 메뉴 동작
  if (body.clientWidth < 500) {
    //맨 위로 스크롤 0.1초
    let diff = body.scrollTop / 10
    const interval = setInterval(() => {
      body.scrollTop -= diff
      if (body.scrollTop <= 0) clearInterval(interval)
    }, 10)
    if (guideWrapper.style.left && guideWrapper.style.left.replace('px', '') > -100) {
      guideWrapper.style.left = '-300px' // 메뉴 0
      content.style.width = 'calc(100% - 16px)'
    } else {
      guideBack.style.width = '100%' // 회색 100%
      guideWrapper.style.left = '0px' // 메뉴 0
    }
  } else {
    //데스크탑 메뉴 동작
    if (guideWrapper.clientWidth > 0) {
      //메뉴닫기
      guideWrapper.style.width = 0
      guideWrapper.style.boxShadow = 'unset'
      content.style.width = `calc(1280px - 16px)`
    } else {
      //메뉴열기
      content.style.width = `calc(1280px - 300px - 16px)`
      guideWrapper.style.width = 300 + 'px'
      guideWrapper.style.boxShadow = '2px 2px 3px 1px gray'
    }
  }
}
//모바일에서 회색부분 클릭 시 메뉴 닫기
export const closeMenuMobile = (e) => {
  const body = document.querySelector('#body')
  const guideBack = document.querySelector('#guideBack')
  const guideWrapper = document.querySelector('#guideWrapper')
  const content = document.querySelector('#content')

  guideBack.style.width = '0' // 회색 0
  if (body.clientWidth < 500) {
    //모바일
    guideWrapper.style.left = '-300px' // 메뉴 0
    content.style.width = 'calc(100% - 16px)'
  }
}

export const checkToken = (login, setLogin) => {
  //로그인 되어있는지 토큰 체크하기
  let url = process.env.REACT_APP_URL + '/auth/check'
  //url = process.env.REACT_APP_LOCAL_URL+'/auth/check'
  Axios.get(url, { withCredentials: true })
    .then((res) => {
      if (res.data) {
        //console.log('토큰 체크 성공')
        setLogin(res.data)
      } else {
        //console.log('토큰 없음') //res.status===204(No Content)
        setLogin(false)
      }
    })
    .catch((e) => {
      //실패
      console.log(e)
    })
}