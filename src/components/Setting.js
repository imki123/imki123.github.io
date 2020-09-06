import React from 'react'
import './Setting.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'

function Setting(props) {
    const {login} = props

    const closeSetting = e => {
        const settingWrapper = document.querySelector('#settingWrapper')
        settingWrapper.style.display = 'none'
        e.stopPropagation()
    }

    const logout = e => {
        let url = 'https://blog-imki123-backend.herokuapp.com/auth/logout'
        Axios.post(url,
            {withCredentials: true}
        )
        .then(res => {
            console.log(res)
        })
        .catch(e =>{
            console.log(e)
        })
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
