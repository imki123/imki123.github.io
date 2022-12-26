import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import MenuIcon from '@material-ui/icons/Menu'
import { closeMenuMobile, slideMenu } from '../utils/util'
import { Button } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

function Header(props) {
  const store = React.useContext(AppContext)

  const toggleSetting = () => {
    const setting = document.querySelector('#settingWrapper')
    if (setting) {
      if (setting.style.display === 'block') {
        setting.style.display = 'none'
      } else {
        setting.style.display = 'block'
      }
    }
  }

  return (
    <div id="headerWrapper">
      <div id="header">
        <Button className="menu" onClick={slideMenu}>
          <MenuIcon />
        </Button>
        <Link to="/">
          <Button id="title" startIcon={<img id="logo" alt="logo" src={process.env.PUBLIC_URL + '/favicon.ico'} />} onClick={closeMenuMobile}>
            임기의 코딩 블로그
          </Button>
        </Link>
        <Button className="hover profile" onClick={toggleSetting}>
          {!store.login ? (
            <AccountCircleIcon />
          ) : (
            <img
              alt="PROFILE"
              src={store.login.imageUrl ? store.login.imageUrl : 'noimage' + Math.floor(Math.random() * 100)}
              onError={(e) => {
                e.target.src = process.env.PUBLIC_URL + '/images/dog' + (Math.floor(Math.random() * (3 - 1 + 1)) + 1) + '.png'
              }}
            />
          )}
        </Button>
      </div>
    </div>
  )
}
export default React.memo(Header)
