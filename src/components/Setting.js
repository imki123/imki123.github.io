import React from 'react'
import './Setting.css'
import { Link} from 'react-router-dom'
import { AppContext } from '../App'

function Setting(props) {
    const store = React.useContext(AppContext)

    const closeSetting = e => {
        const settingWrapper = document.querySelector('#settingWrapper')
        e.stopPropagation()
        setTimeout(function(){
            settingWrapper.style.display = 'none'
        },200)
    }

    const logout = e => {
        if(window.confirm('로그아웃 하시겠습니까?')){
            let url = process.env.REACT_APP_URL+'/auth/logout'
            fetch(url,{
                mode: 'cors',
                method: 'POST',
                credentials: "include",
            })
            .then(res => {
                if(res.status===204) { //로그아웃은 204가 성공
                    console.log('로그아웃 성공')
                    store.setLogin(false)
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
                    {store.login ? 
                        <Link className="settingList" to="/loginStatus">{store.login.username}</Link> :
                        <Link className="settingList" to="/login">로그인</Link>    
                    }
                    {store.login && <div className="settingList" onClick={logout}>로그아웃</div>}
                    {!store.login && <Link className="settingList" to="/register">회원가입</Link>}
                    {store.login && <Link className="settingList" to="/withdraw">회원탈퇴</Link>}
                </div>
            </div>
        </div>
    ) 
}
export default React.memo(Setting)
