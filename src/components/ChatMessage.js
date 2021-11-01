import React from 'react'
import './ChatMessage.css'
import user from '../img/user.png'

const ChatMessage = ({ text, type }) => {
    return (
        <div className='message sent'>
            <img src={user} alt="avatar" className='userAvatar' />
            <p>{text}</p>
        </div>
    )
}

export default ChatMessage
