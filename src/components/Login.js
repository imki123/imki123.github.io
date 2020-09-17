import React, { useState, useEffect } from 'react'
import './Login.css'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'

function Login(props) {
    const {login, setLogin} = props
    const location = useLocation()
    const history = useHistory()
    let browser = ''
    const agent = navigator.userAgent.toLowerCase()
    if(agent.indexOf("chrome") > -1) browser = 'chrome'
    else if(agent.indexOf("safari") > -1) browser = 'safari'
        
    const [checkUsername, setCheckUsername] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [checkPasswordConfirm, setCheckPasswordConfirm] = useState('')
    const [buttonName, setButtonName] = useState('로그인')
    

    useEffect(() => {
        //이미 로그인이 되어있다면 스테이터스로 이동
        if(login && location.pathname === '/login'){ 
            history.replace('/loginStatus')
        }
        if(location.pathname.indexOf('register') > -1){
            setButtonName('회원가입')
        }else if(location.pathname.indexOf('withdraw') > -1){
            setButtonName('회원탈퇴')
        }else{
            setButtonName('로그인')
        }
    },[location, login, history])

    const changeUsername = e => {
        const pattern = /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]/g
        const value = e.target.value = e.target.value.replace(/\s/g,'_').replace(pattern,'')
        if(value.length < 3){ //3글자 이상
            setCheckUsername('- 3자 이상 입력해주세요')
        }else if(value.length > 20){ //20글자 이하
            setCheckUsername('- 20자 이하로 입력해주세요')
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
            setCheckPassword('- 6자 이상 입력해주세요')
        }else if(value.length > 20){ //20글자 이하
            setCheckPassword('- 20자 이하로 입력해주세요')
        }else{
            setCheckPassword('')
        }
    }
    const changePasswordConfirm = e => {
        const {value} = e.target
        const password = document.querySelector('[name=password]')
        
        if(value !== password.value && value.length >= 1){ //password와 같으면
            setCheckPasswordConfirm('- 비밀번호가 일치하지 않습니다')
        }else{
            setCheckPasswordConfirm('')
        }
    }
    const clickButton = e => {
        e.preventDefault();
        let url = process.env.REACT_APP_URL+'/auth'
        //url = process.env.REACT_APP_LOCAL_URL+'/auth'
        const pattern = /[^a-zA-Z0-9가-힣_]/g
        let username = document.querySelector('[name=username]')
        if(username) username = username.value = username.value.replace(pattern,'')
        let password = document.querySelector('[name=password]')
        if(password) password = password.value

        if(checkUsername === '' && password.length >= 1 &&
            checkPassword === '' && checkPasswordConfirm === '')
        { //입력폼에 이상이 없으면 fetch submit
            console.log('fetch submit')
            if(buttonName === '회원가입'){
                url += '/register'
                fetch(url,{
                    mode: 'cors',
                    method: 'POST',
                    credentials: "include",
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                })
                .then(res => {
                    if(res.status===200 || res.status===201) { //성공하면 아래 then 작동
                        res.json().then(res =>{ 
                            alert(res.username+'님의 회원가입에 성공했습니다 :D')
                            history.go(-1)
                        })
                    }else{
                        let message = '회원가입에 실패했습니다 :('
                        if(res.status === 409){
                            message += '\n이미 존재하는 아이디입니다.'
                        }
                        if(res.status === 400){
                            message += '\n아이디나 비밀번호를 확인해주세요.'
                        }
                        alert(message)
                    }
                })
                .catch(e => console.error(e))
            }else if(buttonName === '회원탈퇴'){
                if(window.confirm("계정 탈퇴시 복구할 수 없습니다. 정말로 탈퇴하시겠습니까?")){
                    url += '/withdraw'
                    fetch(url,{
                        mode: 'cors',
                        method: 'DELETE',
                        credentials: "include",
                        headers:{'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            username: login.username,
                            password: password,
                        }),
                    })
                    .then(res => {
                        if(res.status===200) { //삭제하면 Ok
                            alert('계정이 탈퇴되었습니다. 또 들러 주세요 :D')
                            history.push('/')
                        }else{
                            let message = '탈퇴에 실패했습니다 :('
                            if(res.status === 204){
                                message += '\n존재하지 않는 아이디입니다.'
                            }
                            if(res.status === 401){
                                message += '\n비밀번호를 확인해주세요.'
                            }
                            alert(message)
                        }
                    })
                    .catch(e => console.error(e))
                }
            }else{ //로그인
                url += '/login'
                fetch(url,{
                    mode: 'cors',
                    method: 'POST',
                    credentials: "include",
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                })
                .then(res => {
                    if(res.status===200 || res.status===201) { //성공하면 아래 then 작동
                        res.json().then(res =>{ 
                            setLogin(res)
                            alert(res.username+'님 환영합니다 :D')
                            history.go(-1)
                        })
                    }else{
                        let message = '로그인에 실패했습니다 :('
                        if(res.status === 401){
                            message += '\n로그인 정보를 확인해주세요.'
                        }
                        alert(message)
                    }
                })
                .catch(e => console.error(e))
            }
        }else{
            alert('입력 정보를 확인해주세요.')
        }
    }

    return(
        <div id="background">
            <div id="loginWrapper">
                <form id="login">
                    <Switch>
                        <Route path={['/login','/register','/withdraw']}>
                            <div className="text">아이디</div>
                            {buttonName === '회원탈퇴' ?
                                <div>{login.username}</div> :
                                <input name="username" onChange={changeUsername}/>
                            }

                            <div className="check">{checkUsername}</div>

                            <div className="text">비밀번호</div>
                            <input name="password" type="password" onChange={changePassword} autoComplete="currnet-password"/>
                            <div className="check">{checkPassword}</div>
                            
                            {buttonName === '회원가입' &&
                            <>
                                <div className="text">비밀번호 확인</div>
                                <input name="passwordConfirm" type="password" onChange={changePasswordConfirm} autoComplete="currnet-password"/>
                                <div className="check" id="checkPasswordConfirm">{checkPasswordConfirm}</div>
                            </>}

                            {buttonName === '회원탈퇴' 
                            ? <button className="hover" style={{background: 'red'}} onClick={clickButton}>{buttonName}</button>
                            : <button className="hover" onClick={clickButton}>{buttonName}</button>}

                            {browser === 'safari' &&
                            <div className="text" style={{fontSize: '0.8rem', textAlign: 'center'}}>
                                (Safari의 경우 설정을 변경해주셔야 로그인이 가능합니다.<br/>설정 → Safari → 개인 정보 보호 및 보안 → <br/>크로스 사이트 추적방지 OFF, 모든 쿠키 차단 OFF) 
                            </div>}
                        </Route>
                        <Route path={['/loginStatus']}>
                            {login ? 
                            <div className="center">
                                {login.username}님은 현재 <span style={{color:'green'}}>로그인</span> 되어있습니다 :D<br/>
                                <span style={{fontSize: '0.8rem'}}>(로그인은 최대 일주일간 유지됩니다.)</span>
                            </div> : 
                            <div className="center">
                                재 로그인이 필요합니다 :D
                            </div>}
                        </Route>
                    </Switch>
                </form>
            </div>
        </div>
    ) 
}
export default React.memo(Login)
