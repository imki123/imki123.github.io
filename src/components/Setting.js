import React from 'react'
import './Setting.css'
import { Link } from 'react-router-dom'

function Setting(props) {
    const {login} = props

    const closeSetting = e => {
        e.target.style.display = 'none'
        e.stopPropagation()
    }
	return(
        <div id="settingWrapper" onClick={closeSetting}>
            <div id="setting" onClick={e=>{e.stopPropagation()}}>
                <div id="settingListWrapper">
                    <Link className="settingList" to="/login">로그인</Link>
                    <div className="settingList">로그아웃</div>
                    <Link className="settingList" to="/register">회원가입</Link>
                    <div className="settingList">회원탈퇴</div>
                </div>
            </div>
        </div>
        

    ) 
}
export default React.memo(Setting)
