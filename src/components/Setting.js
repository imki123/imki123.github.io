import React from 'react'
import './Setting.css'

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
                    <div className="settingList">로그인</div>
                    <div className="settingList">로그아웃</div>
                    <div className="settingList">회원가입</div>
                    <div className="settingList">회원탈퇴</div>
                </div>
                <form id="login">

                </form>
                <form id="login">

                </form>
            </div>
        </div>
        

    ) 
}
export default React.memo(Setting)
