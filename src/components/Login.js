import React, { useState, useEffect } from 'react'
import './Login.css'
import { useLocation, useHistory } from 'react-router-dom'
import Axios from 'axios'

function Login(props) {
    const {setLogin} = props
    const location = useLocation()
    const history = useHistory()
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
        const username = document.querySelector('[name=username]').value
        const password = document.querySelector('[name=password]').value
        let url = 'https://blog-imki123-backend.herokuapp.com/auth'

        if(checkUsername === '' && password.length >= 1 &&
            checkPassword === '' && checkPasswordConfirm === '')
        { //입력폼에 이상이 없으면 axios submit
            console.log('axios submit')
            if(buttonName === '회원가입'){
                url += '/register'
                Axios({
                    method: 'post',
                    url: url,
                    data: {
                        username: username,
                        password: password,
                    },
                })
                .then(res => {
                    console.log(res)
                    alert(res.data.username+'님의 회원가입에 성공했습니다 :D')
                    history.push('/')
                })
                .catch(e => {
                    console.log(e)
                    let message = '회원가입에 실패했습니다. :('
                    if(e.response && e.response.status === 409){
                        message += '\n이미 존재하는 아이디입니다.'
                    }
                    if(e.response && e.response.status === 400){
                        message += '\n아이디나 비밀번호를 확인해주세요.'
                    }
                    alert(message)
                })
            }else{ //로그인
                url += '/login'
                Axios.post(url,
                    {
                        username: username,
                        password: password,
                    },
                    {
                        withCredentials: true
                    }
                )
                .then(res => {
                    console.log('로그인 성공')
                    console.log(res)
                    setLogin(res.data)
                    history.push('/')
                })
                .catch(e => {
                    console.log('로그인 실패')
                    console.log(e)
                    let message = '로그인에 실패했습니다. :('
                    if(e.response && e.response.status === 401){
                        message += '\n로그인 정보를 확인해주세요.'
                    }
                    alert(message)
                })
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