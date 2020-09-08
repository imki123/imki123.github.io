import React from 'react'
import './Setting.css'
import { Link, useHistory } from 'react-router-dom'

function Setting(props) {
    const {login, setLogin} = props
    const history = useHistory()

    const closeSetting = e => {
        const settingWrapper = document.querySelector('#settingWrapper')
        settingWrapper.style.display = 'none'
        e.stopPropagation()
    }

    const logout = e => {
        if(window.confirm('로그아웃 하시겠습니까?')){
            let url = 'https://blog-imki123-backend.herokuapp.com/auth/logout'
            fetch(url,{
                mode: 'cors',
                method: 'post',
                credentials: "include",
            })
            .then(res => {
                if(res.status===200 || res.status===201 || res.status===204) { //성공하면 아래 then 작동
                    res.json().then(res =>{ 
                        console.log('로그아웃 성공')
                        history.push('/')
                        setLogin(false)
                    })
                }else{
                    console.log('로그아웃 실패', res)
                }
            })
            .catch(e => console.error(e))
        }
    }

	return(
        <div id="settingWrapper" onClick={closeSetting}>
            <div id="setting">
                <div id="settingListWrapper">
                    {login ? 
                        <div className="settingList">{login.username}</div> :
                        <Link className="settingList" to="/login">로그인</Link>    
                    }
                    <div className="settingList" onClick={logout}>로그아웃</div>
                    <Link className="settingList" to="/register">회원가입</Link>
                    <div className="settingList">회원탈퇴</div>
                </div>
            </div>
        </div>
        

    ) 
}
export default React.memo(Setting)
