/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import './Emoji.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'

function Emoji(props) {
  const { emojis } = props
  let splited = emojis.split(',')

  const copied = (e) => {
    let emoji = e.target
    emoji.style.background = 'blue'
    setTimeout(function () {
      emoji.style.background = 'unset'
    }, 1000)
  }

  return (
    <span className="Emoji">
      {splited &&
        splited.map((i, idx) => (
          <CopyToClipboard key={idx} options={{ format: 'text/plain' }} text={i}>
            <span onClick={copied}>{i}</span>
          </CopyToClipboard>
        ))}
      <span
        className="EmojiLink"
        onClick={() => {
          window.open('https://copy.emojiall.com/ko/')
        }}
      >
        [이모지🔗]
      </span>
    </span>
  )
}
export default React.memo(Emoji)
