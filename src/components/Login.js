import React, { useState, useEffect } from 'react'
import './Login.css'
import { useLocation } from 'react-router-dom'

function Login(props) {
    const location = useLocation()
    const [checkUsername, setCheckUsername] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [checkPasswordConfirm, setCheckPasswordConfirm] = useState('')
    const [buttonName, setButtonName] = useState('로그인')

    useEffect(() => {
        if(location.pathname.indexOf('register') > -1){
            setButtonName('회원가입')
        }
    },[location, checkUsername, checkPassword, checkPasswordConfirm])

    const changeUsername = e => {
        const {value} = e.target
        if(value.length < 3){ //3글자 이상
            setCheckUsername('- Longer than 3 letters')
        }else if(value.length > 20){ //20글자 이하
            setCheckUsername('- Max length is 20 letters')
        }else{
            setCheckUsername('')
        }
    }
    const changePassword = e => {
        const {value} = e.target
        const passwordConfirm = document.querySelector('[name=passwordConfirm]')
        
        //비밀번호가 변경되면 비밀번호 확인은 초기화
        if(passwordConfirm){
            passwordConfirm.value = ''
            setCheckPasswordConfirm('')
        }

        if(value.length < 6){ //6글자 이상
            setCheckPassword('- Longer than 6 letters')
        }else if(value.length > 20){ //20글자 이하
            setCheckPassword('- Max length is 20 letters')
        }else{
            setCheckPassword('')
        }
    }
    const changePasswordConfirm = e => {
        const {value} = e.target
        const password = document.querySelector('[name=password]')
        
        if(value !== password.value && value.length >= 1){ //password와 같으면
            setCheckPasswordConfirm('- Not correct')
        }else{
            setCheckPasswordConfirm('')
        }
    }
    const clickButton = e => {
        e.preventDefault();
        const password = document.querySelector('[name=password]')
        let url = ''

        console.log('click')
        if(checkUsername === '' && 
            password.value.length >= 1 &&
            checkPassword === '' && 
            checkPasswordConfirm === '')
        {
            console.log('submit')
            if(buttonName === '회원가입'){

            }
        }
    }
	return(
        <div id="loginWrapper">
            <form id="login">
                <div className="text">아이디</div>
                <input name="username" onChange={changeUsername}/>
                <div className="check">{checkUsername}</div>

                <div className="text">비밀번호</div>
                <input name="password" type="password" onChange={changePassword}/>
                <div className="check">{checkPassword}</div>
                
                {buttonName === '회원가입' &&
                <>
                    <div className="text">비밀번호 확인</div>
                    <input name="passwordConfirm" type="password" onChange={changePasswordConfirm}/>
                    <div className="check" id="checkPasswordConfirm">{checkPasswordConfirm}</div>
                </>}

                <button className="hover" onClick={clickButton}>{buttonName}</button>
            </form>
        </div>
    ) 
}
export default React.memo(Login)
