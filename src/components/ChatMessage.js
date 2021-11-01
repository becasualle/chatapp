import React from 'react'
import user from '../img/user.png'

const ChatMessage = ({ text, type }) => {
    return (
        <div className={`message ${type}`}>
            <img src={user} alt="avatar" />
            <p>{text}</p>
        </div>
    )
}

export default ChatMessage
