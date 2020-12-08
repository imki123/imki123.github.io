import Axios from 'axios'
import { useEffect } from 'react'

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
      fake.style.width = textareas[i].offsetWidth + 'px'
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

  guideBack.style.width = '0' // 회색 0

  if (body.offsetWidth < 500) {
    //모바일 메뉴 동작
    //메뉴로 스크롤
    if (body.scrollTop >= 48) {
      let rect = document.querySelector('.menus').getBoundingClientRect()
      let top = rect.top + body.scrollTop
      body.scrollTop = top
    }

    if (guideWrapper.style.left && guideWrapper.style.left.replace('px', '') > -100) {
      //메뉴 닫기
      guideWrapper.style.left = '-300px' // 메뉴 0
      content.style.width = 'calc(100% - 16px)'
    } else {
      //메뉴 열기
      guideBack.style.width = '100%' // 회색 100%
      guideWrapper.style.width = '300px' //너비 300px
      guideWrapper.style.left = '0px' // 메뉴 0
    }
  } else {
    //데스크탑 메뉴 동작
    if (guideWrapper.offsetWidth > 0) {
      //메뉴 닫기
      guideWrapper.style.width = 0
      guideWrapper.style.boxShadow = 'unset'
      content.style.maxWidth = `calc(1280px - 16px)`
      content.style.width = `calc(100% - 16px)`
    } else {
      //메뉴 열기
      content.style.maxWidth = `calc(1280px - 300px - 16px)`
      content.style.width = `calc(100% - 300px - 16px)`
      guideWrapper.style.width = '300px'
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
  if (body.offsetWidth < 500) {
    //모바일
    guideWrapper.style.left = '-300px' // 메뉴 0
    content.style.width = 'calc(100% - 16px)'
  }
}

export const checkToken = (setLogin) => {
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

//리사이즈시에 동작
export const resize = () => {
  //댓글 textarea 사이즈 조정
  resizeTextarea()

  //화면 리사이즈 되면 스크립트로 작성한 스타일 지우기
  const guideBack = document.querySelector('#guideBack')
  const guideWrapper = document.querySelector('#guideWrapper')
  const content = document.querySelector('#content')

  if (document.body.offsetWidth < 500 && guideWrapper.style.left.replace('px', '') * 1 >= 0) {
    //모바일이고 메뉴가 켜져있다면 메뉴 유지함
  } else if (document.body.offsetWidth >= 500 && guideWrapper.offsetWidth === 0) {
    //PC이고 메뉴가 꺼져있다면 메뉴 유지함
  } else {
    guideBack.style = null
    guideWrapper.style = null
    content.style = null
  }

  //윈도우 사이즈에 맞춰서 콘텐트 사이즈 설정해줌
  if (content) {
    content.style.height = document.body.offsetHeight - 48 - 16 + 'px'
  }

  // Quill editor 아래 마진 변경
  const editor = document.querySelector('#editor')
  const toolbar = document.querySelector('.ql-toolbar')
  if (editor && toolbar) {
    editor.style.marginBottom = toolbar.offsetHeight + 10 + 'px'
  }
}

//스크롤되면 헤더 감추는 hook
export function useToggleHeader() {
  useEffect(() => {
    toggleHeader()

    let timer = null
    document.body.addEventListener('scroll', function () {
      //스로틀링 구현
      if (!timer) {
        timer = setTimeout(() => {
          timer = null
          toggleHeader()
        }, 100)
      }
    })
    return () => document.body.removeEventListener('scroll', toggleHeader)
  })

  document.body.addEventListener('scroll', toggleHeader)
  function toggleHeader() {
    const $header = document.querySelector('#headerWrapper')
    if (document.body.scrollTop <= 0) {
      $header.style.top = 0
    } else {
      $header.style.top = '-48px'
    }
  }
}
